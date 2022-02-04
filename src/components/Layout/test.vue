<template>
    <div class="test-container">
        <Layout>
            <template #left>
                <div class="left">
                    左边宽区域，宽度适应内容，溢出隐藏
                </div>
            </template>
            <template>
                <div class="main">
                    主区域，宽度占满剩余宽度，溢出隐藏
                </div>
            </template>
            <template #right>
                <div class="right">
                    右边栏区域，宽度适应内容，溢出隐藏
                </div>
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from './';

export default {
    components:{
        Layout,
    }
}
</script>

<style scoped lang="less">
.test-container{
    width: 60%;
    height: 600px;
    // border: 2px solid;
    margin: 0 auto;
}
.left{
    width: 200px;
    height: 100%;
    background:burlywood;
}
.main{
    width: 100%;
    height: 100%;
    background:darkgoldenrod;
}
.right{
    width: 150px;
    height: 100%;
    background:chocolate;
}
</style>
