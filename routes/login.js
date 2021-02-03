const express = require("express");
const databaseConn = require("../models/databaseConn");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();


router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.psw;

  if (email && password) {
    databaseConn.dbVar.query(
      "SELECT * FROM accounts WHERE email = ?",
      [email],
      (_err, results, fields) => {
        let validPass = bcrypt.compareSync(password, results[0].hash);

        //  check password entered against hashed password in db
        if (validPass) {
          if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = email;
            const token = jwt.sign(
              {
                email,
                userId: results[0].id.toString()
              },
              "someSuperSecret",
              { expiresIn: "1hr" }
            );

            res.status(200).json({
              token: token,
              message: 'Sign in successful',
              success: true,
              userId: results[0].id.toString()
            });
          }
        } else {
          res.status(404).json({
            message: "Incorrect Email and/or Password!",
            success: false
          });
        }
      }
    );
  } else {
    res.json({
      message: "Please enter Email and Password",
      success: false
    });
  }
});
module.exports = router;
