import { writable } from "svelte/store";

const searchQuery = writable("");
const bangQuery = writable("");
const bangUrl = writable("");
const filteredBookmarks = writable([]);
const selectedBookmarkIndex = writable(-1);
const bookmarksArray = writable([]);
const errorMessage = writable(null);

export {
  searchQuery,
  filteredBookmarks,
  selectedBookmarkIndex,
  bookmarksArray,
  errorMessage,
  bangUrl,
  bangQuery,
};
