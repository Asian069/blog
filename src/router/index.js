import Vue from "vue"; // 导入vue
import VueRouter from 'vue-router'; //引入路由插件
import routes from './routes'; 
import { titleController } from '@/utils'

if(!window.VueRouter){
  Vue.use(VueRouter);
}

// App.use(); 使用一个vue插件

const router = new VueRouter({ // 创建vue实例
  // 配置
  routes,  // 路由匹配规则
  mode:"history", //表示路由的模式，默认值是hash，也可以把默认值改成history或abstract(这个基本用不到)
});

router.afterEach((to, from)=>{ // 当路由跳转确认后我再修改标题
    // console.log(to.meta.title)
    if(to.meta.title){
      titleController.setRouterTitle(to.meta.title);
    //   document.title = to.meta.title + "-" + store.state.setting.data.siteTitle;
    }
   
});

export default router;