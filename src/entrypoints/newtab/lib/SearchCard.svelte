<script>
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import SettingsIcon from "../../../assets/settings.svg";
  import { bookmarksArray, errorMessage, fetchBookmarks } from "../bookmarks";
  //import { browser } from "wxt/browser";

  const searchQuery = writable("");
  const filteredBookmarks = writable([]);
  const selectedBookmarkIndex = writable(-1);
  let inputElement;
  //let tab;

  onMount(async () => {
    //[tab] = await browser.tabs.query({ active: true, currentWindow: true });
    //console.log(tab);

    inputElement.focus();

    fetchBookmarks();
    bookmarksArray.subscribe((bookmarks) => {
      updateFilteredBookmarks(bookmarks, $searchQuery);
    });
    searchQuery.subscribe((query) => {
      updateFilteredBookmarks($bookmarksArray, query);
    });
  });

  function updateFilteredBookmarks(bookmarks, query) {
    if (query.trim() === "") {
      filteredBookmarks.set(bookmarks);
      selectedBookmarkIndex.set(-1);
      return;
    }

    const fuse = new Fuse(bookmarks, {
      keys: [
        {
          name: "title",
          weight: 3,
        },
        {
          name: "url",
          weight: 0.3,
        },
        {
          name: "alias",
          weight: 5,
        },
      ],
      threshold: 0.3,
    });

    const result = fuse.search(query).map((result) => result.item);
    filteredBookmarks.set(result);

    // Select the top index if there are results
    if (result.length > 0) {
      selectedBookmarkIndex.set(0);
    } else {
      selectedBookmarkIndex.set(-1);
    }
  }

  const openLink = (event) => {
    if (event.key === "Enter") {
      if (!$filteredBookmarks.length) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent($searchQuery)}`;
      } else if ($selectedBookmarkIndex >= 0 && $selectedBookmarkIndex < $filteredBookmarks.length) {
        const url = $filteredBookmarks[$selectedBookmarkIndex].url;
        window.location.href = url;
      }
    } else if (event.key === "ArrowDown") {
      selectedBookmarkIndex.update(n => (n + 1) % $filteredBookmarks.length);
    } else if (event.key === "ArrowUp") {
      selectedBookmarkIndex.update(n => (n - 1 + $filteredBookmarks.length) % $filteredBookmarks.length);
    }
  };
</script>

<main class="p-6 w-full h-full grid grid-rows-12">
  <div class="row-span-2">
    <div class="w-full h-9 grid grid-cols-12 text-white">
      <div class="col-span-1 p-4 flex justify-center items-center sm:col-span-1 md:col-span-1 lg:col-span-1">
        <img src={SettingsIcon} alt="search" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6" />
      </div>
      <div class="col-span-10 flex items-center">
        <input
          type="text"
          placeholder="Search bookmarks"
          class="w-full h-full bg-zinc-500 text-white px-4 py-1 rounded-md"
          on:keydown={openLink}
          bind:value={$searchQuery}
          bind:this={inputElement}
          id="inputElement"
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
        {#each $filteredBookmarks as bookmark, index (bookmark.id)}
          <li class="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg {index === $selectedBookmarkIndex ? 'bg-gray-700' : ''}">
            <div class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <span class="text-sm text-black">{bookmark.title[0]}</span>
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

<style>
  .selected {
    background-color: #4A5568;
  }
</style>
