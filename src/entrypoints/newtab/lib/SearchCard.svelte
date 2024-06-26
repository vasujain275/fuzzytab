<script lang="ts">
  import { onMount } from "svelte";
  import SearchIcon from "../../../assets/settings.svg";
  import { bookmarksArray, errorMessage, fetchBookmarks } from "../bookmarks";
  onMount(() => {
    fetchBookmarks();
  });
</script>

<main class="p-6 w-full h-full grid grid-rows-12">
  <div class="row-span-2">
    <div class="w-full h-9 grid grid-cols-12 text-white">
      <div class="col-span-1 p-4 flex justify-center items-center">
        <img src={SearchIcon} alt="search" />
      </div>
      <div class="col-span-10 bg-zinc-500"></div>
      <div class="col-span-1 flex justify-center items-center">
        <h1>0</h1>
      </div>
    </div>
  </div>
  <div class="row-span-10">
    {#if $errorMessage}
      <p class="text-red-500">{$errorMessage}</p>
    {:else}
      <ul>
        {#each $bookmarksArray as bookmark}
          <li>{bookmark.title}</li>
        {/each}
      </ul>
    {/if}
  </div>
</main>
