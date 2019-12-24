/*
    generate by magix-combine: https://github.com/thx/magix-combine
    author: xinglie.lkf@alibaba-inc.com; kooboy_li@163.com
 */
define('app/views/layout/blank',["magix"],function(require,exports,module){
/*Magix*/
var Magix = require('magix')
var Router = Magix.Router

module.exports = Magix.View.extend({
  tmpl: "<div class=\"block-switch-loading\"></div><div class=\"blank-content\"><div mx-view=\"{{mainView}}\"></div></div>",
  ctor: function() {
    this.observe(null, true)
  },
  render: function() {
    var me = this
    var loc = Router.parse()
    var path = loc.path

    me.data = {
      mainView: 'app/views/pages' + path
    }
    me.setView()
    me.animateLoading()
  }
})
});