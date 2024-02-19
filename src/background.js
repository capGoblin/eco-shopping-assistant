// // import chrome from "chrome";
// let onPage = "";
// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   var currentTab = tabs[0];
//   onPage = currentTab.url;
//   console.log("Current URL", onPage);
//   // Do whatever you want with the URL here
// });

// export default onPage;
chrome.runtime.onMessage.addListener(function (message) {
  if (message.onPage) {
    chrome.storage.local.set({ onPage: message.onPage });
  }
});
