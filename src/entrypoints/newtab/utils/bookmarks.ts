import Fuse from "fuse.js";
import { browser } from "wxt/browser";
import { filteredBookmarks, selectedBookmarkIndex } from "./store";

// Types and Interfaces aligned with WebExtension API
interface BookmarkTreeNode {
  id: string;
  title: string;
  index?: number;
  dateAdded?: number;
  type?: "bookmark" | "folder" | "separator";
  url?: string;
  parentId?: string;
  dateGroupModified?: number;
  children?: BookmarkTreeNode[];
}

interface EnhancedBookmarkLink extends BookmarkTreeNode {
  alias?: string;
  isSearchable: boolean;
  count: number;
}

async function fetchBookmarks(): Promise<EnhancedBookmarkLink[]> {
  try {
    const bookmarkTree = await browser.bookmarks.getTree();
    return extractBookmarksWithUrl(bookmarkTree);
  } catch (error) {
    console.error("Failed to fetch Bookmarks: ", error);
    return [];
  }
}

function extractBookmarksWithUrl(
  bookmarkTree: BookmarkTreeNode[]
): EnhancedBookmarkLink[] {
  const bookmarksWithUrl: EnhancedBookmarkLink[] = [];

  function recurse(node: BookmarkTreeNode): void {
    if (node.type === "bookmark" && node.url) {
      const { title, url } = node;
      const alias = title.match(/\(([^)]+)\)$/)?.[1];
      const isSearchable = title.startsWith("!");
      const cleanTitle = isSearchable ? title.slice(1) : title;

      bookmarksWithUrl.push({
        ...node,
        title: cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1),
        alias,
        isSearchable,
        count: 0,
      });
    } else if (node.children) {
      node.children.forEach(recurse);
    }
  }

  bookmarkTree.forEach(recurse);
  return bookmarksWithUrl;
}

function updateFilteredBookmarks(
  bookmarks: EnhancedBookmarkLink[],
  query: string
): void {
  const trimmedQuery = query.trim();

  if (trimmedQuery === "") {
    filteredBookmarks.set(bookmarks.sort((a, b) => b.count - a.count));
    selectedBookmarkIndex.set(-1);
    return;
  }

  const fuse = new Fuse(bookmarks, {
    keys: [
      { name: "title", weight: 3 },
      { name: "alias", weight: 5 },
    ],
    threshold: 0.3,
  });

  const result: EnhancedBookmarkLink[] = fuse
    .search(trimmedQuery)
    .map(({ item }) => item);
  filteredBookmarks.set(result);
  selectedBookmarkIndex.set(result.length > 0 ? 0 : -1);
}

export { fetchBookmarks, updateFilteredBookmarks, EnhancedBookmarkLink };
