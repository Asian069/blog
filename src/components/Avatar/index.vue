<template>
  <img 
    class="avatar-container"
    :src="url"  
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  />
</template>

<script>
export default {
  // 声明组件属性的多种形式有:数组、对象
    props: {
      url:{
        //  属性约束
        type: String, // 类型必须是一个字符串
        required: true, // 属性必传
      },
      size:{
        type: Number, 
        default: 120, //如果属性没传值，这里有默认值
      },
    },
};
</script>

<style scoped>
/* scoped:带有作用域的样式 */
.avatar-container{
  border-radius: 50%;
  object-fit: cover;
  /* 被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。 */
  display: block;
}
</style>