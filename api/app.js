const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const login_id=0;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  const jwt = require("jsonwebtoken")
  const jwtKey = "my_secret_key"
  
  var mysql = require("mysql");

    // config for your database
    var con= mysql.createPool ({
      host:'localhost',
      user:'root',
      password:'root',
      database: 'demo', 
    });
const time=60;
// verify login
app.get('/login:details', (req, res) => {
    var details=req.params.details.split(',');
  var result;
  con.getConnection(function(err, connection) {
    if(!!err) { 
      connection.release();
      console.log(err);  
    }  
  console.log("success");
  connection.query("CALL login_verify(?,?);", [details[0],details[1]], (err, result) => {
   const token = jwt.sign({user:details[0]} , jwtKey, {
      expiresIn: 40,
    })
    console.log("token:", token)
    if(err) { 
      console.log(err); 
    }
    connection.release();
    res.json({result:result,token:token});
    });
  });
});


// signup user
app.post('/', bodyParser.json(), (req, res) => {
  con.getConnection(function(err, connection) {
    if(!!err) { 
      connection.release();
      console.log(err);  
    }  
  console.log("success");
  connection.query("CALL login_details(?,?);", [req.body.firstName,req.body.Password], (err, rows) => {
    connection.release(); // always put connection back in pool after last query
    if(!!err) { 
      console.log(err); 
    }
  });
});
});   


// Image of list for particular User

app.post('/image', bodyParser.json(), (req, res) => {
  con.getConnection(function(err, connection) {
    if(!!err) { 
      connection.release();
      console.log(err);  
    }  
  console.log("success");
  connection.query("CALL category_details(?,?,?);", [req.body.data.category,req.body.data.img,req.body.data.id], (err, rows) => {
    connection.release(); // always put connection back in pool after last query
       if(!!err) { 
           console.log(err); 
               }
  });
});
});   

//listdetails
app.get('/list_details:id', (req, res) => {
con.getConnection(function(err, connection) {
  if(!!err) { 
    connection.release();
    console.log(err);  
  }  
console.log("success");
connection.query("CALL get_list_details(?);", [req.params.id], (err, result) => {
  if(err) { 
    console.log(err); 
  }
  connection.release();
  res.json(result);
  });
});
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))