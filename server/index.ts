const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const port = 5000;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
// app.use(express.static("../client/src"));

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

// TEST
app.get( "/", ( req: any, res: any ) => {
  res.send( "Hello world!" );
} );

// MENTORS
app.get('/mentors', (req: any, res: any) => {
  con.query("SELECT * FROM `Capstone`.`mentors`;", (err: any, results: any, fields: any) => {
    if(err) throw err;
    res.send(results);
    // console.log(results);
  })
})
// copy basic structure for resources, businesses, etc.

app.listen(5000, () => {
  console.log(`Server is running on port ${port}.`)
})