<script>
  import { Router, Route } from "svelte-routing";
  import SearchCard from "./lib/SearchCard.svelte";
  import Settings from "./lib/Settings.svelte";
  import BangSearch from "./lib/BangSearch.svelte";
  import { onMount } from "svelte";
  import { applyTheme } from "./utils/misc";
  import { currentTheme } from "./utils/store";

  let searchInput;

  if (location.search !== "?x") {
    location.search = "?x";
  }

  const focusSearchInput = () => {
    if (searchInput) {
      searchInput.focus();
    }
  };

  onMount(async () => {
    focusSearchInput();
    applyTheme(currentTheme);
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
        <SearchCard bind:searchInput />
      </Route>
      <Route path="/search-card">
        <SearchCard bind:searchInput />
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
