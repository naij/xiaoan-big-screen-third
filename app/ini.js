var Magix = require('magix')
var Router = Magix.Router
var $ = require('jquery')

var routeMap = {
  'app/views/layout/default': [
    {path: '/', loginRequire: true},
    {path: '/home/overview', loginRequire: true},
    {path: '/report/yongchuan', loginRequire: false},
    {path: '/report/dian', loginRequire: false},
    {path: '/report/shui', loginRequire: false}
  ],
  'app/views/layout/blank': [
    {path: '/member/login', loginRequire: false},
    {path: '/bigscreen/index', loginRequire: false}
  ]
}
var routes = function() {
  var s = {}
  $.each(routeMap, function(k, item) {
    $.each(item, function(i, v) {
      s[v.path] = k
    })
  })
  return s
}()

Router.on('changed', function (e) {
  if (!e.path) return
  $.each(routeMap, function(k, item) {
    $.each(item, function(i, v) {
      if (v.path == e.path.to) {
        if (v.loginRequire) {
          Magix.checkToLogin()
        }
      }
    })
  })
})


return {
  defaultPath: '/',
  defaultView: 'app/views/layout/default',
  unmatchView: 'app/views/common/404',
  routes: routes,
  exts: [
    'app/exts',
    'app/vclick',
    'app/plugins/index'
  ]
}