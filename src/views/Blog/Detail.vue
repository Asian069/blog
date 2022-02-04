<template>
  <Layout>
      <div ref="mainContainer" class="main-container" v-loading="isLoading">
          <BlogDetail :blog="data" v-if="data" />
          <!-- 这里的data是远程数据传递过来的 -->
          <!-- data有值的时候才显示 -->
          <BlogComment v-if="!isLoading"/> 
          <!-- 文章出来之后再加载评论 -->
      </div>
      <template #right>
          <div class="right-container" v-loading="isLoading">
              <BlogTOC :toc="data.toc" v-if="data"/>
          </div>
      </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import {getBlog} from '@/api/blog.js';
import Layout from '@/components/Layout';
import BlogDetail from './components/BlogDetail';
import BlogTOC from './components/BlogTOC';
import BlogComment from './components/BlogComment';
import mainScroll from "@/mixins/mainScroll";
import { titleController } from "@/utils";


export default {
    mixins: [fetchData(null), mainScroll("mainContainer")],
    components: {
        Layout,
        BlogDetail,
        BlogTOC,
        BlogComment
    },
    methods:{
        async fetchData(){
           const resp = await getBlog(this.$route.params.id);
        //    resp = null;
           if(!resp){
                // 文章不存在
                this.$router.push("/404"); // 这个路径不存在，最终也能被*通配符路径匹配
                return;
           }
           titleController.setRouterTitle (resp.title);
           return resp;
        },
    },
    updated(){
        const hash = location.hash;
        location.hash = "";
        setTimeout(() =>{
            location.hash = hash;
        },50)
    }
}
</script>

<style scoped lang="less">
.main-container{
    overflow-y: scroll;
    height: 100%;
    box-sizing: border-box;
    padding:20px;
    position: relative;
    width: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
}
.right-container{
    width: 300px;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    position: relative;
}
</style>