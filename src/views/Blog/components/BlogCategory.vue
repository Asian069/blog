<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect"/>
  </div>
</template> 

<script>
import RightList from './RightList';
import fetchData from '@/mixins/fetchData.js';
import {getBlogCategories} from '@/api/blog.js';
export default {
  mixins:[fetchData([])],
  components:{
    RightList,
  },
  computed:{
    categoryId(){ // 分类id
    // console.log(categoryId)
      return  +this.$route.params.categoryId || -1;
    },
    limit(){ 
      return  +this.$route.query.limit || 10;
    },
    list(){
      const totalArticleCount = this.data.reduce(
        (a,b) => a + b.articleCount, 0
      )
      const result = [
        {name:"全部", id:-1, articleCount: totalArticleCount},
         ...this.data,
         ]; 
         const resp = result.map((it) =>({
           ...it, // 把原来的属性全部展开
           isSelect:it.id === this.categoryId, // 在原来的属性里加isSelect
           aside:`${it.articleCount}篇`
         }))
        //  console.log(resp);
         return resp;
    }
  },
  methods:{
    async fetchData(){
      return await getBlogCategories();
    },
    handleSelect(item){
      const query = {
                page: 1, // 分类变了页码变成第一页
                limit:this.limit, // 当前的容量
            }
            // 跳转到 当前的分类  当前的页容量  newPage的页码
            // 没有分类的情况
            // /blog?page=${newPage}$limit=${this.routeInfo.limit}
            // 有分类的情况
            // /blog/cate/${this.routeInfo.categoryId}?page=${newPage}$limit=${this.routeInfo.limit}
            if(item.id === -1){
                // "全部"分类
                this.$router.push({ // 命名路由跳转
                    name:"Blog",
                    query,
                }) 
            }else{
                // 当前有分类
                this.$router.push({ 
                    name: "CategoryBlog",
                    query,
                    params:{ // 有动态路由的话，把动态路由的部分给他
                        categoryId: item.id,
                    }
                })
            }
    }
  }
}
</script>

<style scoped lang="less">
.blog-category-container{
  width: 250px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  line-height: 5px;
  h2{
    font-weight: bold;
    letter-spacing: 2px; // 字体之前的间隙
    font-size: 1em;
    margin: 0;
  }
}
</style>