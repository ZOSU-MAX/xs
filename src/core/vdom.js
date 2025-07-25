// src/core/vdom.js
// 虚拟DOM创建函数

/**
 * 创建虚拟节点(VNode)
 * @param {string|Component} tag - 标签名或组件
 * @param {Object} [props] - 属性对象
 * @param {Array|string} [children] - 子节点数组或文本
 * @returns {VNode} 虚拟节点对象
 */
function h(tag, props = {}, children = []) {
  console.log('Starting vnode creation with tag:', tag, 'props:', props, 'raw children:', children);
  // 确保children始终是数组
  if (!Array.isArray(children)) {
    children = [children];
    console.log('Converted non-array children to array:', children);
  }
  // 将字符串子节点转换为文本节点对象
  children = children.map(child => {
    if (typeof child === 'string') {
      return { type: 'text', text: child };
    }
    return child;
  });
  console.log('Processed children array:', children);
  
  const vnode = {
    type: 'vnode',
    tag,
    props,
    children,
    el: null // 将来会存储对应的真实DOM元素
  };
  console.log('Created vnode:', vnode);
  return vnode;
}

export { h };