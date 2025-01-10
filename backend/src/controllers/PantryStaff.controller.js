const PantryStaff = require('../models/PantryStaff.model');

// **Add a New Pantry Staff**
exports.addPantryStaff = async (req, res) => {
  try {
    const newPantryStaff = new PantryStaff(req.body);
    const savedPantryStaff = await newPantryStaff.save();
    res.status(201).json(savedPantryStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// **Get All Pantry Staff**
exports.getAllPantryStaff = async (req, res) => {
  try {
    const pantryStaff = await PantryStaff.find();
    res.status(200).json(pantryStaff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **Get a Single Pantry Staff by ID**
exports.getPantryStaffById = async (req, res) => {
  try {
    const pantryStaff = await PantryStaff.findById(req.params.id);
    if (!pantryStaff) return res.status(404).json({ message: 'Pantry staff not found' });
    res.status(200).json(pantryStaff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **Update a Pantry Staff**
exports.updatePantryStaff = async (req, res) => {
  try {
    const updatedPantryStaff = await PantryStaff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPantryStaff) return res.status(404).json({ message: 'Pantry staff not found' });
    res.status(200).json(updatedPantryStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// **Delete a Pantry Staff**
exports.deletePantryStaff = async (req, res) => {
  try {
    const deletedPantryStaff = await PantryStaff.findByIdAndDelete(req.params.id);
    if (!deletedPantryStaff) return res.status(404).json({ message: 'Pantry staff not found' });
    res.status(200).json({ message: 'Pantry staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
