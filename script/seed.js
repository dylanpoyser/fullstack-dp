const {db, Restaurant, Cuisine } = require('../server/models')
const CSVToJSON = require("csvtojson/v2");
const restFilePath = "script/csv/restaurants.csv"
const cuisFilePath = "script/csv/cuisines.csv"

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')
 //Creating restaurants JSON
  const restaurantJson = await CSVToJSON().fromFile(restFilePath)
  const cuisineJson = await CSVToJSON().fromFile(cuisFilePath)
  
  // Creating Users
  const cuisines = await Promise.all(
    cuisineJson.map((arr) => Cuisine.create(arr))
  )
   
  
  //Creating restaurants
  const restaurants = await Promise.all(
    restaurantJson.map((arr) => Restaurant.create(arr))
    // Restaurant.create(restaurantjson.map((array) => array))
  )
  
  console.log(`seeded successfully`)
  console.log(`Added ${restaurants.length} restaurants to the database!`)
  console.log(`Added ${cuisines.length} cuisines to the database!`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
