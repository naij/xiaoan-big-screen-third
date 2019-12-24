var Service = require('app/models/service')

Service.add([
  // 获取联网单位基本信息列表
  {
    name: 'getLwdwxxListForTp',
    url: '/tp/getLwdwxxListForTp',
    method: 'POST'
  },
  // 真实火警
  {
    name: 'get12MonthZshjForTp',
    url: '/tp/get12MonthZshjForTp',
    method: 'POST'
  },
  // 误报率
  {
    name: 'get12MonthWblForTp',
    url: '/tp/get12MonthWblForTp',
    method: 'POST'
  },
  // 故障率
  {
    name: 'get12MonthGzlForTp',
    url: '/tp/get12MonthGzlForTp',
    method: 'POST'
  },
  // 联网单位总数
  {
    name: 'getLwdwAndJcdCountForTp',
    url: '/tp/getLwdwAndJcdCountForTp',
    method: 'POST'
  },
  // 根据源地址、主机号、部件地址码获取消防设施部件信息
  {
    name: 'getXfssbjXxForTp',
    url: '/tp/getXfssbjXxForTp',
    method: 'POST'
  },
  // 获取最近一次巡检结果
  {
    name: 'getZjXjjgForTp',
    url: '/tp/getZjXjjgForTp',
    method: 'POST'
  },
  // 用传-获取指定时间范围内，每月新增联网单位数
  {
    name: 'getMyxzLwdwsForTp',
    url: '/tp/getMyxzLwdwsForTp',
    method: 'POST'
  },
  // 获取指定时间范围内故障率最高N家单位
  {
    name: 'getMyGzlzgdwForTp',
    url: '/tp/getMyGzlzgdwForTp',
    method: 'POST'
  },
  // 获取指定时间范围内误报率最高N家单位
  {
    name: 'getMyWblzgdwForTp',
    url: '/tp/getMyWblzgdwForTp',
    method: 'POST'
  },
  // 获取当前电气设备总数、正常数、报警数
  {
    name: 'getDqsbzsZcsBjsForTp',
    url: '/tp/getDqsbzsZcsBjsForTp',
    method: 'POST'
  },
  // 获取指定时间范围内，每月新增电气设备数
  {
    name: 'getMyxzDqsbsForTp',
    url: '/tp/getMyxzDqsbsForTp',
    method: 'POST'
  },
  // 获取电气设备各类报警次数
  {
    name: 'getDqsbGlBjsForTp',
    url: '/tp/getDqsbGlBjsForTp',
    method: 'POST'
  },
  // 根据联网单位ID获取传输装置数、电气监测设备数、视频摄像头数
  {
    name: 'getCszzcDqjcsbcSpsxtcForTp',
    url: '/tp/getCszzcDqjcsbcSpsxtcForTp',
    method: 'POST'
  }
])

module.exports = Service
