var Magix = require('magix')
var $ = require('jquery')
var Router = Magix.Router
var menuList = [{
  name: '用传数据',
  icon: 'iconshebei',
  path: '/report/yongchuan'
}, {
  name: '电设置数据',
  icon: 'icondian',
  path: '/report/dian'
}, {
  name: '水设置数据',
  icon: 'iconshuiwei',
  path: '/report/shui'
}]

module.exports = Magix.View.extend({
  tmpl: '@sidenav.html',
  ctor: function() {
    this.observe(null, true)
  },
  render: function() {
    this.data = {
      menuList: menuList
    }
    this._rendered()
  },
  _rendered: function() {
    var loc = Router.parse()
    var path = loc.path
    var finded
    var menuList = this.data.menuList
    $.each(menuList, function(index, value) {
      value.active = false
      if (path === value.path) {
        value.active = true
        finded = true
      }
    })

    //找不到就选中第一个
    if (!finded) {
      menuList[0].active = true
    }

    this.data = {
      menuList: menuList
    }
    this.setView()
  }
})