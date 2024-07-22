// controllers/police.controller.js
const Police = require('../models/police');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  console.log(req.body);

  req.body.password = await bcrypt.hash(req.body.password, 10);

  const police = new Police({
    name: req.body.name,
    _rank: req.body._rank,
    station: req.body.station,
    badge: req.body.badge,
    email: req.body.email,
    password: req.body.password
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


exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "All the necessary fields are required" });
  }

  Police.findByEmail(req.body.email, async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(401).send({ message: `Not found Police with email ${req.body.email}.` });
      } else {
        return res.status(500).send({ message: "Error retrieving Police with email " + req.body.email });
      }
    }

    const police = data[0];  // Ensure data[0] exists

    if (!police) {
      return res.status(401).send({ message: `Not found Police with email ${req.body.email}.` });
    }


    try {
      const result = await bcrypt.compare(req.body.password, police.password);
      if (result) {
        const token = await jwt.sign({
          email: police.email,
          id: police.id
      }, "process.env.SECRET_KEY", { expiresIn: '2d' });

      console.log(token);

      return res.status(200)
          .cookie("token", token, { httpOnly: true, secure: true })
          .json({ token: token, msg: "Successfully Logged IN" });
      } else {
        return res.status(401).send({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Error logging in" });
    }
  });
}

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
