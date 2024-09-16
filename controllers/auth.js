const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up');
});

router.post('/sign-up', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({ username: req.body.username, password: hashedPassword });
  await user.save();
  res.redirect('/auth/sign-in');
});

router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in');
});

router.post('/sign-in', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.user = user;
    res.redirect('/recipes');
  } else {
    res.redirect('/auth/sign-in');
  }
});

router.get('/sign-out', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
