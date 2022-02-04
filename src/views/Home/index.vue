<template>
    <!-- main主页面 -->
    <div 
        v-loading="loading"
        class="home-container" 
        ref="container"
        @wheel="handleWheel">
        <!-- ref是挂载到真实dom上的，所以只有真实dom渲染完才能获取到 -->
        <!-- @wheel="handleWheel" 注册滚轮事件 -->

        <!-- 轮播图的图片和文字 -->
        <ul class="carousel-container"
          :style="{
             marginTop,
            }"
            @transitionend="handleTransitionEnd"
            >
            <!-- 过渡效果结束之后滚轮事件完成 -->
            <li v-for="item in data" :key="item.id">
                <CarouselItem :carousel="item" />
            </li>
        </ul>
        <!-- 上下按钮 -->
        <div  v-show="index>=1" @click="switchTo(index-1)" class="icon icon-up">
            <Icon type="arrowUp" />
        </div>
        <div  v-show="index<data.length-1" @click="switchTo(index+1)" class="icon icon-down">
            <Icon type="arrowDown" />
        </div>
        <!-- 索引小圆圈 -->
        <ul class="indicator" >
            <li 
            :class="{active: i === index}" 
            v-for="(item,i) in data" :key="item.id"
            @click="switchTo(i)"
            ></li>
            <!-- (item,i) 循环数组的每一项，下标i -->
            <!-- 如果i(li) 和当前的索引值相等，就是选中状态 -->
        </ul>
        <!-- <Loading v-if="isLoading" /> -->
    </div>
    <!-- <div class="home-container" ref="container">
        <h1>首页</h1>
        <button @click="handleClick">Click</button>
    </div> -->
</template>

<script>
// import { getBanners } from '@/api/banner';
import { mapState } from 'vuex'; // 从仓库里取数据
import CarouselItem from './Carouselitem';
import Icon from '@/components/Icon';
// import fetchData from '@/mixins/fetchData.js';
// import Loading from '@/components/Loading';
export default{
    // mixins: [fetchData([])], // mixins:组件混入。之所以用数组，是因为可以混入多个配置代码。
    components:{
        CarouselItem,
        Icon,
        // Loading,
    },
    data(){
        return {
            // isLoading: true, // 是否正在加载中(一开始正在加载)
            // banners: [], //数据开始为空
            index: 0, // 当前显示的是第几张轮播图
            containerHeight: 0, // 整个容器高度，一开始默认为0
            switching: false, // 是否在切换中
        };
    },
    created(){
        this.$store.dispatch("banner/fetchBanner"); // 当加载首页的时候触发actions
    },  
    // async created(){
    //     this.banners = await getBanners(); // 模拟promise异步处理
    //     // 数据拿到后把它变成false
    //     this.isLoading = false;
    // },
    mounted(){
        // console.log(this.$refs.container);
        this.containerHeight = this.$refs.container.clientHeight;
        // console.log(this.containerHeight);
        window.addEventListener("resize",this.handleResize
            // resize 事件会在窗口或框架被调整大小时发生。
        )
    },
    destroyed(){ //销毁组件
        window.removeEventListener("resize", this.handleResize)
    },
    computed:{
        marginTop(){
            return -this.index * this.containerHeight + "px";
        },
        ...mapState("banner", ["loading", "data"]) // 命名空间 需要的数据
    },
    methods:{
        // 切换轮播图
        switchTo(i){
            this.index = i;
        },
        // async fetchData(){
        //     return await getBanners(); 
        // },
        // 滚轮事件
        handleWheel(e){
            // console.log(e.deltaY);
            if(this.switching){ // 如果没有滚动，返回
                return;
            }
            if(e.deltaY < -5 && this.index > 0){
                // console.log('上一个')
                // 往上滚动
                this.switching = true; // 正在滚动
                this.index--;
            }else if(e.deltaY > 5 && this.index < this.data.length -1){
                // 往下滚动
                // console.log("下一个")
                this.switching = true;
                this.index++;
            }
        },
        // ul过渡效果结束
        handleTransitionEnd(){
            // console.log("结束")
            // 过渡效果结束之后，完成滚轮事件
            this.switching = false;
        },
        // 窗口大小
        handleResize(){
            // console.log("change")
            this.containerHeight = this.$refs.container.clientHeight;
        }

    }
    // updated(){  在重新渲染数据的时候运行
    //     会运行这个因为一开始是个空数组，等待一段时间后把数据渲染出来了
    //     console.log("updated");
    // }
    // methods:{
    //     handleClick(){
    //         this.$showMessage({ // 因为这个方法被注入到vue实例里了（详情看main.js）
    //             content: "评论成功",
    //             type: "success",
    //             container: this.$refs.container,
    //             callback: function(){ // 成功的回调函数，比如说成功之后会跳转页面
    //                 console.log("完成");
    //             }
    //         });
    //     }
    // }
}
</script>

<style scoped lang="less">
@import '~@/styles/mixin.less';
@import '~@/styles/var.less';
.home-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    // 测试代码
    // width: 60%;
    // height: 40%;
    // overflow: visible; //内容不会被修改，会呈现在元素框之外
    // border: 2px solid #008c8c;
    // margin: 100px auto;
    ul{
       margin: 0px;
       list-style: none;
       padding: 0px;
    }
    .carousel-container{
        width: 100%;
        height: 100%;
        transition: 500ms;
    }
    li{
        width: 100%;
        height: 100%;
    }
}

.icon{
    .self-center();
    font-size: 30px;
    color:@gray;
    cursor: pointer;
    transform: translateX(-50%);
    @gap: 25px;
    &.icon-up{
        top: @gap;
        animation: jump-up 2s infinite;
    }
    &.icon-down{
        top: auto;
        bottom: @gap;
        animation: jump-down 2s infinite;
    }
    @keyframes jump-up{
        0%{
            transform: translate(-50%, 7px);
        }
        50%{
            transform: translate(-50%, -7px);
        }
        100%{
            transform: translate(-50%, 7px);
        }
    }
    @keyframes jump-down{
        0%{
            transform: translate(-50%, -7px);
        }
        50%{
            transform: translate(-50%, 7px);
        }
        100%{
            transform: translate(-50%, -7px);
        }
    }
}
.indicator{
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 20px;
    li{ 
        width: 7px;
        height: 7px;
        margin: 8px;
        background: @words;
        cursor: pointer;
        border-radius: 50%;
        border: 1px solid #fff;
        box-sizing: border-box;
        &.active{
            background: #fff;
        }
    }
}
</style>
