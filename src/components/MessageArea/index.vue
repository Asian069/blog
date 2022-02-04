<template>
  <div class="message-area-container">
      <DataForm v-on="$listeners" />
      <!-- 子组件像父组件传递事件，如果事件的值都是一样的话，可以用这种方法一层一层向父组件传递 -->
      <!-- v-on="{ submit: handleSubmit }" 等同于 @submit="handleSubmit"   -->
      <h3>
          {{title}}
          <span>{{ subTitle }}</span>
      </h3>
      <DataList :list="list" />
      <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import DataForm from './DataForm';
import DataList from './DataList';
export default {
    components:{
        DataForm,
        DataList
    },
    props:{
        title:{ // 主标题
            type: String,
            default:""
        }, 
        subTitle:{ // 副标题
            type: String,
            default:""
        },
        list:{
            type: Array,
            default: ()=>[],
        },
        isListLoading:{
            type: Boolean,
            default: false,
        }
    },
    // methods:{
    //     handleSubmit(formData, callback){
    //         this.$emit("submit", formData, callback); // formDtata 扔过来的，但是这个父组件也没发处理，所以再扔给父组件，给BlogComment.vue
    //     }
    // }

}
</script>


<style scoped lang="less">
.loading {
  position: relative;
  height: 100px;
}
</style>
