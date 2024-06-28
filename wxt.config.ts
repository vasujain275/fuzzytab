import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["bookmarks", "storage", "tabs", "menus", "browserSettings"],
  },
  srcDir: "src",
  modules: ["@wxt-dev/module-svelte"],
});
