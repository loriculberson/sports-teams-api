const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res) => {
  knex('teams')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
      message:
          'No,The data you are looking for could not be found. Please try again'
      })
    );
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
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
//update sports team
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
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
//create sports team

//delete sports team
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

router.get('/:sportLeague', (req, res) => {
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
