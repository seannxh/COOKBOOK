const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

router.get('/new', (req, res) => {
  res.render('ingredients/new.ejs');
});

router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.render('ingredients/index.ejs', { ingredients });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) return res.redirect('/ingredients');
    res.render('ingredients/edit.ejs', { ingredient });
  } catch (err) {
    console.error(err);
    res.redirect('/ingredients');
  }
});

router.post('/', async (req, res) => {
  try {
    const newIngredient = new Ingredient({ name: req.body.name });
    await newIngredient.save();
    res.redirect('/ingredients');
  } catch (err) {
    console.error(err);
    res.redirect('/ingredients/new');
  }
});


router.delete('/:id', async (req, res) => {
    try {
      await Ingredient.findByIdAndDelete(req.params.id);
      res.redirect('/ingredients');
    } catch (err) {
      console.error(err);
      res.redirect('/ingredients');
    }
  });
  

router.put('/:id', async (req, res) => {
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });
    res.redirect('/ingredients');
  } catch (err) {
    console.error(err);
    res.redirect('/ingredients');
  }
});

module.exports = router;
