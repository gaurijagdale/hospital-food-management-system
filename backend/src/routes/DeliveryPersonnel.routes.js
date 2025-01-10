const express = require('express');
const router = express.Router();
const deliveryPersonnelController = require('../controllers/DeliveryPersonnel.controller');

// **Routes for Delivery Personnel**
router.post('/add', deliveryPersonnelController.addDeliveryPersonnel);  // Add new delivery personnel
router.get('/', deliveryPersonnelController.getAllDeliveryPersonnel);  // Get all delivery personnel
router.get('/:id', deliveryPersonnelController.getDeliveryPersonnelById);  // Get a specific delivery personnel by ID
router.put('/:id', deliveryPersonnelController.updateDeliveryPersonnel);  // Update a delivery personnel
router.delete('/:id', deliveryPersonnelController.deleteDeliveryPersonnel);  // Delete a delivery personnel

module.exports = router;
