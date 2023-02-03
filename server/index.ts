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
      host: "capstone.cuie3sewt5xi.us-east-2.rds.amazonaws.com",
      user: "root",
      password: "dummypassword",
      database: "Capstone"
});

con.connect(function (err: any) {
  if (err) throw err;
  console.log("MySQL Database Connected!");
});

// TEST
app.get( "/", ( req: any, res: any ) => {
  res.send( "Hello world!" );
} );

// OLD QUERY – mentors table as-is in MySQL
app.get('/mentors', (req: any, res: any) => {
  con.query("SELECT * FROM `Capstone`.`mentors`;", (err: any, results: any, fields: any) => {
    if(err) throw err;
    res.send(results);
    // console.log(results);
  })
})

app.get('/resources', (req: any, res: any) => {
  con.query("SELECT * FROM `Capstone`.`resources`;", (err: any, results: any, fields: any) => {
    if(err) throw err;
    res.send(results);
    // console.log(results);
  })
})

// JOIN query on mentors and interests table
app.get('/mentor-interests', (req: any, res: any) => {
  con.query("SELECT mentors.fullname, mentors.profession, mentors.user_id, mentors.description, mentors.contact_email AS email, mentors.contact_phone AS phone, mentors.website, interests.name AS interest FROM mentors JOIN interests ON mentors.interest_id = interests.id", (err: any, results: any, fields: any) => {
    if(err) throw err;
    res.send(results);
    // console.log(results);
  })
})

app.get('/resource', (req: any, res: any) => {
  con.query("SELECT resources.description, resources.title, interests.name AS interest FROM resources JOIN interests ON resources.interest_id = interests.id", (err: any, results: any, fields: any) => {
    if(err) throw err;
    const x = results.sort(() => Math.random()- 0.5)
    res.send(x);
    // console.log(results);
  })
})

app.listen(5000, () => {
  console.log(`Server is running on port ${port}.`)
})