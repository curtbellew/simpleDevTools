let id = null;
const connections = {};
let browserType = (chrome.runtime?chrome:browser);

chrome.runtime.onConnect.addListener(devToolsConnection => {
    // Assign the listener function to a variable so we can remove it later
    let devToolsListener = (message, sender, sendResponse) => {
        if (message.name == "init") {
            id = message.tabId;
            connections[id] = devToolsConnection;
            // Send a message back to DevTools
            connections[id].postMessage("Connected!");
        }
    };

    // Listen to messages sent from the DevTools page
    devToolsConnection.onMessage.addListener(devToolsListener);

    devToolsConnection.onDisconnect.addListener(() => {
        devToolsConnection.onMessage.removeListener(devToolsListener);
    });
});

browserType.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //console.log('background.js onMessage.addListener1');
    Promise.resolve("Curt").then(result => sendResponse(result));
    return true;
});