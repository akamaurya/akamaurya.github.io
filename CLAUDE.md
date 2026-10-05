# Personal website

Static site for Chander Maurya Kumbkarni. Astro, plain CSS, GSAP for two scroll scenes. Hosted on GitHub Pages.

## Rules
- This repo is public. Commit only site code and published content.
- The build plan and all source material live outside this repo. Never copy them in.
- Never invent content. Every fact and number comes from the plan's source files.
- No em dashes in any published text.
- Run `npm run check` before every commit. It must pass.
- No new dependencies without asking.
- Motion is progressive enhancement. Every page must read fully with JavaScript off and with reduced motion on.
- Mark deliberate simplifications with a `ponytail:` comment naming the ceiling and the upgrade path.

## Commands
- `npm run dev`: local server
- `npm run build`: static build to `dist/`
- `npm run check`: build plus content and link checks

## Structure
See the directory tree in the plan. Pages in `src/pages`, decisions in `src/data/decisions.ts`, writing in `src/content/writing`.
