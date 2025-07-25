// src/main.js
// 示例应用入口
console.log('main.js module loaded');
import { reactive, onMounted, render } from './index.js';
import { h } from './core/vdom.js';

// 定义计数器组件
const Counter = {
  render() {
    return h('div', { class: 'counter' }, [
      h('h1', null, `Count: ${this.count}`),
      h('button', { onclick: () => this.count++ }, 'Increment')
    ]);
  },
  setup() {
    const state = reactive({ count: 0 });

    onMounted(() => {
      console.log('Counter component mounted!');
    });

    return state;
  }
};

// 定义根组件
const App = {
  render() {
    console.log('Root component render called');
    return h('div', { id: 'app' }, [
      h('h1', null, 'My Vue3-like Library'),
      h(Counter)
    ]);
  }
};

// 导出根组件供index.html使用
export default App;

// 恢复原始计数器应用

  // 确保只调用一次createApp并使用动态导入避免重复声明
  if (!window.__XS_APP__) {
    window.__XS_APP__ = true;
    import('./index.js').then(({ createApp }) => {
      createApp(App).mount('#app');
    });
  }

  // 移除临时测试代码