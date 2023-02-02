const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const axios = require("axios");
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
const port = 5000;
const con = mysql.createConnection({
  host: "capstone.cuie3sewt5xi.us-east-2.rds.amazonaws.com",
  user: "root",
  password: "dummypassword",
  database: "Capstone",
});
con.connect(function (err: any) {
  if (err) throw err;
  console.log("MySQL Database Connected!");
});

// mentor queries
app.post("/signup/mentor", (req: any, res: any) => {
 
  const data = req.body
   con.query(`INSERT INTO user_logins (role_id, login_email, login_password, date_created)
   VALUES (4, "${data.email}", "${data.password}", 2023-03-02);`)

  con.query(`INSERT INTO mentors (fullname, profession, description, contact_email, contact_phone, interest_id, user_id)
  VALUES ("${data.fullName}", "${data.profession}", "${data.description}", "${data.email}", "${data.phone}", 1, 27);`)
});

// business queries
app.post("/signup/business", (req: any, res: any) => {
  console.log(req.body);
  
  const data = req.body
  //console.log(data["ownerFull Name"])
   con.query(`INSERT INTO user_logins (role_id, login_email, login_password, date_created)
   VALUES (3, "${data.email}", "${data.password}", 2023-03-02);`)

  con.query(`INSERT INTO businesses (business_name, description, owner_fullname, email, phone, interest_id, user_id)
  VALUES ( "${data.businessName}", "${data.businessDescription}", "${data["ownerFull Name"]}", "${data.email}", "${data.phone}", 1, 28);`)
});

// HR queries
app.post("/signup/hr", (req: any, res: any) => {
 // console.log(req.body);
  const data = req.body
   con.query(`INSERT INTO user_logins (role_id, login_email, login_password, date_created)
   VALUES (2, "${data.email}", "${data.password}", 2023-03-02);`)

  con.query(`INSERT INTO employees (fullname, employee_id, description, phone, user_id)
  VALUES ("${data.fullName}", "${data.employeeID}", "${data.description}", "${data.phone}", 29);`)
});


app.listen(port, () => console.log(`Server started on port ${port}`));

