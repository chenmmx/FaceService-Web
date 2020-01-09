/* eslint-disable func-names */
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'http://192.168.1.236:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/FaceBeacon/v2'
      }
    })
  );
};
