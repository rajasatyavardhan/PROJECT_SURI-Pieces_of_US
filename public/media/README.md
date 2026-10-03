# Media for Project SURI

After Raja approves each image, put the selected files in this folder and flip
the matching `ready: true` flag in `src/config/suri.config.ts`. Do not copy the
raw Telegram export or the unreviewed 556-photo library into this public repo.

| What            | File to add here        | Config field    |
| --------------- | ----------------------- | --------------- |
| Hero portrait   | `suri-hero.jpg`         | `media.hero`    |
| Childhood photo | `childhood.jpg`         | `birthday.chapters[0]` |
| Suri now        | `suri-now.jpg`          | `birthday.chapters[1]` |
| Together photo  | `us-together.jpg`       | `birthday.chapters[2]` |
| Raja photo      | `suri-photo.jpg`        | `media.photo`   |
| Final voice     | `suri-voice.m4a`        | `media.voice`   |

Notes:

- Any web format works — `.jpg`, `.png`, `.webp` for the photo; `.mp3`, `.m4a`,
  `.wav` for the audio. If you use a different filename or extension, update
  `src` in the config accordingly.
- Portrait photos look best (the frame is 4:5).
- Until `ready` is `true`, the site shows a designed placeholder — nothing breaks.
- `noindex,nofollow` is not a privacy barrier. An approved file published here
  can be viewed by anyone who has its URL.
