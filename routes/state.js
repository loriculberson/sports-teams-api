const express = require('express');
const router = express.Router();
const knex = require('../knex');
  
router.get('/:stateName', (req, res) => {
  const state = updateStateName(req.params.stateName);
  // console
  knex('teams')
  .where('state', state)
  .then(teams => res.status(200).json(teams))
    .catch(err =>
      res.status(404).json({
        message:
          'Sorry. The data you are looking for could not be found. Please try again'
      })
    );
});

router.get('/:stateName/:sportLeague', (req, res) => {
  const state = updateStateName(req.params.stateName);
  const sportLeague = req.params.sportLeague.toUpperCase();

  knex('teams')
  .where('state', state)
  .andWhere('sport_league', sportLeague)
  .then(teams => res.status(200).json(teams))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

const updateStateName = (name) => {
  //if state is one word 
  if (!name.includes(' ')) {
    const firstLetter = name.charAt().toUpperCase()
    const remainingLetters = name.toLowerCase().slice(1, name.length);
    return firstLetter + remainingLetters;
  } else {
    const [firstWord, secondWord] = name.split(' '); 
    const firstWordLetter = firstWord.charAt().toUpperCase();
    const firstWordRemaining = firstWord.toLowerCase().slice(1, firstWord.length);
    const secondWordLetter = secondWord.charAt().toUpperCase()
    const secondWordRemaining = secondWord.toLowerCase().slice(1, secondWord.length);

    return firstWordLetter + firstWordRemaining + ' ' + secondWordLetter + secondWordRemaining;
  }
}

  module.exports = router;
