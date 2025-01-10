const express = require('express');
const router = express.Router();
const dietChartController = require('../controllers/DietCharts.controller');

// **Routes for Diet Charts**
router.post('/add', dietChartController.addDietChart);
router.get('/', dietChartController.getAllDietCharts);
router.get('/:id', dietChartController.getDietChartById);
router.put('/:id', dietChartController.updateDietChart);
router.delete('/:id', dietChartController.deleteDietChart);

module.exports = router;
