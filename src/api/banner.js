import request from './request';

export async function getBanners(){
    return await request.get("/api/banner"); // 这是老师给的后端给的请求接口
    // http://localhost:8080/api/https://www.zhihu.com/api/v4/search/top_search/tabs/hot/items
    // http://localhost:8080 这个可以省略，没写就是用了当前端口的协议 服务器名 端口号


    // 解决开发环境跨域
    // 浏览器请求的是这个 http://localhost:8080/api/https://www.zhihu.com/api/v4/search/top_search/tabs/hot/items
    // 开发服务器请求的是这个(请求配置过程vue/config.js里有) https://www.zhihu.com/api/v4/search/top_search/tabs/hot/items
    // 开发服务器再把浏览器给数据，就可以解决开发环境跨域了
    // if(resp.data.code === 0){
    //     return resp.data.data;
    // }
    // console.log(resp.data.msg);
    // showMessage({
    //     content: resp.data.msg,
    //     type: 'error',
    // })
    // return null;
}

// getBanners().then((r) =>{ // 成功之后的回调
//     console.log(r);
// });