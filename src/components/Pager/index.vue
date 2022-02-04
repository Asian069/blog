<template>
    <!-- 只有总页数大于1的时候才显示 -->
    <div class="pager-container" v-if="pageNumber > 1"> 
        <!-- v-if 和 v-show 能够控制是否显示在页面上的内容 -->
        <!-- 这里绑定v-if,不绑定v-show是因为页面总数不会经常变化，所以选择用if(dom数不稳定，但是可以减少节点和渲染量) -->

        <!-- 第一页 -->
        <a @click="handleClick(1)" :class="{disabled: current === 1}">|&lt;&lt;</a>
        <!-- @click 添加点击事件 -->
        <!-- :class v-bind:可以简写成:  这里是绑定对象 -->
        <!-- :class 绑定设置内样式，如果当前页等于1的时候，显示下方的样式 -->

        <!-- 下一页 -->
        <a @click="handleClick(current - 1)" :class="{disabled: current === 1}">&lt;&lt;</a>

        <!-- 任意页 -->
        <a 
            @click="handleClick(n)"
            v-for="(n, i) in numbers"
            :key="i"
            :class="{active: n === current }"
        >
        {{ n }}
        </a>
        <!-- 用for循环的时候必须要绑定key,key值唯一且稳定 -->
        <!-- n=当前页的时候,就会带有带有active属性,显示下方样式 -->
        <!-- {{ js表达式 }} -->

        <!-- 下一页 -->
        <a 
            @click="handleClick(current + 1)"
            :class="{disable: current === pageNumber}"
        > &gt;&gt;</a>

        <!-- 最后一页 -->
        <a 
            @click="handleClick(pageNumber)"
            :class="{disabled: current === pageNumber}">&gt;&gt;|</a>
    </div>

</template>

<script>
export default{
    props:{ // 子组件可以使用 props 接收父组件的数据
        current: { // 当前页码
            type: Number,
            default:1, // 默认值
        },
        total: { // 总数据量
            type: Number,
            default:0,
        },
        limit: { // 页容量
            type: Number,
            default:10,
        }, 
        visibleNumber:{ // 可见的页码数
            type: Number,
            default:10,
        }
    }, 
    computed:{  // 计算属性
        // 总页数
        pageNumber(){ 
            return Math.ceil(this.total / this.limit); // 向上取整
        },
        // 得到显示的最小数字
        visibleMin(){
            let min = this.current - Math.floor(this.visibleNumber / 2); // 向下取整
            if(min < 1){
                min = 1;
            }
            return min;
        },
        // 得到显示的最大数字
        visibleMax(){
            let max = this.visibleMin + this.visibleNumber - 1;
            if(max > this.pageNumber){
                max = this.pageNumber;
            }
            return max;
        },
        // 循环页码数
        numbers(){
            let nums = [];
            for(let i = this.visibleMin; i <= this.visibleMax; i++){
                nums.push(i); 
            }
            return nums;
        },
    },
    methods:{
        handleClick(newPage){
            if(newPage < 1){
                newPage = 1;
            }
            if(newPage > this.pageNumber){
                newPage = this.pageNumber;
            }
            if(newPage === this.current){
                return;
            }
            // 抛出一个事件
            // $emit : 实例成员，表示在组件中抛出一个事件
            // 参数：$emit("事件名称", 事件参数(新的页码))
            // 只是抛出事件了，但是现在父组件还没有处理，要交给父组件(App.vue第七行)注册并触发事件
            this.$emit("pageChange", newPage);
            // 这里抛出一个事件是因为子组件没权利改动父元素
            // 事件抛出: 子组件在某个时候发生了一件事情,但自身无法处理,于是通知父组件处理

        }
    }
}
</script>


<style lang="less" scoped>
@import '~@/styles/var.less';
// lang 表示这里的样式代码是less
// ~@ 表示src（父级目录）——这是在css里的方法    在脚本里是@ 
.pager-container{
    display: flex;
    justify-content: center;
    margin: 20px 0;
    a{
        color:@primary;
        margin: 0 6px;
        &.disabled{
            color:@lightWords;
            cursor: not-allowed;
        }
        &.active{
        color: @words;
        font-weight: bold;
        cursor: pointer;
        }
    }
    

}
</style>