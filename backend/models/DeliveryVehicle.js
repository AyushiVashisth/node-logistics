const mongoose = require('mongoose');

const deliveryVehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, unique: true },
  vehicleType: { type: String, enum: ['bike', 'truck'] },
  city: String,
  activeOrdersCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('DeliveryVehicle', deliveryVehicleSchema);