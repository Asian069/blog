// 自定义指令：懒加载

import eventBus from '@/eventBus';
import {deBounce} from "@/utils";
import defaultGif from "@/assets/default.gif";

let imgs = [];

// 处理单张图片
function setImage(img){
    img.dom.src = defaultGif; // 先暂时使用默认图片
    // 处理图片
    // 该图片是否在视口范围内
    const clientHeight = document.documentElement.clientHeight; // 视口高度
    const rect = img.dom.getBoundingClientRect(); // 返回元素的大小，及其相对于视口的位置
    const height = rect.height || 100; //给图片一个最小高度
    if(rect.top >= -height && rect.top <= clientHeight){
        // 在视口范围内
        // console.log(img.dom,rect.top, height,"在视口范围内")
        const tempImg  = new Image(); //创建一个image对象,相当于给浏览器缓存了一张图片
        tempImg.onload = function(){
            // 当真实的图片加载完之后
            img.dom.src = img.src 
        }
        tempImg.src = img.src; //创建一个image对象,相当于给浏览器缓存了一张图片
        imgs = imgs.filter( (i) => i !== img); // filter 过滤  把图片移除掉
    }
}


// 调用这个方法，就可以设置那些合适的图片需要加载的图片
function setImages(){
    for (const img of imgs) {
        // 处理该图片
        setImage(img);
    }
}

function handleScroll(){
    setImages();
}

eventBus.$on("mainScroll",deBounce(handleScroll, 50)) // 监听事件 函数防抖

export default{
    inserted(el, bindings){  //inserted 被绑定元素插入到父节点时调用，已经在页面上了
        // bind只调用一次，指定第一次绑定到元素上时调用，在这里可以进行一次初始化
        const img = {
            dom: el, // 指令所绑定的元素，可以直接用来操作dom
            src: bindings.value, // 指令的绑定值
            // handled: false, // 图片一开始是否已经处理过了
        }
        imgs.push(img);
        // 立即处理它
        setImage(img);
    },
    // 跳转到其他页面的时候不需要绑定元素了
    unbind(el){ // 取消绑定 unbind只调用一次，指令和元素解绑时调用
        imgs = imgs.filter(img => img.dom !== el); // filter：过滤  不等于el的时候保留
    }
}