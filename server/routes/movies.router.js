const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM movies`;
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
          console.log(`Error on query ${error}`);
        res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
  const queryText = `SELECT "title", "description" FROM movies WHERE id=$1;`;
    pool.query(queryText, [req.params.id])
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
          console.log(`Error on query ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;