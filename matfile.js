var fs = require('fs')
var path = require('path')
var mat   = require('mat')
var proxy = require('mat-proxy')
var less  = require('./tool/mat-less')
var combine = require('./tool/combine')

// 预编译less
mat.task('less', function () {
  mat.url([/.*\.css/])
    .rewrite([
      [/\.css/g, '.less']
    ])
    .use(less({
      sourceMap: {sourceMapFileInline: true}
    }))
})

mat.task('combine', function() {
  mat.url([/\.js/])
    .use(combine())
})

mat.task('pushState', function () {
  mat.url([/^((?!(\/tp\/|\.(css|less|js|html|ico|swf))).)*$/])
    .rewrite([
      [/(\/.*)+/, 'debug.html']
    ])
})

mat.task('default', ['less', 'combine', 'pushState'], function () {
  mat.url([/\/tp\//])
    .use(proxy({
      proxyPass: '183.129.224.22:7777'
    }))
})