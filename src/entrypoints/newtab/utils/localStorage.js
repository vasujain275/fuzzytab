import { fetchBookmarks } from "./bookmarks";
import { storage } from "wxt/storage";
import { bookmarksArray } from "./store";

async function setBookmarks() {
  const bookmarks = await fetchBookmarks();
  await storage.setItem("local:bookmarksTree", bookmarks);
  bookmarksArray.set(bookmarks);
}

export { setBookmarks };
