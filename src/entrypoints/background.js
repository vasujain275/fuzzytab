import { browser } from "wxt/browser";
export default defineBackground(() => {
  //console.log("Hello background!", { id: browser.runtime.id });
  function loadStart() {
    browser.tabs.update({
      url: "newtab.html",
    });
  }
  function pushStart(data) {
    if (data == null) {
      loadStart();
    } else {
      console.log("tab is well defined");
    }
  }

  let currentTab = browser.tabs.getCurrent();

  currentTab.then((data) => pushStart(data));
});
