// // 开发环境
// const dev = {

// }


// // 生产环境
// const prod = {

// }

// webpack 插件
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;


if(process.env.NODE_ENV === 'production'){ // 生产环境
    module.exports = {
        devtool: "none",
        plugins: [ new BundleAnalyzerPlugin()],
        externals:{ // 手动告诉webpack，外部资源不要打包了
            vue: "Vue",
            vuex: "Vuex",
            "vue-router": "VueRouter",
            axios: "axios",
        }, 
        // 然后在 public/index.html手动引入上面这些cdn资源
    }
}else{ // 开发环境
    module.exports = { 

    }
}