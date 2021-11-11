const router = require('express').Router();
module.exports = router;

router.use('/restaurants', require('./restaurants'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
