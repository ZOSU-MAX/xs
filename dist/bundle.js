/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/app.js":
/*!*************************!*\
  !*** ./src/core/app.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createApp: () => (/* binding */ createApp)\n/* harmony export */ });\n/* harmony import */ var _renderer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer.js */ \"./src/core/renderer.js\");\n/* harmony import */ var _vdom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vdom.js */ \"./src/core/vdom.js\");\n// src/core/app.js\n// 应用实例创建与管理\n\n\n\n\n/**\n * 创建应用实例\n * @param {Object} rootComponent - 根组件选项\n * @returns {App} 应用实例对象\n */\nfunction createApp(rootComponent) {\n  return {\n    /**\n     * 挂载应用到DOM\n     * @param {string} selector - DOM选择器\n     */\n    mount(selector) {\n      const container = document.querySelector(selector);\n      console.log('Mounting to container:', container);\n      if (!container) {\n        console.error(`Mount container not found: ${selector}`);\n        return;\n      }\n\n      // 创建根组件虚拟节点\n      // 将整个根组件作为虚拟节点的tag，使其被识别为组件\n      const vnode = (0,_vdom_js__WEBPACK_IMPORTED_MODULE_1__.h)(rootComponent, rootComponent.props, rootComponent.children);\n      \n      // 渲染到容器\n      (0,_renderer_js__WEBPACK_IMPORTED_MODULE_0__.render)(vnode, container);\n    }\n  };\n}\n\n\n\n//# sourceURL=webpack://XS/./src/core/app.js?\n}");

/***/ }),

/***/ "./src/core/component.js":
/*!*******************************!*\
  !*** ./src/core/component.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createComponentInstance: () => (/* binding */ createComponentInstance),\n/* harmony export */   onMounted: () => (/* binding */ onMounted),\n/* harmony export */   renderComponent: () => (/* binding */ renderComponent),\n/* harmony export */   triggerHooks: () => (/* binding */ triggerHooks)\n/* harmony export */ });\n/* harmony import */ var _vdom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vdom.js */ \"./src/core/vdom.js\");\n/* harmony import */ var _reactivity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reactivity.js */ \"./src/core/reactivity.js\");\n// src/core/component.js\n// 组件系统实现\n\n\n\n\n/**\n * 创建组件实例\n * @param {Object} component - 组件选项\n * @param {Object} props - 组件属性\n * @returns {ComponentInstance} 组件实例\n */\nfunction createComponentInstance(component, props) {\n  console.log('Creating component instance:', component);\n  const instance = {\n    component,\n    props: (0,_reactivity_js__WEBPACK_IMPORTED_MODULE_1__.reactive)(props || {}),\n    vnode: null,\n    el: null,\n    isMounted: false,\n    // 生命周期钩子队列\n    hooks: {\n      mounted: [],\n      updated: [],\n      unmounted: []\n    }\n  };\n\n  // 绑定生命周期钩子\n  if (component.mounted) {\n    instance.hooks.mounted.push(component.mounted);\n  }\n\n  return instance;\n}\n\n/**\n * 渲染组件\n * @param {ComponentInstance} instance - 组件实例\n * @returns {VNode} 组件渲染产生的虚拟节点\n */\nfunction renderComponent(instance) {\n  // 设置当前组件实例\n  currentInstance = instance;\n\n  // 创建合并了props和setupState的渲染上下文\n  const renderContext = {\n    ...instance.props,\n    ...instance.setupState\n  };\n\n  // 调用组件的render函数获取虚拟节点，绑定渲染上下文\n  const vnode = instance.component.render.call(renderContext);\n  instance.vnode = vnode;\n\n  // 重置当前组件实例\n  currentInstance = null;\n\n  return vnode;\n}\n\n// 当前正在渲染的组件实例\nlet currentInstance = null;\n\n/**\n * 注册生命周期钩子\n * @param {string} hook - 钩子名称\n * @param {Function} callback - 回调函数\n */\nfunction onMounted(callback) {\n  if (currentInstance) {\n    currentInstance.hooks.mounted.push(callback);\n  }\n}\n\n/**\n * 触发生命周期钩子\n * @param {ComponentInstance} instance - 组件实例\n * @param {string} hook - 钩子名称\n */\nfunction triggerHooks(instance, hook) {\n  if (instance.hooks[hook]) {\n    instance.hooks[hook].forEach(callback => callback.call(instance));\n  }\n}\n\n\n\n//# sourceURL=webpack://XS/./src/core/component.js?\n}");

/***/ }),

/***/ "./src/core/reactivity.js":
/*!********************************!*\
  !*** ./src/core/reactivity.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   effect: () => (/* binding */ effect),\n/* harmony export */   reactive: () => (/* binding */ reactive),\n/* harmony export */   track: () => (/* binding */ track),\n/* harmony export */   trigger: () => (/* binding */ trigger)\n/* harmony export */ });\n// src/core/reactivity.js\n// 响应式系统核心实现\n\n// 存储依赖关系的映射表: target -> key -> dep\nconst targetMap = new WeakMap();\nlet activeEffect = null;\n\n/**\n * 收集依赖\n * @param {Object} target - 目标对象\n * @param {string} key - 属性名\n */\nfunction track(target, key) {\n  if (!activeEffect) return;\n  let depsMap = targetMap.get(target);\n  if (!depsMap) {\n    targetMap.set(target, (depsMap = new Map()));\n  }\n  let dep = depsMap.get(key);\n  if (!dep) {\n    depsMap.set(key, (dep = new Set()));\n  }\n  dep.add(activeEffect);\n}\n\n/**\n * 触发依赖\n * @param {Object} target - 目标对象\n * @param {string} key - 属性名\n */\nfunction trigger(target, key) {\n  const depsMap = targetMap.get(target);\n  if (!depsMap) return;\n  const dep = depsMap.get(key);\n  if (dep) {\n    dep.forEach(effect => effect());\n  }\n}\n\n/**\n * 创建响应式对象\n * @param {Object} target - 原始对象\n * @returns {Proxy} 响应式代理对象\n */\nfunction reactive(target) {\n  return new Proxy(target, {\n    get(target, key, receiver) {\n      const res = Reflect.get(target, key, receiver);\n      track(target, key);\n      return res;\n    },\n    set(target, key, value, receiver) {\n      const res = Reflect.set(target, key, value, receiver);\n      trigger(target, key);\n      return res;\n    }\n  });\n}\n\n/**\n * 注册副作用函数\n * @param {Function} fn - 副作用函数\n */\nfunction effect(fn) {\n  const effectFn = () => {\n    activeEffect = fn;\n    const result = fn();\n    activeEffect = null;\n    return result;\n  };\n  \n  effectFn(); // 立即执行一次\n  return effectFn; // 返回runner函数\n}\n\n\n\n//# sourceURL=webpack://XS/./src/core/reactivity.js?\n}");

/***/ }),

/***/ "./src/core/renderer.js":
/*!******************************!*\
  !*** ./src/core/renderer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var _vdom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vdom.js */ \"./src/core/vdom.js\");\n/* harmony import */ var _reactivity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reactivity.js */ \"./src/core/reactivity.js\");\n/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component.js */ \"./src/core/component.js\");\n// src/core/renderer.js\n// 虚拟DOM渲染器实现\n\n\n\n\n\n\n/**\n * 将虚拟节点渲染到容器中\n * @param {VNode} vnode - 虚拟节点\n * @param {HTMLElement} container - 容器DOM元素\n */\nfunction render(vnode, container) {\n  console.log('Rendering vnode:', vnode);\n  // 清空容器\n  container.innerHTML = '';\n  \n  // 递归渲染节点\n  const el = createElement(vnode);\n  console.log('Created element:', el);\n  container.appendChild(el);\n  console.log('Render completed. Container content:', container.innerHTML);\n  return el;\n}\n\n/**\n * 创建真实DOM元素\n * @param {VNode} vnode - 虚拟节点\n * @returns {HTMLElement} 真实DOM元素\n */\nfunction createElement(vnode) {\n  if (vnode.type === 'text') {\n    // 文本节点\n    return document.createTextNode(vnode.text);\n  }\n\n  // 如果是组件\n  console.log('Component check - tag type:', typeof vnode.tag, 'has render:', !!vnode.tag?.render);\n  if (typeof vnode.tag === 'object') {\n    console.log('Tag is object - render exists:', !!vnode.tag.render);\n    if (vnode.tag.render) {\n      console.log('Treating vnode as component');\n      return renderComponentVNode(vnode);\n    } else {\n      console.log('Object tag has no render function');\n    }\n  } else {\n    console.log('Treating vnode as element, tag:', vnode.tag);\n  }\n\n  // 检查标签是否为有效字符串\n  if (typeof vnode.tag === 'string') {\n    // 元素节点\n    const el = document.createElement(vnode.tag);\n    vnode.el = el; // 保存真实DOM引用\n\n    // 设置属性\n    if (vnode.props) {\n      for (const key in vnode.props) {\n        setAttribute(el, key, vnode.props[key]);\n      }\n    }\n\n    // 处理子节点 - 确保只对元素节点进行操作\n    if (vnode.children && el.nodeType === 1) {\n      // 确保children始终是数组\n      const children = Array.isArray(vnode.children) ? vnode.children : [vnode.children];\n      children.forEach(child => {\n          if (typeof child === 'string') {\n            // 文本子节点\n            const textNode = document.createTextNode(child);\n            console.log('Appending text node with content:', textNode.textContent);\n            el.appendChild(textNode);\n          } else if (child?.type === 'vnode') {\n            // 虚拟节点子节点 - 创建并追加元素\n            const childEl = createElement(child);\n            // 更可靠的Node类型检查\n          try {\n            if (childEl instanceof Node) {\n            el.appendChild(childEl);\n          } else {\n            throw new Error('Child element is not a valid Node');\n          }\n          } catch (e) {\n            console.error('Failed to append child element:', e, 'Child element:', childEl);\n            const errorNode = document.createTextNode('[Error appending child element]');\n            el.appendChild(errorNode);\n          }\n          } else if (child?.type === 'text') {\n            // 文本节点对象\n            const textNode = document.createTextNode(child.text);\n            console.log('Appending text node object with content:', textNode.textContent);\n            el.appendChild(textNode);\n          } else {\n            // 处理非预期类型的子节点\n            const nodeType = Object.prototype.toString.call(child);\n            console.error('Invalid child type for appendChild:', nodeType, child);\n            // 回退为文本节点显示错误信息\n            const errorNode = document.createTextNode(`[Invalid child: ${nodeType}]`);\n            el.appendChild(errorNode);\n          }\n        });\n    }\n\n    return el;\n  } else {\n    // 无效标签类型\n    console.error('Invalid vnode tag type:', typeof vnode.tag);\n    return document.createTextNode(`[Invalid vnode tag: ${typeof vnode.tag}]`);\n  }\n}\n\n/**\n * 设置元素属性\n * @param {HTMLElement} el - DOM元素\n * @param {string} key - 属性名\n * @param {any} value - 属性值\n */\nfunction setAttribute(el, key, value) {\n  if (key.startsWith('on')) {\n    // 事件监听\n    const event = key.slice(2).toLowerCase();\n    el.addEventListener(event, value);\n  } else if (key === 'class') {\n    el.className = value;\n  } else {\n    el.setAttribute(key, value);\n  }\n}\n\n/**\n * 渲染组件虚拟节点\n * @param {VNode} vnode - 组件虚拟节点\n * @returns {HTMLElement} 渲染后的DOM元素\n */\nfunction renderComponentVNode(vnode) {\n  console.log('Entering renderComponentVNode');\n  // 创建组件实例\n  const instance = (0,_component_js__WEBPACK_IMPORTED_MODULE_2__.createComponentInstance)(vnode.tag, vnode.props);\n  \n  // 确保render函数存在且为函数\n    instance.render = function() {\n      console.error('Component render function not properly initialized', vnode.tag);\n      return {\n        type: 'div',\n        children: [`[Component Error: Render function not initialized]`]\n      };\n    };\n\n    if (typeof vnode.tag === 'object' && vnode.tag !== null) {\n      // 处理组件定义\n      if (typeof vnode.tag.render === 'function') {\n        // 调用setup函数\n        if (vnode.tag.setup) {\n          try {\n            const setupResult = vnode.tag.setup(instance.props);\n            // 处理setup返回值\n            if (typeof setupResult === 'function') {\n              instance.render = setupResult.bind(instance);\n            } else if (typeof setupResult === 'object' && setupResult !== null) {\n              instance.setupState = setupResult;\n              instance.render = vnode.tag.render.bind(instance.setupState);\n            } else {\n              instance.render = vnode.tag.render.bind(instance);\n            }\n          } catch (e) {\n            console.error('Error in component setup function:', e);\n            instance.render = function() {\n              return {\n                type: 'div',\n                children: [`[Component Error: Setup failed - ${e.message}]`]\n              };\n            };\n          }\n        } else {\n          // 没有setup函数，直接绑定render\n          instance.render = vnode.tag.render.bind(instance);\n        }\n      } else {\n        console.error('Component is missing required render function:', vnode.tag);\n        instance.render = function() {\n          return {\n            type: 'div',\n            children: [`[Component Error: Missing render function]`]\n          };\n        };\n      }\n    } else {\n      console.error('Invalid component definition:', vnode.tag);\n      instance.render = function() {\n        return {\n          type: 'div',\n          children: [`[Component Error: Invalid component definition]`]\n        };\n      };\n    }\n  \n  // 最终检查确保render是函数 - 移至setupComponent末尾\n  if (typeof instance.render !== 'function') {\n    console.error('Final check failed: Component render is not a function', instance);\n    instance.render = function() {\n      return {\n        type: 'div',\n        children: [`[Component Error: Render function is not a function]`]\n      };\n    };\n  }\n  \n  setupRenderEffect(instance);\n  \n  return instance.el;\n}\n\n/**\n * 比较新旧虚拟节点并更新DOM\n * @param {VNode} oldVNode - 旧虚拟节点\n * @param {VNode} newVNode - 新虚拟节点\n */\n\nfunction setupRenderEffect(instance) {\n  instance.update = (0,_reactivity_js__WEBPACK_IMPORTED_MODULE_1__.effect)(() => {\n    try {\n      const subTree = instance.render();\n      if (!subTree) {\n        console.error('Component render returned no vnode');\n        instance.el = document.createTextNode('[Component render error: No vnode]');\n        return;\n      }\n      if (!instance.isMounted) {\n        // 首次渲染\n        const el = createElement(subTree);\n        instance.el = el;\n        instance.vnode = subTree;\n        (0,_component_js__WEBPACK_IMPORTED_MODULE_2__.triggerHooks)(instance, 'mounted');\n        instance.isMounted = true;\n        return el;\n      } else {\n        // 更新渲染\n        const prevVNode = instance.vnode;\n        instance.vnode = subTree;\n        patch(prevVNode, subTree);\n        (0,_component_js__WEBPACK_IMPORTED_MODULE_2__.triggerHooks)(instance, 'updated');\n      }\n    } catch (e) {\n      console.error('Component render error:', e);\n      instance.el = document.createTextNode(`[Component error: ${e.message}]`);\n    }\n  });\n  // 立即执行一次update以确保instance.el被正确设置\n  instance.update();\n}\n\nfunction patch(oldVNode, newVNode) {  // 如果新旧节点相同，直接返回\n  if (oldVNode === newVNode) return;\n\n  // 如果标签不同，直接替换元素\n  if (oldVNode.tag !== newVNode.tag) {\n    oldVNode.el.parentNode.replaceChild(createElement(newVNode), oldVNode.el);\n    return;\n  }\n\n  // 文本节点更新\n  if (oldVNode.type === 'text') {\n    oldVNode.el.textContent = newVNode.text;\n    return;\n  }\n\n  // 更新元素属性\n  const el = newVNode.el = oldVNode.el;\n  const oldProps = oldVNode.props || {};\n  const newProps = newVNode.props || {};\n\n  // 设置新属性\n  for (const key in newProps) {\n    if (newProps[key] !== oldProps[key]) {\n      setAttribute(el, key, newProps[key]);\n    }\n  }\n\n  // 移除旧属性\n  for (const key in oldProps) {\n    if (!(key in newProps)) {\n      el.removeAttribute(key);\n    }\n  }\n\n  // 更新子节点\n  patchChildren(el, oldVNode.children, newVNode.children);\n}\n\n/**\n * 更新子节点\n * @param {HTMLElement} el - 父DOM元素\n * @param {Array} oldChildren - 旧子节点数组\n * @param {Array} newChildren - 新子节点数组\n */\nfunction patchChildren(el, oldChildren, newChildren) {\n  // 简化实现：直接替换所有子节点\n  el.innerHTML = '';\n  if (newChildren) {\n    newChildren.forEach(child => {\n      if (typeof child === 'string') {\n        el.appendChild(document.createTextNode(child));\n      } else if (child.type === 'vnode') {\n        el.appendChild(createElement(child));\n      }\n    });\n  }\n}\n\n\n\n//# sourceURL=webpack://XS/./src/core/renderer.js?\n}");

/***/ }),

/***/ "./src/core/vdom.js":
/*!**************************!*\
  !*** ./src/core/vdom.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   h: () => (/* binding */ h)\n/* harmony export */ });\n// src/core/vdom.js\n// 虚拟DOM创建函数\n\n/**\n * 创建虚拟节点(VNode)\n * @param {string|Component} tag - 标签名或组件\n * @param {Object} [props] - 属性对象\n * @param {Array|string} [children] - 子节点数组或文本\n * @returns {VNode} 虚拟节点对象\n */\nfunction h(tag, props = {}, children = []) {\n  console.log('Starting vnode creation with tag:', tag, 'props:', props, 'raw children:', children);\n  // 确保children始终是数组\n  if (!Array.isArray(children)) {\n    children = [children];\n    console.log('Converted non-array children to array:', children);\n  }\n  // 将字符串子节点转换为文本节点对象\n  children = children.map(child => {\n    if (typeof child === 'string') {\n      return { type: 'text', text: child };\n    }\n    return child;\n  });\n  console.log('Processed children array:', children);\n  \n  const vnode = {\n    type: 'vnode',\n    tag,\n    props,\n    children,\n    el: null // 将来会存储对应的真实DOM元素\n  };\n  console.log('Created vnode:', vnode);\n  return vnode;\n}\n\n\n\n//# sourceURL=webpack://XS/./src/core/vdom.js?\n}");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createApp: () => (/* reexport safe */ _core_app_js__WEBPACK_IMPORTED_MODULE_2__.createApp),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   effect: () => (/* reexport safe */ _core_reactivity_js__WEBPACK_IMPORTED_MODULE_0__.effect),\n/* harmony export */   h: () => (/* reexport safe */ _core_vdom_js__WEBPACK_IMPORTED_MODULE_1__.h),\n/* harmony export */   onMounted: () => (/* reexport safe */ _core_component_js__WEBPACK_IMPORTED_MODULE_3__.onMounted),\n/* harmony export */   reactive: () => (/* reexport safe */ _core_reactivity_js__WEBPACK_IMPORTED_MODULE_0__.reactive),\n/* harmony export */   render: () => (/* reexport safe */ _core_renderer_js__WEBPACK_IMPORTED_MODULE_4__.render)\n/* harmony export */ });\n/* harmony import */ var _core_reactivity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/reactivity.js */ \"./src/core/reactivity.js\");\n/* harmony import */ var _core_vdom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/vdom.js */ \"./src/core/vdom.js\");\n/* harmony import */ var _core_app_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/app.js */ \"./src/core/app.js\");\n/* harmony import */ var _core_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/component.js */ \"./src/core/component.js\");\n/* harmony import */ var _core_renderer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/renderer.js */ \"./src/core/renderer.js\");\n// src/index.js\r\n// 导出核心API\r\n// src/index.js\r\n// 导出核心API\r\n\r\n\r\n\r\n\r\n\r\n\r\n// 导出为默认对象，供全局访问\r\nconst XS = {\r\n  reactive: _core_reactivity_js__WEBPACK_IMPORTED_MODULE_0__.reactive,\r\n  effect: _core_reactivity_js__WEBPACK_IMPORTED_MODULE_0__.effect,\r\n  h: _core_vdom_js__WEBPACK_IMPORTED_MODULE_1__.h,\r\n  createApp: _core_app_js__WEBPACK_IMPORTED_MODULE_2__.createApp,\r\n  onMounted: _core_component_js__WEBPACK_IMPORTED_MODULE_3__.onMounted,\r\n  render: _core_renderer_js__WEBPACK_IMPORTED_MODULE_4__.render\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (XS);\r\n// 同时保留命名导出以便模块导入\r\n\n\n//# sourceURL=webpack://XS/./src/index.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	window.XS = __webpack_exports__["default"];
/******/ 	
/******/ })()
;