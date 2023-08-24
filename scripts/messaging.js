function sendObjectToInspectedPage(message) {
    let browserType = (chrome.devtools?chrome:browser)
    message.tabId = browserType.devtools.inspectedWindow.tabId;
    if (chrome.scripting.executeScript){
        //chrome.runtime.sendMessage(message);
        chrome.scripting.executeScript({
            target: {
                tabId: chrome.devtools.inspectedWindow.tabId,
            },
            func: (message) => { 
                runAxe(document, message.content, message.options, message.ldataUrl, function (err, results) { sendResults (err, results); }); 
            },
            args : [message]
        });
    } else {
        browser.runtime.sendMessage(message);
    }
}
