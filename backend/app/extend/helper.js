const moment = require('moment')

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = 'success' })=> {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
  ctx.status = 200
}


// 处理成功响应
exports.error = ({ ctx, res = null, msg = 'error' })=> {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
  ctx.status = 400
}
