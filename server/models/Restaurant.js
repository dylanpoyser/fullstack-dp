const Sequelize = require('sequelize')
const db = require('./db')
const Cuisine = require('./Cuisine')

const Restaurant = db.define('restaurant', {
    name: {
      type: Sequelize.STRING,
    },
    customer_rating: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    distance: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 10,
      },
    },
    price: {
      type: Sequelize.INTEGER,
      validate: {
        min: 10,
        max: 50,
      }
    },        
      })
  
  module.exports = Restaurant