const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const DeliveryVehicle = require('../models/DeliveryVehicle');
const Item = require('../models/Item');

// POST /api/orders
router.post('/orders', async (req, res) => {
  try {
    const { itemId, customerId } = req.body;

    // Find the item to get its price
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Find or create the customer
    let customer = await Customer.findById(customerId);
    if (!customer) {
      customer = await Customer.create({ _id: customerId });
    }

    // Find an available delivery vehicle
    const deliveryVehicle = await DeliveryVehicle.findOne({
      activeOrdersCount: { $lt: 2 }, // Max 2 orders per vehicle
      city: customer.city,
    });

    if (!deliveryVehicle) {
      return res.status(400).json({ error: 'No available delivery vehicle' });
    }

    // Increment the vehicle's activeOrdersCount
    deliveryVehicle.activeOrdersCount += 1;
    await deliveryVehicle.save();

    // Generate order number
    const latestOrder = await Order.findOne().sort({ orderNumber: -1 });
    let orderNumber = '0001';
    if (latestOrder) {
      const latestOrderNumber = parseInt(latestOrder.orderNumber, 10);
      orderNumber = (latestOrderNumber + 1).toString().padStart(4, '0');
    }

    // Create the order
    const order = await Order.create({
      orderNumber,
      itemId,
      price: item.price,
      customerId,
      deliveryVehicleId: deliveryVehicle._id,
      isDelivered: false,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
