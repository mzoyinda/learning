const express = require('express');
const databaseConn = require("../models/databaseConn");
const router = express.Router();



router.get('/login', (req,res,next) => {
    console.log(req.get('Cookie'));
});


router.post('/login', (req,res,next) => {
    const email = req.body.email;
    const password = req.body.psw;

    if(email && password) {
    
        databaseConn.dbVar.query('SELECT * FROM accounts WHERE email = ?', [email], (_err, results, fields) => {
        
            let validPass =  bcrypt.compareSync(password, results[0].hash);

            //  check password entered against hashed password in db

            if (validPass) {
                if(results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = email;
        

                    
                }
            }
                else {
                    res.status(404).json({
                        message: 'Incorrect Username and/or Password!'
                    });
                }

            
        
        
            });
    } else {
        res.json('Please enter Username and Password');
        res.json({
            message: 'Please enter Email and Password'
        });
    
    }
    
});
module.exports = router;