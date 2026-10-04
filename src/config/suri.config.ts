/**
 * ============================================================================
 * PROJECT SURI — Central configuration
 * ============================================================================
 * This is the ONLY file you need to edit for copy, links, and media.
 *
 * HOW TO REPLACE THE PHOTO
 *   1. Drop your image in:  public/media/suri-photo.jpg
 *   2. If you use a different name, update `media.photo.src` below.
 *   3. Update `media.photo.alt` and `media.photo.caption`.
 *
 * HOW TO REPLACE THE VOICE NOTE
 *   1. Drop your audio in:  public/media/suri-voice.m4a  (mp3 / m4a / wav all fine)
 *   2. If you use a different name, update `media.voice.src` below.
 *   3. Update `media.voice.title` and `media.voice.durationLabel` (cosmetic only).
 *
 * Until real files exist at those paths, the site shows elegant placeholders
 * instead — nothing breaks.
 *
 * CONTACT BUTTONS
 *   Every button that reaches out to you is configured in `contact`.
 *   Set `enabled: false` on any of them to hide that button.
 * ============================================================================
 */

export type ContactAction = {
  enabled: boolean;
  label: string;
  /** Any URL: https://, tel:, mailto:, sms:, whatsapp deep link, etc. */
  href: string;
};

/** One future photo-pipeline entry. Empty labels and captions stay hidden until supplied. */
export type SuriMemory = {
  id: string;
  imageSrc: string;
  alt: string;
  title: string;
  dateLabel: string;
  locationLabel: string;
  shortCaption: string;
  tags: readonly string[];
  ready: boolean;
};

export const suriConfig = {
  meta: {
    /** Browser tab / share title. Kept private: the site is noindex,nofollow. */
    title: "Project SURI — Pieces of Us",
    description: "A birthday world for Suri, made with love by Raja.",
    projectName: "PROJECT SURI",
    tagline: "Pieces of Us",
  },

  people: {
    her: "Suri",
    herFullName: "Madireddy Sai Susritha",
    him: "Raja",
  },

  birthday: {
    date: "2006-10-07",
    age: 20,
    /** 6:00 a.m. Toronto time, confirmed by Raja. April 21 was EDT (UTC−04:00). */
    togetherSince: "2024-04-21T06:00:00-04:00",
    togetherTimeZone: "America/Toronto",
    eyebrow: "A little world, made just for you",
    wish: "Many, many happy returns of the day, future doctor gaaru.",
    dedication: "To the most beautiful, gorgeous, wonderful human being — and my girl.",
    worldTitle: "Welcome to Suri's world",
    worldNote: "Created, crafted, and designed with love and time by your most handsome and great BAAVA. Hehe.",
    chapters: [
      { number: "01", title: "The little girl who became you", body: "From childhood to the person I am so proud of today.", mediaLabel: "Childhood photo chosen by Raja", imageSrc: "/media/childhood.jpg", ready: false },
      { number: "02", title: "Every version of Suri", body: "The soft, the playful, the determined — all of you belongs here.", mediaLabel: "Suri portrait chosen by Raja", imageSrc: "/media/suri-now.jpg", ready: false },
      { number: "03", title: "And then, us", body: "Small moments became our favourite story.", mediaLabel: "Our photo chosen by Raja", imageSrc: "/media/us-together.jpg", ready: false },
    ],
    piecesTitle: "Pieces of us",
    piecesBody: "The moments I keep coming back to. Soon, your favourites will live here.",
    hisTitle: "From my side of the story",
    hisBody: "Somewhere in all these memories, there is me — looking up at a sky full of us.",
    skyTitle: "Look up, Suri",
    skyBody: "Our photos will rise like fireworks, make their own little hearts, and become one picture of us.",
    cakeTitle: "One birthday wish, just for you",
    endingTitle: "Happy 20th birthday, my bujji bangaru maradhala Susritha Bujjodaa.",
  },

  /** Aggregate-only snapshot of one private Telegram chat export. No messages,
   * names, media paths, or visitor tracking are sent to the website.
   * Refresh these numbers only after processing a newer export privately.
   */
  telegramMoments: {
    title: "Our little Telegram universe",
    note: "A few numbers from the moments we kept sending each other.",
    messageEvents: 237774,
    busiestDay: "Monday",
    busiestHour: "12 noon",
    busiestHourZone: "Toronto time",
    topEmoji: "😂",
    topEmojiUses: 11825,
    firstExportedMessage: "5 October 2024",
    snapshotThrough: "3 October 2026",
  },

  /** ---------------------------------------------------------------- OPENING */
  opening: {
    greeting: "Happy 20th Birthday",
    lines: [
      "MADIREDDY SAI SUSRITHA",
      "Many, many happy returns of the day, future doctor gaaru.",
      "To the most beautiful, gorgeous, wonderful human being — and my girl.",
    ],
    cta: "Enter Suri's world",
    hint: "scroll slowly · this is yours",
  },

  /** -------------------------------------------------------------- RIGHT NOW */
  rightNow: {
    eyebrow: "Right now",
    title: "Whatever today did to you, put it down for a minute.",
    body: "No fixing, no advice, no questions. Just this. Breathe once — slowly — and then press and hold below.",
    hugButton: "Hold for a hug",
    hugHolding: "I've got you…",
    hugDone: "Hug delivered. 🤍",
    hugAfter: "That one was from me. It's yours whenever you want it — come back and hold it again.",
  },

  /** ------------------------------------------------ MINI EXPERIENCE: COMFORT */
  comfort: {
    title: "When it's heavy",
    subtitle: "Tap for something soft.",
    button: "Give me one",
    cards: [
      "You are not behind. You're just tired, and tired lies.",
      "Nothing about today changed how I feel about you.",
      "You're allowed to rest without earning it first.",
      "Whatever you're carrying — I'd carry half of it if you let me.",
      "This feeling has an end. You've reached the end of it before.",
      "You don't have to be impressive to be loved. You just have to be you.",
    ],
  },

  /** --------------------------------------- MINI EXPERIENCE: HUMOUR DIAGNOSTIC */
  diagnostic: {
    title: "Official Suri Diagnostic™",
    subtitle: "Certified by a licensed idiot who loves you.",
    startButton: "Run diagnostic",
    restartButton: "Run it again",
    questions: [
      {
        q: "Current mood, honestly?",
        options: ["Fine (lying)", "Sleepy", "Slightly feral", "Actually okay"],
      },
      {
        q: "When did you last eat something real?",
        options: ["Recently", "Define 'real'", "Coffee counts", "I forgot"],
      },
      {
        q: "Who do you want to yell about it to?",
        options: ["You", "Nobody", "The universe", "You, but later"],
      },
    ],
    results: [
      {
        title: "Diagnosis: Critically Adorable",
        body: "Severe cuteness with mild grumpiness. Prescription: water, one nap, and 14 uninterrupted minutes of me talking nonsense to you.",
      },
      {
        title: "Diagnosis: Running On 3%",
        body: "Battery low, heart still full. Prescription: put the phone down after this, lie flat, and let someone else be responsible for a bit.",
      },
      {
        title: "Diagnosis: Mildly Feral, Fully Loved",
        body: "Patient shows signs of wanting to bite the world. Completely valid. Prescription: snacks, and one hug redeemable at any hour.",
      },
      {
        title: "Diagnosis: Secretly Doing Great",
        body: "You're handling more than you admit. Prescription: stop auditing yourself for one evening. Doctor's orders.",
      },
    ],
  },

  /** ------------------------------ MINI EXPERIENCE: TAP-TO-REVEAL LOVE MESSAGES */
  messages: {
    title: "Things I'd say out loud",
    subtitle: "Tap a tile. Long-press to edit it — it saves on this device.",
    editHint: "Long-press any tile to rewrite it.",
    items: [
      { id: "m1", label: "About your laugh", text: "It rearranges my whole day. I've caught myself saying stupid things just to hear it once more." },
      { id: "m2", label: "About your hands", text: "One of my favourite things is when your hand finds mine before either of us says anything." },
      { id: "m3", label: "When you're quiet", text: "You don't have to fill silences with me. Your quiet is comfortable, not distant." },
      { id: "m4", label: "A promise", text: "On your worst day, I'm not going anywhere. That's not a mood — that's a fact." },
      { id: "m5", label: "Something small", text: "The way you say my name when you're half-asleep. That's it. That's the whole thing." },
      { id: "m6", label: "The truth", text: "I don't love a version of you. I love the actual, tired, funny, complicated you." },
    ],
  },

  /** ------------------------------------------------ MINI EXPERIENCE: JUST ME */
  justMe: {
    title: "Just me",
    subtitle: "One photograph from me, looking up at the sky we made.",
    note: "Replace these in src/config/suri.config.ts → media",
  },

  media: {
    hero: {
      src: "/media/suri-hero.jpg",
      alt: "Susritha in her chosen birthday portrait",
      ready: true,
    },
    photo: {
      /** Put your file at public/media/suri-photo.jpg */
      src: "/media/suri-photo.jpg",
      alt: "A photo from Raja",
      caption: "Me, in a moment I wanted you to have.",
      /** Set to true once you've actually added the file. */
      ready: false,
      placeholder: "Photo goes here — add public/media/suri-photo.jpg",
    },
    voice: {
      /** Put your file at public/media/suri-voice.m4a */
      src: "/media/suri-voice.m4a",
      title: "A voice note for you",
      subtitle: "Headphones, if you can.",
      durationLabel: "voice note",
      /** Set to true once you've actually added the file. */
      ready: false,
      placeholder: "Voice note goes here — add public/media/suri-voice.m4a",
    },
  },

  /** Replace each /media/memories/memory-XX.jpg with your own photo in public/media/memories/.
   * Fill in its alt, title, dateLabel, locationLabel, shortCaption and tags, then flip ready: true.
   * Leave ready: false until the file exists; empty optional labels won't be displayed.
   */
  memories: Array.from({ length: 10 }, (_, index): SuriMemory => {
    const piece = String(index + 1).padStart(2, "0");
    return {
      id: `memory-${piece}`,
      imageSrc: `/media/memories/memory-${piece}.jpg`,
      alt: `A moment from Suri and Raja — piece ${piece}`,
      title: `Piece ${piece}`,
      dateLabel: "",
      locationLabel: "",
      shortCaption: "",
      tags: [],
      ready: false,
    };
  }),

  /** Approved images excluded from the main story but allowed in the photo sky.
   * Populate this with web-ready assets only; never commit review IDs, chat text,
   * private Drive paths, or the raw Telegram export to this public repository.
   */
  mosaicOnlyMemories: [] as SuriMemory[],

  /** ------------------------------------------------------------ SECRET STAR */
  secret: {
    /** The discreet star's whisper when found. */
    foundLabel: "You found it.",
    title: "The one I didn't put anywhere else",
    /** Editable on-device by her; this is the default text. */
    message:
      "If you're reading this, you went looking — which is very you. Here it is: you are the best thing that happened to my ordinary life. Not a chapter. The whole reason I keep writing. Whatever you need, whenever, I'm one call away and I always will be.",
    signature: "— Raja",
    editLabel: "Edit this message",
    saveLabel: "Save",
    resetLabel: "Restore original",
  },

  /** ---------------------------------------------------------------- CLOSING */
  closing: {
    eyebrow: "Project SURI",
    title: "And the best part is still us.",
    promise:
      "Happy birthday, Suri. Every piece of this was made with love, and every tomorrow is another piece we get to make together.",
    mosaicTiles: 24,
    /** How many tiles are already "filled" (this site). */
    mosaicFilled: 5,
    mosaicCaption: "unrevealed",
    footer: "Made for you, with all my love. — Raja",
  },

  contact: {
    primary: {
      enabled: false,
      label: "Call me",
      // Replace 91XXXXXXXXXX with the full international number (no + / spaces).
      href: "https://wa.me/91XXXXXXXXXX",
    } as ContactAction,
    secondary: {
      enabled: false,
      label: "Just text me",
      href: "https://wa.me/91XXXXXXXXXX?text=I%20found%20it%20%F0%9F%A4%8D",
    } as ContactAction,
  },
} as const;

export type SuriConfig = typeof suriConfig;
