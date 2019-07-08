
module.exports = (app) => {
    const pers = require('../controller/controller');
  
    app.post('/send-email', pers.create);
  
    app.get('/', pers.findAll);
  }