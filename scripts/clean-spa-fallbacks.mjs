// Cloudflare Pages SPA fallback uses `_redirects` (`/* /index.html 200`).
// Nuxt's generated 404.html + 200.html override that rule (deep links 404),
// so remove them from the static output before deploying to Cloudflare.
import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const out = join(dirname(fileURLToPath(import.meta.url)), '..', '.output', 'public')
for (const f of ['404.html', '200.html']) {
  rmSync(join(out, f), { force: true })
}
console.log('[clean-spa-fallbacks] removed 404.html + 200.html (Cloudflare SPA fix)')
