import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { suriConfig } from "@/config/suri.config";
import { Opening } from "@/components/suri/sections/Opening";
import { RightNow } from "@/components/suri/sections/RightNow";
import { Comfort } from "@/components/suri/sections/Comfort";
import { Diagnostic } from "@/components/suri/sections/Diagnostic";
import { LoveMessages } from "@/components/suri/sections/LoveMessages";
import { JustMe } from "@/components/suri/sections/JustMe";
import { SecretStar } from "@/components/suri/sections/SecretStar";
import { Closing } from "@/components/suri/sections/Closing";
import { Particles } from "@/components/suri/Particles";
import { Reveal } from "@/components/suri/Reveal";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: suriConfig.meta.title },
      { name: "description", content: suriConfig.meta.description },
      // Private by design: never indexed, never followed, no analytics, no login.
      { name: "robots", content: "noindex,nofollow,noarchive,nosnippet,noimageindex" },
      { name: "googlebot", content: "noindex,nofollow" },
      { name: "theme-color", content: "#0a0708" },
      { property: "og:title", content: suriConfig.meta.title },
      { property: "og:description", content: suriConfig.meta.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [entered, setEntered] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const enter = useCallback(() => {
    setEntered(true);
    requestAnimationFrame(() => {
      setTimeout(
        () => bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80,
      );
    });
  }, []);

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-background">
      <Opening onEnter={enter} />

      {entered && (
        <div
          ref={bodyRef}
          className="relative animate-[suri-fade_1200ms_ease-out_both]"
        >
          <Particles
            className="pointer-events-none fixed inset-0 h-full w-full opacity-70"
            count={22}
          />
          <div className="pointer-events-none fixed inset-0 bg-[var(--gradient-veil)]" />

          <div className="relative">
            <RightNow />

            <section className="px-6 pb-8">
              <div className="mx-auto grid max-w-md gap-5">
                <Comfort />
                <Diagnostic />
                <LoveMessages />
                <JustMe />
              </div>
            </section>

            {/* The discreet star — easy to miss, lovely to find. */}
            <Reveal className="pb-6">
              <SecretStar />
            </Reveal>

            <Closing />
          </div>
        </div>
      )}
    </main>
  );
}
