const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
      const users = await User.find({});
      res.render('users/index.ejs', { users });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  });

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('recipes');
  res.render('users/show.ejs', { user });
});

module.exports = router;
