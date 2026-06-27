import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

import { createMdxPlugin } from './mdx.config'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    createMdxPlugin(),
    nitro(),
    tailwindcss(),
    tanstackStart(),
    viteReact({ include: /\.(?:js|jsx|mdx|ts|tsx)$/ }),
  ],
})
