<script>
  import { Router, Route } from "svelte-routing";
  import SearchCard from "./lib/SearchCard.svelte";
  import Settings from "./lib/Settings.svelte";
  import BangSearch from "./lib/BangSearch.svelte";
  import { onMount } from "svelte";
  import { currentTheme } from "./utils/store";

  if (location.search !== "?x") {
    location.search = "?x";
  }

  onMount(async () => {
    currentTheme.subscribe((theme) => {
      console.log(theme);
      Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value);
      });
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
      <Route path="/*">
        <SearchCard />
      </Route>
      <Route path="/search-card">
        <SearchCard />
      </Route>
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
