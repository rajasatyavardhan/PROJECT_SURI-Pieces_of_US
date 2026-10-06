import { Reveal } from '../Reveal';
import { SoftLink } from '../SoftButton';
export function TelegramContact() {
  return <section className="birthday-section px-5 py-16 sm:px-10" aria-labelledby="telegram-contact-title">
    <Reveal className="mx-auto max-w-xl rounded-3xl border border-border bg-background/90 p-8 text-center">
      <p className="birthday-eyebrow">No login. Just your Baava.</p>
      <h2 id="telegram-contact-title" className="mt-5 font-serif text-4xl">Leave me a little piece of your day.</h2>
      <p className="my-6 text-muted-foreground">A smile, a wish, or an official complaint about the cake. This opens our conversation in Telegram; it isn’t saved on this website.</p>
      <SoftLink href="https://t.me/RAJASATYAVARDHAN" target="_blank" rel="noopener noreferrer">Send Baava a little message ♡</SoftLink>
    </Reveal>
  </section>;
}
