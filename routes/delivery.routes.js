const express = require('express');
const router = express.Router();
const DeliveryVehicle = require('../models/DeliveryVehicle');

// Create a new delivery vehicle
router.post('/vehicles', async (req, res) => {
  try {
    const newVehicle = await DeliveryVehicle.create(req.body);
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all delivery vehicles
router.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await DeliveryVehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a delivery vehicle's activeOrdersCount
router.put('/vehicles/:id', async (req, res) => {
  try {
    const { activeOrdersCount } = req.body;
    if (typeof activeOrdersCount !== 'number' || activeOrdersCount < 0) {
      return res.status(400).json({ error: 'Invalid activeOrdersCount value' });
    }
    
    const updatedVehicle = await DeliveryVehicle.findByIdAndUpdate(
      req.params.id,
      { activeOrdersCount },
      { new: true }
    );
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
