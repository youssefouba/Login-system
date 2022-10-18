const express = require("express");
const app = express();
var mysql = require("mysql");
const cors = require("cors");
app.use(express.json());
const path = require('path');
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "youssef",
  database: "auth_db",
});
app.post("/Register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(
      "select count(*) as emailvalid from userinfo where email=?;",
      email,
      (err, result) => {
        if (result[0].emailvalid == 0) {
          db.query(
            "insert into userinfo (email,password) values (?,?);",
            [email, password],
            (err, result) => {
              res.send({ erorr: 0, message: "Registered Successfully" });
            }
          );
        } else {
          res.send({ erorr: 1, message: "Email already registered" });
        }
      }
    );
});
app.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "select count(*) as validlogin from userinfo where email=? and password=?;",
    [email, password],
    (err, result) => {
      if (result[0].validlogin == 1) {
        res.send({ erorr: 0, message: "" });
      } else {
        res.send({ erorr: 1, message: "Email or Password incorrect" });
        
      }
    }
  )
});

app.listen(3001);
