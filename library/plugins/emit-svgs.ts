import fs from 'node:fs'
import path from 'node:path'
import { Plugin } from 'vite'

const IMPORT_SUFFIX = '.svg?url'
const SRC_FOLDER = path.resolve(__dirname, '../src')

// This plugin ensures that SVGs imported as URL actually end up in our build /
// NPM package. Vite currently does not do that automatically, see
// https://github.com/vitejs/vite/issues/3295
// https://github.com/vitejs/vite/issues/4454
//
// For safety reasons, since in practice we might or might not want to use
// vite-svg-loader to inline some other SVGs, we only consider SVGs here that
// are imported with a ?url suffix (i.e. `import MySVG from
// 'path/to/my.svg?url';`).
export function emitSVGsImportedWithUrlParam(): Plugin {
  return {
    name: 'emit-svgs',
    apply: 'build',
    enforce: 'pre', // Make sure our plugin gets executed before Vite's built-in plugins
    resolveId(source, importer) {
      if (!source.endsWith(IMPORT_SUFFIX)) {
        return null
      }

      if (!importer) {
        throw new Error("We don't expect this to happen")
      }

      // Absolute path to imported file
      const filePath = path.resolve(path.dirname(importer), source.replace('?url', ''))

      const fileContent = fs.readFileSync(filePath, 'utf-8')

      this.emitFile({
        type: 'asset',
        // Set fileName in such a way that the imported file gets emitted
        // exactly where it was in the source tree, i.e. preserve the original
        // directory structure.
        fileName: path.relative(SRC_FOLDER, filePath),
        source: fileContent
      })

      return {
        // The path that should be written in the import statement in the
        // `importer` file. We re-append ?url here, so that the downstream
        // consumer (who is assumed to use Vite and possibly vite-svg-loader and
        // might or might not set Vite's assetsInlineLimit option) will
        // hopefully *never* inline the SVG during build time. This is crucial
        // because MyComponent depends on its SVG being imported as URL instead
        // of being inlined.
        id: `${filePath}?url`,
        // Rollup will automatically translate the absolute path `filePath`
        // to a relative path (relative to the importer)

        external: true
      }
    }
  }
}
