<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
      <ul>
          <li v-for="item in data.rows" :key="item.id">
              <div class="thumb" v-if="item.thumb">
                  <!-- 判断有没有缩略图 -->
                  <RouterLink 
                      :to="{
                        name: 'BlogDetail', 
                        params:{
                            id: item.id, // 当前的文章id
                        } 
                      }">
                      <img 
                      v-lazy="item.thumb" 
                      :alt="item.title"
                      :title="item.title" 
                      />
                  </RouterLink>
              </div>
              <div class="main-container">
                    <div class="main">
                      <RouterLink 
                      :to="{
                        name:'BlogDetail', 
                        params:{
                            id: item.id
                        }
                      }">
                        <h2>{{item.title}}</h2>
                    </RouterLink>
                    </div>
                    <div class="aside">
                        <span>日期：{{formatDate(item.createDate)}}</span>
                        <span>浏览：{{item.scanNumber}}</span>
                        <span>评论：{{item.commentNumber}}</span>
                        <RouterLink :to="{
                            name: 'CategoryBlog',
                            params:{
                                categoryId: item.category.id
                            }
                        }">{{item.category.name}}</RouterLink>
                    </div>
                    <div class="desc">
                        {{item.description}}
                    </div>
              </div>
          </li>
      </ul>
      <Empty v-if="data.rows.length === 0 && !isLoading" />
      <!-- 分页放到这里 -->
      <Pager v-if="data.total" 
        :current="routeInfo.page" 
        :total="data.total" 
        :limit="routeInfo.limit" 
        :visibleNumber="10"
        @pageChange="handlePgaeChange"
      />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
import {getBlogs} from '@/api/blog.js';
import {formatDate} from "@/utils";
import mainScroll from "@/mixins/mainScroll";
import Empty from "@/components/Empty";
export default {
    mixins: [fetchData({total: 0, rows:[]}), mainScroll("mainContainer")],
    components:{
        Pager,
        Empty,
    },
    computed:{
        routeInfo(){
            // 获取路由信息
            const categoryId = +this.$route.params.categoryId || -1;
            // 转化出来是个字符串所以要写+号
            const page = +this.$route.query.page || 1;
            const limit = +this.$route.query.limit || 10;
            return{
                categoryId,
                page,
                limit,
            }
        }
    },
    methods:{
        formatDate,
        async fetchData(){
            return await getBlogs(
                this.routeInfo.page,
                this.routeInfo.limit,
                this.routeInfo.categoryId
            );
        },
        handlePgaeChange(newPage){
            const query ={
                page: newPage,
                limit:this.routeInfo.limit,
            }
            // 跳转到 当前的分类  当前的页容量  newPage的页码
            // 没有分类的情况
            // /blog?page=${newPage}$limit=${this.routeInfo.limit}
            // 有分类的情况
            // /blog/cate/${this.routeInfo.categoryId}?page=${newPage}$limit=${this.routeInfo.limit}
            if(this.routeInfo.categoryId === -1){
                // 当前没有分类
                this.$router.push({ // 命名路由跳转
                    name:"Blog",
                    query,
                })
                
            }else{
                // 当前有分类
                this.$router.push({ 
                    name: "categoryBlog",
                    query,
                    params:{ // 有动态路由的话，把动态路由的部分给他
                        categoryId: this.routeInfo.categoryId,
                    }
                })
            }
        },
    },
    watch:{ // 可以观察其他数据
        // this.$route
        async $route(){ // 可以监控路由是否变化了
            // console.log("路由变化了");
            this.isLoading = true; // 表示正在加载中
            // 点分页的时候滚动高度设为0
            this.$refs.mainContainer.scrollTop = 0;
            this.data = await this.fetchData(); // 等待数据
            this.isLoading = false; 
        }

    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth; // 滚动条平滑滚动
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main-container{
       .main {
        flex: 1 1 auto;
        h2 {
        margin: 0;
        }
    }
    .aside {
        font-size: 12px;
        color: @gray;
        span {
        margin-right: 15px;
        }
    }
    .desc {
        margin: 15px 0;
        font-size: 14px;
    }
  }
}
</style>