const express = require('express');
const mysql = require('mysql');
const dbConn = express.Router();

//Create Connection
const db = mysql.createPool({
    connectionLimit : 1000, 
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host : 'a2plcpnl0509.prod.iad2.secureserver.net',
    port: 3306,
    database : 'pyclasdatabase',
    user : 'p3z2bplw3s2n',
    password : 'STEMEdPy12@'
});


module.exports = {
        handler: dbConn,
        dbVar: db
    };