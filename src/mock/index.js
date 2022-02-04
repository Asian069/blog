//  专门用来导入模拟数据的
import "./banner"; // 如果到时候访问真实服务的时候把模拟数据注释掉就行了
import "./blog";
import "./setting";
import "./about";
import "./project";
import "./message";

import Mock from "mockjs";
Mock.setup({ //setUp 指定被拦截的Ajax请求响应的时间，默认是毫秒
    // 模仿promise异步请求
    timeout: "1000-2000", // 延迟时间一千到两千毫秒
})

