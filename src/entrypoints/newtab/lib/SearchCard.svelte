<script>
  import { storage } from "wxt/storage";
  import { onDestroy, onMount } from "svelte";
  import validUrl from "valid-url";
  import SettingsIcon from "../../../assets/settings.svg";
  import { updateFilteredBookmarks, fetchBookmarks } from "../utils/bookmarks";
  import { setBookmarks, updateCountById } from "../utils/localStorage";
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
    const bookmarksTree = await storage.getItem("local:bookmarksTree");

    if (!bookmarksTree) {
      await setBookmarks();
    }
    const fetchedBookmarks = await fetchBookmarks();

    $bookmarksArray = await storage.getItem("local:bookmarksTree");
    $bookmarksArray.sort((a, b) => b.count - a.count);

    if (fetchedBookmarks.length !== $bookmarksArray.length) {
      const lengthDifference = fetchedBookmarks.length - $bookmarksArray.length;

      if (lengthDifference > 0) {
        const elementsToAdd = fetchedBookmarks.slice(-lengthDifference);
        $bookmarksArray.push(...elementsToAdd);
        await storage.setItem("local:bookmarksTree", $bookmarksArray);
      }
    }

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

  const openLink = async (event) => {
    const bookmark = $filteredBookmarks[$selectedBookmarkIndex];
    if (event.key === "Enter") {
      await handleBookmarkOpen(bookmark);
    } else if (event.key === "ArrowDown") {
      selectedBookmarkIndex.update((n) => (n + 1) % $filteredBookmarks.length);
    } else if (event.key === "ArrowUp") {
      selectedBookmarkIndex.update(
        (n) => (n - 1 + $filteredBookmarks.length) % $filteredBookmarks.length
      );
    }
  };

  const handleBookmarkOpen = async (bookmark) => {
    if (bookmark) {
      updateCountById(bookmark.id);
      await storage.setItem("local:bookmarksTree", $bookmarksArray);
    }
    if (bookmark?.isSearchable) {
      $bangUrl = bookmark.url;
      navigate("/bang-search");
    } else if (!$filteredBookmarks.length) {
      if (validUrl.isUri($searchQuery)) {
        window.location.href = makeBrowsableURL($searchQuery);
      } else {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent($searchQuery)}`;
      }
    } else {
      const url = bookmark.url;
      window.location.href = url;
    }
  };

  onDestroy(async () => {});

  const handleBookmarkClick = (bookmark, index) => {
    selectedBookmarkIndex.set(index);
    handleBookmarkOpen(bookmark);
  };
</script>

<main
  class="p-6 w-full h-full flex flex-col bg-[var(--color-base00)] text-[var(--color-base05)]"
>
  <div class="mb-6">
    <div class="w-full flex items-center space-x-4">
      <!-- Settings Icon -->
      <div class="flex items-center justify-center w-12 h-12">
        <button
          class="focus:outline-none relative p-2 hover:bg-[var(--color-base01)] rounded-full transition duration-300"
          on:click={openSettings}
        >
          <img
            src={SettingsIcon}
            alt="Settings"
            class="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer"
          />
        </button>
      </div>
      <!-- Search Input -->
      <div class="flex-grow">
        <input
          type="text"
          placeholder="Search bookmarks"
          class="w-full bg-[var(--color-base01)] text-[var(--color-base05)] px-6 py-3 rounded-full text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-base0B)]"
          on:keydown={openLink}
          bind:value={$searchQuery}
          bind:this={inputElement}
          id="inputElement"
        />
      </div>
      <!-- Count Display -->
      <div class="flex items-center justify-center w-12 h-12">
        <h1 class="text-base sm:text-lg font-semibold">{0}</h1>
      </div>
    </div>
  </div>
  <!-- Bookmarks List -->
  <div class="flex-grow overflow-y-auto scrollbar-hide">
    {#if $errorMessage}
      <p class="text-[var(--color-base08)] text-base sm:text-lg">
        {$errorMessage}
      </p>
    {:else}
      <ul class="space-y-4">
        {#each $filteredBookmarks as bookmark, index (bookmark.id)}
          <li
            class="flex items-center justify-between p-4 hover:bg-[var(--color-base01)] rounded-xl transition duration-300"
            class:bg-[var(--color-base02)]={index === $selectedBookmarkIndex}
            class:bg-[var(--color-base01)]={index !== $selectedBookmarkIndex}
            on:click={() => handleBookmarkClick(bookmark, index)}
          >
            <div class="flex items-center space-x-4">
              <!-- Initial Character Circle -->
              <div
                class="w-10 h-10 bg-[var(--color-base02)] rounded-full flex items-center justify-center flex-shrink-0"
              >
                <span class="text-lg sm:text-xl font-semibold"
                  >{bookmark.title[0]}</span
                >
              </div>
              <!-- Bookmark Title -->
              <div class="overflow-hidden">
                <h2 class="text-base sm:text-lg font-semibold truncate">
                  {bookmark.title}
                </h2>
              </div>
            </div>
            <!-- Bookmark Count -->
            <div
              class="text-[var(--color-base04)] text-base sm:text-lg font-semibold ml-4"
            >
              {bookmark.count}
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</main>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
