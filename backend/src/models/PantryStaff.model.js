const mongoose = require('mongoose');

const pantryStaffSchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  assigned_tasks: {
    type: [String],
    required: true
  },
  img_url: {
    type: String,
    required: true
  }
});

const PantryStaff = mongoose.model('PantryStaff', pantryStaffSchema);

module.exports = PantryStaff;
