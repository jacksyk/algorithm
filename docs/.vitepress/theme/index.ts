
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 这里可以添加自定义的 Vue 组件或其他增强功能
  }
}