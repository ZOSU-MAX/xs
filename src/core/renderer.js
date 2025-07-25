// src/core/renderer.js
// 虚拟DOM渲染器实现

import { h } from './vdom.js';
import { effect } from './reactivity.js';
import { createComponentInstance, renderComponent, triggerHooks } from './component.js';


/**
 * 将虚拟节点渲染到容器中
 * @param {VNode} vnode - 虚拟节点
 * @param {HTMLElement} container - 容器DOM元素
 */
function render(vnode, container) {
  console.log('Rendering vnode:', vnode);
  // 清空容器
  container.innerHTML = '';
  
  // 递归渲染节点
  const el = createElement(vnode);
  console.log('Created element:', el);
  container.appendChild(el);
  console.log('Render completed. Container content:', container.innerHTML);
  return el;
}

/**
 * 创建真实DOM元素
 * @param {VNode} vnode - 虚拟节点
 * @returns {HTMLElement} 真实DOM元素
 */
function createElement(vnode) {
  if (vnode.type === 'text') {
    // 文本节点
    return document.createTextNode(vnode.text);
  }

  // 如果是组件
  console.log('Component check - tag type:', typeof vnode.tag, 'has render:', !!vnode.tag?.render);
  if (typeof vnode.tag === 'object') {
    console.log('Tag is object - render exists:', !!vnode.tag.render);
    if (vnode.tag.render) {
      console.log('Treating vnode as component');
      return renderComponentVNode(vnode);
    } else {
      console.log('Object tag has no render function');
    }
  } else {
    console.log('Treating vnode as element, tag:', vnode.tag);
  }

  // 检查标签是否为有效字符串
  if (typeof vnode.tag === 'string') {
    // 元素节点
    const el = document.createElement(vnode.tag);
    vnode.el = el; // 保存真实DOM引用

    // 设置属性
    if (vnode.props) {
      for (const key in vnode.props) {
        setAttribute(el, key, vnode.props[key]);
      }
    }

    // 处理子节点 - 确保只对元素节点进行操作
    if (vnode.children && el.nodeType === 1) {
      vnode.children.forEach(child => {
          if (typeof child === 'string') {
            // 文本子节点
            const textNode = document.createTextNode(child);
            console.log('Appending text node with content:', textNode.textContent);
            el.appendChild(textNode);
          } else if (child?.type === 'vnode') {
            // 虚拟节点子节点 - 创建并追加元素
            const childEl = createElement(child);
            // 更可靠的Node类型检查
          try {
            if (childEl instanceof Node) {
            el.appendChild(childEl);
          } else {
            throw new Error('Child element is not a valid Node');
          }
          } catch (e) {
            console.error('Failed to append child element:', e, 'Child element:', childEl);
            const errorNode = document.createTextNode('[Error appending child element]');
            el.appendChild(errorNode);
          }
          } else if (child?.type === 'text') {
            // 文本节点对象
            const textNode = document.createTextNode(child.text);
            console.log('Appending text node object with content:', textNode.textContent);
            el.appendChild(textNode);
          } else {
            // 处理非预期类型的子节点
            const nodeType = Object.prototype.toString.call(child);
            console.error('Invalid child type for appendChild:', nodeType, child);
            // 回退为文本节点显示错误信息
            const errorNode = document.createTextNode(`[Invalid child: ${nodeType}]`);
            el.appendChild(errorNode);
          }
        });
    }

    return el;
  } else {
    // 无效标签类型
    console.error('Invalid vnode tag type:', typeof vnode.tag);
    return document.createTextNode(`[Invalid vnode tag: ${typeof vnode.tag}]`);
  }
}

/**
 * 设置元素属性
 * @param {HTMLElement} el - DOM元素
 * @param {string} key - 属性名
 * @param {any} value - 属性值
 */
function setAttribute(el, key, value) {
  if (key.startsWith('on')) {
    // 事件监听
    const event = key.slice(2).toLowerCase();
    el.addEventListener(event, value);
  } else if (key === 'class') {
    el.className = value;
  } else {
    el.setAttribute(key, value);
  }
}

/**
 * 渲染组件虚拟节点
 * @param {VNode} vnode - 组件虚拟节点
 * @returns {HTMLElement} 渲染后的DOM元素
 */
function renderComponentVNode(vnode) {
  console.log('Entering renderComponentVNode');
  // 创建组件实例
  const instance = createComponentInstance(vnode.tag, vnode.props);
  
  // 确保render函数存在且为函数
    instance.render = function() {
      console.error('Component render function not properly initialized', vnode.tag);
      return {
        type: 'div',
        children: [`[Component Error: Render function not initialized]`]
      };
    };

    if (typeof vnode.tag === 'object' && vnode.tag !== null) {
      // 处理组件定义
      if (typeof vnode.tag.render === 'function') {
        // 调用setup函数
        if (vnode.tag.setup) {
          try {
            const setupResult = vnode.tag.setup(instance.props);
            // 处理setup返回值
            if (typeof setupResult === 'function') {
              instance.render = setupResult.bind(instance);
            } else if (typeof setupResult === 'object' && setupResult !== null) {
              instance.setupState = setupResult;
              instance.render = vnode.tag.render.bind(instance.setupState);
            } else {
              instance.render = vnode.tag.render.bind(instance);
            }
          } catch (e) {
            console.error('Error in component setup function:', e);
            instance.render = function() {
              return {
                type: 'div',
                children: [`[Component Error: Setup failed - ${e.message}]`]
              };
            };
          }
        } else {
          // 没有setup函数，直接绑定render
          instance.render = vnode.tag.render.bind(instance);
        }
      } else {
        console.error('Component is missing required render function:', vnode.tag);
        instance.render = function() {
          return {
            type: 'div',
            children: [`[Component Error: Missing render function]`]
          };
        };
      }
    } else {
      console.error('Invalid component definition:', vnode.tag);
      instance.render = function() {
        return {
          type: 'div',
          children: [`[Component Error: Invalid component definition]`]
        };
      };
    }
  
  // 最终检查确保render是函数 - 移至setupComponent末尾
  if (typeof instance.render !== 'function') {
    console.error('Final check failed: Component render is not a function', instance);
    instance.render = function() {
      return {
        type: 'div',
        children: [`[Component Error: Render function is not a function]`]
      };
    };
  }
  
  setupRenderEffect(instance);
  
  return instance.el;
}

/**
 * 比较新旧虚拟节点并更新DOM
 * @param {VNode} oldVNode - 旧虚拟节点
 * @param {VNode} newVNode - 新虚拟节点
 */

function setupRenderEffect(instance) {
  instance.update = effect(() => {
    try {
      const subTree = instance.render();
      if (!subTree) {
        console.error('Component render returned no vnode');
        instance.el = document.createTextNode('[Component render error: No vnode]');
        return;
      }
      if (!instance.isMounted) {
        // 首次渲染
        const el = createElement(subTree);
        instance.el = el;
        instance.vnode = subTree;
        triggerHooks(instance, 'mounted');
        instance.isMounted = true;
        return el;
      } else {
        // 更新渲染
        const prevVNode = instance.vnode;
        instance.vnode = subTree;
        patch(prevVNode, subTree);
        triggerHooks(instance, 'updated');
      }
    } catch (e) {
      console.error('Component render error:', e);
      instance.el = document.createTextNode(`[Component error: ${e.message}]`);
    }
  });
  // 立即执行一次update以确保instance.el被正确设置
  instance.update();
}

function patch(oldVNode, newVNode) {  // 如果新旧节点相同，直接返回
  if (oldVNode === newVNode) return;

  // 如果标签不同，直接替换元素
  if (oldVNode.tag !== newVNode.tag) {
    oldVNode.el.parentNode.replaceChild(createElement(newVNode), oldVNode.el);
    return;
  }

  // 文本节点更新
  if (oldVNode.type === 'text') {
    oldVNode.el.textContent = newVNode.text;
    return;
  }

  // 更新元素属性
  const el = newVNode.el = oldVNode.el;
  const oldProps = oldVNode.props || {};
  const newProps = newVNode.props || {};

  // 设置新属性
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      setAttribute(el, key, newProps[key]);
    }
  }

  // 移除旧属性
  for (const key in oldProps) {
    if (!(key in newProps)) {
      el.removeAttribute(key);
    }
  }

  // 更新子节点
  patchChildren(el, oldVNode.children, newVNode.children);
}

/**
 * 更新子节点
 * @param {HTMLElement} el - 父DOM元素
 * @param {Array} oldChildren - 旧子节点数组
 * @param {Array} newChildren - 新子节点数组
 */
function patchChildren(el, oldChildren, newChildren) {
  // 简化实现：直接替换所有子节点
  el.innerHTML = '';
  if (newChildren) {
    newChildren.forEach(child => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else if (child.type === 'vnode') {
        el.appendChild(createElement(child));
      }
    });
  }
}

export { render };