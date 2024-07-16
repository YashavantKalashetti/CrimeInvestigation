// routes/complaint.routes.js
module.exports = app => {
    const complaints = require('../controllers/complaint.js');
  
    app.post('/complaints', complaints.create);
    app.get('/complaints', complaints.findAll);
    app.get('/complaints/:id', complaints.findOne);
    app.put('/complaints/:id', complaints.update);
    app.delete('/complaints/:id', complaints.delete);
  };
  