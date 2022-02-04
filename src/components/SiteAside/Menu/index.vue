<template>
    <div class="meun-container">
        <RouterLink
         :exact="item.exact"
         v-for="item in items" :key="item.link" 
         :to="{name: item.name}" 
         active-class="selected"
         exact-active-class=""
         >
        <!-- RouterLink：导航，跟a标签一样 -->
        <!-- to:跟href一样 -->
        <!-- :to="item.link" ：item.link：导航路径-->
        <!-- 如果觉得匹配的属性名太长了，可以更改：active-class属性可以改匹配。exact-active-class属性可以改精确匹配 -->
            <div class="icon">
                <Icon :type="item.icon"/>
            </div>
            <span>{{item.title}}</span>
        </RouterLink>
    </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
    components:{
        Icon,
    },
    data(){
        return{
            items:[
                {
                    name:"Home", // 命名路由 
                    //路由命名：这样把路径改了也没事，因为他们关联的是名字，只要他俩的名字(Menu/index.vue和这里的routes.js/name的名字)是一样的就没问题
                    title:"首页",
                    icon:"home",
                    exact: true //这个和下面三个要精确匹配，因为他们都只有一个页面
                },
                {
                    name:"Blog",
                    title:"文章",
                    icon:"blog",
                    exact: false  //exact :激活状态是否要精确匹配
                    // startWith 表示只要当前路径以link开头，当前菜单就是选中的
                },
                {
                    name:"About",
                    title:"关于我",
                    icon:"about",
                    exact: true
                },
                {
                    name:"Project",
                    title:"项目&效果",
                    icon:"code",
                    exact: true
                },
                {
                    name:"Message",
                    title:"留言板",
                    icon:"chat",
                    exact: true
                },
            ]
        }
    }, 
    // methods:{
    //     isSelected(item){
    //         var link = item.link.toLowerCase(); // 菜单的链接地址
    //         // 比如/blog
    //         var curPathname = location.pathname.toLowerCase(); // 当前浏览器的访问路径
    //         // 比如/blog/nsjiadnsainxsa/sanixsa
    //         if(item.startWidth){ // 如果当前路径是以link开头，则当前菜单就是选中的
    //             return item.startWith; // 返回当前菜单
    //         }else{
    //             return curPathname === link; // 否则当前菜单就是link
    //         }
    //         // return location.pathname.toLowerCase() === path.toLowerCase();
    //         // location.pathname 获取访问路径  
    //         //  toLowerCase() 转成小写
    //     }
    // },
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.meun-container{
    color: @gray;
    margin: 20px 0;
    a{
        &.selected{
        background:#2d2d2d;
        }
        padding: 0 50px;
        display: block;
        display: flex;
        align-items: center;
        height: 45px;
        .icon{
            width: 24px;
        }
        &:hover{
            color: #fff;
        }
    }
    
}

</style>
