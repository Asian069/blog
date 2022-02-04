<template>
  <div class="carousel-item-container" ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    >
    <div class="carousel-img" ref="image" :style="imagePosition">
      <ImageLoader
        @load="this.showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, //外层容器的尺寸
      innerSize: null, //里层图片的尺寸
      mouseX: 0, // 鼠标的横坐标
      mouseY: 0, // 鼠标的纵坐标
    }
  },
  computed:{
    // 得到图片坐标
    imagePosition(){
      if(!this.innerSize || !this.containerSize){ // 没有值的话返回，说明元素还没有挂载上去
        return;
      }
      // 多出来的宽度和高度
      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      // console.log(extraWidth, extraHeight)
      return{
        transform:`translate(${left}px, ${top}px)`,
      }
    },
    // 最开始图片在最中间
    center(){ 
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      }
    }
  },  
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;

    this.setSize();
    // 最开始让图片在容器最中间
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize); //这中事件注册完之后一定要记得销毁掉
    // resize 事件会在窗口或框架被调整大小时发生。当浏览器窗口变化时，触发setSize事件
  },
  destroyed(){
    window.removeEventListener("resize", this.setSize);
  },

  methods: {
    // 调用该方法，显示文字
    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      // 强制让浏览器渲染一次
      this.$refs.title.clientWidth; // reflow
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      // 描述也是一样
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      // 强制让浏览器渲染一次
      this.$refs.desc.clientWidth; // reflow
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    setSize(){ //设置各种尺寸
        this.containerSize = {
          width:this.$refs.container.clientWidth,
          height: this.$refs.container.clientHeight
        }
        
        this.innerSize = {
          width: this.$refs.image.clientWidth,
          height: this.$refs.image.clientHeight
        };
        // console.log(this.containerSize, this.innerSize);
    },
    handleMouseMove(e){
      const rect = this.$refs.container.getBoundingClientRect();
      // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      // console.log(this.mouseX, this.mouseY);
      // console.log(e.clientX,e.clientY);
      // console.log(rect);
    },
    handleMouseLeave(){
      // 鼠标离开的时候让图片在容器最中间
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    }
  },
};
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.carousel-item-container{
  // background:@dark;
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
  .carousel-img{
    width: 110%;
    height: 110%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.3s;
  }
  .title,
  .desc{
    position: absolute;
    letter-spacing: 3px;
    // 文字之间的空白区域
    left: 3px;
    color: #fff;
    text-shadow:1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
        0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    white-space: nowrap;
    // 不换行
    overflow: hidden;
    opacity: 0;
    
  }
  .title{
    top:calc(50% - 40px);
    font-size: 2em;
  }
  .desc{
    top:calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>