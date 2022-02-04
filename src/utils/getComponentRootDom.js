import Vue from 'vue'; 

// 获取某个组件渲染的dom元素

export default function(comp, props){ // 组件，组件的属性
    const vm = new Vue({ // 创建vue实例
        render:(h) => h(comp,{ props }), // 渲染组件
    });
    vm.$mount(); // 挂载
    return vm.$el; // 渲染出来的dom，$el:dom根元素(真实的dom)
}