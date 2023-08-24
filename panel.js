let browserType = (chrome.devtools?chrome.devtools.panels:browser.devtools.panels);
console.log('devtools');
browserType.create("Simple", "/icons/icon.png", "/scripts/panel.html", function(panel) {});
 
 document.querySelector('#info').addEventListener('click', function() {
    console.log('Run Info');
    sendObjectToInspectedPage({action: "code", content: "runAxe(document, 'contrast', '',function (err, results) { sendResults (err, results); })"});
}, false);
 
 // Create a connection to the background service worker
 const backgroundPageConnection = chrome.runtime.connect({
     name: "devtools-page"
 });
 
 // Relay the tab ID to the background service worker
 backgroundPageConnection.postMessage({
     name: 'init',
     tabId: chrome.devtools.inspectedWindow.tabId
 });
 