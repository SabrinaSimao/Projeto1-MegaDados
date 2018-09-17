/* eslint-disable no-var, one-var s */
const express = require('express')
const Joi = require('joi')
const moment = require('moment')
const celebrateSchema = require('celebrate')
const router = express.Router()
const database = require('../models/database')

router.post(
  '/user',
  async (req, res, next) => {
    data = req.body;
    console.log(data); 
    try {
      var sql = `call adiciona_usuario("${data.name}", "${data.birthday}", "${data.gender}","${data.username}","${data.password}")`;
      console.log(sql);
      database.query(sql, function(err, result) {
        if (err){
          res.status(400).json({ err })
          throw err;
        } else {
          console.log('1 user inserted');
          res.status(200).json({ result: 1 });
        } 
      });   
    } catch (error) {
      res.status(400).json({ error })
    }
  }
)

router.post('/check-login', async (req, res, next) => {
  data = req.body;
  const username = data.username
  const password =  data.password
  try {
    var sql = `call check_senha("${username}", "${password}")`;
    console.log(sql);
    database.query(sql, function(err, result) {
      if (err) {
        res.status(400).json({ err });
        throw err;
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router
