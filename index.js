const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "104.198.255.103",
    user: "pyclas",
  port: 3306,
  database: "programdb",
    password: "ptrodaaaieassd33"
});

    // connect to database 
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// Retrieve all programs 
app.get('/learning', function (req, res) {
  db.query('SELECT * FROM programs', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'programs list.' });
  });
});

// Retrieve program with id 
app.get('/learning/:id', function (req, res) {
  let program_id = req.params.id;
  if (!program_id) {
   return res.status(400).send({ error: true, message: 'Please provide program_id' });
  }
  db.query('SELECT * FROM programs where id=?', program_id, function (error, results, fields) {
   if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'programs list.' });
  });
});

app.listen(3001, () => {
    console.log("running server");
});