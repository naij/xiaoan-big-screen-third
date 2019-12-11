var Magix = require('magix')
var Router = Magix.Router

module.exports = Magix.View.extend({
  tmpl: '@default.html',
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
      username: 'admin',
      mainView: 'app/views/pages' + path
    }
    me.setView()
    me.animateLoading()
  },
  setPageHead(title) {
    this.data.title = title
    this.setView()
  }
})