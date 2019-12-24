/*
    generate by magix-combine: https://github.com/thx/magix-combine
    author: xinglie.lkf@alibaba-inc.com; kooboy_li@163.com
 */
define('app/views/pages/bigscreen/base_info',["magix","jquery"],function(require,exports,module){
/*Magix,$*/
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: "<div class=\"map-info-layer\"><div class=\"layer-container base-info\"><div class=\"outer\"><div class=\"inner\"><div class=\"row\"><div class=\"item building-name\"><div class=\"label\">建筑名称：</div><div class=\"value\">{{cym}}</div></div><div class=\"item building-type\"><div class=\"label\">建筑类别：</div><div class=\"value\">{{jzlb}}</div></div></div><div class=\"row\"><div class=\"item\"><div class=\"label\">建筑地址：</div><div class=\"value\">{{dwdz}}</div></div></div><div class=\"row row-device\"><span class=\"iconfont iconshebei\" t-class:active=\"cszzC\"></span><span class=\"iconfont icondian\" t-class:active=\"dqjcsbC\"></span><span class=\"iconfont iconshexiangtou\" t-class:active=\"spsxtC\"></span></div></div></div><div class=\"widget\"><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div><div class=\"sunken-group\"><div class=\"sunken sunken-left\"></div><div class=\"sunken sunken-right\"></div><div class=\"sunken sunken-bottom\"></div></div><div class=\"corner-group\"><div class=\"corner-left-top\"><div class=\"corner corner-1\"></div><div class=\"corner corner-2\"></div><div class=\"corner corner-3\"></div></div><div class=\"corner-left-bottom\"><div class=\"corner corner-1\"></div><div class=\"corner corner-2\"></div><div class=\"corner corner-3\"></div></div><div class=\"corner-right-bottom\"><div class=\"corner corner-1\"></div><div class=\"corner corner-2\"></div><div class=\"corner corner-3\"></div></div></div><div class=\"antenna-group\"><div class=\"antenna-left-top\"><div class=\"line line-1\"></div><div class=\"line line-2\"><div class=\"circle\"></div></div></div><div class=\"antenna-right-bottom\"><div class=\"line line-1\"></div><div class=\"line line-2\"><div class=\"circle\"></div></div></div></div></div></div></div>",
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    var me = this
    var extraData = me.extraData.data
    me.data = extraData
    me.request().all([{
      name: 'getCszzcDqjcsbcSpsxtcForTp',
      params: {
        key: 'XAlwjc119',
        params: JSON.stringify({
          lwdwid: extraData.dwid
        })
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')
      $.extend(me.data, res)
      me.setView()
    })
  }
})
});