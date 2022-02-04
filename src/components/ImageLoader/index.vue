<template>
    <div class="imageloader-container">
        <img v-if="!everythingDone"  class="placeholder" :src="placeholder" alt="" />
        <!-- 一切都没完成就显示，都完成了占位图就删除 -->
        <img
            @load="handleLoad"
            :src="src"
            alt=""
            :style="{ opacity: originOpacity, transition: `${duration}ms`}"
        />
    </div>
</template>

<script>
export default {
    props:{
        src:{
            type: String,
            required: true,
        },
        placeholder:{
            type: String,
            required: true,
        },
        duration:{
            type: Number,
            default: 500,
        }
    },
    data(){ // 和界面相关的数据
        return{
            originLoaded: false, // 原图是否加载完成
            everythingDone: false, // 是否一切都完成了
        }
    },
    computed:{ // 计算属性
        originOpacity(){
            // 如何更改原图的透明度
            return this.originLoaded ? 1 : 0; // 原图的透明度 加载完成了是1，没加载完成是0
        }
    },
    methods:{ // 任何可能需要调用的方法
        handleLoad(){
            this.originLoaded = true; // 数据更改重新渲染，计算属性重新计算
            setTimeout(() => {
                this.everythingDone = true;  // 一切都完成了
                this.$emit('load'); // 抛出事件
            }, this.duration)
        }
    }
}
</script>

<style scoped lang="less">
@import '~@/styles/mixin.less';
.imageloader-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    img{
        .self-fill();
        object-fit: cover;
    }
    .placeholder{
        filter: blur(2vw);
    }
}
</style>
