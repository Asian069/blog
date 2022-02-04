// 滚动条代码混合
export default function(refValue){
    return {
        mounted(){ // 钩子函数：在创建完dom对象之后执行
            this.$bus.$on("setMainScroll", this.handleSetMainScroll); // 监听事件
            this.$refs[refValue].addEventListener("scroll", this.handleMainScroll); // 动态属性
        },
        beforeDestroy(){ // 组件销毁 
            this.$bus.$emit("mainScroll") // dom(top按钮)不存在了 // 触发事件
            this.$bus.$off("setMainScroll", this.handleSetMainScroll); // 取消监听事件
            this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll); // 删除事件

        },
        methods:{
            // 文章列表滚动事件
            handleSetMainScroll(scrollTop){
                // 设置dom元素的滚动高度
                this.$refs[refValue].scrollTop = scrollTop; //$refs["refValue"] 动态属性
            }, 
            // 设置主滚动条的滚动事件
            handleMainScroll(){
                this.$bus.$emit("mainScroll", this.$refs[refValue]); // 触发事件
            }
        }
    };
}