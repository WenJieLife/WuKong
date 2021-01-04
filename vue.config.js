module.exports = {
    publicPath: './',
    // 所有 webpack-dev-server 的选项都支持。
    devServer: {
        host: "localhost",
        port: 8080, // 端口号
        open: true, //配置自动启动浏览器

        // 配置多个代理
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8000",
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
};