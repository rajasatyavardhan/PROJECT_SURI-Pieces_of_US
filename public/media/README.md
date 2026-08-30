# Media for Project SURI

Drop two files in this folder, then flip the matching `ready: true` flag in
`src/config/suri.config.ts` (under `media`).

| What            | File to add here        | Config field    |
| --------------- | ----------------------- | --------------- |
| One photo       | `suri-photo.jpg`        | `media.photo`   |
| One voice note  | `suri-voice.m4a`        | `media.voice`   |

Notes:

- Any web format works — `.jpg`, `.png`, `.webp` for the photo; `.mp3`, `.m4a`,
  `.wav` for the audio. If you use a different filename or extension, update
  `src`ac in the config accordingly.
- Portrait photos look best (the frame is 4:5).
- Until `ready` is `true`, the site shows a designed placeholder — nothing breaks.
- No files here are tracked by any analytics; the site is `noindex,nofollow`.
