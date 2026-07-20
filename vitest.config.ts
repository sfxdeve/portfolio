import viteReact from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

import { createMdxPlugin } from "./mdx.config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [createMdxPlugin(), viteReact({ include: /\.(?:js|jsx|mdx|ts|tsx)$/ })],
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
});
