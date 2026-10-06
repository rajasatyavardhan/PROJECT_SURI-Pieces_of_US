import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import { suriConfig } from "@/config/suri.config";
import { Opening } from "@/components/suri/sections/Opening";
import { LoveMessages } from "@/components/suri/sections/LoveMessages";
import { JustMe } from "@/components/suri/sections/JustMe";
import { SecretStar } from "@/components/suri/sections/SecretStar";
import { Closing } from "@/components/suri/sections/Closing";
import { Particles } from "@/components/suri/Particles";
import { Reveal } from "@/components/suri/Reveal";
import { MemoryGallery } from "@/components/suri/sections/MemoryGallery";
import { BirthdayCake, MbbsChapter, SuriStory, WorldIntro } from "@/components/suri/sections/BirthdayJourney";
import { Butterflies, StoryMosaic } from "@/components/suri/sections/PhotoFinale";
import { TelegramMoments } from "@/components/suri/sections/TelegramMoments";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: suriConfig.meta.title },
      { name: "description", content: suriConfig.meta.description },
      // No visitor tracking or indexing; the optional Telegram story card is a static aggregate snapshot.
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
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const enter = useCallback(() => {
    bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-background">
      <Opening onEnter={enter} />
      <Butterflies />

        <div ref={bodyRef} className="relative">
          <Particles
            className="pointer-events-none fixed inset-0 h-full w-full opacity-70"
            count={22}
          />
          <div className="pointer-events-none fixed inset-0 bg-[var(--gradient-veil)]" />

          <div className="relative">
            <WorldIntro />
            <SuriStory />
            <MbbsChapter />
            <MemoryGallery />

            <section className="birthday-section px-5 py-24 sm:px-10 lg:px-16" aria-labelledby="his-side-title">
              <div className="mx-auto max-w-7xl">
                <Reveal>
                  <p className="birthday-eyebrow">From Raja</p>
                  <h2 id="his-side-title" className="birthday-title mt-5">{suriConfig.birthday.hisTitle}</h2>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{suriConfig.birthday.hisBody}</p>
                </Reveal>
                <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-10">
                  <JustMe />
                  <StoryMosaic index={0} />
                </div>
              </div>
            </section>

            <section className="birthday-section px-5 py-24 sm:px-10 lg:px-16" aria-label="Things I would say, and one more photo surprise">
              <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
                <StoryMosaic index={1} />
                <LoveMessages />
              </div>
            </section>

            <BirthdayCake />
            <TelegramMoments />

            {/* The discreet star — easy to miss, lovely to find. */}
            <Reveal className="mx-auto max-w-7xl px-5 pb-6 sm:px-10 lg:px-16">
              <SecretStar />
            </Reveal>

            <Closing />
          </div>
        </div>
    </main>
  );
}
