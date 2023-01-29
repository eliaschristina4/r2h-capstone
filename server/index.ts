const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
// app.use(express.static("../../client/src"));

const con = mysql.createConnection({
  host: "cap.cluster-c7bfdyjkoqls.us-east-2.rds.amazonaws.com",
  user: "root",
  password: "dummypassword",
  database: "Capstone",
});

con.connect(function (err: any) {
  if (err) throw err;
  console.log("MySQL Database Connected!");
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`)
})