var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@base_info.html',
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    var me = this
    var extraData = me.extraData.data
    me.data = extraData
    me.request().all([{
      name: 'getCszzcDqjcsbcSpsxtcForTp',
      params: {
        key: 'XAlwjc119',
        params: JSON.stringify({
          lwdwid: extraData.dwid
        })
      }
    }], function(e, ResModel) {
      var res = ResModel.get('data')
      $.extend(me.data, res)
      me.setView()
    })
  }
})