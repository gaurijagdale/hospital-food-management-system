const express = require('express');
const router = express.Router();
const mealDeliveryController = require('../controllers/MealDelivery.controller');

// **Routes for Meal Delivery**
router.post('/add', mealDeliveryController.addMealDelivery);
router.get('/', mealDeliveryController.getAllMealDeliveries);
router.get('/:id', mealDeliveryController.getMealDeliveryById);
router.put('/:id', mealDeliveryController.updateMealDelivery);
router.delete('/:id', mealDeliveryController.deleteMealDelivery);

module.exports = router;
