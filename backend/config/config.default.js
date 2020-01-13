module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_chris110408'

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = [ 'errorHandler' ]


  // config.errorHandler = {
  //   match: '/api',
  // }

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost',"http://192.168.31.66:8000","http://192.168.31.66:8000","https://dist.lei110408.now.sh/" ],
  }
  config.multipart = {
    fileExtensions: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov' ], // 增加对 .apk 扩展名的支持
  },

      config.bcrypt = {
        saltRounds: 10 // default 10
      }

  config.mongoose = {
    url: 'mongodb://demoadmin:demoadmin2019@ds331735.mlab.com:31735/demo_2019',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  }




  return config
}
