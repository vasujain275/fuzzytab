<script>
  import { browser } from "wxt/browser";
  import { Router, Route } from "svelte-routing";
  import SearchCard from "./lib/SearchCard.svelte";
  import Settings from "./lib/Settings.svelte";
  import BangSearch from "./lib/BangSearch.svelte";
  import { onMount } from "svelte";

  if (location.search !== "?x") {
    location.search = "?x";
    throw new Error(); // load everything on the next page;
    // stop execution on this page
  }
  let tab;
  const focusTab = async () => {
    [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    //console.log(tab);
  };

  const colorScheme = {
    base00: '#191724', // Base
    base01: '#1f1d2e', // Surface
    base02: '#26233a', // Overlay
    base03: '#6e6a86', // Muted
    base04: '#908caa', // Subtle
    base05: '#e0def4', // Text
    base06: '#e0def4', // Highlight
    base07: '#524f67', // Highlight High
    base08: '#eb6f92', // Love
    base09: '#f6c177', // Gold
    base0A: '#ebbcba', // Rose
    base0B: '#31748f', // Pine
    base0C: '#9ccfd8', // Foam
    base0D: '#c4a7e7', // Iris
    base0E: '#f6c177', // Gold (reused)
    base0F: '#524f67', // Highlight High (reused)
  };

  onMount(async () => {
    await focusTab();
    Object.entries(colorScheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  });
</script>

<div class="flex justify-center items-center h-screen w-screen bg-[var(--color-base00)]">
  <div class="w-2/5 h-3/4 bg-[var(--color-base01)] text-[var(--color-base05)] rounded-lg shadow-xl overflow-hidden">
    <Router>
      <Route path="/*" component={SearchCard} />
      <Route path="/search-card" component={SearchCard} />
      <Route path="/bang-search" component={BangSearch} />
      <Route path="/settings" component={Settings} />
    </Router>
  </div>
</div>

<style>
  :global(body) {
    background-color: var(--color-base00);
    color: var(--color-base05);
  }
</style>
