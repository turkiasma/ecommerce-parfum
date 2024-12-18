const Bag = require('../models/Bag');
const Product = require('../models/Product');
const Order = require('../models/Order');

exports.addToBag = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from middleware
    const { productId } = req.body;

    let bag = await Bag.findOne({ userId });

    if (!bag) {
      bag = new Bag({ userId, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const existingItem = bag.items.find(item => item.productId && item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      bag.items.push({ productId, quantity: 1 });
    }

    // Save the bag to the database
    await bag.save();

    // Populate the `productId` field in `items` to retrieve product details (e.g., price)
    await bag.populate('items.productId', 'price name');

    // Recalculate total after populating product details
    bag.total = bag.items.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + item.quantity * price;
    }, 0);

    // Save the updated total
    await bag.save();

    res.status(200).json(bag);
  } catch (error) {
    console.error('Error adding to bag:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from middleware
    const { productId, quantityChange } = req.body;

    const bag = await Bag.findOne({ userId }).populate('items.productId', 'price name');

    if (!bag) return res.status(404).json({ msg: 'Bag not found' });

    const item = bag.items.find(item => item.productId._id.toString() === productId);
    if (!item) return res.status(404).json({ msg: 'Product not found in bag' });

    item.quantity += quantityChange;

    if (item.quantity <= 0) {
      bag.items = bag.items.filter(item => item.productId._id.toString() !== productId);
    }

    bag.total = bag.items.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + item.quantity * price;
    }, 0);

    await bag.save();

    res.status(200).json(bag);
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.viewBag = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from middleware

    const bag = await Bag.findOne({ userId }).populate('items.productId', 'price name image');

    if (!bag) {
      return res.status(404).json({ msg: 'Bag not found' });
    }

    res.status(200).json(bag);
  } catch (error) {
    console.error('Error viewing bag:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteItemFromBag = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from middleware
    const { productId } = req.params; // Extract productId from params (use /deleteItem/:productId in route)

    if (!productId) {
      return res.status(400).json({ msg: 'Product ID is required' });
    }

    let bag = await Bag.findOne({ userId }).populate('items.productId', 'price name');

    if (!bag) {
      return res.status(404).json({ msg: 'Bag not found' });
    }

    const itemIndex = bag.items.findIndex(item => item.productId._id.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ msg: 'Product not found in the bag' });
    }

    // Remove the item from the bag
    bag.items.splice(itemIndex, 1);

    // Recalculate the total cost of the bag
    bag.total = bag.items.reduce((sum, item) => {
      const price = item.productId?.price || 0;
      return sum + item.quantity * price;
    }, 0);

    await bag.save();

    res.status(200).json({ msg: 'Item deleted successfully', bag });
  } catch (error) {
    console.error('Error deleting item from bag:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.confirmBag = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from middleware
    const { paymentMethod } = req.body;

    if (!paymentMethod || !["paypal", "credit card"].includes(paymentMethod)) {
      return res.status(400).json({ msg: 'Invalid or missing payment method' });
    }

    const bag = await Bag.findOne({ userId }).populate('items.productId', 'price name');
    if (!bag) return res.status(404).json({ msg: 'Bag not found' });

    const order = new Order({
      customerId: userId,
      products: bag.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      total: bag.total,
      paymentMethod,
    });

    await order.save();

    await Bag.deleteOne({ userId });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ msg: 'Error confirming order', error });
  }
};
