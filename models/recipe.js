const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  instructions: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }]
});

module.exports = mongoose.model('Recipe', recipeSchema);
