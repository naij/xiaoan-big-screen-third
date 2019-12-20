var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@dian.html',
  render: function() {
    var me = this
    me.chartArray = []
    me.setView().then(function() {
      me.renderNetworkingTotalChart()
      me.renderAddedCountChart()
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
      name: 'getDqsbzsZcsBjsForTp',
      params: {
        key: 'XAlwjc119'
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')

      var data = [{
        item: '报警数',
        count: res.bjs
      }, {
        item: '正常数',
        count: res.zcs
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
      name: 'getMyxzDqsbsForTp',
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
          value: v.dqsbs
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
  }
})