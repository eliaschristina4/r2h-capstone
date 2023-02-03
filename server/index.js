var express = require("express");
var cors = require("cors");
var mysql = require("mysql");
var app = express();
var axios = require("axios");
var port = 5000;
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
// setting the mysql db connection details to be used to initiate the connection below
var con = mysql.createConnection({
    host: "capstone.cuie3sewt5xi.us-east-2.rds.amazonaws.com",
    user: "root",
    password: "dummypassword",
    database: "Capstone"
});
// actually connecting to mysql rds using the credentials specified above
con.connect(function (err) {
    if (err)
        throw err;
    console.log("MySQL Database Connected!");
});
// TEST ROUTE
app.get("/", function (req, res) {
    res.send("Hello world!");
});
/* LOGIN PORTAL */
// Grab log-in information from mysql db
app.post('/login', function (req, res) {
    var data = req.body;
    console.log(data);
    con.query('SELECT * FROM user_logins WHERE login_email = ?', [data.login_email], function (error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send("Server error");
        }
        if (!results.length) {
            return res.status(400).send("Username and/or Password not found");
        }
        con.query('SELECT * FROM user_logins WHERE login_password = ?', [data.login_password], function (error, results) {
            if (error) {
                console.error(error);
                return res.status(500).send("Server error");
            }
            if (!results.length) {
                return res.status(400).send("Username and/or Password not found");
            }
            var z = results[0];
            console.log(z.login_password);
            if (z.login_password === data.login_password) {
                res.send('Login successful');
            }
            else {
                res.send('Login failed');
            }
        });
    });
});
/* SIGN UP PORTALS */
// mentor signup queries
app.post("/signup/mentor", function (req, res) {
    var data = req.body;
    con.query("INSERT INTO user_logins (role_id, login_email, login_password, date_created)\n   VALUES (4, \"".concat(data.email, "\", \"").concat(data.password, "\", 2023-03-02);"));
    con.query("INSERT INTO mentors (fullname, profession, description, contact_email, contact_phone, interest_id, user_id)\n  VALUES (\"".concat(data.fullName, "\", \"").concat(data.profession, "\", \"").concat(data.description, "\", \"").concat(data.email, "\", \"").concat(data.phone, "\", 1, 27);"));
});
// business signup queries
app.post("/signup/business", function (req, res) {
    console.log(req.body);
    var data = req.body;
    //console.log(data["ownerFull Name"])
    con.query("INSERT INTO user_logins (role_id, login_email, login_password, date_created)\n   VALUES (3, \"".concat(data.email, "\", \"").concat(data.password, "\", 2023-03-02);"));
    con.query("INSERT INTO businesses (business_name, description, owner_fullname, email, phone, interest_id, user_id)\n  VALUES ( \"".concat(data.businessName, "\", \"").concat(data.businessDescription, "\", \"").concat(data["ownerFull Name"], "\", \"").concat(data.email, "\", \"").concat(data.phone, "\", 1, 28);"));
});
// HR signup queries
app.post("/signup/hr", function (req, res) {
    // console.log(req.body);
    var data = req.body;
    con.query("INSERT INTO user_logins (role_id, login_email, login_password, date_created)\n   VALUES (2, \"".concat(data.email, "\", \"").concat(data.password, "\", 2023-03-02);"));
    con.query("INSERT INTO employees (fullname, employee_id, description, phone, user_id)\n  VALUES (\"".concat(data.fullName, "\", \"").concat(data.employeeID, "\", \"").concat(data.description, "\", \"").concat(data.phone, "\", 29);"));
});
/* RESOURCES (GRANTS, SCHOLARSHIPS, PROGRAMS) */
// basic resources get req -- all data from resources table
app.get('/resources', function (req, res) {
    con.query("SELECT * FROM `Capstone`.`resources`;", function (err, results, fields) {
        if (err)
            throw err;
        res.send(results);
        // console.log(results);
    });
});
// JOIN query on resources and interests table
app.get('/resource', function (req, res) {
    con.query("SELECT resources.id, resources.title, resources.description, resources.monetary_value, interests.name AS interest FROM resources JOIN interests ON resources.interest_id = interests.id", function (err, results, fields) {
        if (err)
            throw err;
        res.send(results);
        // console.log(results);
    });
});
/* MENTORS PAGE */
// OLD QUERY – mentors table as-is in MySQL
app.get('/mentors', function (req, res) {
    con.query("SELECT * FROM `Capstone`.`mentors`;", function (err, results, fields) {
        if (err)
            throw err;
        res.send(results);
        // console.log(results);
    });
});
// JOIN query on mentors and interests table
// removed mentors.location because i think it got deleted from the mentors table in the rds somehow? and that's messing up the get/fetch requests :/
app.get('/mentor-interests', function (req, res) {
    con.query("SELECT mentors.fullname, mentors.profession, mentors.user_id, mentors.description, mentors.contact_email AS email, mentors.contact_phone AS phone, mentors.website, interests.name AS interest FROM mentors JOIN interests ON mentors.interest_id = interests.id", function (err, results, fields) {
        if (err)
            throw err;
        res.send(results);
        // console.log(results);
    });
});
// telling the express server to listen on port 5000
app.listen(port, function () {
    console.log("Server is running on port ".concat(port, "."));
});
