import { useRef, useState, type PointerEvent } from "react";
import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";
import { SoftButton } from "../SoftButton";

type Stage = "lit" | "wished" | "cut" | "served";
export function ChocolateCake() {
  const [stage, setStage] = useState<Stage>("lit");
  const [progress, setProgress] = useState(0);
  const [knife, setKnife] = useState({ x: 275, y: 155 });
  const [slice, setSlice] = useState({ x: 0, y: 0 });
  const gesture = useRef<{ x: number; y: number; mode: "knife" | "slice" } | null>(null);
  const point = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * 500 / rect.width, y: (event.clientY - rect.top) * 420 / rect.height };
  };
  const status = stage === "lit" ? "First, make a wish. The chocolate is waiting." : stage === "wished" ? "Your finger is the knife. Pull down through the cake." : stage === "cut" ? "Now take your slice—drag it onto the little plate." : "First slice: Suri. Remaining cake: also Suri. Baava gets a crumb, apparently.";
  const finish = () => {
    const active = gesture.current;
    if (active?.mode === "knife") {
      if (progress >= .7) { setStage("cut"); setProgress(1); }
      else setProgress(0);
    }
    if (active?.mode === "slice") {
      if (slice.x > 40 && slice.y > 15) { setStage("served"); setSlice({ x: 83, y: 57 }); }
      else setSlice({ x: 0, y: 0 });
    }
    gesture.current = null;
  };
  return <section className="birthday-section px-5 py-24 text-center sm:px-10" aria-labelledby="cake-title">
    <Reveal className="mx-auto max-w-3xl">
      <p className="birthday-eyebrow">A little chocolate mischief</p>
      <h2 id="cake-title" className="birthday-title mt-5">{suriConfig.birthday.cakeTitle}</h2>
      <p className="mx-auto mt-5 max-w-xl text-muted-foreground">Make a wish, cut with your finger, then steal the first slice. This cake follows your touch.</p>
      <div className="chocolate-table">
        <svg viewBox="0 0 500 420" role="img" aria-label="Interactive dimensional chocolate cake with a movable slice" className={`chocolate-cake-svg cake-${stage}`}
          onPointerDown={event => {
            const p = point(event);
            if (stage === "wished" && p.x > 90 && p.x < 395 && p.y > 80 && p.y < 300) {
              event.currentTarget.setPointerCapture(event.pointerId); gesture.current = { ...p, mode: "knife" }; setKnife(p); setProgress(0);
            } else if (stage === "cut" && p.x > 230 && p.x < 415 && p.y > 170 && p.y < 345) {
              event.currentTarget.setPointerCapture(event.pointerId); gesture.current = { ...p, mode: "slice" };
            }
          }}
          onPointerMove={event => {
            const p = point(event);
            if (stage === "wished") setKnife({ x: Math.max(95, Math.min(400, p.x)), y: Math.max(80, Math.min(300, p.y)) });
            const active = gesture.current;
            if (active?.mode === "knife") setProgress(Math.max(0, Math.min(1, (p.y - active.y) / 100)));
            if (active?.mode === "slice") setSlice({ x: Math.max(-40, Math.min(140, p.x - active.x)), y: Math.max(-50, Math.min(100, p.y - active.y)) });
          }}
          onPointerUp={finish}
          onPointerCancel={() => { gesture.current = null; setProgress(stage === "wished" ? 0 : 1); setSlice({ x: 0, y: 0 }); }}>
          <defs>
            <linearGradient id="choc-side" x2="1" y2=".2"><stop stopColor="#6b3927" /><stop offset=".5" stopColor="#3a1c18" /><stop offset="1" stopColor="#201015" /></linearGradient>
            <radialGradient id="choc-top" cx=".35" cy=".2"><stop stopColor="#a66745" /><stop offset=".55" stopColor="#68351f" /><stop offset="1" stopColor="#321c18" /></radialGradient>
            <linearGradient id="cake-plate"><stop stopColor="#e9d4cc" /><stop offset="1" stopColor="#8f7183" /></linearGradient>
            <linearGradient id="knife-metal" x2="0" y2="1"><stop stopColor="#fff8ed" /><stop offset=".45" stopColor="#b4c2d0" /><stop offset=".6" stopColor="#fafbfc" /><stop offset="1" stopColor="#758695" /></linearGradient>
            <filter id="cake-shadow"><feGaussianBlur stdDeviation="12" /></filter>
          </defs>
          <ellipse cx="240" cy="330" rx="172" ry="30" fill="#000" opacity=".5" filter="url(#cake-shadow)" />
          <ellipse cx="238" cy="309" rx="166" ry="39" fill="url(#cake-plate)" />
          <ellipse cx="238" cy="303" rx="151" ry="31" fill="#fff5e7" opacity=".28" />
          <path d="M105 163v112c0 64 265 64 265 0V163Z" fill="url(#choc-side)" />
          {[199, 235, 267].map(y => <path key={y} d={`M106 ${y}q132 56 263 0`} fill="none" stroke="#b9784e" strokeWidth="9" opacity=".55" />)}
          <ellipse cx="238" cy="164" rx="133" ry="50" fill="url(#choc-top)" stroke="#bd8052" strokeWidth="2" />
          <path d="M108 163c10 13 13 36 23 35s8-18 18-18 10 35 21 31 9-21 20-19 8 36 22 31 12-24 26-20 10 25 25 22 8-26 23-27 12 19 24 14 8-24 19-24 14 17 22 5 13-27 17-30" fill="none" stroke="#3b1e17" strokeWidth="13" strokeLinecap="round" />
          {Array.from({ length: 16 }, (_, i) => <ellipse key={i} cx={238 + Math.cos(i * Math.PI / 8) * 113} cy={163 + Math.sin(i * Math.PI / 8) * 37} rx="10" ry="5" fill="#c39167" stroke="#54281c" strokeWidth="3" />)}
          <text x="238" y="163" fill="#ffe5c2" fontSize="19" fontFamily="Georgia" textAnchor="middle">For my Bujjodaa ♡</text>
          <path d="M230 128v-56h16v56" fill="#f0bad1" stroke="#fff1e2" strokeWidth="2" />
          <path d="M230 91l16-8m-16 25 16-8" stroke="#b85e88" strokeWidth="4" />
          {stage === "lit" && <path className="cake-candle-flame" d="M238 72c-25-15-5-25 0-42 5 17 25 27 0 42Z" fill="#ffc66d" stroke="#fff0b7" strokeWidth="3" />}
          {stage !== "lit" && <path d="M238 67q-15-18 0-28" stroke="#d8bfd0" strokeWidth="2" fill="none" opacity=".45" />}
          {stage === "wished" && <path d={`M268 174l0 ${progress * 115}`} stroke="#ffddb5" strokeWidth="3" strokeLinecap="round" />}
          {(stage === "cut" || stage === "served") && <path d="M267 178l64 12v100l-64-17Z" fill="#190b0e" />}
          <ellipse cx="408" cy="355" rx="73" ry="22" fill="url(#cake-plate)" stroke="#ead4cd" strokeWidth="2" />
          <text x="408" y="395" fill="#e4bfcf" fontSize="13" textAnchor="middle">Suri's first slice</text>
          {(stage === "cut" || stage === "served") && <g transform={`translate(${slice.x} ${slice.y})`} className="cake-movable-slice">
            <path d="M266 177l68 16v99l-68-20Z" fill="url(#choc-side)" stroke="#8e5638" strokeWidth="2" />
            <path d="M266 177l37-37 31 53Z" fill="url(#choc-top)" stroke="#b47b4a" strokeWidth="2" />
            {[213, 244, 270].map(y => <path key={y} d={`M268 ${y}l64 18`} stroke="#d29866" strokeWidth="7" />)}
            <ellipse cx="309" cy="169" rx="9" ry="5" fill="#d7a379" />
          </g>}
          {stage === "wished" && <g transform={`translate(${knife.x} ${knife.y}) rotate(-35)`} pointerEvents="none">
            <path d="M-85-10h89v19h-58q-22 0-31-19Z" fill="url(#knife-metal)" stroke="#dbe1e6" />
            <rect x="4" y="-12" width="58" height="23" rx="7" fill="#eed1a3" stroke="#92663d" strokeWidth="2" />
            <circle cx="19" cy="0" r="2" fill="#795839" /><circle cx="47" cy="0" r="2" fill="#795839" />
          </g>}
        </svg>
      </div>
      <p role="status" className="mx-auto mt-4 min-h-16 max-w-lg font-serif text-xl text-primary">{status}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {stage === "lit" && <SoftButton type="button" onClick={() => setStage("wished")}>Make a wish & blow out the candle ✨</SoftButton>}
        {stage === "wished" && <SoftButton type="button" variant="ghost" onClick={() => { setStage("cut"); setProgress(1); }}>Cut my slice</SoftButton>}
        {stage === "cut" && <SoftButton type="button" variant="ghost" onClick={() => { setStage("served"); setSlice({ x: 83, y: 57 }); }}>Serve my slice</SoftButton>}
        {(stage === "cut" || stage === "served") && <SoftButton type="button" onClick={() => { setStage("lit"); setProgress(0); setSlice({ x: 0, y: 0 }); gesture.current = null; }}>One more birthday wish</SoftButton>}
      </div>
    </Reveal>
  </section>;
}
