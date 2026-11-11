const mongoose = require('mongoose');
const Listing = require('../models/Listing');

const FALLBACK_LISTINGS = [
  {
    _id: '6af32ce8cb9c85e16aaf4ab1',
    title: 'Casio FX-991EX ClassWiz Scientific Calculator',
    description: 'Original Casio ClassWiz calculator in excellent working condition with protective slide-on cover. Perfect for engineering mathematics, physics, and university semester exams.',
    price: 750,
    category: 'Calculators',
    condition: 'Like New',
    imageUrl: '/items/casio-fx991ex.jpg',
    campus: 'RV University, Bengaluru',
    status: 'available',
    seller: {
      _id: '6af32ce8cb9c85e16aaf4abb',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@rvu.edu.in',
      campus: 'RV University, Bengaluru',
    },
    createdAt: new Date('2026-11-10T12:00:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4ab2',
    title: 'Higher Engineering Mathematics by B.S. Grewal (44th Ed)',
    description: 'Standard textbook for Semester 1 and 2 engineering calculus, matrices, and differential equations. No missing pages, minimal pencil markings inside.',
    price: 450,
    category: 'Books',
    condition: 'Good',
    imageUrl: '/items/engineering-mathematics.jpg',
    campus: 'RV University, Bengaluru',
    status: 'available',
    seller: {
      _id: '6af32ce8cb9c85e16aaf4abd',
      name: 'Ananya Iyer',
      email: 'ananya.iyer@rvu.edu.in',
      campus: 'RV University, Bengaluru',
    },
    createdAt: new Date('2026-11-10T11:30:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4ab3',
    title: 'Data Structures and Algorithms in C++ (Kanetkar)',
    description: 'Comprehensive guide covering linked lists, trees, graphs, sorting, and dynamic programming with solved interview problems.',
    price: 380,
    category: 'Books',
    condition: 'Like New',
    imageUrl: '/items/dsa-cpp.jpg',
    campus: 'PES University, Bengaluru',
    status: 'available',
    seller: {
      _id: '6af32ce8cb9c85e16aaf4abf',
      name: 'Vikram Mehta',
      email: 'vikram.mehta@rvu.edu.in',
      campus: 'PES University, Bengaluru',
    },
    createdAt: new Date('2026-11-10T11:00:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4ab4',
    title: 'Arduino Uno R3 Ultimate Starter Kit with 30+ Sensors',
    description: 'Complete IoT & electronics lab kit including Arduino Uno, ultrasonic sensor, LCD module, breadboard, jumper wires, servo motor, and resistor pack.',
    price: 1200,
    category: 'Electronics',
    condition: 'New',
    imageUrl: '/items/arduino-uno-r3.jpg',
    campus: 'BMS College of Engineering',
    status: 'available',
    seller: {
      _id: '6af32ce9cb9c85e16aaf4ac1',
      name: 'Sneha Patel',
      email: 'sneha.patel@rvu.edu.in',
      campus: 'BMS College of Engineering',
    },
    createdAt: new Date('2026-11-10T10:30:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4ab5',
    title: '100% Pure Cotton Lab Coat (White, Size L)',
    description: 'Standard unisex white laboratory coat required for chemistry, biology, and materials science lab sessions. Clean and freshly washed.',
    price: 280,
    category: 'Lab Equipment',
    condition: 'Good',
    imageUrl: '/items/white-lab-coat.jpg',
    campus: 'RV University, Bengaluru',
    status: 'available',
    seller: {
      _id: '6af32ce8cb9c85e16aaf4abb',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@rvu.edu.in',
      campus: 'RV University, Bengaluru',
    },
    createdAt: new Date('2026-11-10T10:00:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4ab6',
    title: 'Engineering Mini Drafter with Sheet Clips & Scale Set',
    description: 'Omega mini drafter for engineering graphics with precision rotating arm, drafting sheet clips, set squares, and drawing tube canister.',
    price: 650,
    category: 'Lab Equipment',
    condition: 'Good',
    imageUrl: '/items/engineering-mini-drafter.jpg',
    campus: 'RV University, Bengaluru',
    status: 'available',
    seller: {
      _id: '6af32ce8cb9c85e16aaf4abd',
      name: 'Ananya Iyer',
      email: 'ananya.iyer@rvu.edu.in',
      campus: 'RV University, Bengaluru',
    },
    createdAt: new Date('2026-11-10T09:30:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4ab7',
    title: 'Ergonomic Mesh Study Chair with Armrests',
    description: 'Comfortable breathable mesh chair with adjustable height and lumbar support. Ideal for hostel rooms and long coding study sessions.',
    price: 1850,
    category: 'Furniture',
    condition: 'Good',
    imageUrl: '/items/mesh-study-chair.jpg',
    campus: 'PES University, Bengaluru',
    status: 'available',
    seller: {
      _id: '6af32ce8cb9c85e16aaf4abf',
      name: 'Vikram Mehta',
      email: 'vikram.mehta@rvu.edu.in',
      campus: 'PES University, Bengaluru',
    },
    createdAt: new Date('2026-11-10T09:00:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4ab8',
    title: 'Mechanical Gaming & Typing Keyboard (Blue Switches)',
    description: 'Compact 87-key tactile mechanical keyboard with customizable RGB backlighting and detachable braided USB-C cable.',
    price: 1100,
    category: 'Electronics',
    condition: 'Like New',
    imageUrl: '/items/mechanical-keyboard.jpg',
    campus: 'BMS College of Engineering',
    status: 'available',
    seller: {
      _id: '6af32ce9cb9c85e16aaf4ac1',
      name: 'Sneha Patel',
      email: 'sneha.patel@rvu.edu.in',
      campus: 'BMS College of Engineering',
    },
    createdAt: new Date('2026-11-10T08:30:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4ab9',
    title: 'Texas Instruments TI-84 Plus Graphing Calculator',
    description: 'Pre-loaded with calculus, statistics, and matrix manipulation software. High-contrast screen with rechargeable battery pack.',
    price: 3200,
    category: 'Calculators',
    condition: 'Good',
    imageUrl: '/items/ti84-plus.jpg',
    campus: 'RV University, Bengaluru',
    status: 'available',
    seller: {
      _id: '6af32ce8cb9c85e16aaf4abb',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@rvu.edu.in',
      campus: 'RV University, Bengaluru',
    },
    createdAt: new Date('2026-11-10T08:00:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4aba',
    title: 'Classmate Premium Spiral Notebooks (Pack of 4)',
    description: 'Unused 300-page single ruled spiral notebooks with thick 70 GSM paper plus bonus highlighter pack.',
    price: 190,
    category: 'Stationery',
    condition: 'New',
    imageUrl: '/items/spiral-notebooks.jpg',
    campus: 'RV University, Bengaluru',
    status: 'available',
    seller: {
      _id: '6af32ce8cb9c85e16aaf4abd',
      name: 'Ananya Iyer',
      email: 'ananya.iyer@rvu.edu.in',
      campus: 'RV University, Bengaluru',
    },
    createdAt: new Date('2026-11-10T07:30:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4abb_item',
    title: 'Digital Multimeter with Test Probes & 9V Battery',
    description: 'Compact digital multimeter for measuring AC/DC voltage, resistance, diode test, and continuity buzzer. Essential for hardware projects.',
    price: 420,
    category: 'Electronics',
    condition: 'Like New',
    imageUrl: '/items/digital-multimeter.jpg',
    campus: 'PES University, Bengaluru',
    status: 'available',
    seller: {
      _id: '6af32ce8cb9c85e16aaf4abf',
      name: 'Vikram Mehta',
      email: 'vikram.mehta@rvu.edu.in',
      campus: 'PES University, Bengaluru',
    },
    createdAt: new Date('2026-11-10T07:00:00Z'),
  },
  {
    _id: '6af32ce8cb9c85e16aaf4abc',
    title: 'Operating System Concepts (10th Edition - Silberschatz)',
    description: 'The definitive operating systems textbook covering processes, threads, CPU scheduling, synchronization, deadlocks, and virtual memory.',
    price: 550,
    category: 'Books',
    condition: 'Good',
    imageUrl: '/items/operating-system-concepts.png',
    campus: 'RV University, Bengaluru',
    status: 'available',
    seller: {
      _id: '6af32ce8cb9c85e16aaf4abb',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@rvu.edu.in',
      campus: 'RV University, Bengaluru',
    },
    createdAt: new Date('2026-11-10T06:30:00Z'),
  },
];

// @desc    Get all available listings (supports search and category filter)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;

    // 1. If MongoDB connection is active, query live database
    if (mongoose.connection.readyState === 1) {
      try {
        let query = { status: 'available' };

        if (search && search.trim() !== '') {
          query.title = { $regex: search.trim(), $options: 'i' };
        }

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
      } catch (dbErr) {
        console.warn('Live DB query error, using seed fallback:', dbErr.message);
      }
    }

    // 2. Seamless serverless fallback if external database is offline/unreachable
    let filtered = [...FALLBACK_LISTINGS];
    if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.trim().toLowerCase()
      );
    }
    if (search && search.trim() !== '') {
      const term = search.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
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
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      try {
        const product = await Listing.findById(id).populate(
          'seller',
          'name email campus'
        );

        if (product) {
          return res.status(200).json({
            success: true,
            data: product,
          });
        }
      } catch (dbErr) {
        // Fall through to fallback list
      }
    }

    const found = FALLBACK_LISTINGS.find((p) => p._id.toString() === id.toString());
    if (found) {
      return res.status(200).json({
        success: true,
        data: found,
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Product listing not found',
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

    if (mongoose.connection.readyState === 1) {
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
    }

    // In-memory response if offline
    const newListing = {
      _id: new mongoose.Types.ObjectId().toString(),
      title: title.trim(),
      description: description.trim(),
      price: numericPrice,
      category,
      condition,
      imageUrl: imageUrl.trim(),
      campus: campus.trim(),
      seller: req.user || { name: 'Campus Student', email: 'student@rvu.edu.in' },
      status: 'available',
      createdAt: new Date(),
    };
    FALLBACK_LISTINGS.unshift(newListing);

    return res.status(201).json({
      success: true,
      message: 'Product listing published successfully',
      data: newListing,
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
    if (mongoose.connection.readyState === 1) {
      const listing = await Listing.findById(req.params.id);

      if (!listing) {
        return res.status(404).json({
          success: false,
          message: 'Listing not found',
        });
      }

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
    }

    const index = FALLBACK_LISTINGS.findIndex((p) => p._id.toString() === req.params.id.toString());
    if (index !== -1) {
      FALLBACK_LISTINGS[index] = { ...FALLBACK_LISTINGS[index], ...req.body };
      return res.status(200).json({
        success: true,
        message: 'Listing updated successfully',
        data: FALLBACK_LISTINGS[index],
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Listing not found',
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
    if (mongoose.connection.readyState === 1) {
      const listing = await Listing.findById(req.params.id);

      if (!listing) {
        return res.status(404).json({
          success: false,
          message: 'Listing not found',
        });
      }

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
    }

    const index = FALLBACK_LISTINGS.findIndex((p) => p._id.toString() === req.params.id.toString());
    if (index !== -1) {
      FALLBACK_LISTINGS.splice(index, 1);
      return res.status(200).json({
        success: true,
        message: 'Listing deleted successfully',
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Listing not found',
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
