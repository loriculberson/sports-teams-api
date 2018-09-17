const express = require('express');
const router = express.Router();

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