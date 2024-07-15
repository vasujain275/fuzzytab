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

  onMount(async () => {
    await focusTab();
  });
</script>

<div class="flex justify-center items-center h-screen w-screen">
  <div class="w-2/5 h-3/4 bg-sec text-white rounded-lg shadow-xl">
    <Router>
      <Route path="/*" component={SearchCard} />
      <Route path="/search-card" component={SearchCard} />
      <Route path="/bang-search" component={BangSearch} />
      <Route path="/settings" component={Settings} />
    </Router>
  </div>
</div>
