import { writable } from "svelte/store";
import { browser } from "wxt/browser";

export type FetchedBookmarkType = {
  id: string;
  title: string;
  index: number;
  dateAdded: number;
  type: "bookmark";
  url: string;
  parentId: string;
};

export type BookmarkType = {
  id: string;
  title: string;
  index: number;
  dateAdded: number;
  type: "bookmark";
  url: string;
  parentId: string;
  alias: string | undefined;
  isSearchable: boolean;
};

export const bookmarksArray = writable<FetchedBookmarkType[]>([]);
export const errorMessage = writable<string | null>(null);

async function fetchBookmarks() {
  try {
    const bookmarks = await browser.bookmarks.getTree();
    const bookmarksWithUrls: FetchedBookmarkType[] | undefined =
      extractBookmarksWithUrl(bookmarks[0].children);
    bookmarksArray.set(bookmarksWithUrls);
    console.log(bookmarksWithUrls);
  } catch (error) {
    errorMessage.set(`Failed to fetch bookmarks: ${error.message}`);
    console.error(errorMessage, error);
  }
}

function extractBookmarksWithUrl(
  bookmarkNode: BookmarksType[] | undefined
): BookmarkType[] {
  const bookmarksWithUrl: FetchedBookmarkType[] = [];

  function recurse(node: FetchedBookmarkType) {
    if (node.url) {
      let alias: string;
      let ifSearchable = false;
      const match = node.title.match(/\(([^)]+)\)$/);
      if (match) {
        alias = match[1];
      }
      if (node.title[0] === "!") {
        isSearchable = true;
      }
      const newNode = { ...node, alias, isSearchable };
      bookmarksWithUrl.push(newNode);
    }
    if (node.children) {
      node.children.forEach(recurse);
    }
  }

  if (bookmarkNode) {
    bookmarkNode.forEach(recurse);
    return bookmarksWithUrl;
  }

  return [];
}

export { fetchBookmarks };
