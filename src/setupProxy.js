const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    proxy('/api', {
      target: 'http://182.139.71.25:22333',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/FaceBeacon/v2'
      }
    })
  );
  app.use(
    proxy('/upload', {
      target: 'http://182.139.71.25:22333',
      changeOrigin: true,
      pathRewrite: {
        '^/upload': ''
      }
    })
  );
};
