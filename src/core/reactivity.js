// src/core/reactivity.js
// 响应式系统核心实现

// 存储依赖关系的映射表: target -> key -> dep
const targetMap = new WeakMap();
let activeEffect = null;

/**
 * 收集依赖
 * @param {Object} target - 目标对象
 * @param {string} key - 属性名
 */
function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect);
}

/**
 * 触发依赖
 * @param {Object} target - 目标对象
 * @param {string} key - 属性名
 */
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}

/**
 * 创建响应式对象
 * @param {Object} target - 原始对象
 * @returns {Proxy} 响应式代理对象
 */
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      track(target, key);
      return res;
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return res;
    }
  });
}

/**
 * 注册副作用函数
 * @param {Function} fn - 副作用函数
 */
function effect(fn) {
  const effectFn = () => {
    activeEffect = fn;
    const result = fn();
    activeEffect = null;
    return result;
  };
  
  effectFn(); // 立即执行一次
  return effectFn; // 返回runner函数
}

export { reactive, effect, track, trigger };