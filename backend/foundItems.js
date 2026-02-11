const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const FoundItem = require('../models/FoundItem');
const { protect, optionalAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/found-items
// @desc    Get all found items (with optional filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, status, location } = req.query;
    
    // Build query
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    else query.status = 'available'; // Show only available items by default
    if (location) query.location = new RegExp(location, 'i');

    const foundItems = await FoundItem.find(query)
      .populate('user', 'name email phone studentId')
      .populate('claimedBy', 'name email studentId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foundItems.length,
      data: foundItems
    });
  } catch (error) {
    console.error('Get found items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/found-items/:id
// @desc    Get single found item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id)
      .populate('user', 'name email phone studentId')
      .populate('claimedBy', 'name email studentId');

    if (!foundItem) {
      return res.status(404).json({
        success: false,
        message: 'Found item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: foundItem
    });
  } catch (error) {
    console.error('Get found item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/found-items
// @desc    Report a found item
// @access  Public (can be anonymous)
router.post('/', optionalAuth, upload.array('images', 3), [
  body('category').notEmpty().withMessage('Category is required'),
  body('itemName').trim().notEmpty().withMessage('Item name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('color').trim().notEmpty().withMessage('Color is required'),
  body('location').trim().notEmpty().withMessage('Location where found is required'),
  body('dateFound').isISO8601().withMessage('Valid date is required'),
  body('currentLocation').trim().notEmpty().withMessage('Current location is required')
], async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    const {
      category,
      itemName,
      description,
      color,
      location,
      dateFound,
      timeFound,
      currentLocation,
      isAnonymous,
      anonymousContact
    } = req.body;

    // Validate anonymous reporting
    if (isAnonymous === 'true' || isAnonymous === true) {
      if (!anonymousContact) {
        return res.status(400).json({
          success: false,
          message: 'Contact information required for anonymous reporting'
        });
      }
    } else if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Please login or report anonymously'
      });
    }

    // Get uploaded image paths
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    // Create found item
    const foundItemData = {
      category,
      itemName,
      description,
      color,
      location,
      dateFound,
      timeFound,
      currentLocation,
      images: imagePaths,
      isAnonymous: isAnonymous === 'true' || isAnonymous === true
    };

    if (foundItemData.isAnonymous) {
      foundItemData.anonymousContact = anonymousContact;
    } else {
      foundItemData.user = req.user.id;
    }

    const foundItem = await FoundItem.create(foundItemData);

    // Populate user if not anonymous
    if (!foundItemData.isAnonymous) {
      await foundItem.populate('user', 'name email phone studentId');
    }

    res.status(201).json({
      success: true,
      message: 'Found item reported successfully',
      data: foundItem
    });
  } catch (error) {
    console.error('Report found item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/found-items/:id
// @desc    Update found item
// @access  Private (Reporter or Admin)
router.put('/:id', protect, upload.array('images', 3), async (req, res) => {
  try {
    let foundItem = await FoundItem.findById(req.params.id);

    if (!foundItem) {
      return res.status(404).json({
        success: false,
        message: 'Found item not found'
      });
    }

    // Check authorization (owner or admin)
    if (!foundItem.isAnonymous) {
      if (foundItem.user.toString() !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this item'
        });
      }
    } else if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only admin can update anonymous reports'
      });
    }

    // Prepare update fields
    const updateFields = { ...req.body };
    
    // Add new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      updateFields.images = [...foundItem.images, ...newImages];
    }

    foundItem = await FoundItem.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    ).populate('user', 'name email phone studentId');

    res.status(200).json({
      success: true,
      message: 'Found item updated successfully',
      data: foundItem
    });
  } catch (error) {
    console.error('Update found item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/found-items/:id
// @desc    Delete found item
// @access  Private (Reporter or Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);

    if (!foundItem) {
      return res.status(404).json({
        success: false,
        message: 'Found item not found'
      });
    }

    // Check authorization
    if (!foundItem.isAnonymous) {
      if (foundItem.user.toString() !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this item'
        });
      }
    } else if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only admin can delete anonymous reports'
      });
    }

    await foundItem.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Found item deleted successfully'
    });
  } catch (error) {
    console.error('Delete found item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/found-items/user/my-items
// @desc    Get current user's found items
// @access  Private
router.get('/user/my-items', protect, async (req, res) => {
  try {
    const foundItems = await FoundItem.find({ user: req.user.id, isAnonymous: false })
      .populate('claimedBy', 'name email studentId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foundItems.length,
      data: foundItems
    });
  } catch (error) {
    console.error('Get my found items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
