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
  // 如果children是字符串，转换为文本节点
  if (typeof children === 'string') {
    children = [{ type: 'text', text: children }];
    console.log('Converted string children to text node array:', children);
  }
  
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