// All package dependencies

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const cors = require('cors');

//  All routes
const courseOfStudyRoute = require("./routes/courseOfStudy");
const contactForm = require("./routes/contactForm");
const mailingList = require("./routes/mailingList");
const login = require("./routes/login");
const signUp = require("./routes/signUp");
const logout = require("./routes/logout");
const isAuth = require("./middleware/is-auth");
// Database Connection Route
const databaseConn = require("./models/databaseConn");

// Create an express instance
const app = express();

// CORS
app.use(cors());

//  All necessary middlewares
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);


app.use(bodyParser.json());
// app.use(isAuth);


app.get("/", (req, res, next) => {
  // Health Check
  res.send("PyClas Backend Up And Running");
});

app.use(databaseConn.handler);
app.use(courseOfStudyRoute);
app.use(contactForm);
app.use(mailingList);
app.use(login);
app.use(signUp);
app.use(logout);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message: message, data:data});
})

app.get("*", (req, res) => {
  // Determines if the entered route is an unregistered one
  res.status(404).json({
    error: 404,
    message: "The resource you requested does not exist.",
  });
});

// Listening port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
