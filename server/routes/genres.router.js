const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// request received from getDetailsSaga
// sends query to DB to GET the genres of the movie clicked
// returns the row(s) matching the movie id back to the getDetailsSaga
router.get('/:id', (req, res) => {
  const queryText = `SELECT "genres"."name" FROM "movies"
    JOIN "M_G" ON "M_G"."movies_id" = "movies"."id"
    JOIN "genres" ON "genres"."id" = "M_G"."genres_id"
    WHERE "movies"."id" = $1;`;
  
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