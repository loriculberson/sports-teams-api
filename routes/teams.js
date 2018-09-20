const express = require('express');
const router = express.Router();
const knex = require('../knex');

//   const cohortId = parseInt(req.params.cohortId);
//   const cohort = data.cohorts.filter(cohort => cohort.id === cohortId);
//   res.status(200).send(cohort);

router.get('/', (req, res) => {
  knex
  .select('*')
  .from('teams')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
      message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

router.get('/:id', (req, res) => {
  //find the team with id of :id
  const id = parseInt(req.params.id);

  knex
    .select('*')
    .from('teams')
    .where('id', id)
    .then(team => res.status(200).json(team))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

// routes.get("/:cohortId", (req, res) => {
//   const cohortId = parseInt(req.params.cohortId);
//   const cohort = data.cohorts.filter(cohort => cohort.id === cohortId);
//   res.status(200).send(cohort);
// });
//MLB
// sport_league
// SELECT * FROM teams WHERE sport_league = MLB

//NFL

//NHL

module.exports = router;
