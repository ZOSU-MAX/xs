// src/index.js
// 导出核心API
// src/index.js
// 导出核心API
import { reactive, effect } from './core/reactivity.js';
import { h } from './core/vdom.js';
import { createApp } from './core/app.js';
import { onMounted } from './core/component.js';
import { render } from './core/renderer.js';

// 导出为默认对象，供全局访问
const XS = {
  reactive,
  effect,
  h,
  createApp,
  onMounted,
  render
};

export default XS;
// 同时保留命名导出以便模块导入
export { reactive, effect, h, createApp, onMounted, render };