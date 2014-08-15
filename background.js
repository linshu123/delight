chrome.runtime.onConnect.addListener(function(port) {
  var tab = port.sender.tab;

  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
    var max_length = 1024;
    if (info.selection.length > max_length)
      info.selection = info.selection.substring(0, max_length);
    chrome.tabs.executeScript(tab.id, {
        "file": "contentScript.js"
    });
  });
});

chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    console.log("HWHHW");
    chrome.tabs.executeScript(tab.id, {
        "file": "contentScript.js"
    });
});

