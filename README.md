# Project SURI: Pieces of Us

An interactive 20th-birthday story for MADIREDDY SAI SUSRITHA, made by Raja. The current UI includes a responsive opening, story chapters, the existing memory gallery, Raja's side, a photo-heart preview, a tappable cake, and a soft ending with a slot for Raja's voice message. It is designed for phones, tablets, and desktops.

The hero, childhood, together, Raja, gallery, final mosaic, and voice assets are **placeholders until Raja chooses and approves them**. Configure the smaller media slots in `src/config/suri.config.ts`. Keep gallery entries in that central file and render them through `MemoryGallery`.

Do not commit raw Telegram exports, unreviewed photos, private chat text, or analytics source data. This repository is public. `noindex,nofollow` discourages search indexing; it is **not** access control. Publish only approved photos and aggregate analytics.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://project-suri-pieces.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c468bb8d-7faf-4c01-b213-c08130a9f9b1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
