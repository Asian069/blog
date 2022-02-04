// 路由匹配规则
// import Home from '@/views/Home';
// import About from '@/views/About';
// import Blog from '@/views/Blog';
// import Project from '@/views/Project';
// import Message from '@/views/Message';
// import BlogDetail from '@/views/Blog/Detail';

import NotFound from '@/views/NotFound';

// 导入加载器插件
import "nprogress/nprogress.css"; // 加载器样式
import { start, done, configure } from "nprogress"; // js里面的两个方法，一个是开始加载，一个是加载结束
configure({
  trickleSpeed: 20, // 进度条的速度
  showSpinner: false, //不显示小圆圈
})


window.start = start;
window.done = done;

function delay(duration){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve();
    },duration)
  })
}

function getPageComponent(pageCompResolver){ 
  // 动态导入，路由懒加载，函数返回一个promise,然后就变成了组件配置对象， 直接导入就直接依赖
  //  异步组件
  return async () => {
    start();
    if(process.env.NODE_ENV === "development"){ // 如果是开发环境
      await delay(2000);
    }
    const comp = await pageCompResolver();
    done();
    return comp;
  }
}

export default [ // 路由配置
    // 规则：什么路径对应什么组件
    // 比如：当匹配到路径 / 时，渲染Home组件
    {
      name:"Home",
      path:"/",
      component: getPageComponent(()=>
        import(/* webpackChunkName:"home" */"@/views/Home"),
      ),
      meta:{title:"首页"}},
    // 比如：当匹配到路径 /about 时，渲染About组件
    {
      name:"About", 
      path:"/about",
      component: getPageComponent(()=>
        import(/* webpackChunkName:"about" */"@/views/About"),
      ),
      meta:{title:"关于我"}},
    {
      name:"Blog", 
      path:"/blog",
      component: getPageComponent(()=>
        import(/* webpackChunkName:"blog" */"@/views/Blog"),
      ),
      meta:{title:"文章"}}, //路由命名：这样把路径改了也没事，因为他们关联的是名字，只要他俩的名字(Menu/index.vue和这里的routes.js/name的名字)是一样的就没问题
    {
      name:"CategoryBlog", 
      path:"/blog/cate/:categoryId",
      component: getPageComponent(()=>
      import(/* webpackChunkName:"blog" */"@/views/Blog"),
      ),
      meta:{title:"文章"}},
    {
      name:"BlogDetail", 
      path:"/blog/:id",
      component: getPageComponent(()=>
        import(/* webpackChunkName:"blogDetail" */"@/views/Blog/Detail"),
      ),
      meta:{title:"文章详情"}},
    // 在地址中使用 :xxx 表示这部分的内容是变化的，动态路由
    {
      name:"Project", 
      path:"/Project",
      component: getPageComponent(()=>
        import(/* webpackChunkName:"project" */"@/views/Project"),
      ),
      meta:{title:"项目&效果"}},
    {
      name:"Message", 
      path:"/message",
      component: getPageComponent(()=>
        import(/* webpackChunkName:"message" */"@/views/Message"),
      ),
      meta:{title:"留言板"}
    },
    {
      name:"NotFound",
      path: "*", // * 通配符，前面都没匹配的话，就一定被它匹配
      component: NotFound,
    }
    
      
  ]