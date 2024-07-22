const Police = require('../models/police.js');
const User = require('../models/user.js');
const requireAuth = require('../services/verifytoken.js');

// routes/complaint.routes.js
module.exports = app => {
    const complaints = require('../controllers/complaint.js');
  
    app.post('/complaints',requireAuth(User), complaints.create);

    // console.log("complaints routes")
    app.get('/complaints',requireAuth(Police), complaints.findAll);
    app.get('/complaints/:id',requireAuth(Police), complaints.findOne);
    app.put('/complaints/:id',requireAuth(Police), complaints.update);

    app.delete('/complaints/:id', complaints.delete);
  };
  