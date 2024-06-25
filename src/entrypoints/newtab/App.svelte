<script lang="ts">
  import { onMount } from "svelte";
  import { urls, errorMessage, fetchBookmarks } from "./bookmarks";

  onMount(() => {
    fetchBookmarks();
  });
</script>

<main>
  <h1 class="text-sky-500">Hello</h1>
  {#if $errorMessage}
    <p class="text-red-500">{$errorMessage}</p>
  {:else}
    <ul>
      {#each $urls as bookmark}
        <li>{bookmark.title}</li>
      {/each}
    </ul>
  {/if}
</main>
