// routes/police.routes.js
module.exports = app => {
    const police = require('../controllers/police.js');
  
    app.post('/police', police.create);
    app.get('/police', police.findAll);
    app.post('/police/login', police.login);
    app.get('/police/:id', police.findOne);
    app.put('/police/:id', police.update);
    app.delete('/police/:id', police.delete);
  };
  