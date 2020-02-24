const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    proxy('/api', {
      target: 'http://192.168.1.247:22333',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/FaceBeacon/v2'
      }
    })
  );
  app.use(
    proxy('/upload', {
      target: 'http://192.168.1.247:22333',
      changeOrigin: true,
      pathRewrite: {
        '^/upload': ''
      }
    })
  );
};
