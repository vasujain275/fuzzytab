import { writable } from "svelte/store";
import { browser } from "wxt/browser";

export const urls = writable<any[]>([]);
export const errorMessage = writable<string | null>(null);

export async function fetchBookmarks() {
  try {
    const bookmarks = await browser.bookmarks.getTree();

    function extractBookmarksWithUrl(bookmarkNode: any[]): any[] {
      let bookmarksWithUrl: any[] = [];

      function recurse(node: any) {
        if (node.url) {
          bookmarksWithUrl.push(node);
        }
        if (node.children) {
          node.children.forEach((child: any) => recurse(child));
        }
      }

      bookmarkNode.forEach((node: any) => recurse(node));
      return bookmarksWithUrl;
    }

    const bookmarksWithUrls = extractBookmarksWithUrl(bookmarks[0].children);
    urls.set(bookmarksWithUrls);
    console.log(bookmarksWithUrls);
  } catch (error: any) {
    errorMessage.set(`Failed to fetch bookmarks: ${error.message}`);
    console.error(errorMessage, error);
  }
}
