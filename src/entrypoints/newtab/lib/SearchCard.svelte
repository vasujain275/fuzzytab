<script lang="ts">
import { onMount } from "svelte";
import SearchIcon from "../../../assets/settings.svg";
import {
  type BookmarkType,
  bookmarksArray,
  errorMessage,
  fetchBookmarks,
} from "../bookmarks";
import Fuse from "fuse.js";
import { type Writable, writable } from "svelte/store";

const searchQuery: Writable<string> = writable("");
const filteredBookmarks: Writable<BookmarkType[]> = writable([]);

onMount(() => {
  fetchBookmarks();
  bookmarksArray.subscribe((bookmarks: BookmarkType[]) => {
    updateFilteredBookmarks(bookmarks, $searchQuery);
  });
  searchQuery.subscribe((query: string) => {
    updateFilteredBookmarks($bookmarksArray, query);
  });
});

function updateFilteredBookmarks(
  bookmarks: BookmarkType[],
  query: string
): void {
  if (query.trim() === "") {
    filteredBookmarks.set(bookmarks);
    return;
  }

  const fuse = new Fuse(bookmarks, {
    keys: ["title", "url"],
    threshold: 0.7,
  });

  const result: BookmarkType[] = fuse
    .search(query)
    .map((result) => result.item);
  filteredBookmarks.set(result);
}
</script>

<main class="p-6 w-full h-full grid grid-rows-12">
  <div class="row-span-2">
    <div class="w-full h-9 grid grid-cols-12 text-white">
      <div class="col-span-1 p-4 flex justify-center items-center sm:col-span-1 md:col-span-1 lg:col-span-1">
        <img src={SearchIcon} alt="search" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6" />
      </div>
      <div class="col-span-10 flex items-center">
        <input
          type="text"
          placeholder="Search bookmarks"
          class="w-full h-full bg-zinc-500 text-white px-4 py-1 rounded-md"
          bind:value={$searchQuery}
        />
      </div>
      <div class="col-span-1 flex justify-center items-center sm:col-span-1 md:col-span-1 lg:col-span-1">
        <h1 class="text-xs sm:text-sm md:text-base lg:text-lg">0</h1>
      </div>
    </div>
  </div>
  <div class="row-span-10 overflow-y-auto">
    {#if $errorMessage}
      <p class="text-red-500">{$errorMessage}</p>
    {:else}
      <ul class="space-y-2">
        {#each $filteredBookmarks as bookmark (bookmark.id)}
          <li class="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg">
            <div class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <span class="text-sm">{bookmark.title[0]}</span>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-white">{bookmark.title}</h2>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</main>
