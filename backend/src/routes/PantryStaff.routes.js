const express = require('express');
const router = express.Router();
const pantryStaffController = require('../controllers/PantryStaff.controller');

// **Routes for Pantry Staff**
router.post('/add', pantryStaffController.addPantryStaff);
router.get('/', pantryStaffController.getAllPantryStaff);
router.get('/:id', pantryStaffController.getPantryStaffById);
router.put('/:id', pantryStaffController.updatePantryStaff);
router.delete('/:id', pantryStaffController.deletePantryStaff);

module.exports = router;
