import { writable } from "svelte/store";
import { browser } from "wxt/browser";

export const bookmarksArray = writable([]);
export const errorMessage = writable(null);

async function fetchBookmarks() {
  try {
    const bookmarks = await browser.bookmarks.getTree();
    const bookmarksWithUrls = extractBookmarksWithUrl(bookmarks[0].children);
    bookmarksArray.set(bookmarksWithUrls);
    console.log(bookmarksWithUrls);
  } catch (error) {
    errorMessage.set(`Failed to fetch bookmarks: ${error.message}`);
    console.error(errorMessage, error);
  }
}

function extractBookmarksWithUrl(bookmarkNode) {
  const bookmarksWithUrl = [];

  function recurse(node) {
    if (node.url) {
      let alias;
      let isSearchable = false;
      const match = node.title.match(/\(([^)]+)\)$/);
      if (match) {
        alias = match[1];
      }
      if (node.title[0] === "!") {
        node.title = node.title.charAt(1).toUpperCase() + node.title.slice(2);
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
