import getComponentRootDom from './getComponentRootDom';
import Icon from '@/components/Icon';
import styles from './showMessage.module.less';
/**
 * 弹出消息
 * @param {string} content 消息内容
 * @param {string} type 消息类型： info 普通  error 错误  success成功  warn警告
 * @param {Number} duration 消失时间，多久后消失
 * @param {HTMLElement} container 容器：消息会显示在该容器的正中。如果不传，会显示在页面的中间
 * 
 */
 
export default function(options = {}){  
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;

    // 创建消息元素
    const div = document.createElement('div');
    const iconDom = getComponentRootDom(Icon,{ // 组件,组件类型
            type,
        
    }); // 调用这个函数
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`

    // 设置样式
    const typeClassName = styles[`message-${type}`]; // 类名样式名
    div.className = `${styles.message} ${typeClassName}`;
    // 将div加入到容器中
    if(options.container){ //如果容器没有的话，就加入到body
        // 容器的position是否改动过
        if(getComputedStyle(container).position === "static"){
            // getComputedStyle() 方法用于获取指定元素的 CSS 样式。获取的样式是元素在浏览器中最终渲染效果的样式。
            container.style.position = "relative";
        }
    }
    container.appendChild(div);
    // 浏览器强行渲染
    div.clientHeight; // 导致reflow

    // 回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50% -50%)`;

    // 等一段时间消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50% -50%) translateY(-25px)`;
        div.addEventListener("transitionend",function(){
            div.remove();
            // 运行回调函数
            options.callback && options.callback(); //如果有回调函数，就运行回调函数
        },{once:true})//事件只触发一次
    },duration);
}

