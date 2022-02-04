<template>
  <div v-if="data" class="blog-area-container">
      <MessageArea title="评论列表" 
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
      />
  </div>
</template>

<script> 
import MessageArea from '@/components/MessageArea';
import fetchData from '@/mixins/fetchData.js';
import { getComments, postComment } from '@/api/blog.js';
export default {
    mixins: [fetchData({total: 0, rows:[]})],
    components:{
        MessageArea,
    },
    data(){
        return { 
            page: 1,
            limit: 10,
        }
    },
    created(){ // 生成虚拟dom之前
        this.$bus.$on("mainScroll", this.handleScroll);
    },
    destroyed(){ // 销毁组件
        this.$bus.$off("mainScroll", this.handleScroll);
    },
    computed:{
        hasMore(){
            return this.data.rows.length < this.data.total; 
        }
    },
    methods:{
         // 处理滚动事件
        handleScroll(dom){
            if(this.isLoading || !dom){ // 目前正在加载更多   dom不存在了(top)
                return;
            }
            const range = 100; // 等一个可接受的范围，在这个范围内都算达到了底部
            const dev = Math.abs((dom.scrollTop + dom.clientHeight) - dom.scrollHeight);
            if(dev <= range ){
                // 到达了底部
                // console.log("加载更多");
                this.fetchMore();
            }
        },
        async fetchData(){
            return await  getComments(this.$route.params.id, this.page, this.limit);
        },
        // 加载下一页
        async fetchMore(){
            if(!this.hasMore){ // 没有更多的数据了
                return; 
            }
            // console.log("加载评论数据");
            this.isLoading = true; // 正在加载
            this.page++; // 当前页码加一
            const resp =  await this.fetchData();
            this.data.total = resp.total;
            this.data.rows = this.data.rows.concat(resp.rows); //concat():数组拼接
            this.isLoading = false;
        },
        async handleSubmit(formData, callback){
            const resp = await postComment({
                blogid: this.$route.params.id,  // $route:跳转路由的对象
                ...formData,
            });
            this.data.rows.unshift(resp);
            // unshift 可向数组的开头添加一个或多个元素，并返回新的数组
            this.data.total++;
            callback("评论成功"); // 告诉子组件这边处理完了，子组件可以做其他事情了
        },
       
    },
}
</script>

<style scoped lang="less">
.blog-area-container{
    margin: 30px 0;
}
</style>