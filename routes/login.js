const express = require('express');
const router = express.Router();



router.get('/login', (req,res,next) => {

});


router.post('/login', (req,res,next) => {
    req.isLoggedIn = true;
});
module.exports = router;