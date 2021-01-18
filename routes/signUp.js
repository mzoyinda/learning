const express = require("express");
const bcrypt = require('bcryptjs');
const validator = require("email-validator");
const { body, check, validationResult } = require("express-validator");
const router = express.Router();

// Database Connection Route
const databaseConn = require("../models/databaseConn");




router.put("/signUp",
        [
            // body('email').isEmail().normalizeEmail().withMessage("Please enter a valid Email Address"),
            // body('psw').trim().isLength({min:5}),
            // body('name').trim().not().isEmpty()
            check('name')
                .exists()
                .trim()
                .matches(/^[a-zA-Z\ö\ç\ş\ı\ğ\ü\Ö\Ç\Ş\İ\Ğ\Ü ]{3,16}$/)
                .custom(async username => {
                    const value = await isNameInUse(username);
                    if (value) {
                        throw new Error('Name already exists!');
                    }
                })
                .withMessage('Invalid username!'),
            check('email')
                .exists()
                .isLength({ min: 6, max: 100 })
                .isEmail()
                .normalizeEmail()
                .trim()
                .custom(async email => {
                    const value = await isEmailInUse(email);
                    if (value) {
                        throw new Error('Email already exists!!!');
                    }
                })
                .withMessage('Invalid email address!'),
        ],    
async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });
  }
    const username = req.body.name;
    const password = req.body.psw;
    const email = req.body.email;
    const hash = await bcrypt.hashSync(password, 10);

    let account = {username: username, 
                   hash: hash, 
                   email: email
                   };
    let sql = 'INSERT INTO accounts SET ? ';

    let query = databaseConn.dbVar.query(sql, account, (err,result) => {
    
        if(err) console.log(err.code);
              
    });

    res.status(201).json({
        message: 'User created'
    });

 
});


function isEmailInUse(email){
    return new Promise((resolve, reject) => {
        databaseConn.dbVar.query('SELECT COUNT(*) AS total FROM accounts WHERE email = ?', [email], function (error, results, fields) {
            if(!error){
                console.log("EMAIL COUNT : "+results[0].total);
                return resolve(results[0].total > 0);
            } else {
                return reject(new Error('Database error!!'));
            }
          }
        );
    });
}

function isNameInUse(username){
    return new Promise((resolve, reject) => {
        databaseConn.dbVar.query('SELECT COUNT(*) AS total FROM accounts WHERE username = ?', [username], function (error, results, fields) {
            if(!error){
                console.log("Name : "+results[0].total);
                return resolve(results[0].total > 0);
            } else {
                return reject(new Error('Database error!!'));
            }
          }
        );
    });
}

module.exports = router;
