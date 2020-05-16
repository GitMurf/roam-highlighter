browser.browserAction.onClicked.addListener(function(activeTab) {
    browser.tabs.executeScript(null, {file: "highlighter.js"});
});
