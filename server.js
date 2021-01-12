// All package dependencies

let express = require('express');
// let session = require('express-session');
let bodyParser = require('body-parser');
// let path = require('path');
let PORT = process.env.PORT || 3000;

//  All routes
const courseOfStudyRoute = require('./routes/courseOfStudy');
const contactForm = require('./routes/contactForm');



// Database Connection Route
const databaseConn = require('./models/databaseConn');


// Create an express instance
const app = express();


//  All necessary middlewares
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true

// }));

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();    
});


app.use(databaseConn.handler);
app.use(courseOfStudyRoute);
app.use(contactForm);



// Listening port
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});