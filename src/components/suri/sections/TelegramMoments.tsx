import { CalendarDays, Clock3, MessageCircleHeart, Smile } from "lucide-react";
import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";

export function TelegramMoments() {
  const story = suriConfig.telegramMoments;
  const cards = [
    { label: "Messages in this export", value: story.messageEvents.toLocaleString("en-CA"), icon: MessageCircleHeart },
    { label: "Our busiest day", value: story.busiestDay, icon: CalendarDays },
    { label: `Our busiest hour · ${story.busiestHourZone}`, value: story.busiestHour, icon: Clock3 },
    { label: "Most-used emoji", value: `${story.topEmoji} × ${story.topEmojiUses.toLocaleString("en-CA")}`, icon: Smile },
  ];

  return <section className="birthday-section telegram-moments px-5 py-24 sm:px-10 lg:px-16" aria-labelledby="telegram-moments-title">
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <p className="birthday-eyebrow">The little things we sent</p>
        <h2 id="telegram-moments-title" className="birthday-title mt-5">{story.title}</h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{story.note}</p>
      </Reveal>
      <div className="telegram-moments-grid mt-10">
        {cards.map(({ label, value, icon: Icon }, index) => <Reveal key={label} delay={index * 70} className="telegram-moment-card">
          <Icon className="h-5 w-5 text-primary/80" aria-hidden="true" />
          <strong>{value}</strong>
          <span>{label}</span>
        </Reveal>)}
      </div>
      <Reveal>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          First message <em>in this export</em>: {story.firstExportedMessage}. Snapshot through {story.snapshotThrough};
          these are chat totals, not a record of the day we first met.
        </p>
      </Reveal>
    </div>
  </section>;
}
