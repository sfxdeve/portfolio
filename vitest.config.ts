import { defineConfig } from 'vitest/config'

import { createMdxPlugin } from './mdx.config'

export default defineConfig({
  plugins: [createMdxPlugin()],
  resolve: { tsconfigPaths: true },
  test: {
    include: ['tests/**/*.test.ts'],
  },
})
