// 入口模块文件
// 创建vue实列
import "./mock";
import Vue from 'vue' //引入vue插件
import App from './App.vue'
import './styles/global.less'  // 全局样式
import router from './router';
import './api/banner.js';
import './eventBus.js';
import './api/setting';
import store from './store';
store.dispatch("setting/fetchSetting"); // 全局网站数据一开始就要加载

import showMessage from './utils/showMessage';
Vue.prototype.$showMessage = showMessage; // 把showMessage方法加入到Vue实例里

// 注册全局指令
import vLoading from './directives/loading.js';
Vue.directive("loading",vLoading); //全局注册组件 Vue.directive("指令名"，指令事件);
import vLazy from './directives/lazy.js';
Vue.directive("lazy",vLazy);

new Vue({
  router, // 配置vue路由
  store, // 导入仓库
  render: (h) => h(App),
}).$mount('#app');


// 个人空间模拟测试
// import { getSetting } from "./api/setting.js";
// getSetting().then((resp)=>{
//   console.log(resp);
// })

// 
// import * as blogApi from './api/blog';
// blogApi.getBlogTypes().then((r)=>{
//   // console.log("所有博客分类", r)
// })
// blogApi.getBlogs(2, 10, 3).then((r)=>{
//   // console.log("博客", r)
// })


// Window.showMessage = showMessage; //保存在window里，方便浏览器测试
// Window.showMessage("ecwcxssssa",'success');

// 
// import * as blogApi from './api/blog';
// blogApi.getBlog("sdadsa").then((r)=>{
//   console.log(r);
// })

// blogApi.postComment({
//   nickname:"昵称",
//   content:"评论内容",
//   blogid:"123"
// }).then((r)=>{
//   // console.log(r)
// })


// 测试事件总线
// import eventBus from './eventBus.js';

// function handler1(data){
//   console.log("handler1", data);
// }

// function handler2(data){
//   console.log("handler2", data);

// }

// eventBus.$on("event1", handler1);
// eventBus.$on("event2", handler1);
// eventBus.$on("event1", handler2);

// window.eventBus = eventBus;
// window.handler1 = handler1;
// window.handler2 = handler2;