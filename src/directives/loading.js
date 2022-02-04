import loadingUrl from '@/assets/loading.svg';
// js如何导入css样式，创建一个xxx.module.xxx的文件，然后导入进来就可以使用样式了
import styles from './loading.module.less'; 

// 判断el中是否存在loading效果的img元素
function getLoadingImage(el){
    return el.querySelector("img[data-role=loading]");
}

function createLoadingImage(){
    const img = document.createElement("img");
    img.dataset.role = "loading"; // 自定义属性(dataset)
    img.src = loadingUrl;
    img.className = styles.loading; // 设置样式，让他自己居中
    return img;
}

// 导出指令的配置对象
export default function(el, binding){ // 该函数会被同时设置到bind和update中
    // el:被绑定的元素对应的真实的DOM 
    // binding:是一个对象，描述了指令中提供的信息
    // 根据 bind.value 的值决定创建或删除img元素
    const curImg = getLoadingImage(el);
    if(binding.value){ //为true的时候绑定，是正在等待数据创建，所以要有转圈的图片
        if(!curImg){ // 如果没有图片
            const img = createLoadingImage();
            el.appendChild(img);
        }
    }else{
        if(curImg){ // 如果Loading.value为false的时候，删除Image元素
            curImg.remove();
        }
        
    }


   

    // // 自定义指令  钩子函数
    // 如果bind和update有同样的功能，可以把他们直接简化成一个单独的函数(配置简化)：function(el, binding){该函数同时被设置到bing和update中}
    // bind(el, binding){ // 参数el:被绑定的元素对应的真实的Dom。 binding:是一个对象，描述了指令中提供的信息
    //     // 创建一个img元素，放到el元素内部
    // },
    // update(el, binding){
    //     // 根据binding.value 的值决定创建或删除img元素
    // },
}