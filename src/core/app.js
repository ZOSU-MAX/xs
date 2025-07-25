// src/core/app.js
// 应用实例创建与管理

import { render } from './renderer.js';
import { h } from './vdom.js';

/**
 * 创建应用实例
 * @param {Object} rootComponent - 根组件选项
 * @returns {App} 应用实例对象
 */
function createApp(rootComponent) {
  return {
    /**
     * 挂载应用到DOM
     * @param {string} selector - DOM选择器
     */
    mount(selector) {
      const container = document.querySelector(selector);
      console.log('Mounting to container:', container);
      if (!container) {
        console.error(`Mount container not found: ${selector}`);
        return;
      }

      // 创建根组件虚拟节点
      // 将整个根组件作为虚拟节点的tag，使其被识别为组件
      const vnode = h(rootComponent, rootComponent.props, rootComponent.children);
      
      // 渲染到容器
      render(vnode, container);
    }
  };
}

export { createApp };