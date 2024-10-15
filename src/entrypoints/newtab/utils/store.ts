import { Writable, writable } from "svelte/store";
import { storage } from "wxt/storage";
import { EnhancedBookmarkLink } from "./bookmarks";
import { Theme } from "./colors";

const searchQuery: Writable<string> = writable("");
const bangQuery: Writable<string> = writable("");
const bangUrl: Writable<string> = writable("");
const filteredBookmarks: Writable<EnhancedBookmarkLink[]> = writable([]);
const selectedBookmarkIndex: Writable<number> = writable(-1);
const bookmarksArray: Writable<EnhancedBookmarkLink[]> = writable([]);
const errorMessage: Writable<string | null> = writable(null);
const currentTheme: Writable<Theme> = writable(Theme.RosePineMoon);

const bookmarksTreeStorage = storage.defineItem("local:bookmarksTreeStorage");

const currentThemeStorage = storage.defineItem("local:currentThemeStorage");

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
  currentThemeStorage,
};
