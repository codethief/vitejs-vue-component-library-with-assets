An example project to demonstrate how to export SVGs (and components using those
SVGs) as part of a Vue component library, *without inlining them*.

### Project structure
- `/library`: Vue component library exposing a component which imports an SVG.
- `/consumer`: Vue/Vite frontend project that uses `/library`
- `/astro-consumer`: Astro/Vite/Vue frontend project that uses `/library`


### Setup
- Run `pnpm i` in `/library`.
- Run `pnpm build` inside `/library` to generate the JS bundle.
- In `/consumer` and `/astro-consumer`:
  - Run `pnpm i` to install `../library` as dependency. (This will create a
    symlink in `node_modules`, i.e. it's effectively an `pnpm link`.)
  - Run `pnpm run dev` to start the dev server with the demo.


### Key ingredients to get SVGs to work:
- In `/library`:
  - Import SVG using `?url` (see https://vite.dev/guide/assets)
  - Add a custom Vite plugin to `vite.config.ts` which ensures SVGs are emitted
    separately and don't get inlined. Workaround for
    - https://github.com/vitejs/vite/issues/3295
    - https://github.com/vitejs/vite/issues/4454
- In `/consumer`:
  - Disable asset inlining for SVGs in `vite.config.ts`. Workaround for
    https://github.com/vitejs/vite/issues/18034 .
    - Interesting, in `astro-consumer` (and its `astro.config.ts`) these changes
      don't seem to be necessary and the Astro dev server doesn't seem to inline
      the SVG by default(?)


### Caveat in `/astro-consumer`:
If you install `/library` not via `pnpm link` (see above) but from a tarball (run `pnpm pack` in `/library` to obtain the tarball, then do `pnpm i <tarball>` inside `/astro-consumer`), then `astro dev` and `astro build` will fail to load the SVG:

```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".svg" for […]/vitejs-vue-component-library-with-assets/astro-consumer/node_modules/.pnpm/my-library@file+..+library+my-library-0.0.0.tgz_typescript@5.6.3/node_modules/my-library/dist/assets/logo.svg
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:160:9)
    at defaultGetFormat (node:internal/modules/esm/get_format:203:36)
    at defaultLoad (node:internal/modules/esm/load:143:22)
    at async ModuleLoader.load (node:internal/modules/esm/loader:396:7)
    at async ModuleLoader.moduleProvider (node:internal/modules/esm/loader:278:45)
```
