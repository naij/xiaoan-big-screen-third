/*
    generate by magix-combine: https://github.com/thx/magix-combine
    author: xinglie.lkf@alibaba-inc.com; kooboy_li@163.com
 */
define('app/views/layout/default',["magix"],function(require,exports,module){
/*Magix*/
var Magix = require('magix')
var Router = Magix.Router

module.exports = Magix.View.extend({
  tmpl: "<div class=\"block-switch-loading\"></div><div class=\"layout-header\"><div class=\"title\" mx-click=\"goToBigScreen()\"></div><div class=\"sitenav\" mx-view=\"app/views/common/sitenav\"></div><div class=\"bp-entrance\"><a href=\"/getSy\" vclick-ignore=\"true\" target=\"_blank\"><span class=\"iconfont iconlianjie\"></span><span>综合查询子系统</span></a></div></div><div class=\"layout-content\"><div class=\"page-body\"><div mx-view=\"{{mainView}}\"></div></div></div>",
  ctor: function() {
    this.observe(null, true)
  },
  render: function() {
    var me = this
    var loc = Router.parse()
    var path = loc.path

    if (path === '/') {
      path = '/index'
    }

    me.data = {
      mainView: 'app/views/pages' + path
    }
    me.setView()
    me.animateLoading()
  },
  setPageHead(title) {
    this.data.title = title
    this.setView()
  },
  'goToBigScreen<click>': function() {
    this.to('/bigscreen/index')
  }
})
});