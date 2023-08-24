axe.registerPlugin({
  id: 'pluginRegistry',
  run: function (id, action, options, callback) {
      var frames;
      var q = axe.utils.queue();
      var that = this;
      frames = axe.utils.toArray(document.querySelectorAll('iframe, frame'));
      frames.forEach(function (frame) {
          q.defer(function (done) {
            axe.utils.sendCommandToFrame(frame, {
                options: options,
                command: 'run-plugin',
                parameter: id,
                action: 'run'
            }, function (options) {
                done(options);
            }, function (options){
                console.log(options);
            });
          });
      });
      q.defer(function (done) {
          that._registry[id][action].call(that._registry[id], document, options, done);
      });
      q.then(callback);
  },
  commands: [{
      id: 'run-plugin',
      callback: function (data, callback) {
          return axe.plugins.pluginRegistry.run(data.parameter, data.action, data.options, callback);
      }
  }]
});