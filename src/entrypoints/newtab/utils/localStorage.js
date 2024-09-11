import { fetchBookmarks } from "./bookmarks";
import { bookmarksArray, bookmarksTreeStorage } from "./store";

async function setBookmarks() {
  const bookmarks = await fetchBookmarks();
  bookmarksArray.set(bookmarks);
  console.log(bookmarksArray);
  await bookmarksTreeStorage.setValue(bookmarks);
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
