function InfoPlugin() {};
var infoPlugin = {
    id: 'infoPlugin',
    infoPlugin: new InfoPlugin(),
    run: function (contextNode, options, done) {
        console.log('contextNode '+contextNode.title);
        console.log('options[frameSelector] '+options['frameSelector']);
        var that = this;
        let results = that.infoPlugin.infoPlugin(contextNode, options, done);
        done(results);
    },
    cleanup: function (done) {
        this.infoPlugin.clear();
        done();
    }
};
InfoPlugin.prototype.infoPlugin = function(doc, options, done) {
    axe.utils.getFlattenedTree(doc);
    axe._tree = axe.utils.getFlattenedTree(doc);
    axe._selectorData = axe.utils.getSelectorData(axe._tree);
    let vals = [];
    let heading = doc.querySelector('h1');
    heading.style.border = '1px solid blue';
    vals.push(heading.innerHTML);
    return vals;
}
axe.plugins.pluginRegistry.add(infoPlugin);