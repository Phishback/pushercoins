const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/prices/new',
    { target: 'http://localhost:5000' }
  ));
}