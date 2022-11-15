const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/ittime',
        createProxyMiddleware({
            target: 'http://localhost:8090',
            changeOrigin: true,
        })
    )
}