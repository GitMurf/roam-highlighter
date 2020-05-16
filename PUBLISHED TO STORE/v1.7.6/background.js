//1.7.6
let userAgentString = navigator.userAgent;
let chromeAgent = userAgentString.indexOf("Chrome") > -1;
let firefoxAgent = userAgentString.indexOf("Firefox") > -1;
if(chromeAgent)
{
    chrome.browserAction.onClicked.addListener(function(activeTab) {
        chrome.tabs.executeScript(null, {file: "highlighter.js"});
    });
}
else if (firefoxAgent)
{
    browser.browserAction.onClicked.addListener(function(activeTab) {
        browser.tabs.executeScript(null, {file: "highlighter.js"});
    });
}
