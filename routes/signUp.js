const express = require("express");
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Database Connection Route
const databaseConn = require("../models/databaseConn");


// [
//     body("email").isEmail().withMessage("Please enter a valid Email Address"),
//     body('password').trim().isLength({min:5}),
//     body('name').trim().not().isEmpty()
// ]

router.put("/signUp", async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//       const error = new Error('Validation failed');
//       error.statusCode = 422;
//       error.data = errors.array();
//       throw error;
//   }
    const name = req.body.name;
    const password = req.body.psw;
    const email = req.body.email;
    const hash = await bcrypt.hashSync(password, 10);

    let account = {username: name, 
                   hash: hash, 
                   email: email
                   };
    let sql = 'INSERT INTO accounts SET ? ';

    let query = databaseConn.dbVar.query(sql, account, (err,result) => {
    
        if(err) console.log(err.code);
        console.log(result);        
    });

    res.status(201).json({
        message: 'User created'
    });



 
});
module.exports = router;
