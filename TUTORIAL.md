# XS 框架使用教程

## 第一章：框架基础

### 1.1 什么是XS框架？
XS是一个轻量级前端框架，采用虚拟DOM和响应式编程思想，让开发者能够以组件化方式构建Web应用。框架设计简洁，核心代码不足10KB，适合构建中小型Web应用。

### 1.2 核心概念
- **虚拟DOM(VNode)**：内存中的DOM描述，提高渲染性能
- **组件(Component)**：UI的独立可复用单元
- **响应式(Reactivity)**：数据变化自动更新视图
- **渲染器(Renderer)**：将虚拟DOM转换为真实DOM

## 第二章：快速开始

### 2.1 创建第一个应用

1. **创建应用实例**
```javascript
// src/main.js
import { createApp } from './core/app.js';

const app = createApp({
  render() {
    return h('div', { id: 'app' }, 'Hello XS!');
  }
});

app.mount('#app');
```

2. **HTML模板**
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <title>XS App</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

3. **运行应用**
```bash
npm run dev
```

## 第三章：组件系统

### 3.1 定义组件
组件是XS应用的基本构建块，每个组件是一个包含`setup`和`render`方法的对象：

```javascript
// src/components/Counter.js
export default {
  // 组件状态和逻辑设置
  setup() {
    const state = reactive({
      count: 0
    });

    const increment = () => {
      state.count++;
    };

    // 返回在render中需要使用的状态和方法
    return { state, increment };
  },

  // 渲染函数，返回虚拟DOM
  render() {
    return h('div', { class: 'counter' }, [
      h('p', null, `Count: ${this.state.count}`),
      h('button', { onclick: this.increment }, 'Increment')
    ]);
  }
};
```

### 3.2 使用组件
在父组件中使用子组件：

```javascript
// src/main.js
import Counter from './components/Counter.js';

const app = createApp({
  render() {
    return h('div', { id: 'app' }, [
      h('h1', null, 'My XS App'),
      h(Counter)
    ]);
  }
});
```

## 第四章：响应式系统

### 4.1 创建响应式数据
使用`reactive`函数创建响应式对象：

```javascript
import { reactive } from './core/reactivity.js';

const state = reactive({
  message: 'Hello',
  user: {
    name: 'XS'
  }
});
```

### 4.2 响应式数据使用
当响应式数据变化时，依赖它的组件会自动重新渲染：

```javascript
setup() {
  const state = reactive({
    count: 0
  });

  setInterval(() => {
    state.count++;
  }, 1000);

  return { state };
},

render() {
  return h('div', null, `Count: ${this.state.count}`);
}
```

## 第五章：生命周期

组件生命周期钩子允许你在组件不同阶段执行代码：

```javascript
export default {
  setup() {
    // 组件初始化
    return {}
  },

  mounted() {
    // 组件挂载到DOM后执行
    console.log('Component mounted');
  },

  updated() {
    // 组件更新后执行
    console.log('Component updated');
  },

  render() {
    return h('div', null, 'Lifecycle Example');
  }
};
```

## 第六章：事件处理

使用`on`前缀绑定事件处理器：

```javascript
render() {
  return h('button', {
    onclick: () => {
      console.log('Button clicked');
    },
    onmouseover: (e) => {
      console.log('Mouse over button', e);
    }
  }, 'Click Me');
}
```

## 第七章：样式处理

### 7.1 内联样式
```javascript
render() {
  return h('div', {
    style: {
      color: 'red',
      fontSize: '20px',
      backgroundColor: '#f5f5f5'
    }
  }, 'Styled text');
}
```

### 7.2 CSS类名
```javascript
render() {
  return h('div', {
    class: 'container active'
  }, 'With classes');
}
```

## 第八章：高级特性

### 8.1 条件渲染
```javascript
render() {
  return h('div', null, [
    this.state.isLoggedIn
      ? h('p', null, 'Welcome back!')
      : h('button', { onclick: this.login }, 'Login')
  ]);
}
```

### 8.2 列表渲染
```javascript
render() {
  return h('ul', null, 
    this.state.items.map(item => 
      h('li', { key: item.id }, item.name)
    )
  );
}
```

## 第九章：项目打包

### 9.1 生产环境构建
```bash
npm run build
```

### 9.2 打包输出
构建完成后，会在`dist`目录下生成：
- `index.html`：应用入口HTML
- `bundle.js`：打包后的JavaScript文件

这些文件可以直接部署到Web服务器。

## 第十章：常见问题

### Q: 如何调试组件渲染问题？
A: 可以在`render`函数中添加`console.log`，或使用浏览器开发工具的Elements面板检查DOM结构。

### Q: 响应式数据不更新视图怎么办？
A: 确保：
1. 数据是通过`reactive`函数创建的
2. 不要直接替换整个响应式对象
3. 检查是否在响应式上下文中修改数据

### Q: 如何优化应用性能？
A: 
- 使用`key`优化列表渲染
- 避免在渲染函数中创建新函数
- 复杂计算使用`computed`缓存结果

## 附录：API参考

### 核心API
- `createApp(rootComponent)`: 创建应用实例
- `h(tag, props, children)`: 创建虚拟DOM节点
- `reactive(obj)`: 创建响应式对象
- `render(vnode, container)`: 将虚拟DOM渲染到容器

### 组件选项
- `setup(props, context)`: 组件初始化函数
- `render()`: 渲染函数
- `mounted()`, `updated()`, `unmounted()`: 生命周期钩子

### 应用方法
- `app.mount(container)`: 挂载应用到DOM
- `app.use(plugin)`: 安装插件