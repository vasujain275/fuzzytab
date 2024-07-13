import Fuse from "fuse.js";
import { browser } from "wxt/browser";

import {
  bookmarksArray,
  errorMessage,
  filteredBookmarks,
  selectedBookmarkIndex,
} from "./store";

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

function updateFilteredBookmarks(bookmarks, query) {
  if (query.trim() === "") {
    filteredBookmarks.set(bookmarks);
    selectedBookmarkIndex.set(-1);
    return;
  }

  const fuse = new Fuse(bookmarks, {
    keys: [
      {
        name: "title",
        weight: 3,
      },
      //{
      //  name: "url",
      //  weight: 0.3,
      //},
      {
        name: "alias",
        weight: 5,
      },
    ],
    threshold: 0.3,
  });

  const result = fuse.search(query).map((result) => result.item);
  filteredBookmarks.set(result);

  // Select the top index if there are results
  if (result.length > 0) {
    selectedBookmarkIndex.set(0);
  } else {
    selectedBookmarkIndex.set(-1);
  }
}

export { fetchBookmarks, updateFilteredBookmarks };
