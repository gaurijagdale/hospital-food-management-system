const mongoose = require('mongoose');
const DeliveryPersonnel = require('./DeliveryPersonnel.model');  // Import DeliveryPersonnel model

const mealDeliverySchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  diet_chart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DietChart',
    required: true
  },
  meal_type: {
    type: String,
    enum: ['Morning', 'Evening', 'Night'],
    required: true
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryPersonnel',  // Reference to DeliveryPersonnel model
    required: true
  },
  delivery_status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Delivered'],
    required: true
  },
  delivery_timestamp: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: true
  }
});

const MealDelivery = mongoose.model('MealDelivery', mealDeliverySchema);

module.exports = MealDelivery;
