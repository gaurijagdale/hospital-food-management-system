const mongoose = require('mongoose');

const dietChartSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  meal_plan: {
    morning: {
      meal: {
        type: String,
        required: true
      },
      ingredients: {
        type: [String],
        required: true
      },
      instructions: {
        type: String,
        required: true
      }
    },
    evening: {
      meal: {
        type: String,
        required: true
      },
      ingredients: {
        type: [String],
        required: true
      },
      instructions: {
        type: String,
        required: true
      }
    },
    night: {
      meal: {
        type: String,
        required: true
      },
      ingredients: {
        type: [String],
        required: true
      },
      instructions: {
        type: String,
        required: true
      }
    }
  },
  created_by: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const DietChart = mongoose.model('DietChart', dietChartSchema);

module.exports = DietChart;
