<template>
    <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
    home: "iconzhuye",
    success: "iconzhengque",
    error: "iconcuowu",
    close: "iconguanbi",
    warn: "iconjinggao",
    info: "iconxinxi",
    blog: "iconblog",
    code: "iconcode",
    about: "iconset_about_hov",
    weixin: "iconweixin",
    mail: "iconemail",
    github: "icongithub",
    qq: "iconsign_qq",
    arrowUp: "iconiconfonticonfonti2copy",
    arrowDown: "iconiconfonticonfonti2",
    empty: "iconempty",
    chat: "iconliuyan",
}

export const types = Object.keys(classMap);  // 具名导出(默认导出),可以导出多个
export default { // 导出
    props:{ // 声明组件的属性
        type:{  //类型
            type:String,  // 属性类型
            required:true, // 属性必传
        }
    },
    computed:{ // 计算属性
        // 图标类样式
        fontClass(){
            return classMap[this.type];
        }
    }
}
</script>

<style scoped>
@import "//at.alicdn.com/t/font_2164449_nalfgtq7il.css";
.iconfont{
    color: inherit;
    font-size: inherit;
}
</style>
