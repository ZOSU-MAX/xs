# XS 项目文档

## 项目简介
XS 是一个轻量级前端框架，提供虚拟DOM、组件系统和响应式数据绑定功能，帮助开发者构建现代化Web应用。

## 功能特点
- **虚拟DOM**：高效的DOM diff算法，减少重绘重排
- **组件化**：支持组件定义、嵌套和生命周期管理
- **响应式**：基于Proxy的响应式数据绑定系统
- **轻量小巧**：核心代码不足10KB，无第三方依赖
- **易于扩展**：插件化架构设计，支持自定义指令和过滤器

## 安装与使用

### 环境要求
- Node.js v14.0.0+ 
- npm v6.0.0+ 或 yarn v1.22.0+

### 安装步骤
1. 克隆或下载项目到本地
```bash
git clone <项目仓库地址>
cd xs
```

2. 安装依赖
```bash
npm install
```

### 开发模式
```bash
# 启动开发服务器（需先配置dev脚本）
npm run dev
```

### 项目打包
```bash
# 构建生产版本，输出到dist目录
npm run build
```

## 项目结构
```
xs/
├── dist/              # 打包输出目录
│   ├── bundle.js      # 打包后的JS文件
│   └── index.html     # 入口HTML文件
├── src/               # 源代码目录
│   ├── core/          # 框架核心代码
│   │   ├── app.js     # 应用入口
│   │   ├── component.js # 组件系统
│   │   ├── reactivity.js # 响应式系统
│   │   ├── renderer.js # 渲染器
│   │   └── vdom.js    # 虚拟DOM实现
│   ├── index.js       # 框架导出
│   └── main.js        # 应用入口
├── index.html         # HTML模板
├── package.json       # 项目配置
└── webpack.config.js  # Webpack配置
```

## 快速上手教程

### 创建第一个组件
```javascript
// src/components/HelloWorld.js
import { h } from '../core/vdom.js';

export default {
  setup() {
    const message = 'Hello, XS Framework!';
    return { message };
  },
  render() {
    return h('div', { class: 'hello' }, [this.message]);
  }
};
```

### 应用入口文件
```javascript
// src/main.js
import { createApp } from './core/app.js';
import HelloWorld from './components/HelloWorld.js';

// 确保应用只初始化一次
if (!window.__XS_APP__) {
  const app = createApp({
    render() {
      return h('div', { id: 'app' }, [
        h(HelloWorld)
      ]);
    }
  });

  app.mount('#app');
  window.__XS_APP__ = true;
}
```

### 运行与打包
```bash
# 开发模式（需配置开发服务器）
npm run dev

# 打包生产版本
npm run build
```

## API 参考

### createApp
创建应用实例
```javascript
const app = createApp(rootComponent);
app.mount(container);
```

### h
创建虚拟DOM节点
```javascript
const vnode = h(tag, props, children);
```

### reactive
创建响应式对象
```javascript
const state = reactive({
  count: 0
});
```

## 常见问题

### Q: 如何解决组件渲染错误？
A: 检查控制台输出，确保组件有正确的render方法，且返回有效的虚拟DOM节点。

### Q: 打包后页面空白怎么办？
A: 检查浏览器控制台是否有报错，确认webpack配置正确，入口文件是否正确引入。

## 许可证
[MIT](LICENSE)