/*
    generate by magix-combine: https://github.com/thx/magix-combine
    author: xinglie.lkf@alibaba-inc.com; kooboy_li@163.com
 */
define('app/views/pages/bigscreen/alarm_info',["magix","jquery"],function(require,exports,module){
/*Magix,$*/
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: "<div class=\"map-info-layer\"><div class=\"layer-container building-info\"><div class=\"outer\"><div class=\"inner\"><div class=\"row\"><div class=\"item building-name\"><div class=\"label\">建筑名称：</div><div class=\"value\"><a href=\"/system/zhcx/dwxx/getZhcxLwdwDetail.do?lwdw.dwid={{dwid}}\" vclick-ignore=\"true\" class=\"color-c\" target=\"_blank\">{{cym}}</a></div></div><div class=\"item building-type\"><div class=\"label\">建筑类别：</div><div class=\"value\">{{jzlb}}</div></div></div><div class=\"row\"><div class=\"item\"><div class=\"label\">建筑地址：</div><div class=\"value\">{{dwdz}}</div></div></div></div></div><div class=\"widget\"><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div><div class=\"sunken-group\"><div class=\"sunken sunken-left\"></div><div class=\"sunken sunken-right\"></div><div class=\"sunken sunken-bottom\"></div></div><div class=\"line-group\"><div class=\"line line-1\"></div><div class=\"line line-2\"></div><div class=\"line line-3\"><div class=\"circle\"></div></div></div><div class=\"corner-group\"><div class=\"corner-left-top\"><div class=\"corner corner-1\"></div><div class=\"corner corner-2\"></div><div class=\"corner corner-3\"></div></div><div class=\"corner-left-bottom\"><div class=\"corner corner-1\"></div><div class=\"corner corner-2\"></div><div class=\"corner corner-3\"></div></div><div class=\"corner-right-bottom\"><div class=\"corner corner-1\"></div><div class=\"corner corner-2\"></div><div class=\"corner corner-3\"></div></div></div><div class=\"antenna-group\"><div class=\"antenna-left-top\"><div class=\"line line-1\"></div><div class=\"line line-2\"><div class=\"circle\"></div></div></div><div class=\"antenna-right-bottom\"><div class=\"line line-1\"></div><div class=\"line line-2\"><div class=\"circle\"></div></div></div></div></div></div><div class=\"layer-container alarm-info\"><div class=\"outer\"><div class=\"inner\"><div class=\"row\"><div class=\"item\"><div class=\"label\">报警部件码：</div><div class=\"value\"><span class=\"mr10\">主机号：{{zjh}}</span><span>部件码：{{bjbjdzm}}</span></div></div></div><div class=\"row\"><div class=\"item\"><div class=\"label\">报警部件类型：</div><div class=\"value\">{{bjlx}}</div></div></div><div class=\"row\"><div class=\"item\"><div class=\"label\">报警部件说明：</div><div class=\"value\">{{azwz}}</div></div></div></div></div><div class=\"widget\"><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div><div class=\"sunken-group\"><div class=\"sunken sunken-left\"></div><div class=\"sunken sunken-right\"></div><div class=\"sunken sunken-bottom\"></div></div><div class=\"line-group\"><div class=\"line line-1\"></div><div class=\"line line-2\"></div><div class=\"line line-3\"><div class=\"circle\"></div></div></div><div class=\"corner-group\"><div class=\"corner-left-top\"><div class=\"corner corner-1\"></div><div class=\"corner corner-2\"></div><div class=\"corner corner-3\"></div></div><div class=\"corner-left-bottom\"><div class=\"corner corner-1\"></div><div class=\"corner corner-2\"></div><div class=\"corner corner-3\"></div></div><div class=\"corner-right-bottom\"><div class=\"corner corner-1\"></div><div class=\"corner corner-2\"></div><div class=\"corner corner-3\"></div></div></div><div class=\"antenna-group\"><div class=\"antenna-left-top\"><div class=\"line line-1\"></div><div class=\"line line-2\"><div class=\"circle\"></div></div></div><div class=\"antenna-right-bottom\"><div class=\"line line-1\"></div><div class=\"line line-2\"><div class=\"circle\"></div></div></div></div></div></div></div>",
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    var me = this
    var extraData = me.extraData.data
    me.data = extraData
    me.request().all([{
      name: 'getXfssbjXxForTp',
      params: {
        key: 'XAlwjc119',
        params: JSON.stringify({
          txdzm: extraData.txdzm,
          zjh: extraData.zjh,
          bjdzm: extraData.bjbjdzm
        })
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')
      $.extend(me.data, {
        azwz: res ? res.azwz : '待标注',
        bjlx: res ? res.bjlx : '待标注'
      })
      me.setView()
    })
  }
})
});