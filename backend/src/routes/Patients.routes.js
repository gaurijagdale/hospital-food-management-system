const express = require('express');
const router = express.Router();
const patientController = require('../controllers/Patients.controller');

// **Routes for Patients**
router.post('/add', patientController.addPatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);


  

module.exports = router;

