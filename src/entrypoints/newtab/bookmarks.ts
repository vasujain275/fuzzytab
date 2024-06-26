import { writable } from "svelte/store";
import { browser } from "wxt/browser";

type BookmarkType = {
  id: string;
  title: string;
  index: number;
  dateAdded: number;
  type: "bookmark";
  url: string;
  parentId: string;
};

export const bookmarksArray = writable<BookmarkType[]>([]);
export const errorMessage = writable<string | null>(null);

async function fetchBookmarks() {
  try {
    const bookmarks = await browser.bookmarks.getTree();
    const bookmarksWithUrls: any[] | undefined = extractBookmarksWithUrl(
      bookmarks[0].children,
    );
    bookmarksArray.set(bookmarksWithUrls);
    console.log(bookmarksWithUrls);
  } catch (error: any) {
    errorMessage.set(`Failed to fetch bookmarks: ${error.message}`);
    console.error(errorMessage, error);
  }
}

function extractBookmarksWithUrl(
  bookmarkNode: any[] | undefined,
): BookmarkType[] {
  const bookmarksWithUrl: BookmarkType[] = [];

  function recurse(node: any) {
    if (node.url) {
      bookmarksWithUrl.push(node as BookmarkType);
    }
    if (node.children) {
      node.children.forEach(recurse);
    }
  }

  if (bookmarkNode) {
    bookmarkNode.forEach(recurse);
    return bookmarksWithUrl;
  } else {
    return [];
  }
}

export { fetchBookmarks };
