import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["bookmarks", "tabs", "storage"],
    browser_specific_settings: {
      gecko: {
        id: "fuzzytab@vasujain.me",
      },
    },
  },
  srcDir: "src",
  modules: ["@wxt-dev/module-svelte"],
});
