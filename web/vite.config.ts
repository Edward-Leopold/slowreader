import { nodeResolve } from '@rollup/plugin-node-resolve'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  build: {
    assetsInlineLimit: 0
  },
  plugins: [
    svelte(),
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    {
      enforce: 'pre' as const,
      // Deploy section.
      name: 'html-transform',
      // Changing the favicon depending on the environment mode
      transformIndexHtml: (html: string) => {
        return html.replace(
          '/main/icon.svg',
          process.env.NODE_ENV === 'development' || process.env.STAGING
            ? '/main/campfire.svg'
            : '/main/icon.svg'
        )
      }
    }
  ]
}))
