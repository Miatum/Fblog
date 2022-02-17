// 图片服务器,2022.01.26作废，改后端处理
const picServer = 'http://39.107.84.16:9001/'
// 视频服务器
const videoServer = 'http://39.107.84.16:9002/'
// 正式后台服务器
const dataServer = 'http://39.107.84.16:8001/'
// 本地后台服务器
// const dataServer = 'http://127.0.0.1:8001/'
// 默认图片
const defaultPic = 'http://39.107.84.16:9001/Undefined.png'
module.exports = {
  PicServer: picServer,
  VideoServer: videoServer,
  DataServer: dataServer,
  DefaultPic: defaultPic
}
