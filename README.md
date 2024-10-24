An example project to demonstrate how to export SVGs (and components using those
SVGs) as part of a Vue component library, *without inlining them*.

### Key ingredients:
- In `/library`:
  - Import SVG using `?url` (see https://vite.dev/guide/assets)
  - Add a custom Vite plugin to `vite.config.ts` which ensures SVGs are emitted
    separately and don't get inlined. Workaround for
    - https://github.com/vitejs/vite/issues/3295
    - https://github.com/vitejs/vite/issues/4454
- In `/consumer`:
  - Disable asset inlining for SVGs in `vite.config.ts`. Workaround for
    https://github.com/vitejs/vite/issues/18034 .


### Setup
- Run `pnpm i` in `/library`.
- Run `pnpm build` inside `/library` to generate the JS bundle.
- Run `pnpm i` in `/consumer`.
- Run `pnpm run dev` in `/consumer` to start the dev server with the demo.
