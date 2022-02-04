<template>
    <div class="message-container" ref="messageContainer">
        <MessageArea 
        title="留言板"
        :subTitle="`(${data.total})`"
        :isListLoading="isLoading"
        :list="data.rows"
        @submit="handleSubmit"
        />
    </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js"; 
import * as msgApi from "@/api/message.js";
import mainScroll from "@/mixins/mainScroll.js";

export default{
    mixins:[fetchData({total:0,rows:[]}),mainScroll("messageContainer")],
    components:{
        MessageArea,
    },
    data(){
        return{
            page:1,
            limit: 10,
        }
    },
    created(){
        this.$bus.$on("mainScroll", this.handleScroll);
    },
    destroyed(){
        this.$bus.$off("mainScroll", this.handleScroll);
    },
    computed:{
        hasMore(){
            return this.data.rows.length < this.data.total;
        }
    },
    methods:{
        async fetchData(){
            return msgApi.getMessages(this.page,this.limit);
        },
        // 处理滚动事件
        handleScroll(dom){
            if(this.isLoading || !dom){ // 目前正在加载更多，dom不存在了(top)
                // 目前加载更多
                return;
            }
            const range = 100; // 定一个可以接受的范围，在这个范围内都算到达了底部
            const dev = Math.abs((dom.scrollTop + dom.clientHeight) - dom.scrollHeight);
            if(dev <= range){ //到达了底部
            // 加载更多
            this.fetchMore();
            }
        },
        // 加载下一页
        async fetchMore(){
            if(!this.hasMore){ // 没有更多数据了
                return;
            }
            // 加载评论数据
            this.isLoading = true;
            this.page++; // 当前页码加一
            const resp = await this.fetchData(); // 异步获取模拟数据
            this.data.total = resp.total;  // 模拟数据的数据总数
            this.data.rows = this.data.rows.concat(resp.rows); // concat() 数组拼接，前一页和后一页数据拼接起来
            this.isLoading = false; 
        },
        // 提交评论
        async handleSubmit(data, callback){
            const resp = await msgApi.postMessage(data);
            this.data.total++;
            callback("感谢你的留言");
            this.data.rows.unshift(resp); // 把评论加到数组里
        }
    },
}
</script>

<style scoped>
.message-container{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 25px 0;
    box-sizing: border-box;
}
.message-area-container{
    width: 700px;
    margin: 0 auto;
}
</style>