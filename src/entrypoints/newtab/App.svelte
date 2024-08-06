<script>
  import { browser } from "wxt/browser";
  import { Router, Route } from "svelte-routing";
  import SearchCard from "./lib/SearchCard.svelte";
  import Settings from "./lib/Settings.svelte";
  import BangSearch from "./lib/BangSearch.svelte";
  import { onMount } from "svelte";
  import * as colors from "./utils/colors";

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

  onMount(async () => {
    await focusTab();
    console.log(colors);
    Object.entries(colors["rosePineMoon"]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  });
</script>

<div
  class="flex justify-center items-center h-screen w-screen bg-[var(--color-base00)]"
>
  <div
    class="w-2/5 h-3/4 bg-[var(--color-base01)] text-[var(--color-base05)] rounded-lg shadow-xl overflow-hidden"
  >
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
