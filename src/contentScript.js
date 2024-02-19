// contentScript.js
var onPage = window.location.href;
chrome.runtime.sendMessage({ onPage: onPage });
