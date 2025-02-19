const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   PUT api/users/location
// @desc    Update user's location
// @access  Private
router.put('/location', auth, async (req, res) => {
    try {
        const { longitude, latitude } = req.body;

        if (!longitude || !latitude) {
            return res.status(400).json({ msg: 'Please provide location coordinates' });
        }

        const user = await User.findById(req.user.id);
        user.location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        await user.save();

        // If user is a driver, notify nearby riders
        if (user.role === 'driver' && user.isAvailable) {
            const nearbyRides = await Ride.find({
                status: 'requested',
                'pickup.coordinates': {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: 5000 // 5km radius
                    }
                }
            });

            if (nearbyRides.length > 0) {
                req.app.get('io').emit('nearbyDriver', {
                    driverId: user._id,
                    location: user.location,
                    nearbyRides: nearbyRides.map(ride => ride._id)
                });
            }
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/users/availability
// @desc    Update driver's availability status
// @access  Private
router.put('/availability', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user.role !== 'driver') {
            return res.status(403).json({ msg: 'Only drivers can update availability' });
        }

        user.isAvailable = !user.isAvailable;
        await user.save();

        // Notify system about driver availability
        req.app.get('io').emit('driverAvailabilityChanged', {
            driverId: user._id,
            isAvailable: user.isAvailable,
            location: user.location
        });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/users/nearby-drivers
// @desc    Get nearby available drivers
// @access  Private
router.get('/nearby-drivers', auth, async (req, res) => {
    try {
        const { longitude, latitude } = req.query;

        if (!longitude || !latitude) {
            return res.status(400).json({ msg: 'Please provide location coordinates' });
        }

        const nearbyDrivers = await User.find({
            role: 'driver',
            isAvailable: true,
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: 5000 // 5km radius
                }
            }
        }).select('-password');

        res.json(nearbyDrivers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate({
                path: 'rides',
                options: { sort: { createdAt: -1 }, limit: 10 }
            });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, phone, vehicleDetails } = req.body;
        const user = await User.findById(req.user.id);

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (vehicleDetails && user.role === 'driver') {
            user.vehicleDetails = vehicleDetails;
        }

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
