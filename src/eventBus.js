// // 事件总线
// const listeners = {};

// export default {
//     // 监听某个事件(触发事件的时候才会运行)
//     $on(eventName, handler){ // 参数：事件名称，要处理的函数
//         if(!listeners[eventName]){ // 先判断有没有这个事件名称，如果没有就往里面加一个事件名称
//             listeners[eventName] = new Set(); // 初始化一个空的集合
//             // new Set(); es6的知识点，为了方式事件名称重复
//         }
//         listeners[eventName].add(handler);  // 往事件名称里添加一个函数
//         // add是 new Set()里的一个方法，add()添加一个函数
//     },

//     // 取消监听
//     $off(eventName, handler){
//         if(!listeners[eventName]){ // 先判断事件监听有没有这个事件名称，如果没有的话直接返回，为了避免报错
//             return;
//         }
//         listeners[eventName].delete(handler); // 删除事件函数
//     },

//     // 触发事件
//     $emit(eventName, ...args){
//         if(!listeners[eventName]){ // 先判断事件监听有没有这个事件名称，如果没有的话直接返回，为了避免报错
//             return;
//         }
//         for(const handler of listeners[eventName]){ // 循环set
//             handler(...args); // 循环到了就运行函数(循环扔过来的数据)
//         }
//     }
// }


// 用这样的方法也可以实现事件总线
import Vue from 'vue';
const app = new Vue({});

/***
 * 事件名:mainScorll
 * 含义:主区域滚动条变化后触发
 * 参数:
 *   滚动的dom元素,如果是undefined则表示dom元素已经不存在了
 * 
 * 事件名：setMainScroll
 * 含义：当需要设置主区域滚动条位置时触发
 * 参数：
 *    滚动高度
 */ 

Vue.prototype.$bus = app;
export default app;