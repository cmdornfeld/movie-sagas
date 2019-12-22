const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM movies ORDER BY "title" ASC`;
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
          console.log(`Error on GET query ${error}`);
        res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
  const queryText = `SELECT "title", "description", "id" FROM movies WHERE id=$1;`;
  
    pool.query(queryText, [req.params.id])
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
          console.log(`Error on GET DETAILS query ${error}`);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  let movieId = req.params.id;
  let title = req.body.title;
  let description = req.body.description;
  const queryText = `UPDATE "movies" SET "title" = $1, "description" = $2 WHERE id = $3;`;
  
    pool.query(queryText, [title, description, movieId])
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
          console.log(`Error on EDIT query ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;