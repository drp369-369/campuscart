const Listing = require('../models/Listing');

// @desc    Get all available listings (supports search and category filter)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    let query = { status: 'available' };

    // Search by title (case-insensitive substring)
    if (search && search.trim() !== '') {
      query.title = { $regex: search.trim(), $options: 'i' };
    }

    // Filter by Category (if not 'All')
    if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
      query.category = category.trim();
    }

    const products = await Listing.find(query)
      .populate('seller', 'name email campus')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single listing by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Listing.findById(req.params.id).populate(
      'seller',
      'name email campus'
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product listing not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product listing
// @route   POST /api/products
// @access  Private (Authenticated users only)
const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      category,
      condition,
      imageUrl,
      campus,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      price === undefined ||
      !category ||
      !condition ||
      !imageUrl ||
      !campus
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields to publish your listing',
      });
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid positive number',
      });
    }

    const listing = await Listing.create({
      title: title.trim(),
      description: description.trim(),
      price: numericPrice,
      category,
      condition,
      imageUrl: imageUrl.trim(),
      campus: campus.trim(),
      seller: req.user._id,
      status: 'available',
    });

    const populatedListing = await Listing.findById(listing._id).populate(
      'seller',
      'name email campus'
    );

    return res.status(201).json({
      success: true,
      message: 'Product listing published successfully',
      data: populatedListing,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product listing
// @route   PUT /api/products/:id
// @access  Private (Owner only)
const updateProduct = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    // Ownership verification
    if (listing.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized. You can only modify your own listings.',
      });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('seller', 'name email campus');

    return res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      data: updatedListing,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product listing
// @route   DELETE /api/products/:id
// @access  Private (Owner only)
const deleteProduct = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    // Ownership verification
    if (listing.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized. You can only delete your own listings.',
      });
    }

    await Listing.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Listing deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
