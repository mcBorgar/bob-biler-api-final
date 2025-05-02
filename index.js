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



db.connect(err => {                                     //console log ved feil
    if (err) {
      console.error('error med tilkobling', err);
      return;}
    console.log('kobla til mysql');
});

  
//sjekker biler, legge til 
app.post('/leggtil', (req, res) => {    //venter på klient /leggtil sender navn og pris json
    const { navn, pris } = req.body;    
  
    db.query('SELECT * FROM biler WHERE navn = ?', [navn], (err, result) => { //se db innehold, inection proc ?
      if (err) return res.status(500).send(err);                              //error
  
      if (result.length > 0) {                                                //finnes fra før
        db.query('UPDATE biler SET antall = antall + 1 WHERE navn = ?', [navn], err => {
          if (err) return res.status(500).send(err);
          res.send('Antall økt');
        });
      } else {                                                                //hvis ikke lage ny
        db.query('INSERT INTO biler (navn, pris) VALUES (?, ?)', [navn, pris], err => {
          if (err) return res.status(500).send(err);
          res.send('Bil lagt til');
        });
      }
    });
  });  //vente på respones, res.send
  
  app.post('/slett', (req, res) => {    //venter på klient /leggtil sender navn og pris json
    const { navn } = req.body;
  
    db.query('DELETE FROM biler WHERE navn = ?', [navn], err => {  //sletter alle biler (skal endres)
      if (err) return res.status(500).send(err);
      res.send('Bil slettet!');
    });
  });
  
  app.get('/biler', (req, res) => {
    db.query('SELECT * FROM biler', (err, result) => {        //db.query send dette til sql
      if (err) return res.status(500).send(err);
      res.json(result); 
    });
  });
  
  app.listen(3000, () => {
    console.log('api kjører på http://localhost:3000');
  });