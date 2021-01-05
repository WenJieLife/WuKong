module.exports = {
    publicPath: './',
    devServer: {
        host: "localhost",
        port: 8080, //frontend port
        open: true, //auto open browser

        // overlay: {
        //     warnings: false,
        //     errors: true
        // },
        // domain proxy
        proxy: {
            "/api": {
                target: process.env.VUE_APP_URL,
                changeOrigin: true, //Cross domain
                pathRewrite: {
                    "^/api": "/api"
                }
            }
        }
    }
};