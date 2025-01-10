const DeliveryPersonnel = require('../models/DeliveryPersonnel.model');  // Import the DeliveryPersonnel model

// **Add a New Delivery Personnel**
exports.addDeliveryPersonnel = async (req, res) => {
  try {
    const newDeliveryPersonnel = new DeliveryPersonnel(req.body);
    const savedDeliveryPersonnel = await newDeliveryPersonnel.save();
    res.status(201).json(savedDeliveryPersonnel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// **Get All Delivery Personnel**
exports.getAllDeliveryPersonnel = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPersonnel.find();
    res.status(200).json(deliveryPersonnel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **Get a Single Delivery Personnel by ID**
exports.getDeliveryPersonnelById = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPersonnel.findById(req.params.id);
    if (!deliveryPersonnel) return res.status(404).json({ message: 'Delivery Personnel not found' });
    res.status(200).json(deliveryPersonnel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **Update a Delivery Personnel**
exports.updateDeliveryPersonnel = async (req, res) => {
  try {
    const updatedDeliveryPersonnel = await DeliveryPersonnel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDeliveryPersonnel) return res.status(404).json({ message: 'Delivery Personnel not found' });
    res.status(200).json(updatedDeliveryPersonnel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// **Delete a Delivery Personnel**
exports.deleteDeliveryPersonnel = async (req, res) => {
  try {
    const deletedDeliveryPersonnel = await DeliveryPersonnel.findByIdAndDelete(req.params.id);
    if (!deletedDeliveryPersonnel) return res.status(404).json({ message: 'Delivery Personnel not found' });
    res.status(200).json({ message: 'Delivery Personnel deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
