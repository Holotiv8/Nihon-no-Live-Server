const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()

router.get('/',productController.read)
router.get('/:id',productController.readId)

module.exports=router