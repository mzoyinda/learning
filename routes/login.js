const express = require('express');
const router = express.Router();



router.get('/login', (req,res,next) => {
    console.log(req.get('Cookie'));
});


router.post('/login', (req,res,next) => {
    let name = req.body.name;
    let password = req.body.psw;

    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
});
module.exports = router;