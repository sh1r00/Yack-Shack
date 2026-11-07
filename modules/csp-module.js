import { defineNuxtModule } from '@nuxt/kit'
import { nanoid } from "nanoid"

export default defineNuxtModule({
  setup(options, nuxt) {
    // Set nuxt CSP options.
    console.log('starting csp-module options: ', options)
    //options.render.csp = {
    //  reportOnly: true,
    //  hashAlgorithm: 'sha256',
    //}
  //
    nuxt.hook(
      'render:response',
      (result, { nuxt: nuxtContext }) => {
        console.log('starting csp-module page', result)
        if (nuxtContext.state != null) {
          // Generate nonce
          const nonce = nuxt.runtimeConfig.public.NONCE;
          console.log('setting nonce on scripts: ', nonce)
          // Add nonce to cspScriptSrcHashes. Nuxt will populate all entries in this array
          // to the csp header and meta tags as part of the script-src csp policy.
          // result.cspScriptSrcHashes.push(`'nonce-${nonce}'`)
          // result.cspScriptSrcHashes.push(`'strict-dynamic'`)
  
          // Add the nonce to all script tags and <link as="script" tags
          result.html = result.html.replace(/<script/g, `<script nonce="${nonce}"`)
            .replace(/as="script">/g, `nonce="${nonce}" as="script">`);
        }
      }
    )
  }
})