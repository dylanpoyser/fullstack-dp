
const db = require('./db')
const Restaurant = require('./Restaurant')
const Cuisine = require('./Cuisine')

//File of exports.

Restaurant.belongsTo(Cuisine, {foreignKey: 'cuisine_id'})
Cuisine.hasMany(Restaurant)

module.exports = {
  db,
    Cuisine, Restaurant

}
