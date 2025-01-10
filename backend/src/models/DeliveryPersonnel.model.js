const mongoose = require('mongoose');

const deliveryPersonnelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact_info: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  assigned_meal_boxes: {
    type: [String],
    required: true
  }
});

const DeliveryPersonnel = mongoose.model('DeliveryPersonnel', deliveryPersonnelSchema);

module.exports = DeliveryPersonnel;
