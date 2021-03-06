const express = require('express');
const router = express.Router();
const knex = require('../knex');

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
  knex('teams')
    .where('id', id)
    .then(team => {
      if (team.length >=1) {
        res.status(201).json(team);
      } else {
        res.status(404).json({
          message: 
          'The data you are looking for could not be found. Please try again'
        })
      }
    });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const {team_name, city, state, venue, sport_league} = req.body;
  knex('teams')
    .where('id', id)
    .returning('*')
    .update({
      team_name,
      city, 
      state, 
      venue, 
      sport_league
    })
    .then(team => {
      if (team.length) {
        res.status(201).json(team);
      } else {
        res.status(404).json({
          message: `We have encountered a problem updating the ${city} ${team_name}. Please try again`
        });
      }
    });
});

router.post('/', (req, res) => {
  const {team_name, city, state, venue, sport_league} = req.body;

  knex('teams')
    .returning('*')
    .insert({
      team_name,
      city, 
      state, 
      venue, 
      sport_league
    })
    .then(team => res.status(201).json(team))
    .catch(err =>
      res.status(404).json({
        message: `We have encountered a problem creating the ${city} ${team_name}. Please try again`
      })
    );
});


router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  knex('teams')
    .where('id', id)
    .del()
    .then(() => {
      res.status(204).json({ message: 'Deleted'})
    })
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
})


router.get('/league/:sportLeague', (req, res) => {
  const sportLeague = req.params.sportLeague.toUpperCase();
  knex('teams')
  .where('sport_league', sportLeague)
  .then(team => {
    if (team.length >= 1) {
      res.status(201).json(team);
    } else {
      res.status(404).json({
        message: `There are no teams found in the  ${sportLeague} league. Please try again`
      });
    }
  });
});

module.exports = router;
