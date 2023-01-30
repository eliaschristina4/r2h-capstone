var express = require("express");
var cors = require("cors");
var mysql = require("mysql");
var app = express();
var port = 5000;
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
// app.use(express.static("../client/src"));
var con = mysql.createConnection({
    host: "cap.cluster-c7bfdyjkoqls.us-east-2.rds.amazonaws.com",
    user: "root",
    password: "dummypassword",
    database: "Capstone"
});
con.connect(function (err) {
    if (err)
        throw err;
    console.log("MySQL Database Connected!");
});
// TEST
app.get("/", function (req, res) {
    res.send("Hello world!");
});
// MENTORS
app.get('/mentors', function (req, res) {
    con.query("SELECT * FROM `Capstone`.`mentors`;", function (err, results, fields) {
        if (err)
            throw err;
        res.send(results);
        // console.log(results);
    });
});
// copy basic structure for resources, businesses, etc.
app.listen(5000, function () {
    console.log("Server is running on port ".concat(port, "."));
});
