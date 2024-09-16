const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');

const authController = require('./controllers/auth');
const recipesController = require('./controllers/recipes');
const ingredientsController = require('./controllers/ingredients');
const foodsController = require('./controllers/foods.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
}));
app.use(passUserToView);

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/recipes', recipesController);
app.use('/ingredients', ingredientsController);
app.use('/users/:userId/foods', foodsController);

app.set('view engine', 'ejs');
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
