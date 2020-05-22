//1.9.3
var userAgentString = navigator.userAgent;
var chromeAgent = userAgentString.indexOf("Chrome") > -1;
if(chromeAgent){var useBrowser = chrome}else{var useBrowser = browser}

useBrowser.browserAction.onClicked.addListener(function(activeTab) {
    useBrowser.tabs.executeScript(null, {file: "highlighter.js"});

    useBrowser.commands.onCommand.addListener(function (command) {
        if(command == "remove-all-highlights") {
            useBrowser.tabs.query({active: true, currentWindow: true}, function(tabs){
                useBrowser.tabs.sendMessage(tabs[0].id, {'callFunction': 'removeAllHighlights'});
            });
        }
        else if(command == "add-double-brackets") {
            useBrowser.tabs.query({active: true, currentWindow: true}, function(tabs){
                useBrowser.tabs.sendMessage(tabs[0].id, {'callFunction': 'addDoubleBrackets'});
            });
        }
        else if(command == "convert-to-header") {
            useBrowser.tabs.query({active: true, currentWindow: true}, function(tabs){
                useBrowser.tabs.sendMessage(tabs[0].id, {'callFunction': 'convertToHeader'});
            });
        }else {
            //alert("No Match To Commands!");
        }
    });
});
