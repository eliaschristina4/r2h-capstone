const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

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
