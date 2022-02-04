<template>
    <div class="app-container">
      <Layout>
        <template #left>
          <div class="aside">
            <SiteAside />
          </div>
        </template>
        <template #default>
          <!-- vue-router匹配到的组件会渲染到这里 -->
          <router-view></router-view>
          <!-- 这个组件时vue-router插件提供的，RouterView是全局组件 -->
        </template>
      </Layout>
      <ToTop />
    </div>
</template>

<script>

import Layout from "./components/Layout";
import SiteAside from "./components/SiteAside";
import ToTop from '@/components/ToTop';
export default {
   components:{
      Layout,
      SiteAside,
      ToTop,
   }
}
</script> 

<style scoped lang="less">
/* 独立作用域样式 */
@import '~@/styles/mixin.less';
.app-container {
  .self-fill(fixed);
}
.aside{
  width: 250px;
  height: 100%;

}
</style>

