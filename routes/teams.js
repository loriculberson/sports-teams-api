const express = require('express');
const router = express.Router();
const knex = require('../knex');

//   const cohortId = parseInt(req.params.cohortId);
//   const cohort = data.cohorts.filter(cohort => cohort.id === cohortId);
//   res.status(200).send(cohort);

router.get('/', (req, res) => {
  knex('teams')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
      message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('hi', req.params)

  knex('teams')
    .where('id', id)
    .then(team => res.status(200).json(team))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

router.get('/league/:sportLeague', (req, res) => {
  console.log('hi', req.params)

  const sportLeague = req.params.sportLeague.toUpperCase();
  knex('teams')
  .where('sport_league', sportLeague)
  .then(teams => res.status(200).json(teams))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});



module.exports = router;
