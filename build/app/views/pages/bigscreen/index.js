/*
    generate by magix-combine: https://github.com/thx/magix-combine
    author: xinglie.lkf@alibaba-inc.com; kooboy_li@163.com
 */
define('app/views/pages/bigscreen/index',["magix","jquery","moment","app/util/index","app/mixins/dialog"],function(require,exports,module){
/*Magix,$,moment,util,Dialog*/
var Magix = require('magix')
var $ = require('jquery')
var moment = require('moment')
var util = require('app/util/index')
var Dialog = require('app/mixins/dialog')
// var mapdata = require('./mapdata')

module.exports = Magix.View.extend({
  tmpl: "<div class=\"page-bigscreen\"><div class=\"map-container\" id=\"mapContainer\"></div><div class=\"header\"><div class=\"header-bg\"></div><div class=\"title\"></div><div class=\"search\"><input class=\"input\" type=\"text\" placeholder=\"搜索联网单位名称\" mx-keydown=\"search()\"><span class=\"iconfont iconsousuo\"></span></div></div><div class=\"main\"><div class=\"top-wrapper\"><div class=\"top-left-wrapper\"><div class=\"module weather\"><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div><div class=\"content-wrapper\"><div class=\"wea-img\"><span class=\"iconfont {{weather.weaImg}}\"></span></div><div class=\"row\"><div class=\"tem\"><span>{{weather.tem}}</span><span class=\"symbol\">℃</span></div><div class=\"wea\">{{weather.wea}}</div></div><div class=\"row location\">{{cityName}}</div><div class=\"row\"><div class=\"win\">{{weather.win}}</div><div class=\"humidity\">空气湿度 {{weather.humidity}}</div></div></div></div><div class=\"module networking-total\"><div class=\"headline\"><div class=\"title\">用户传输装置联网情况</div><a href=\"/report/yongchuan\" class=\"more\">更多</a></div><div class=\"content-wrapper\"><div class=\"chart-wrapper\" id=\"ycNetworkingTotalChart\"></div></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div></div><div class=\"top-middle-wrapper\"><div class=\"pointer-switcher\"><div class=\"switch-btn\" t-class:selected=\"switcher.type\" mx-click=\"switchPoiner()\"><span t-if=\"switcher.type==1\">隐藏所有单位</span><span t-if=\"switcher.type==0\">显示所有单位</span></div></div></div><div class=\"top-right-wrapper\"><div class=\"module misinformation-rate\"><div class=\"headline\"><div class=\"title\">电气联网情况</div><a href=\"/report/dian\" class=\"more\">更多</a></div><div class=\"content-wrapper\"><div class=\"chart-wrapper\" id=\"dianNetworkingTotalChart\"></div></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div><div class=\"module failure-rate\"><div class=\"headline\"><div class=\"title\">电气七天报警分析</div><a href=\"/report/dian\" class=\"more\">更多</a></div><div class=\"content-wrapper\"><div class=\"chart-wrapper\" id=\"dianAlarmCountChart\"></div></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div></div></div><div class=\"bottom-wrapper\"><div class=\"module\"><div class=\"headline\"><div class=\"title\">误报率</div><a href=\"/report/yongchuan\" class=\"more\">更多</a></div><div class=\"content-wrapper\"><div class=\"chart-wrapper\" id=\"falseAlarmChart\"></div></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div><div class=\"module\"><div class=\"headline\"><div class=\"title\">故障率</div><a href=\"/report/yongchuan\" class=\"more\">更多</a></div><div class=\"content-wrapper\"><div class=\"chart-wrapper\" id=\"breakdownChart\"></div></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div><div class=\"module\"><div class=\"headline\"><div class=\"title\">误报单位排序</div><a href=\"/report/yongchuan\" class=\"more\">更多</a></div><div class=\"content-wrapper\"><table class=\"table\"><thead><tr><th>联网单位名称</th><th width=\"100\">故障率</th></tr></thead><tbody>{{#for(item in breakdownUnitList)}}<tr><td><a href=\"/system/zhcx/dwxx/getZhcxLwdwDetail.do?lwdw.id={{item.dwid}}\" vclick-ignore=\"true\" class=\"color-l\" target=\"_blank\">{{item.cym}}</a></td><td>{{item.gzl}}%</td></tr>{{/for}}</tbody></table></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div><div class=\"module\"><div class=\"headline\"><div class=\"title\">故障单位排序</div><a href=\"/report/yongchuan\" class=\"more\">更多</a></div><div class=\"content-wrapper\"><table class=\"table\"><thead><tr><th>联网单位名称</th><th width=\"100\">误报率</th></tr></thead><tbody>{{#for(item in falseAlarmUnitList)}}<tr><td><a href=\"/system/zhcx/dwxx/getZhcxLwdwDetail.do?lwdw.id={{item.dwid}}\" vclick-ignore=\"true\" class=\"color-l\" target=\"_blank\">{{item.cym}}</a></td><td>{{item.wbl}}%</td></tr>{{/for}}</tbody></table></div><div class=\"bevel-group\"><div class=\"bevel bevel-top-left\"></div><div class=\"bevel bevel-top-right\"></div><div class=\"bevel bevel-bottom-left\"></div><div class=\"bevel bevel-bottom-right\"></div></div></div></div></div></div>",
  mixins: [Dialog],
  render: function() {
    var me = this

    me.chartArray = []
    me.data = {
      switcher: {
        type: 1
      }
    }
    me.setView().then(function() {
      var windowHeight = $(window).height()
      var headerHeight = $('.header').height()
      var mainHeight = windowHeight - headerHeight
      $('.main').height(mainHeight)

      me.renderMap()
      me.connect()
      
      me.renderWeather()
      me.renderYCNetworkingTotalChart()
      me.renderFalseAlarmChart()
      me.renderBreakdownChart()
      me.renderDianAlarmCountChart()
      me.renderDianNetworkingTotalChart()
      me.renderBreakdownUnit()
      me.renderFalseAlarmUnit()
    })

    me.on('destroy', function() {
      me.chartArray.forEach(function(v) {
        v.destroy()
      })
    })
  },
  connect: function () {
    var me = this
    //如果前后端为同一个端口，可不填参数。如果前后端分离，这里参数为服务器端的URL
    var connection = $.hubConnection('http://183.129.224.22:8090')
    // DispatchHub为后端定义，使用驼峰式命名，后端首字母必须大写
    var chatHubProxy = connection.createHubProxy('DispatchHub')
    // ReveiceAlarm 为后端ServiceHub方法
    chatHubProxy.on('ReveiceAlarm', function(res, message) {
      var alarmList = res
      alarmList.forEach(function(v, i) {
        me.addAlarmMarker(v)
      })
    })
    chatHubProxy.on('ReveiceConfirm', function(res, message) {
      me.removeAlarmMarker(res)
    })
    connection.start()
      .done(function(){ 
        var connect = chatHubProxy.invoke('Connect', 'hzgs', 'hzgs119')
        connect.done(function(res) {
          console.log(res)
        })
      })
      .fail(function(){ console.log('Could not connect') })
  },
  addAlarmMarker: function(obj) {
    var me = this
    var markers = me.markers || {}
    me.request().all([{
      name: 'getLwdwxxListForTp',
      params: {
        key: 'XAlwjc119',
        startPage: 1,
        pageSize: 10,
        params: JSON.stringify({
          dwid: obj.lwdwid
        })
      }
    }], function(e, ResModel) {
      var results = ResModel.get('data').results
      if (results.length > 0) {
        var gis = util.BdmapEncryptToMapabc(results[0].gis_y, results[0].gis_x)
        var hasSameMarker = false

        for (let v in markers) {
          if (obj.lwdwid == markers[v].lwdwid) {
            hasSameMarker = true
            break
          }
        }
        if (hasSameMarker) {return}

        var marker = new AMap.Marker({
          map: me.mapInstance,
          content: '<div class="pulse-marker"></div>',
          position: [gis.lng, gis.lat]
        })
        marker.on('click', function(e) {
          me.showAlarmInfoDialog({
            lwdwid: obj.lwdwid,
            cym: results[0].cym,
            jzlb: results[0].dwcsx ? results[0].dwcsx : results[0].dwzsx,
            dwdz: results[0].dwdz,
            txdzm: obj.txdzm,
            zjh: obj.zjh,
            bjbjdzm: obj.bjbjdzm
          })
          me.mapInstance.setCenter(e.target.getPosition())
        })
        markers[obj.id] = {
          lwdwid: obj.lwdwid,
          marker: marker
        }
        me.markers = markers
      }
    })
  },
  removeAlarmMarker: function(id) {
    var markers = this.markers
    if (markers && markers[id]) {
      markers[id].marker.setMap(null)
      delete markers[id]
    }
  },
  renderMap: function () {
    var me = this
    var mapInstance = new AMap.Map('mapContainer', {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: 12, //初始化地图层级
      center: [120.214001, 30.247132], //初始化地图中心点
      features: ['bg', 'road', 'building'],
      mapStyle: 'amap://styles/dark'
    })

    AMapUI.loadUI(['misc/PointSimplifier'], function(PointSimplifier) {
      //创建组件实例
      var pointSimplifierIns = new PointSimplifier({
        map: mapInstance,
        autoSetFitView: false,
        getPosition: function(dataItem) {
          //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
          return dataItem.position
        },
        getHoverTitle: function(dataItem, idx) {
          return dataItem.cym
        },
        renderOptions: {
          //点的样式
          pointStyle: {
            //绘制点占据的矩形区域
            content: PointSimplifier.Render.Canvas.getImageContent(
              'https://img.alicdn.com/imgextra/i1/3883067843/O1CN01TQStAC27o8uH5qz02_!!3883067843.png',
              function onload() {
                pointSimplifierIns.renderLater()
              }
            ),
            //宽度
            width: 15,
            //高度
            height: 15,
            //定位点为底部中心
            offset: ['-50%', '-100%'],
            fillStyle: null,
            strokeStyle: null
          }
        }
      })

      pointSimplifierIns.on('pointClick', function(e, record) {
        if (me.data.switcher.type == 1) {
          me.showBaseInfoDialog({
            dwid: record.data.dwid,
            cym: record.data.cym,
            jzlb: record.data.jzlb,
            dwdz: record.data.dwdz
          })
          me.mapInstance.setCenter(record.data.position)
        }
      })

      me.request().all([{
        name: 'getLwdwxxListForTp',
        params: {
          key: 'XAlwjc119',
          startPage: 1,
          pageSize: 500
        }
      }], function(e, ResModel) {
        var mapdata = ResModel.get('data').results
        var data = []
        mapdata.forEach(function(item, index) {
          if (item.gis_y && item.gis_x) {
            var gis = util.BdmapEncryptToMapabc(item.gis_y, item.gis_x)
    
            data.push({
              position: [gis.lng, gis.lat],
              dwmc: item.dwmc,
              cym: item.cym,
              dwid: item.dwid,
              jzlb: item.dwcsx ? item.dwcsx : item.dwzsx,
              dwdz: item.dwdz
            })
          }
        })
    
        //设置数据源，data需要是一个数组
        pointSimplifierIns.setData(data)

        me.pointSimplifierInsData = data
        me.pointSimplifierIns = pointSimplifierIns
      })
    })

    me.mapInstance = mapInstance
  },
  showAlarmInfoDialog: function(data) {
    this.mxDialog('app/views/pages/bigscreen/alarm_info', {
      width: 1000,
      height: 600,
      data: data
    })
  },
  showBaseInfoDialog: function(data) {
    this.mxDialog('app/views/pages/bigscreen/base_info', {
      width: 600,
      height: 480,
      data: data
    })
  },
  getlocation: function(callback) {
    console.log('GPS定位开始+++')
    var map, geolocation
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('iCenter')
    map.plugin('AMap.Geolocation', function() {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: false,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      })
      map.addControl(geolocation)
      geolocation.getCurrentPosition()
      
      // getCityInfo是高德GPS定位里面的一个方法，先返回ip定位数据，由于IP定位有可能不准确，所以后面用GPS数据修正
      geolocation.getCityInfo (function(status,result) {
        console.log('与GPS同步IP定位开始，进行数据写入+++')
        if (status === 'complete' && result.info === 'SUCCESS') {
          console.log('同步IP定位成功，进行数据写入+++')
          if(!sessionStorage.getItem('autouserchooselocationct')) {
            console.log('未检测检查有上一次定位数据，进行数据写入+++')
            let cityAdcode = result.adcode
            let cityName = result.city
            callback({
              cityName: cityName,
              cityAdcode: cityAdcode
            })
            // sessionStorage.setItem('autouserchooselocationct', cityName)
            // sessionStorage.setItem('autouserchooselocationcode', cityAdcode)
            console.log('同步IP定位结束，进行数据写入完成+++')
          }
        }
      })
      AMap.event.addListener(geolocation, 'complete', onComplete) //返回定位信息
      AMap.event.addListener(geolocation, 'error', onError)      //返回定位出错信息
    })

    //GPS定位成功
    function onComplete(data) {
      // console.log(data)
      console.log('GPS定位启动+++')
      //gsp定位精确到区，返回的adcode精确到了城市下属的区域，
      //想要获取城市的abcode还需要使用高德的另一个API，城市区域查询
      
      let cityName = data.addressComponent.city
      let geocoder = new AMap.Geocoder({})
      //地理编码,返回地理编码结果，
      geocoder.getLocation(cityName, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          console.log('GPS定位成功，处理定位数据+++')
          let cityAdcode=result.geocodes[0].adcode
          callback({
            cityName: cityName,
            cityAdcode: cityAdcode
          })
          // sessionStorage.setItem('autouserchooselocationct', cityName)
          // sessionStorage.setItem('autouserchooselocationcode', cityAdcode)
          console.log('GPS定位结束，进行数据写入完成+++')
        }
      })
    }

    //GPS定位失败
    function onError() {
      console.log('GPS定位失败开始启用ip定位+++')
      // locationForIp(true)
      console.log('gps-ip++...')
    }

    function locationForIp(tap) {
      /*********跟踪标记**********/if(tap){ console.log('GPS定位失败开始启用ip定位+++');}
      /*********跟踪标记**********/ console.log('ip定位开始+++');
      var citysearch = new AMap.CitySearch()
      //自动获取用户IP，返回当前城市
      citysearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.city && result.bounds) {
            let GetUserLocation = result.city,
            GetUserLocationcode = result.adcode
            /*********跟踪标记**********/console.log('ip定位成功，开始检查是否有上一次定位数据+++');
            if (isNull(sessionStorage.getItem('autouserchooselocationct'))) {
              /*********跟踪标记**********/console.log('ip定位成功，未检测检查有上一次定位数据，进行数据写入+++');
              callback({
                cityName: GetUserLocation,
                cityAdcode: GetUserLocationcode
              })
              // sessionStorage.setItem('autouserchooselocationct', GetUserLocation);
              // sessionStorage.setItem('autouserchooselocationcode', GetUserLocationcode);
              /*********跟踪标记**********/console.log('ip定位成功，进行数据写入结束+++');
            }
          }
        } else {
          console.log('ip定位失败，进行数据写入结束+++');
        }
      })
    }
  },
  renderWeather: function () {
    var me = this
    var weaImgMap = {
      xue: 'iconzhongxue',
      lei: 'iconleidian',
      shachen: 'iconmai',
      wu: 'iconwu',
      bingbao: 'iconbingbao',
      yun: 'iconduoyun',
      yu: 'iconxiaoyu',
      yin: 'iconyin',
      qing: 'iconqing'
    }
    me.getlocation(function(cityData) {
      $.ajax({
        url: 'https://www.tianqiapi.com/api/?version=v6&cityid='+ cityData.cityAdcode + '&appid=13915239&appsecret=Ky5jEpcK',
        dataType: 'jsonp'
      }).done(function(res) {
        var weather = {
          tem: res.tem,
          wea: res.wea,
          weaImg: weaImgMap[res.wea_img],
          win: res.win,
          winSpeed: res.win_speed,
          humidity: res.humidity
        }
        me.data.cityName = cityData.cityName
        me.data.weather = weather
        me.setView()
      })
    })
  },
  // 用传联网总数
  renderYCNetworkingTotalChart: function() {
    var me = this
    me.request().all([{
      name: 'getZjXjjgForTp',
      params: {
        key: 'XAlwjc119'
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')

      var data = [{
        item: '离线',
        count: res.lxs
      }, {
        item: '在线',
        count: res.zxs
      }]
      var chart = new G2.Chart({
        container: 'ycNetworkingTotalChart',
        forceFit: true,
        height: $('#ycNetworkingTotalChart').parent().height(),
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
        .color('item', ['#f89a0d', '#ff6600'])
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
        if (i > 6) {
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
      chart.area().position('month*value').color('value', '#c25004').opacity(0.5).tooltip(false)
      chart.line().position('month*value').color('value', '#c25004')
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
        if (i > 6) {
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
      chart.area().position('month*value').color('value', '#c25004').opacity(0.5).tooltip(false)
      chart.line().position('month*value').color('value', '#c25004')
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
  },
  // 电气七天报警分析
  renderDianAlarmCountChart: function() {
    var me = this
    var fieldMap = [
      {field:'gzs', label: '过载数'},
      {field:'yws', label: '烟雾数'},
      {field:'lds2', label: '漏电数'},
      {field:'lxs', label: '离线数'},
      {field:'lds', label: '联动数'}
    ]
    me.request().all([{
      name: 'getDqsbGlBjsForTp',
      params: {
        key: 'XAlwjc119',
        kssj: moment().subtract(7, 'days').format("YYYY-MM-DD"),
        jssj: moment().subtract(1, 'days').format("YYYY-MM-DD")
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')
      var data = []
      fieldMap.forEach(function(v, i) {
        data.push({
          field: v.label,
          value: res[v.field]
        })
      })
      var chart = new G2.Chart({
        container: 'dianAlarmCountChart',
        forceFit: true,
        height: $('#dianAlarmCountChart').parent().height(),
        data: data,
        padding: [10, 20, 40, 50]
      })
      chart.axis('field', {
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
        field: {
          alias: '字段' // 为属性定义别名
        },
        value: {
          alias: '数值' // 为属性定义别名
        }
      })
      chart.interval().position('field*value').color('value', function(value) {
        if (value > 100) {
          return '#ff6600'
        } else if (value < 50) {
          return '#f89a0d'
        }
      })
      chart.render()
      me.chartArray.push(chart)
    })
  },
  renderDianNetworkingTotalChart: function () {
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
        container: 'dianNetworkingTotalChart',
        forceFit: true,
        height: $('#dianNetworkingTotalChart').parent().height(),
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
        .color('item', ['#ff6600', '#f89a0d'])
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
      chart.render()
      me.chartArray.push(chart)
    })
  },
  'switchPoiner<click>': function(e) {
    var type = this.data.switcher.type
    this.data.switcher = {
      type: !type
    }
    this.setView()

    if (!type) {
      this.pointSimplifierIns.show()
    } else {
      this.pointSimplifierIns.hide()
    }
  },
  'search<keydown>': function(e) {
    if (e.keyCode == '13') {
      var value = $(e.eventTarget).val()
      var pointSimplifierInsData = this.pointSimplifierInsData
      var pointSimplifierIns = this.pointSimplifierIns
      if (value) {
        var data = []
        pointSimplifierInsData.forEach(function(v) {
          if (v.cym.indexOf(value) != -1 || v.dwmc.indexOf(value) != -1) {
            data.push(v)
          }
        })

        pointSimplifierIns.setData(data)
      } else {
        pointSimplifierIns.setData(pointSimplifierInsData)
      }
    }
  }
})
});