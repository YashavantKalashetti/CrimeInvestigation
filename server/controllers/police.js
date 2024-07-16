// controllers/police.controller.js
const Police = require('../models/police');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const police = new Police({
    name: req.body.name,
    _rank: req.body._rank,
    station: req.body.station,
    badge: req.body.badge
  });

  Police.create(police, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while creating the Police." });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Police.getAll((err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while retrieving police." });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Police.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Police with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Error retrieving Police with id " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  Police.updateById(req.params.id, new Police(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Police with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Error updating Police with id " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Police.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Police with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Could not delete Police with id " + req.params.id });
      }
    } else res.send({ message: `Police was deleted successfully!` });
  });
};
