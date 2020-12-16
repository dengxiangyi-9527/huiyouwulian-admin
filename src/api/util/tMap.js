class TMap {

  /**
   * 初始化函数
   * @param {Object} 包含 key，id，option
   */
  init ({
    key = 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77', // 申请的 key，这里是使用了官方示例中的 key 作为默认值

    id = '', // 容器 id，必填

    center = { // 中心点的经纬度
      latitude: 30.67,
      longitude: 104.06
    },

    options = {} // 地图的配置项
  }) {

    // 全局自定义函数，用于处理地图渲染
    window.init = function () {
      // eslint-disable-next-line no-unused-vars
      var map = new qq.maps.Map(document.getElementById(id), {
        center: new qq.maps.LatLng(center.latitude, center.longitude), // 地图的中心地理坐标。
        zoom: 10, // 地图缩放。
        ...options
      })
    }

    // 创建 <script> 标签，省去了手动在 index.html 文件中添加。
    const script = document.createElement('script')
    script.type = 'text/javascript' // scrip 标签内容的类型
    script.charset = 'utf-8' // 设置编码
    script.src = `https://map.qq.com/api/js?v=2.exp&key=${key}&callback=init` // 引入腾讯地图，并指定回调函数名为 init
    document.head.appendChild(script) // 在 head 最底部插入
  }
}

export default new TMap()