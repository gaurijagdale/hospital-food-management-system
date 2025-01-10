const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
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
  emergency_contact: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  room_details: {
    room_number: {
      type: Number,
      required: true
    },
    bed_number: {
      type: Number,
      required: true
    },
    floor_number: {
      type: Number,
      required: true
    }
  },
  medical_info: {
    diseases: {
      type: [String],
      required: true
    },
    allergies: {
      type: [String],
      required: true
    }
  },
  notes: {
    type: String,
    required: true
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
