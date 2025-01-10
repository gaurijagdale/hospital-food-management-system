const DietChart = require('../models/DietCharts.model');

// **Add a Diet Chart**
exports.addDietChart = async (req, res) => {
  try {
    const newDietChart = new DietChart(req.body);
    const savedDietChart = await newDietChart.save();
    res.status(201).json(savedDietChart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// **Get All Diet Charts**
exports.getAllDietCharts = async (req, res) => {
  try {
    const dietCharts = await DietChart.find();
    res.status(200).json(dietCharts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **Get a Single Diet Chart by ID**
exports.getDietChartById = async (req, res) => {
  try {
    const dietChart = await DietChart.findById(req.params.id);
    if (!dietChart) return res.status(404).json({ message: 'Diet chart not found' });
    res.status(200).json(dietChart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **Update a Diet Chart**
exports.updateDietChart = async (req, res) => {
  try {
    const updatedDietChart = await DietChart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDietChart) return res.status(404).json({ message: 'Diet chart not found' });
    res.status(200).json(updatedDietChart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// **Delete a Diet Chart**
exports.deleteDietChart = async (req, res) => {
  try {
    const deletedDietChart = await DietChart.findByIdAndDelete(req.params.id);
    if (!deletedDietChart) return res.status(404).json({ message: 'Diet chart not found' });
    res.status(200).json({ message: 'Diet chart deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
