require('dotenv').config();
const jwt = require('jsonwebtoken');
// const User = require('../models/user');

const requireAuth = (User) => {
    return async (req, res, next) => {
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

        if (!token || token === "null" || token === "undefined") {
            console.log("No token found");
            return res.status(401).json({ msg: 'You are not authorized' });
        }

        try {
            const { id, email } = await jwt.verify(token, "process.env.SECRET_KEY");

            if (!email || !id) {
                console.log("No email or id found in token");
                return res.status(401).json({ message: "Request is not authorized" });
            }

            User.findById(id, (err, data) => { // Changed req.params.id to id from the token
                if (err) {
                    if (err.kind === "not_found") {
                        return res.status(404).send({ message: `Not found User with id ${id}.` });
                    } else {
                        return res.status(500).send({ message: "Error retrieving User with id " + id });
                    }
                } else {
                    req.user = data;
                    next();
                }
            });
        } catch (error) {
            console.log("An unauthorized access is attempted");
            console.log(error.message);
            return res.status(401).json({ error: 'Request is not authorized' });
        }
    };
}

module.exports = requireAuth;
