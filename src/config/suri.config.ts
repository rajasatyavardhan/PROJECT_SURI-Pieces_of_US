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

import extraGallery from "./gallery.generated.json";

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
    /** Browser tab / share title. noindex/nofollow does not make a public URL private. */
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
      { number: "01", title: "The little girl who became you", body: "From childhood to the person I am so proud of today.", mediaLabel: "Susritha in her younger-years portrait chosen by Raja", imageSrc: "/media/childhood.webp", ready: true },
      { number: "02", title: "Every version of Suri", body: "The soft, the playful, the determined — all of you belongs here.", mediaLabel: "Susritha dressed for a celebration", imageSrc: "/media/memories/memory-05.webp", ready: true },
      { number: "03", title: "And then, us", body: "Small moments became our favourite story.", mediaLabel: "Susritha and Raja together", imageSrc: "/media/us-together.jpg", ready: true },
    ],
    piecesTitle: "Pieces of us",
    piecesBody: "A few of the moments I keep coming back to.",
    hisTitle: "From my side of the story",
    hisBody: "Somewhere in all these memories, there is me — looking up at a sky full of us.",
    skyTitle: "Look up, Suri",
    skyBody: "Our little photos light up the sky and find their way into a heart.",
    cakeTitle: "One birthday wish, just for you",
    endingTitle: "Happy 20th birthday, my bujji bangaru maradhala Susritha Bujjodaa.",
  },

  /** Aggregate-only snapshot of one private Telegram chat export. No messages,
   * names, media paths, or visitor tracking are sent to the website.
   * Refresh these numbers only after processing a newer export privately.
   */
  mbbs: {
    title: "Your white-coat chapter",
    note: "Future doctor gaaru, one small diagnosis: Baava misses you.",
    imageSrc: "/media/memories/extra-03.webp",
    imageAlt: "Susritha in a white coat beside her professor, selected by Raja",
    caption: "Learning, growing, and becoming the doctor you dream of being.",
    videos: [] as { src: string; poster: string; title: string }[],
  },

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
    note: "A quiet moment before the sky lights up.",
  },

  media: {
    hero: {
      src: "/media/suri-hero.jpg",
      alt: "Susritha in her chosen birthday portrait",
      ready: true,
    },
    photo: {
      /** The approved Raja portrait is stored at public/media/suri-photo.webp. */
      src: "/media/memories/memory-09.webp",
      alt: "Raja looking out toward a waterfall",
      caption: "Me, looking up at a sky full of us.",
      /** Set to true once you've actually added the file. */
      ready: true,
      placeholder: "Photo goes here — add public/media/suri-photo.webp",
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

  /** Only user-reviewed and visually checked selections are published here.
   * The private role model suggests candidates but never enables an image by itself.
   */
  memories: [
    ...extraGallery,
    { id: "memory-01", imageSrc: "/media/memories/memory-01.webp", alt: "Susritha in lilac beside a palm tree", title: "A little lilac moment", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Suri"], ready: true },
    { id: "memory-02", imageSrc: "/media/memories/memory-02.webp", alt: "Susritha reflected in a rain-speckled car mirror", title: "The way you see the world", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Suri"], ready: true },
    { id: "memory-03", imageSrc: "/media/memories/memory-03.webp", alt: "Susritha smiling in a red floral outfit", title: "That smile", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Suri"], ready: true },
    { id: "memory-04", imageSrc: "/media/memories/memory-04.jpg", alt: "Susritha in a red celebration outfit", title: "Every version of you", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Suri"], ready: true },
    { id: "memory-05", imageSrc: "/media/memories/memory-05.webp", alt: "Susritha dressed for a celebration", title: "A celebration in colour", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Suri"], ready: true },
    { id: "memory-06", imageSrc: "/media/memories/memory-06.jpg", alt: "Susritha and Raja standing together", title: "One of my favourite us pictures", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Us"], ready: true },
    { id: "memory-07", imageSrc: "/media/memories/memory-07.jpg", alt: "A phone-screen photo of Susritha and Raja together with a birthday cake", title: "A cake, and us", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Us"], ready: true },
    { id: "memory-08", imageSrc: "/media/memories/memory-08.webp", alt: "Raja smiling beside the falls", title: "From my side of the story", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Raja"], ready: true },
    { id: "memory-09", imageSrc: "/media/memories/memory-09.webp", alt: "Raja looking out toward a waterfall", title: "Looking up at our sky", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Raja"], ready: true },
    { id: "memory-10", imageSrc: "/media/memories/memory-10.webp", alt: "Susritha with family at a celebration", title: "The people around you", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Family"], ready: true },
  ].filter(memory => !memory.tags.includes("Raja") && !["extra-02", "extra-03", "memory-04", "memory-05", "memory-06", "memory-08", "memory-09"].includes(memory.id)) as SuriMemory[],

  /** Approved images excluded from the main story but allowed in the photo sky.
   * Populate this with web-ready assets only; never commit review IDs, chat text,
   * private Drive paths, or the raw Telegram export to this public repository.
   */
  mosaicOnlyMemories: [
    { id: "mosaic-red-pose", imageSrc: "/media/memories/mosaic-red-pose.webp", alt: "Another pose of Susritha in red", title: "Another little piece", dateLabel: "", locationLabel: "", shortCaption: "", tags: ["Mosaic"], ready: true },
  ] as SuriMemory[],

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
      "Happy birthday, Sai Susritha—our future doctor, and Susritha Vardhan (hehe). Every piece of this was made with love, and every tomorrow is another piece we get to make together.",
    mosaicTiles: 24,
    /** How many tiles are already "filled" (this site). */
    mosaicFilled: 5,
    mosaicCaption: "unrevealed",
    footer: "Made for you, with all my love. — T. Raja Satya Vardhan Reddy",
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
