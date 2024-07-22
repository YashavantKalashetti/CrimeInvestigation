// controllers/user.controller.js
const User = require('../models/user');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.create = async (req, res) => {

  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  
  req.body.password = await bcrypt.hash(req.body.password, 10);
  // console.log(req.body.password);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
    else res.send(data);
  });
};

exports.login = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "All the necessary fields are required" });
  }


  User.findByEmail(req.body.email, async (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
              return res.status(401).send({ message: `Not found User with email ${req.body.email}.` });
          } else {
              return res.status(500).send({ message: "Error retrieving User with email " + req.body.email });
          }
      }

      const user = data[0];  // Ensure data[0] exists

      if (!user) {
          return res.status(401).send({ message: `Not found User with email ${req.body.email}.` });
      }

      try {
          const result = await bcrypt.compare(req.body.password, user.password);
          if (result) {
              const token = await jwt.sign({
                  email: user.email,
                  id: user.id
              }, "process.env.SECRET_KEY", { expiresIn: '2d' });

              return res.status(200)
                  .cookie("token", token, { httpOnly: true, secure: true })
                  .json({ token, msg: "Successfully Logged IN" });
          } else {
              return res.status(400).send({ message: "Invalid Password!" });
          }
      } catch (error) {
          console.error("Error during authentication process:", error.message);
          return res.status(500).send({ message: "Internal server error during authentication." });
      }
  });

}

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found User with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Error retrieving User with id " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  User.updateById(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found User with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Error updating User with id " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found User with id ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Could not delete User with id " + req.params.id });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
