/*
    generate by magix-combine: https://github.com/thx/magix-combine
    author: xinglie.lkf@alibaba-inc.com; kooboy_li@163.com
 */
define('app/views/pages/home/overview',["magix","jquery"],function(require,exports,module){
/*Magix,$*/
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: "<div class=\"page-header clearfix\"><div class=\"title-bar\"><h2 class=\"title\">概览</h2></div><div class=\"userinfo\"><span class=\"iconfont iconyonghuming\"></span><span>{{username}}</span></div></div><div class=\"page-body\"></div>",
  render: function() {
    var me = this
    // me.request().all([{
    //   name: 'member_list',
    //   params: {
    //     pageNo: pageNo,
    //     pageSize: pageSize
    //   }
    // }], function(e, MesModel) {
    //   var data = MesModel.get('data')

    //   me.data = {
    //     list: data.list,
    //     pageNo: pageNo,
    //     pageSize: pageSize,
    //     totalCount: data.totalCount
    //   }
    //   me.setView()
    // })
    me.data = {
      username: Magix.config('username')
    }
    me.setView()
  }
})
});