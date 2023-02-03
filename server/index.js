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
    host: "capstone.cuie3sewt5xi.us-east-2.rds.amazonaws.com",
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
// OLD QUERY – mentors table as-is in MySQL
app.get('/mentors', function (req, res) {
    con.query("SELECT * FROM `Capstone`.`mentors`;", function (err, results, fields) {
        if (err)
            throw err;
        res.send(results);
        // console.log(results);
    });
});
app.get('/resources', function (req, res) {
    con.query("SELECT * FROM `Capstone`.`resources`;", function (err, results, fields) {
        if (err)
            throw err;
        res.send(results);
        // console.log(results);
    });
});
// JOIN query on mentors and interests table
app.get('/mentor-interests', function (req, res) {
    con.query("SELECT mentors.fullname, mentors.profession, mentors.user_id, mentors.description, mentors.contact_email AS email, mentors.contact_phone AS phone, mentors.website, interests.name AS interest FROM mentors JOIN interests ON mentors.interest_id = interests.id", function (err, results, fields) {
        if (err)
            throw err;
        res.send(results);
        // console.log(results);
    });
});
app.get('/resource', function (req, res) {
    con.query("SELECT resources.description, resources.title, interests.name AS interest FROM resources JOIN interests ON resources.interest_id = interests.id", function (err, results, fields) {
        if (err)
            throw err;
        var x = results.sort(function () { return Math.random() - 0.5; });
        res.send(x);
        // console.log(results);
    });
});
app.listen(5000, function () {
    console.log("Server is running on port ".concat(port, "."));
});
