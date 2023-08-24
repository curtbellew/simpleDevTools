let browserType = (chrome.devtools?chrome.devtools.panels:browser.devtools.panels);
browserType.create("Simple", "/icons/icon.png", "/panel.html", function(panel) {});