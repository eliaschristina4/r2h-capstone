/* in terminal:

1. /server - tsc index.ts --watch
2. /server - npm start
3. /client - npm start
*/

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const axios = require("axios");

const port = 5000;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

// setting the mysql db connection details to be used to initiate the connection below
const con = mysql.createConnection({
      host: "capstone.cuie3sewt5xi.us-east-2.rds.amazonaws.com",
      user: "root",
      password: "dummypassword",
      database: "Capstone"
});

// actually connecting to mysql rds using the credentials specified above
con.connect(function (err: any) {
  if (err) throw err;
  console.log("MySQL Database Connected!");
});

// TEST ROUTE
app.get( "/", ( req: any, res: any ) => {
  res.send( "Hello world!" );
} );

/* LOGIN PORTAL */

// Grab log-in information from database and validates email & password
// If credentials do not match, return error message
app.post('/login', (req: any, res: any) => {
  const data = req.body;
  console.log(data);
  con.query('SELECT * FROM user_logins WHERE login_email = ?', [data.login_email], (error: any, results: any) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
    if (!results.length) {
      return res.status(400).send("Username and/or Password not found");
    }
    con.query('SELECT * FROM user_logins WHERE login_password = ?', [data.login_password], (error: any, results: any) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Server error");
      }
      if (!results.length) {
        return res.status(400).send("Username and/or Password not found");
      }
      const z = results[0];
      console.log(z.login_password);
      if (z.login_password === data.login_password) {
        res.send('Login successful');
      } else {
        res.send('Login failed');
      }
    });
  });
});

// IS THIS SUPPOSED TO BE IN THIS FILE?
// handleSubmit = async (e) => {
//   e.preventDefault()
//   const x = {
//       email: this.state.login_email,
//       password: this.state.login_password
//   }
//   axios.post("http://localhost:5000/login", x)
//   const [rows, fields] = await conn.query(`SELECT * FROM table_name WHERE email = '${this.state.login_email}' AND password = '${this.state.login_password}'`);
//   if (rows.length > 0) {
//       this.setState({loggedIn: true})
//   } else {
//       this.setState({loggedIn: false})
//   }
// }


/* SIGN UP PORTALS */

// mentor signup queries
app.post("/signup/mentor", (req: any, res: any) => {
 
  const data = req.body
   con.query(`INSERT INTO user_logins (role_id, login_email, login_password, date_created)
   VALUES (4, "${data.email}", "${data.password}", 2023-03-02);`)

  con.query(`INSERT INTO mentors (fullname, profession, description, contact_email, contact_phone, interest_id, user_id)
  VALUES ("${data.fullName}", "${data.profession}", "${data.description}", "${data.email}", "${data.phone}", 1, 27);`)
});

// business signup queries
app.post("/signup/business", (req: any, res: any) => {
  console.log(req.body);
  
  const data = req.body
  //console.log(data["ownerFull Name"])
   con.query(`INSERT INTO user_logins (role_id, login_email, login_password, date_created)
   VALUES (3, "${data.email}", "${data.password}", 2023-03-02);`)

  con.query(`INSERT INTO businesses (business_name, description, owner_fullname, email, phone, interest_id, user_id)
  VALUES ( "${data.businessName}", "${data.businessDescription}", "${data["ownerFull Name"]}", "${data.email}", "${data.phone}", 1, 28);`)
});

// HR signup queries
app.post("/signup/hr", (req: any, res: any) => {
  // console.log(req.body);
   const data = req.body
    con.query(`INSERT INTO user_logins (role_id, login_email, login_password, date_created)
    VALUES (2, "${data.email}", "${data.password}", 2023-03-02);`)
 
   con.query(`INSERT INTO employees (fullname, employee_id, description, phone, user_id)
   VALUES ("${data.fullName}", "${data.employeeID}", "${data.description}", "${data.phone}", 29);`)
 });


/* RESOURCES (GRANTS, SCHOLARSHIPS, PROGRAMS) */

// basic resources get req -- all data from resources table
app.get('/resources', (req: any, res: any) => {
  con.query("SELECT * FROM `Capstone`.`resources`;", (err: any, results: any, fields: any) => {
    if(err) throw err;
    res.send(results);
    // console.log(results);
  })
})

// JOIN query on resources and interests table
app.get('/resource', (req: any, res: any) => {
  con.query("SELECT resources.description, resources.title, interests.name AS interest FROM resources JOIN interests ON resources.interest_id = interests.id", (err: any, results: any, fields: any) => {
    if(err) throw err;
    const x = results.sort(() => Math.random()- 0.5)
    res.send(x);
    // console.log(results);
  })
})


/* MENTORS PAGE */

// OLD QUERY – mentors table as-is in MySQL
app.get('/mentors', (req: any, res: any) => {
  con.query("SELECT * FROM `Capstone`.`mentors`;", (err: any, results: any, fields: any) => {
    if(err) throw err;
    res.send(results);
    // console.log(results);
  })
});

// JOIN query on mentors and interests table
// removed mentors.location because i think it got deleted from the mentors table in the rds somehow? and that's messing up the get/fetch requests :/
app.get('/mentor-interests', (req: any, res: any) => {
  con.query("SELECT mentors.fullname, mentors.profession, mentors.user_id, mentors.description, mentors.contact_email AS email, mentors.contact_phone AS phone, mentors.website, interests.name AS interest FROM mentors JOIN interests ON mentors.interest_id = interests.id", (err: any, results: any, fields: any) => {
    if(err) throw err;
    res.send(results);
    // console.log(results);
  })
});


// telling the express server to listen on port 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
});