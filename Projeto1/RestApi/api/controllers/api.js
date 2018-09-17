/* eslint-disable no-var, one-var s */
const express = require('express')
const Joi = require('joi')
const moment = require('moment')
const celebrateSchema = require('celebrate')
const router = express.Router()
const database = require('../models/database')

router.post(
  '/geleias',
  async (req, res, next) => {
    console.log('chegou no insert')
    try {
      /*
        var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log('1 record inserted');
        });
      */
      res.status(200).json({ result: 'ok, chegou no post da rest' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  }
)

router.patch('/geleias', async (req, res, next) => {
  console.log('chegou no patch');
  try {
    res.status(200).json({ result: 'ok, chegou no patch da rest' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router
