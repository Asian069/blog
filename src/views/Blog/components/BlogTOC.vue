<template>
  <div  class="blog-toc-container">
  <h2>文章列表</h2>
  <RightList :list="tocWithSelect" @select="handleSelect"/>
  </div>
</template>

<script>
import RightList from './RightList';
import {deBounce} from '@/utils'
export default {
  components:{
    RightList,
    deBounce
  },
  props:{
    toc:{
      type: Array,
    }
  },
  data(){
    return {
      activeAnchor: "",
    }
  },
  computed:{
    tocWithSelect(){
      const getTOC = (toc = []) =>{
        return toc.map((t) => ({ // 把toc数组映射成一个新的数组
          ...t, // toc数组的每项展开
          // 往数组里添加新的属性
          isSelect: t.anchor === this.activeAnchor, //每个目录都有一个anchor属性,anchor属性是不是等于选中的anchor
          // 子目录做同样处理
          children: getTOC(t.children), // children 可能是undefined,所以把toc默认为一个空的数组，防止报错
        }))
      }
      return getTOC(this.toc); //返回toc
    },
    // 根据toc得到他们对应的元素数组
    doms(){
      const doms = [];

      const addToDoms = (toc) => {
        // 循环toc数组
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor)) // 拿到目录的每一个id,把它加到doms里
          if(t.children && t.children.length){ //如果数组有children属性,并且长度大于0
            addToDoms(t.children); // 再一次调用自身,把children也传进去,不但要加自己还要加他的children
          }
        }
      }
      addToDoms(this.toc);
      return doms;
    },
  },
  created(){
    // window.setSelect = this.setSelect; 为了方便测试
    this.setSelectBounce = deBounce(this.setSelect,50) // 封装的函数防抖
    this.$bus.$on("mainScroll", this.setSelectBounce); //监听事件
  },
  destroyed(){
    this.$bus.$off("mainScroll", this.setSelectBounce); //取消监听事件
  },
  methods:{
    handleSelect(item){
      location.hash = item.anchor;
    },
    // 设置 activeAnchor 为正确的值
    setSelect(scrollDom){
      if(!scrollDom){ // 如果没有dom(top)则返回
        return;
      }
      this.activeAnchor = ""; //犹豫后面要重新设置,先清空之前的状态
      const range =  200; // 顶部的范围值
      for (const dom of this.doms) {
        // 看一下当前的dom元素应不应该被选中
        if(!dom){
          continue; // 进入下一次循环
        }
        // 得到元素离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        // getBoundingClientRect是DOM元素到浏览器可视范围的距离（不包含文档卷起的部分）
        if(top>=0 && top<=range){
          // 在规定的范围内
          this.activeAnchor = dom.id; // 当前的选中状态是dom.id
          return;
        }else if(top>range){
          // 在规定的范围下方
          return;
        }else{
          // 在规定的范围上方
          this.activeAnchor = dom.id; // 先假设自己是激活的,然后再看后面
        }
      }
    },
  }
}
</script>

<style scoped lang="less">
.blog-toc-container{
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  h2{
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin:0;
  }
}
</style>