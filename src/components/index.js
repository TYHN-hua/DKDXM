// 自动批量注册组件
const requireComponent = require.context('./', true, /\.vue$/)
const res = requireComponent.keys().map(requireComponent)
export default (Vue) => {
  res.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
}
