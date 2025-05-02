const express = require('express');                     //koble på http
const bodyParser = require('body-parser');              //lese json
const mysql = require('mysql2');                        //koble til mysql
const cors = require('cors');                           //tillater komm nett-api

const app = express();                                  //lage express app
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({                     //koble til sql database
  host: '192.168.6.164',
  user: 'bob3',
  password: 'passord',
  database: 'bob_biler'
});
//https://www.w3schools.com/nodejs/nodejs_mysql.asp 


//gir meelding når den kobler til, hvis ikke gi error
db.connect(err => {
    if (err) {
      console.error('error med tilkobling', err);
      return;}
    console.log('kobla til mysql');
});
  
app.post('/leggtil', (req, res) => {
    const { navn, pris } = req.body;
  
    db.query('SELECT * FROM biler WHERE navn = ?', [navn], (err, result) => {
      if (err) return res.status(500).send(err);
  
      if (result.length > 0) {
        db.query('UPDATE biler SET antall = antall + 1 WHERE navn = ?', [navn], err => {
          if (err) return res.status(500).send(err);
          res.send('Antall økt!');
        });
      } else {
        db.query('INSERT INTO biler (navn, pris) VALUES (?, ?)', [navn, pris], err => {
          if (err) return res.status(500).send(err);
          res.send('Bil lagt til!');
        });
      }
    });
  });
  
  app.post('/slett', (req, res) => {
    const { navn } = req.body;
  
    db.query('DELETE FROM biler WHERE navn = ?', [navn], err => {
      if (err) return res.status(500).send(err);
      res.send('Bil slettet!');
    });
  });
  
  app.get('/biler', (req, res) => {
    db.query('SELECT * FROM biler', (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    });
  });
  
  app.listen(3000, () => {
    console.log('🚀 API kjører på http://localhost:3000');
  });