const Complaint = require('../models/complaint.js');

// Create and Save a new Complaint
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Complaint
  const complaint = new Complaint({
    user_id: req.body.user_id,
    description: req.body.description,
    type_of_crime: req.body.type_of_crime,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    status: req.body.status
  });

  // Save Complaint in the database
  Complaint.create(complaint, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Complaint."
      });
    else res.send(data);
  });
};

// Retrieve all Complaints from the database
exports.findAll = (req, res) => {
  Complaint.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving complaints."
      });
    else res.send(data);
  });
};

// Find a single Complaint with a id
exports.findOne = (req, res) => {

  Complaint.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Complaint with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Complaint with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Complaint identified by the id in the request
exports.update = (req, res) => {

  console.log(req.params.id);
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  Complaint.updateById(
    req.params.id,
    new Complaint(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Complaint with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Complaint with id " + req.params.id
          });
        }
      } else{
        console.log(data)
        res.send(data);
      }
    }
  );
};

// Delete a Complaint with the specified id in the request
exports.delete = (req, res) => {
  Complaint.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Complaint with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Complaint with id " + req.params.id
        });
      }
    } else res.send({ message: `Complaint was deleted successfully!` });
  });
};

// Delete all Complaints from the database
exports.deleteAll = (req, res) => {
  Complaint.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all complaints."
      });
    else res.send({ message: `All Complaints were deleted successfully!` });
  });
};
