const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '192.168.6.164',
  user: 'bob3',
  password: 'passord',
  database: 'bob_biler'
});
//https://www.w3schools.com/nodejs/nodejs_mysql.asp 

//aba
//gir meelding når den kobler til, hvis ikke gi error
db.connect(err => {
    if (err) {
      console.error('error med tilkobling', err);
      return;}
    console.log('kobla til mysql');
});
  
    app.post('/leggtil', (req, res) => {

    })

    app.post('/slett', (req, res) => {
    
    })
  
    app.get('/biler', (req, res) => {

    })



  
  app.listen(3000, () => {
    console.log('api er koblet til script, og databasen');
  });
  
