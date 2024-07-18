import { fetchBookmarks } from "./bookmarks";
import { storage } from "wxt/storage";
import { bookmarksArray } from "./store";

async function setBookmarks() {
  const bookmarks = await fetchBookmarks();
  await storage.setItem("local:bookmarksTree", bookmarks);
  bookmarksArray.set(bookmarks);
}

function updateCountById(id) {
  bookmarksArray.update((arr) => {
    return arr.map((obj) => {
      if (obj.id === id) {
        return { ...obj, count: obj.count + 1 };
      }
      return obj;
    });
  });
}

export { setBookmarks, updateCountById };
