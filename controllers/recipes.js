const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.session.user._id }).populate('ingredients');
    res.render('recipes/index.ejs', { recipes });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  try {
    const ingredients = await Ingredient.find(); 
    res.render('recipes/new.ejs', { ingredients });
  } catch (err) {
    console.error(err);
    res.redirect('/recipes');
  }
});

router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe({
      name: req.body.name,
      instructions: req.body.instructions,
      owner: req.session.user._id,
      ingredients: req.body.ingredients || []
    });
    await newRecipe.save();
    res.redirect('/recipes');
  } catch (err) {
    console.error(err);
    res.redirect('/recipes/new');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients');
    if (!recipe) {
      return res.redirect('/recipes');
    }
    res.render('recipes/show.ejs', { recipe });
  } catch (err) {
    console.error(err);
    res.redirect('/recipes'); 
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.redirect('/recipes');
    }
    res.render('recipes/edit.ejs', { recipe });
  } catch (err) {
    console.error(err);
    res.redirect('/recipes');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/recipes/${recipe._id}`);
  } catch (err) {
    console.error(err);
    res.redirect('/recipes');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  } catch (err) {
    console.error(err);
    res.redirect('/recipes');
  }
});

module.exports = router;
