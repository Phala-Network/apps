import adapter from '@sveltejs/adapter-vercel'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      '~': path.resolve('./src'),
    },
  },
}

export default config
