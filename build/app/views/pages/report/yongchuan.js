/*
    generate by magix-combine: https://github.com/thx/magix-combine
    author: xinglie.lkf@alibaba-inc.com; kooboy_li@163.com
 */
define('app/views/pages/report/yongchuan',["magix","jquery","moment"],function(require,exports,module){
/*Magix,$,moment*/
var Magix = require('magix')
var $ = require('jquery')
var moment = require('moment')

module.exports = Magix.View.extend({
  tmpl: "<div class=\"page-report\"><div class=\"layer\"><div class=\"module\"><h3 class=\"headline\">联网情况</h3><div class=\"content-wrapper\"><div class=\"chart-container\" id=\"networkingTotalChart\"></div></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div><div class=\"module\"><h3 class=\"headline\">故障率</h3><div class=\"content-wrapper\"><div class=\"chart-container\" id=\"breakdownChart\"></div></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div><div class=\"module\"><h3 class=\"headline\">故障单位排序</h3><div class=\"content-wrapper\"><table class=\"table\"><thead><tr><th>联网单位名称</th><th width=\"100\">故障率</th></tr></thead><tbody>{{#for(item in breakdownUnitList)}}<tr><td>{{item.cym}}</td><td>{{item.gzl}}%</td></tr>{{/for}}</tbody></table></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div></div><div class=\"layer\"><div class=\"module\"><h3 class=\"headline\">每月新增开通量</h3><div class=\"content-wrapper\"><div class=\"chart-container\" id=\"addedCountChart\"></div></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div><div class=\"module\"><h3 class=\"headline\">误报率</h3><div class=\"content-wrapper\"><div class=\"chart-container\" id=\"falseAlarmChart\"></div></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div><div class=\"module\"><h3 class=\"headline\">误报单位排序</h3><div class=\"content-wrapper\"><table class=\"table\"><thead><tr><th>联网单位名称</th><th width=\"100\">误报率</th></tr></thead><tbody>{{#for(item in falseAlarmUnitList)}}<tr><td>{{item.cym}}</td><td>{{item.wbl}}%</td></tr>{{/for}}</tbody></table></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div></div></div>",
  render: function() {
    var me = this
    me.chartArray = []
    me.setView().then(function() {
      me.renderNetworkingTotalChart()
      me.renderAddedCountChart()
      me.renderBreakdownChart()
      me.renderFalseAlarmChart()
      me.renderBreakdownUnit()
      me.renderFalseAlarmUnit()
    })

    me.on('destroy', function() {
      me.chartArray.forEach(function(v) {
        v.destroy()
      })
    })
  },
  renderNetworkingTotalChart: function () {
    var me = this
    me.request().all([{
      name: 'getZjXjjgForTp',
      params: {
        key: 'XAlwjc119'
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')
console.log('=======================networkingTotalChart=====================')
      var data = [{
        item: '离线',
        count: res.lxs
      }, {
        item: '在线',
        count: res.zxs
      }]
      var chart = new G2.Chart({
        container: 'networkingTotalChart',
        forceFit: true,
        height: $('#networkingTotalChart').parent().height(),
        data: data,
        padding: [20, 20, 50, 20]
      })
      chart.coord('theta', {
        radius: 0.6
      })
      chart.tooltip({
        showTitle: false
      })
      chart.intervalStack()
        .position('count')
        .color('item')
        .label('count', {
          formatter: (val, item) => {
            return item.point.item + ': ' + val;
          }
        })
        .tooltip('item*count', (item, count) => {
          return {
            name: item,
            value: count
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
      chart.render()

      me.chartArray.push(chart)
    })
  },
  // 每月新增开通量
  renderAddedCountChart: function () {
    var me = this
    me.request().all([{
      name: 'getMyxzLwdwsForTp',
      params: {
        key: 'XAlwjc119',
        params: {
          kssj: '2019-06-01',
          jssj: '2019-12-01'
        }
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')
      var res = ResModel.get('data')
      var data = []
      res.forEach(function(v, i) {
        data.push({
          month: v.tjrq.replace('年','-').replace('月',''),
          value: v.lwdws
        })
      })
      
      var chart = new G2.Chart({
        container: 'addedCountChart',
        forceFit: true,
        height: $('#addedCountChart').parent().height(),
        data: data,
        padding: [20, 30, 40, 40]
      })
      chart.axis('month', {
        label: {
          textStyle: {
            fill: '#ccc', // 文本的颜色
          }
        },
        line: {
          stroke: '#333', // 设置线的颜色
        }
      })
      chart.axis('value', {
        label: {
          textStyle: {
            fill: '#ccc', // 文本的颜色
          }
        },
        grid: {
          lineStyle: {
            stroke: '#333'
          }
        }
      })
      chart.scale({
        month: {
          alias: '月份' // 为属性定义别名
        },
        value: {
          alias: '每月新增开通量' // 为属性定义别名
        }
      })
      chart.interval().position('month*value').color('value', '#36c361')
      chart.render()

      me.chartArray.push(chart)
    })
  },
  // 故障率
  renderBreakdownChart: function() {
    var me = this
    me.request().all([{
      name: 'get12MonthGzlForTp',
      params: {
        key: 'XAlwjc119'
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')
      var data = []
      res.forEach(function(v, i) {
        if (i > 5) {
          data.push({
            month: v.tjrq.replace('年','-').replace('月',''),
            value: v.gzl
          })
        }
      })

      var chart = new G2.Chart({
        container: 'breakdownChart',
        forceFit: true,
        height: $('#breakdownChart').parent().height(),
        data: data,
        padding: [20, 30, 40, 40]
      })
      chart.axis('month', {
        label: {
          textStyle: {
            fill: '#ccc', // 文本的颜色
          }
        },
        line: {
          stroke: '#333', // 设置线的颜色
        }
      })
      chart.axis('value', {
        label: {
          textStyle: {
            fill: '#ccc', // 文本的颜色
          }
        },
        grid: {
          lineStyle: {
            stroke: '#333'
          }
        }
      })
      chart.scale({
        month: {
          alias: '月份' // 为属性定义别名
        },
        value: {
          alias: '故障率' // 为属性定义别名
        }
      })
      chart.area().position('month*value').color('value', ['#f5222d']).opacity(0.3).tooltip(false)
      chart.line().position('month*value').color('value', ['#f5222d'])
      chart.render()

      me.chartArray.push(chart)
    })    
  },
  // 误报率
  renderFalseAlarmChart: function() {
    var me = this
    me.request().all([{
      name: 'get12MonthWblForTp',
      params: {
        key: 'XAlwjc119'
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')
      var data = []
      res.forEach(function(v, i) {
        if (i > 5) {
          data.push({
            month: v.tjrq.replace('年','-').replace('月',''),
            value: v.wbl
          })
        }
      })

      var chart = new G2.Chart({
        container: 'falseAlarmChart',
        forceFit: true,
        height: $('#falseAlarmChart').parent().height(),
        data: data,
        padding: [20, 30, 40, 40]
      })
      chart.axis('month', {
        label: {
          textStyle: {
            fill: '#ccc', // 文本的颜色
          }
        },
        line: {
          stroke: '#333', // 设置线的颜色
        }
      })
      chart.axis('value', {
        label: {
          textStyle: {
            fill: '#ccc', // 文本的颜色
          }
        },
        grid: {
          lineStyle: {
            stroke: '#333'
          }
        }
      })
      chart.scale({
        month: {
          alias: '月份' // 为属性定义别名
        },
        value: {
          alias: '误报率' // 为属性定义别名
        }
      })
      chart.area().position('month*value').color('value', ['#f5222d']).opacity(0.3).tooltip(false)
      chart.line().position('month*value').color('value', ['#f5222d'])
      chart.render()

      me.chartArray.push(chart)
    })
  },
  // 故障单位排序
  renderBreakdownUnit: function () {
    var me = this
    me.request().all([{
      name: 'getMyGzlzgdwForTp',
      params: {
        key: 'XAlwjc119',
        params: {
          n: 5,
          kssj: moment().subtract(1, 'months').format("YYYY-MM-DD")
        }
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')
      me.data.breakdownUnitList = res
      me.setView()
    })
  },
  // 误报单位排序
  renderFalseAlarmUnit: function () {
    var me = this
    me.request().all([{
      name: 'getMyWblzgdwForTp',
      params: {
        key: 'XAlwjc119',
        params: {
          n: 5,
          kssj: moment().subtract(1, 'months').format("YYYY-MM-DD")
        }
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')
      me.data.falseAlarmUnitList = res
      me.setView()
    })
  }
})
});