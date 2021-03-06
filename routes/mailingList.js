const express = require('express');
const { body, check, validationResult } = require("express-validator");
const mails = express.Router();

// Database Connection Route
const databaseConn = require('../models/databaseConn');

//  Middle ware
mails.use(databaseConn.handler);

mails.post('/mailingList',
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
          throw new Error("This email already exists on our mailing list");
        }
      })
      .withMessage("Kindly enter a valid Email Address."),
    // check("Category")
    // .exists()
    // .isLength({ min: 6, max: 100 })
    // .trim()
    // .withMessage("Kindly enter a valid course. "),
  ],
    
async (req,res,next) => {
    

    let email = req.body.email;
    let course = req.body.course;

    if (email && Category) {
        let sql = 'INSERT INTO mailinglist SET ? ';
        let account = { Category: course, email: email };
        databaseConn.dbVar.query(sql, account, (err,result) => {
            if(err) console.log(err.code);
            console.log(result);        
        });

        return res.status(200).json({
            message: 'Successfully added to mailing List'
          });
    } else if ( (email === '' && Category === '') || (email === '') || (Category === '') || (!Category && email) || (!email && Category)) {
        return res.status(200).json({
            message: 'Please enter Email Address and Course'
          });
    } 
    
});

function isEmailInUse(email) {
    return new Promise((resolve, reject) => {
      databaseConn.dbVar.query(
        "SELECT COUNT(*) AS total FROM mailinglist WHERE email = ?",
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

module.exports = mails;