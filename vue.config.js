/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */

//const url = 'http://hywl-gateway:9999'
// const url = 'http://192.168.3.24:9999'
// const url = 'http://192.168.3.30:9999'
// const url = 'http://47.108.93.86:9999'
// const url = 'https://web.cclppt.cn'
const url = 'https://api.qcwlpt.com'
// const url = 'https://web.sxzsys.com'

let argvs;
//下面的步骤就是获取命令行参数。
try {
  argvs = JSON.parse(process.env.npm_config_argv).original;
} catch (ex) {
  argvs = process.argv;//返回命令脚本中各个参数所组成的数组
}
let argv = argvs.slice(2);
let envValue = argv[0];
if (envValue === "yn_94_pro" || envValue === "yn_94_pro=yn_94_pro") {
  url = 'https://web.sxzsys.com';
}
if (envValue === "hywl_pro" || envValue === "hywl_pro=hywl_pro") {
  url = 'https://api.qcwlpt.com';
}

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'axios': 'axios'
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  // 配置转发代理
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      '/': {
        target: url,
        ws: false, // 需要websocket 开启
        // changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
      // 3.5 以后不需要再配置
    }
  }
}
