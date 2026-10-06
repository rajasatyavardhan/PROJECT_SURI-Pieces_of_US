/**
 * Passwordless email OTP (one-time code) sign-in helpers for Project SURI.
 *
 * - Uses the generated browser client (publishable key only; no service-role
 *   key anywhere in client code).
 * - The backend email template determines whether it sends a link or code;
 *   nothing is sent from here
 *   until `sendEmailOtp` is actually called by the future notes UI.
 * - Permitted emails are enforced server-side by RLS / suri_note_member_name();
 *   no email addresses appear in this codebase.
 * - Links return to the live site; codes can also be verified in the preview.
 */
import { supabase } from "@/integrations/supabase/client";

/** Ask the backend to email a one-time sign-in code to `email`. */
export async function sendEmailOtp(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true, emailRedirectTo: "https://project-suri-pieces.lovable.app/" },
  });
  if (error) throw error;
}

/** Verify the code from the email; resolves with the session on success. */
export async function verifyEmailOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  if (error) throw error;
  return data.session;
}

/** Current session, or null when signed out. */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/** Sign out on this device. */
export async function signOut() {
  await supabase.auth.signOut();
}
