const express = require("express");

const router = express.Router();


router.get('/logout', (req,res,next) => {
    if(req.session.loggedin) {
        req.session.destroy();

        return res.status(200).json({
            message: 'Client has been logged out'
        });
    }

    return res.status(200).json({
        message: 'Client was never signed in'
    });
})


module.exports = router;