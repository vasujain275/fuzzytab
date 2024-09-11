import { writable } from "svelte/store";
import { storage } from "wxt/storage";

const searchQuery = writable("");
const bangQuery = writable("");
const bangUrl = writable("");
const filteredBookmarks = writable([]);
const selectedBookmarkIndex = writable(-1);
const bookmarksArray = writable([]);
const errorMessage = writable(null);
const currentTheme = writable("rosePineMoon"); // Default theme

const bookmarksTreeStorage = storage.defineItem("local:bookmarksTreeStorage", {
  fallback: {},
});

export {
  searchQuery,
  filteredBookmarks,
  selectedBookmarkIndex,
  bookmarksArray,
  errorMessage,
  bangUrl,
  bangQuery,
  currentTheme,
  bookmarksTreeStorage,
};
