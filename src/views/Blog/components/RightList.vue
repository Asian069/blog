<template>
  <ul class="right-list-container">
      <li v-for="(item,i) in list" :key="i">
         <span 
            @click="handleClick(item)" 
            :class="{active:item.isSelect}">
            {{ item.name }}
            </span>
            <span v-if="item.aside" class="aside"
             @click="handleClick(item)"
             :class="{active:item.isSelect}">
                {{ item.aside }}
            </span>
      <!-- 显示当前组件 -->
      <RightList :list="item.children" @select="handleClick" />
      </li>
  </ul>
</template>

<script>
export default {
    name:"RightList", // 当组件名字缺失的时候，他就会用这个名字作为组件的名字
    props:{
        // [ {name: "xxx", isSelect: true,children:[ {name:"yyy"} ] } ]
        // 数组里有个对象，对象里面有个名字和是否选中和子项，子项里面有个对象...
        list:{
            type: Array,
            default:() =>[], // 写成一个函数，函数返回的结果是一个空数组
        }
    },
    methods:{
        handleClick(item){
            if(!item.isSelect){ // 当前不是选中状态的时候才触发
                this.$emit("select", item); // 向父组件抛出一个事件
            }
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container{
    list-style:none;
    padding: 0px;
    .right-list-container{
        margin-left: 1em;  
    }
    li{
        min-height: 40px;
        line-height: 40px;
        font-size: 14px;
        .active{
            color: @warn;
            cursor: pointer;
        }
    }
}
.aside{
    font-size: 12px;
    margin-left: 1em;
    color: @gray;
}
</style>