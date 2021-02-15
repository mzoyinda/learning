const express = require('express');
const mails = express.Router();

// Database Connection Route
const databaseConn = require('../models/databaseConn');

//  Middle ware
mails.use(databaseConn.handler);

mails.post('/mailingList', async (req,res,next) => {
    
    let mail = {email: req.body.email, Category: req.body.course};

    if (mail.email && mail.Category) {
        let sql = 'INSERT INTO mailinglist SET ? ';

        databaseConn.dbVar.query(sql, mail, (err,result) => {
            if(err) console.log(err.code);
            console.log(result);        
        });

        return res.status(200).json({
            message: 'Successfully added to mailing List'
          });
    } else if (!mail || (!mail.Category && mail.email) || (!mail.email && mail.Category)) {
        return res.status(200).json({
            message: 'Please enter Email Address and Course'
          });
    } else {
        return res.status(200).json({
            message: 'This email already exists on our mailing list'
        });
    }
    
});

module.exports = mails;