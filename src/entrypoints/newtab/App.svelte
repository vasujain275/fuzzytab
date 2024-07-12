<script>
if (location.search !== "?x") {
  location.search = "?x";
  throw new Error(); // load everything on the next page;
  // stop execution on this page
}
import SearchCard from "./lib/SearchCard.svelte";
</script>

<div class="flex justify-center items-center h-screen w-screen">
  <div class="w-2/5 h-3/4 bg-sec text-white rounded-lg shadow-xl">
    <SearchCard />
  </div>
</div>
