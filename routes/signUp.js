const express = require("express");
const bcrypt = require("bcryptjs");
const { body, check, validationResult } = require("express-validator");
const router = express.Router();

// Database Connection Route
const databaseConn = require("../models/databaseConn");

router.put(
  "/signUp",
  [
    check("email")
      .exists()
      .isLength({ min: 6, max: 100 })
      .isEmail()
      .normalizeEmail()
      .trim()
      .custom(async (email) => {
        const value = await isEmailInUse(email);
        if (value) {
          throw new Error("Email already exists!");
        }
      })
      .withMessage("Invalid email address!"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    const password = req.body.psw;
    const email = req.body.email;

    const hash = await bcrypt.hashSync(password, 10);

    let account = { hash: hash, email: email };
    let sql = "INSERT INTO accounts SET ? ";

    let query = databaseConn.dbVar.query(sql, account, (err, result) => {
      if (err) console.log(err.code);
    });

    res.status(201).json({
      message: "User created",
    });
  }
);

function isEmailInUse(email) {
  return new Promise((resolve, reject) => {
    databaseConn.dbVar.query(
      "SELECT COUNT(*) AS total FROM accounts WHERE email = ?",
      [email],
      function (error, results, fields) {
        if (!error) {
          console.log("EMAIL COUNT : " + results[0].total);
          return resolve(results[0].total > 0);
        } else {
          return reject(new Error("Database error!!"));
        }
      }
    );
  });
}


module.exports = router;
