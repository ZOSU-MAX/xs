// src/core/component.js
// 组件系统实现

import { h } from './vdom.js';
import { reactive } from './reactivity.js';

/**
 * 创建组件实例
 * @param {Object} component - 组件选项
 * @param {Object} props - 组件属性
 * @returns {ComponentInstance} 组件实例
 */
function createComponentInstance(component, props) {
  console.log('Creating component instance:', component);
  const instance = {
    component,
    props: reactive(props || {}),
    vnode: null,
    el: null,
    isMounted: false,
    // 生命周期钩子队列
    hooks: {
      mounted: [],
      updated: [],
      unmounted: []
    }
  };

  // 绑定生命周期钩子
  if (component.mounted) {
    instance.hooks.mounted.push(component.mounted);
  }

  return instance;
}

/**
 * 渲染组件
 * @param {ComponentInstance} instance - 组件实例
 * @returns {VNode} 组件渲染产生的虚拟节点
 */
function renderComponent(instance) {
  // 设置当前组件实例
  currentInstance = instance;

  // 创建合并了props和setupState的渲染上下文
  const renderContext = {
    ...instance.props,
    ...instance.setupState
  };

  // 调用组件的render函数获取虚拟节点，绑定渲染上下文
  const vnode = instance.component.render.call(renderContext);
  instance.vnode = vnode;

  // 重置当前组件实例
  currentInstance = null;

  return vnode;
}

// 当前正在渲染的组件实例
let currentInstance = null;

/**
 * 注册生命周期钩子
 * @param {string} hook - 钩子名称
 * @param {Function} callback - 回调函数
 */
function onMounted(callback) {
  if (currentInstance) {
    currentInstance.hooks.mounted.push(callback);
  }
}

/**
 * 触发生命周期钩子
 * @param {ComponentInstance} instance - 组件实例
 * @param {string} hook - 钩子名称
 */
function triggerHooks(instance, hook) {
  if (instance.hooks[hook]) {
    instance.hooks[hook].forEach(callback => callback.call(instance));
  }
}

export { createComponentInstance, renderComponent, onMounted, triggerHooks };