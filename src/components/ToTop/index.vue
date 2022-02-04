<template>
  <div @click="handleClick" v-show="show" class="to-top-container">
      Top
  </div>
</template>

<script>
export default {
    data(){
        return{
            show: false, // 是否显示top按钮
        }
    },
    created(){ // 生成虚拟dom之前创建
        this.$bus.$on("mainScroll", this.handleScroll);
    },
    destroyed(){ // 销毁组件
        this.$bus.$off("mainScroll", this.handleScroll);
    },
    methods:{
        handleScroll(dom){
            if(!dom){ // 如果没有dom(top)则不显示top,直接返回
                this.show = false;
                return;
            }
            if(dom.scrollTop >= 500){ // 滚动条向上滚动的距离大于500的时候，显示top定位按钮
             this.show = true;
            }else{
                this.show = false;
            }
            // 把if和else写成这样的计算属性也可以实现：
            // this.show = dom.scrollTop >= 500;
        },
        handleClick(){
            // 点击top的时候回到顶部
            // console.log("回到顶部");
            this.$bus.$emit("setMainScroll", 0); // 触发事件
        },
    }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.to-top-container{
    background: @primary;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: fixed;
    z-index: 99;
    right: 50px;
    bottom: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    color: #fff;
}
</style>