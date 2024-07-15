<script>
  import { onMount } from "svelte";
  import validUrl from "valid-url";
  import SettingsIcon from "../../../assets/settings.svg";
  import { fetchBookmarks, updateFilteredBookmarks } from "../utils/bookmarks";
  import { makeBrowsableURL } from "../utils/urls";
  import {
    bookmarksArray,
    errorMessage,
    searchQuery,
    filteredBookmarks,
    selectedBookmarkIndex,
    bangUrl,
  } from "../utils/store";
  import { navigate } from "svelte-routing";

  let inputElement;

  onMount(async () => {
    inputElement.focus();
    fetchBookmarks();

    bookmarksArray.subscribe((bookmarks) => {
      updateFilteredBookmarks(bookmarks, $searchQuery);
    });
    searchQuery.subscribe((query) => {
      updateFilteredBookmarks($bookmarksArray, query);
    });
  });

  const openSettings = () => {
    navigate("/settings");
  };

  const openLink = (event) => {
    const bookmark = $filteredBookmarks[$selectedBookmarkIndex];
    if (event.key === "Enter") {
      handleBookmarkOpen(bookmark);
    } else if (event.key === "ArrowDown") {
      selectedBookmarkIndex.update((n) => (n + 1) % $filteredBookmarks.length);
    } else if (event.key === "ArrowUp") {
      selectedBookmarkIndex.update(
        (n) => (n - 1 + $filteredBookmarks.length) % $filteredBookmarks.length
      );
    }
  };

  const handleBookmarkOpen = (bookmark) => {
    if (bookmark?.isSearchable) {
      $bangUrl = bookmark.url;
      navigate("/bang-search");
    } else if (!$filteredBookmarks.length) {
      if (validUrl.isUri($searchQuery)) {
        window.location.href = makeBrowsableURL($searchQuery);
      } else {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent($searchQuery)}`;
      }
    } else if (
      $selectedBookmarkIndex >= 0 &&
      $selectedBookmarkIndex < $filteredBookmarks.length
    ) {
      const url = bookmark.url;
      window.location.href = url;
    }
  };

  const handleBookmarkClick = (bookmark, index) => {
    selectedBookmarkIndex.set(index);
    handleBookmarkOpen(bookmark);
  };
</script>

<main class="p-6 w-full h-full grid grid-rows-12">
  <div class="row-span-2">
    <div class="w-full h-9 grid grid-cols-12 text-white">
      <!-- Settings Icon -->
      <div class="col-span-1 p-4 flex justify-center items-center">
        <button class="focus:outline-none relative" on:click={openSettings}>
          <img
            src={SettingsIcon}
            alt="Settings"
            class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
          />
        </button>
      </div>
      <!-- Search Input -->
      <div class="col-span-10 flex items-center">
        <input
          type="text"
          placeholder="Search bookmarks"
          class="w-full h-full bg-zinc-500 text-white px-4 py-1 rounded-md text-lg focus:outline-none"
          on:keydown={openLink}
          bind:value={$searchQuery}
          bind:this={inputElement}
          id="inputElement"
        />
      </div>
      <!-- Count Display -->
      <div class="col-span-1 flex justify-center items-center">
        <h1 class="text-xs sm:text-sm md:text-base lg:text-lg">0</h1>
      </div>
    </div>
  </div>
  <!-- Bookmarks List -->
  <div class="row-span-10 overflow-y-auto">
    {#if $errorMessage}
      <p class="text-red-500">{$errorMessage}</p>
    {:else}
      <ul class="space-y-2">
        {#each $filteredBookmarks as bookmark, index (bookmark.id)}
          <li
            class="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-lg {index ===
            $selectedBookmarkIndex
              ? 'bg-gray-700'
              : ''}"
            on:click={() => handleBookmarkClick(bookmark, index)}
          >
            <!-- Initial Character Circle -->
            <div
              class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center"
            >
              <span class="text-sm text-black">{bookmark.title[0]}</span>
            </div>
            <!-- Bookmark Title -->
            <div>
              <h2 class="text-lg font-semibold text-white">{bookmark.title}</h2>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</main>
