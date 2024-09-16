const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('foods/index', { pantry: user.pantry });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});


router.get('/new', (req, res) => {
  res.render('foods/new');
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.delete('/:itemId', async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);

      user.pantry.pull(req.params.itemId);
      await user.save();
      
      res.redirect(`/users/${user._id}/foods`);
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  });
  


router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.itemId);
    res.render('foods/edit', { item });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const item = user.pantry.id(req.params.itemId);
    item.set(req.body);
    await user.save();
    res.redirect(`/users/${user._id}/foods`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});



module.exports = router;
