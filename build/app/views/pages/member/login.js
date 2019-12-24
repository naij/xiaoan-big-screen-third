/*
    generate by magix-combine: https://github.com/thx/magix-combine
    author: xinglie.lkf@alibaba-inc.com; kooboy_li@163.com
 */
define('app/views/pages/member/login',["magix","jquery"],function(require,exports,module){
/*Magix,$*/
var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: "<div class=\"page-login\"><div class=\"login-header\">智慧消防后台登录</div><div class=\"login-panel\"><div class=\"tip tip-alert\" t-if=\"error\">{{error}}</div><form id=\"loginForm\"><ul class=\"union-form\"><li class=\"field\"><div class=\"field-label2\">用户名：</div><input type=\"text\" class=\"input\" name=\"username\"></li><li class=\"field\"><div class=\"field-label2\">密码：</div><input type=\"password\" class=\"input\" name=\"password\"></li><li class=\"field\"><a href=\"#\" class=\"btn btn-brand btn-xlarge\" mx-click=\"submit()\">登 录</a></li></ul></form></div></div>",
  ctor: function() {
    this.observe(null, true)
  },
  render: function() {
    this.setView()
  },
  'submit<click>': function(e) {
    e.preventDefault()
    var me = this
    var formData = $('#loginForm').serializeJSON()

    me.request().all([{
      name: 'login',
      params: formData
    }], function(e, MesModel) {
      if (e && e.msg) {
        me.data.error = e.msg
        me.setView()
      } else {
        Magix.config({'isLogined': true})
        me.to('/home/overview')
      }
    })
  }
})
});