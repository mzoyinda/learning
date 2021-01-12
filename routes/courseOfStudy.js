const express = require('express');
const courseOfStudyRoute = express.Router();

// Database Connection Route
const databaseConn = require('../models/databaseConn');

//  Middle ware
courseOfStudyRoute.use(databaseConn.handler);



courseOfStudyRoute.get('/courseOfStudy', async  (req,res,next) => {
    let courseOfStudy = req.query.courseOfStudy;

    const results = [];

    await databaseConn.dbVar.query(`SELECT * FROM courses JOIN rolescourses ON courses.courseId = rolescourses.courseID JOIN roles ON rolescourses.roleID = roles.roleID`, function (err,result,fields){
        if(err) throw err;

        
        
        for (let index = 0; index < result.length; index++) {
            if(courseOfStudy.replace(/\s+/g, '').toLowerCase() === result[index].courseTitle.replace(/\s+/g, '').toLowerCase()) {
                results.push(result[index]);
            }
        }

        console.log(results);

        if(results.length === 0) {
            return (
                res.json({
                    results: "This course does not exist on our database"
            })
    
            );
        } else {
            return (
                res.json({
                   results
            })
    
            );
        }

    });



    
});



module.exports = courseOfStudyRoute;