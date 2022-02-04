<template>
  <div class="bolg-detail-container" >
    <h1>{{blog.title}}</h1>
    <div class="aside">
      <span>日期：{{formatDate(blog.createDate)}}</span>
      <span>浏览：{{ blog.scanNumber }}</span> 
      <a href="#data-form-container">评论：{{blog.commentNumber}}</a>
      <RouterLink :to="{
        name: 'CategoryBlog',
        params:{
          categoryId: blog.category.id
        }
        }">{{blog.category.name}}</RouterLink>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
    <!-- v-html 可以把内容变成正常的内容显示出来，div里面在包东西就会被覆盖 -->
  </div>
</template>

<script>
import {formatDate} from '@/utils';
import '@/styles/markdown.css';
// 安装highlight,添加样式,语法着色工具
import 'highlight.js/styles/github.css';
export default {
    props:{
        blog:{
            type: Object,
            required: true, //属性必传
        }
    },
    methods:{
      formatDate,
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside{
  font-size: 12px;
  color: @gray;
  span,a{
    margin-right: 12px;
  }
  .markdown-body{
    margin: 1em 0;
}
}

</style>