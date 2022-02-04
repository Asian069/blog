<template>
  <div>
    <Pager 
      :total="total"
      :current="current"
      @pageChange="handlePageChange($event)"
    />
    <!-- @pageChange="handlePageChange($event)" 注册事件，当代码运行到这里的时候，Pager.vue(子组件) 的第108行的注册事件会被触发 -->
    <!-- 通过$event获取参数, 在这里$event就是newPage这个参数 -->
  </div>
</template>

<script>
import Pager from './';
export default {
  components:{ // 创建组件
    Pager,
  },
  data(){
    return {
      current: 1,
      total: 302,
    }
  },
  methods:{
    handlePageChange(newPage){ //newPage 事件参数
      this.current = newPage,
      console.log("加载当前页数据")
    }
  }
}
</script> 

<style scoped>
/* 独立作用域样式 */

</style>
