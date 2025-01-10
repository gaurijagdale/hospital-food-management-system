const MealDelivery = require('../models/MealDelivery.model');

// **Add a New Meal Delivery**
exports.addMealDelivery = async (req, res) => {
  try {
    const newMealDelivery = new MealDelivery(req.body);
    const savedMealDelivery = await newMealDelivery.save();
    res.status(201).json(savedMealDelivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// **Get All Meal Deliveries**
exports.getAllMealDeliveries = async (req, res) => {
  try {
    const mealDeliveries = await MealDelivery.find()
      .populate('patient_id', 'name') // Populate patient name
      .populate('diet_chart_id', 'meal_plan') // Populate diet chart details
      .populate('assigned_to', 'name'); // Populate delivery personnel name
    res.status(200).json(mealDeliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **Get a Single Meal Delivery by ID**
exports.getMealDeliveryById = async (req, res) => {
  try {
    const mealDelivery = await MealDelivery.findById(req.params.id)
      .populate('patient_id', 'name')
      .populate('diet_chart_id', 'meal_plan')
      .populate('assigned_to', 'name');
    if (!mealDelivery) return res.status(404).json({ message: 'Meal delivery not found' });
    res.status(200).json(mealDelivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **Update Meal Delivery**
exports.updateMealDelivery = async (req, res) => {
  try {
    const updatedMealDelivery = await MealDelivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMealDelivery) return res.status(404).json({ message: 'Meal delivery not found' });
    res.status(200).json(updatedMealDelivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// **Delete a Meal Delivery**
exports.deleteMealDelivery = async (req, res) => {
  try {
    const deletedMealDelivery = await MealDelivery.findByIdAndDelete(req.params.id);
    if (!deletedMealDelivery) return res.status(404).json({ message: 'Meal delivery not found' });
    res.status(200).json({ message: 'Meal delivery deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
