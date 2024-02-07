const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  console.log(`app:`, app);
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};