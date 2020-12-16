// 防止按钮重复点击
export default {}.install = (Vue, options = {}) => {
  Vue.directive('dbClick', {
    inserted (el, binding) {
      el.addEventListener('click', e => {
        if (!el.disabled) {
          el.disabled = true
          el.style.cursor = 'not-allowed'
          setTimeout(() => {
            el.style.cursor = 'pointer'
            el.disabled = false
          }, 3000)
        }
      })
    }
  })
}

//使用：标签里用v-db-click 例如<el-button type="primary" @click="dataFormSubmit()" v-db-click>确定</el-button>