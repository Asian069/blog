
// vue-cli 的配置文件
// 是一个可选的配置文件，如果项目的( 和package.json 同级的)根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。
module.exports ={
    devServer:{ //DevServer是webpack开发服务器
        proxy:{ // 代理
            "/api":{ // 以api开头的
                target: "http://test.my-site.com"
            },
        }
    },
    configureWebpack:require("./webpack.config"),
}