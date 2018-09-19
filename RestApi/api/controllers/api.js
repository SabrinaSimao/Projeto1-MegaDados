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

router.post('/ingredients', async (req, res, next) => {
  try {
    let sql;
    const data = req.body;
    if (data.ingredientId) {
      sql = `select * from ingredientes where ingredientes_id=${data.ingredientId}`;
    } else {
      sql = 'select * from ingredientes';
    }
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

router.post('/recipe', async (req, res, next) => {
  const data  = req.body;
  try {
    var sql = `INSERT INTO receita (nome,cliente_id) VALUES ("${data.name}", "${data.clientId}");`
    console.log(sql)
    database.query(sql, function(err, result) {
      if (err) {
        res.status(400).json({ err });
        throw err;
      } else {
        const  insertedId =  result.insertId
        let string = '';
        data.ingredients.map((ingredient) => {
          sql = `insert into receita_ingrediente (receita_id, ingredientes_id) values ("${insertedId}", "${ingredient}");`;
          console.log(sql);      
          database.query(sql, function(err, result) {
            if (err) {
              res.status(400).json({ err });
              throw err;
            }
          });
        })
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});


router.post('/get-recipes', async (req, res, next) => {
  try {
    var sql = `select * from receita where cliente_id = ${req.body.clientId} and ativa=1`;
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

router.post('/get-recipes-ingredients', async (req, res, next) => {
  try {
    var sql = `select * from receita_ingrediente where receita_id = ${req.body.recipeId}`;
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



router.post('/remove-recipe', async (req, res, next) => {
  try {
    const data=  req.body;
    var sql = `update receita set ativa=0 where receita_id = ${data.recipeId}`;
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



router.post('/buy-credits', async (req, res, next) => {
  try {
    const data = req.body;
    var sql = `update cliente set saldo =  saldo + ${data.value} where cliente_id = ${data.clientId}`;
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


router.post('/buy-recipe', async (req, res, next) => {
  try {
    const data = req.body;
    var sql = `INSERT INTO compras (data_pagamento,custo,cliente_id) VALUES ("${data.data_pagamento}", "${data.custo}", "${data.cliente_id}");`;
    console.log(sql);
    database.query(sql, function(err, result) {
      if (err) {
        res.status(400).json({ err });
        throw err;
      } else {
        const insertedId = result.insertId;
        var sql = `INSERT INTO compras_receita (compras_id,receita_id) VALUES ("${insertedId}", "${data.recipe_id}");`;
        console.log(sql);
        database.query(sql, function(err, response) {
          if (err) {
            res.status(400).json({ err });
            throw err;
          } else {
            const insertedId = res.insertId;
            res.status(200).json({ result: 1 });
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/get-buys', async (req, res, next) => {
  try {
    var sql = `select * from compras where cliente_id = ${req.body.clientId}`;
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

router.post('/get-buys-recipe', async (req, res, next) => {
  try {
    var sql = `select * from compras_receita where compras_id = ${req.body.compras_id}`;
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

router.post('/get-specific-recipe', async (req, res, next) => {
  try {
    var sql = `select * from receita where receita_id = ${req.body.recipeId}`;
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
