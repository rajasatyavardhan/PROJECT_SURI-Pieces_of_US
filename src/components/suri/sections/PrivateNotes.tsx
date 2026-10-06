import { useEffect, useRef, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SoftButton } from "../SoftButton";

type Note = { id: string; author_name: string; body: string; created_at: string };
type Access = { client: SupabaseClient; userId: string; name: string };

/** No email allowlist or privileged credential belongs in this component.
 * Database policies independently enforce membership and author ownership. */
export function PrivateNotes() {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [access, setAccess] = useState<Access | null>(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [body, setBody] = useState("");
  const pending = useRef(false);
  const draftId = useRef<string | null>(null);

  useEffect(() => {
    // Supabase consumes and clears its own implicit-flow token fragment.
    if (window.location.hash.includes("access_token=")) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    let active = true;
    import("@/lib/suri-notes-client").then(({ getNotesClient }) => {
      if (active) setClient(getNotesClient());
    }).catch(() => { if (active) setStatus("Our private space is still being connected. Nothing has been sent."); });
    return () => { active = false; };
  }, [open]);

  useEffect(() => {
    if (!client) return;
    let active = true;
    let generation = 0;
    const check = async () => {
      const run = ++generation;
      const { data: { user } } = await client.auth.getUser();
      if (!active || run !== generation) return;
      setAccess(null);
      setNotes([]);
      if (!user) return;
      const { data: name, error } = await client.rpc("suri_note_member_name");
      if (!active || run !== generation) return;
      if (error || (name !== "Raja" && name !== "Suri")) {
        setStatus("This sign-in does not have access to our private space.");
        await client.auth.signOut();
        return;
      }
      setAccess({ client, userId: user.id, name });
      setStatus(`Welcome, ${name}. Only the two of you can read these notes.`);
    };
    void check();
    // Avoid awaiting another auth call inside the auth-state callback itself.
    const { data: { subscription } } = client.auth.onAuthStateChange((event) => {
      generation++;
      if (event === "SIGNED_OUT") { setAccess(null); setNotes([]); setBody(""); draftId.current = null; }
      window.setTimeout(() => { if (active) void check(); }, 0);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, [client]);

  useEffect(() => {
    if (!access) return;
    let active = true;
    const controller = new AbortController();
    const refresh = async () => {
      if (document.hidden) return;
      const { data, error } = await access.client.from("suri_private_notes")
        .select("id,author_name,body,created_at").order("created_at", { ascending: false })
        .limit(200).abortSignal(controller.signal);
      if (!active) return;
      if (error) { setNotes([]); setStatus("Could not refresh your notes. Please try again shortly."); return; }
      setNotes(previous => Array.from(new Map([...previous, ...(data as Note[])].map(note => [note.id, note])).values())
        .sort((a, b) => a.created_at.localeCompare(b.created_at)).slice(-200));
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), 15000);
    document.addEventListener("visibilitychange", refresh);
    return () => { active = false; controller.abort(); window.clearInterval(timer); document.removeEventListener("visibilitychange", refresh); };
  }, [access]);

  const authenticate = async () => {
    if (!client || pending.current) return;
    pending.current = true; setBusy(true);
    try {
      if (codeSent) {
        const { error } = await client.auth.verifyOtp({ email: email.trim(), token: code.trim(), type: "email" });
        if (error) throw error;
        setCode(""); setStatus("Checking your access…");
      } else {
        const { error } = await client.auth.signInWithOtp({ email: email.trim(), options: {
          shouldCreateUser: true, emailRedirectTo: "https://project-suri-pieces.lovable.app/",
        } });
        if (error) throw error;
        setCodeSent(true); setStatus("Check your inbox: open the sign-in link, or enter the code here if the email includes one. Never share your code in chat.");
      }
    } catch { setStatus(codeSent ? "That code could not be verified. Check it or request a fresh one." : "Could not send the sign-in email. Please try again shortly."); }
    finally { pending.current = false; setBusy(false); }
  };

  const send = async () => {
    if (!access || !body.trim() || pending.current) return;
    pending.current = true; setBusy(true);
    try {
      const id = draftId.current ?? crypto.randomUUID();
      draftId.current = id;
      let { data, error } = await access.client.from("suri_private_notes")
        .insert({ id, author_id: access.userId, body: body.trim() })
        .select("id,author_name,body,created_at").single();
      // An interrupted response can hide a successful insert; retry the same ID.
      if (error?.code === "23505") {
        ({ data, error } = await access.client.from("suri_private_notes")
          .select("id,author_name,body,created_at").eq("id", id).single());
      }
      if (error || !data) throw error;
      setNotes(previous => [...previous.filter(note => note.id !== data.id), data as Note]);
      draftId.current = null;
      setBody(""); setStatus("Saved in our private space. The other person can read it when they sign in.");
    } catch { setStatus("Your note was not confirmed as saved. Your text is still here; please retry."); }
    finally { pending.current = false; setBusy(false); }
  };

  return <section aria-labelledby="private-notes-title" className="birthday-section px-5 py-20 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-card/50 p-6 sm:p-10">
      <p className="birthday-eyebrow">A little space, just ours</p>
      <h2 id="private-notes-title" className="mt-4 font-serif text-4xl">Leave me a little piece of your day.</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">A note, a smile, or a complaint about Baava stealing cake. Sign in to read and write together. These notes are not public.</p>
      {!open ? <SoftButton className="mt-6" onClick={() => setOpen(true)}>Open our private space ♡</SoftButton> : <div className="mt-6">
        {!access ? <form onSubmit={event => { event.preventDefault(); void authenticate(); }} className="space-y-4">
          <label className="block text-sm">Your sign-in email<input required type="email" autoComplete="email" disabled={busy || codeSent} value={email} onChange={event => setEmail(event.target.value)} className="mt-2 block min-h-12 w-full rounded-xl border border-border bg-background p-3 text-base" /></label>
          {codeSent && <label className="block text-sm">Sign-in code (if included in your email)<input required inputMode="numeric" autoComplete="one-time-code" value={code} onChange={event => setCode(event.target.value)} className="mt-2 block min-h-12 w-full rounded-xl border border-border bg-background p-3 text-base" /></label>}
          <SoftButton type="submit" disabled={busy || !client}>{busy ? "One moment…" : codeSent ? "Unlock with my code" : "Email my sign-in link / code"}</SoftButton>
          {codeSent && <SoftButton variant="ghost" type="button" disabled={busy} onClick={() => { setCodeSent(false); setCode(""); setStatus(""); }}>Use another email / request again</SoftButton>}
        </form> : <>
          <div className="flex items-center justify-between gap-3"><span className="text-sm text-primary">Signed in as {access.name}</span><SoftButton variant="ghost" disabled={busy} onClick={() => void access.client.auth.signOut()}>Sign out</SoftButton></div>
          <div className="mt-5 max-h-96 space-y-3 overflow-y-auto" aria-label="Our private notes">
            {notes.length === 0 ? <p className="text-sm text-muted-foreground">Our first little note is still waiting to be written.</p> : notes.map(note => <article key={note.id} className="rounded-2xl border border-border bg-background/60 p-4">
              <p className="text-xs text-primary">{note.author_name} · <time dateTime={note.created_at}>{new Date(note.created_at).toLocaleString()}</time></p>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed">{note.body}</p>
            </article>)}
          </div>
          <form onSubmit={event => { event.preventDefault(); void send(); }} className="mt-6 space-y-3">
            <label className="block text-sm">Your little note<textarea required maxLength={2000} rows={4} value={body} disabled={busy} onChange={event => { draftId.current = null; setBody(event.target.value); }} className="mt-2 block w-full resize-y rounded-xl border border-border bg-background p-3 text-base" /></label>
            <SoftButton type="submit" disabled={busy || !body.trim()}>{busy ? "Saving…" : "Keep this between us ♡"}</SoftButton>
          </form>
        </>}
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground" role="status">{status}</p>
      </div>}
    </div>
  </section>;
}
