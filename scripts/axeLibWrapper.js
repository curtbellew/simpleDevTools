console.log('axeLibWarpper');
function runAxe(document, id, options, ldataUrl, callback) {
    version = '10.1.2';
    chrome.runtime.sendMessage(version, function(version){});
    values = [options];
    axe.plugins.pluginRegistry.run('infoPlugin', 'run', {
        values:values,
        id: id
    }, function (results) {
        console.log(results);
    });
}