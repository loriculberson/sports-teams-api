const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Sports Teams API 2013' });
});

module.exports = router;