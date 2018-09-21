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
    .then(team => res.status(200).json(team))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

router.get('/league/:sportLeague', (req, res) => {

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

router.get('/state/:stateName', (req, res) => {
  console.log('state', req.params)
  const state = req.params.stateName;
  knex('teams')
  .where('state', state)
  .then(teams => res.status(200).json(teams))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

router.get('/state/:stateName/:sportLeague', (req, res) => {
  console.log('state', req.params)
  const state = updateStateName(req.params.stateName);
  const sportLeague = req.params.sportLeague.toUpperCase();
  console.log(state, sportLeague);

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
  //if one word state
  if (!name.includes(' ')) {
    const firstLetter = name.charAt().toUpperCase()
    const remainingLetters = name.toLowerCase().slice(1, name.length);
    console.log('hi!', firstLetter + remainingLetters)
    return firstLetter + remainingLetters;
  } else {
    //split into two words
    //manipulate the first and second word with cap first letter
    //join words back together
    const [firstWord, secondWord] = name.split(' '); 

    const firstWordLetter = firstWord.charAt().toUpperCase();
    const firstWordRemaining = firstWord.toLowerCase().slice(1, firstWord.length);

    const secondWordLetter = secondWord.charAt().toUpperCase()
    const secondWordRemaining = secondWord.toLowerCase().slice(1, secondWord.length);

    return firstWordLetter + firstWordRemaining + ' ' + secondWordLetter + secondWordRemaining;

  }

}
module.exports = router;
