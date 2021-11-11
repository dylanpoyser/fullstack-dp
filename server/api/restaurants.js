const router = require('express').Router()
const {Restaurant, Cuisine} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll({
        order: [
            ['distance', 'asc'],
            ['customer_rating', 'desc'],
            ['price', 'asc'],
            ['name', 'asc']
         ],
      include: Cuisine
    })
    res.json(restaurants)
  } catch (err) {
    next(err)
  }
})

router.get('/search', async (req, res, next) => {
    try {
        const {name, rating, distance, price, cuisine} = req.query
        
        const restaurants = await Restaurant.findAll({

            where: {
                [Op.and]: [req.query.name && { name:{[Op.iLike]: `%${name}%`},},],
                
                [Op.and]: [req.query.rating && {customer_rating: {[Op.gte]: rating},},],

                [Op.and]: [req.query.distance && {distance: {[Op.lte]: distance},},],

                [Op.and]: [req.query.price && {price: {[Op.lte]: price},},],},

                limit: 5,
                
                order: [
                       ['distance', 'asc'],
                       ['customer_rating', 'desc'],
                       ['price', 'asc'],
                       ['name', 'asc']
                       ],
                
                include: [{model: 
                                Cuisine, where: 
                                {name: {
                                    [Op.iLike]: `%${cuisine}%`
                                }}}],
        })
        res.json(restaurants)
    } catch (err) {
        console.error(err.message)
    }
})