const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// request received from getMoviesSaga
// sends query to DB to GET all movies and returns the rows back to getMoviesSaga
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

// request received from getDetailsSaga
// sends query to DB to GET the title, description and id of the movie clicked
// returns the row back to the getDetailsSaga
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

// request received from editMovieSaga
// sends query to DB to UPDATE the title and description of the movie clicked
// sends a status 200 if UPDATE was successful; sends 500 if not
router.put('/:id', (req, res) => {
  let movieId = req.params.id;
  let title = req.body.title;
  let description = req.body.description;
  const queryText = `UPDATE "movies" SET "title" = $1, "description" = $2 WHERE id = $3;`;
  
    pool.query(queryText, [title, description, movieId])
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
          console.log(`Error on EDIT query ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;