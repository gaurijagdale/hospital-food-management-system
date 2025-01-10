const mongoose = require('mongoose');

const tasksCollectionSchema = new mongoose.Schema({
  task_type: {
    type: String,
    enum: ['Meal Preparation', 'Delivery'],
    required: true
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PantryStaff',
    required: true
  },
  meal_details: {
    diet_chart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DietChart',
      required: true
    },
    meal_type: {
      type: String,
      enum: ['Morning', 'Evening', 'Night'],
      required: true
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const TasksCollection = mongoose.model('TasksCollection', tasksCollectionSchema);

module.exports = TasksCollection