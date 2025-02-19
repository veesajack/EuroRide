const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ride = require('../models/Ride');
const User = require('../models/User');

// @route   POST api/rides
// @desc    Create a new ride request
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { pickup, destination, price, distance, duration } = req.body;

        // Validate input
        if (!pickup || !destination || !price || !distance || !duration) {
            return res.status(400).json({ msg: 'Please provide all ride details' });
        }

        // Create new ride
        const ride = new Ride({
            rider: req.user.id,
            pickup: {
                coordinates: [pickup.lng, pickup.lat],
                address: pickup.address
            },
            destination: {
                coordinates: [destination.lng, destination.lat],
                address: destination.address
            },
            price,
            distance,
            duration
        });

        await ride.save();

        // Find nearby drivers
        const nearbyDrivers = await User.find({
            role: 'driver',
            isAvailable: true,
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [pickup.lng, pickup.lat]
                    },
                    $maxDistance: 5000 // 5km radius
                }
            }
        });

        // Emit socket event for nearby drivers
        req.app.get('io').emit('newRideRequest', {
            ride,
            nearbyDrivers: nearbyDrivers.map(driver => driver._id)
        });

        res.json(ride);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/rides/user
// @desc    Get all rides for current user
// @access  Private
router.get('/user', auth, async (req, res) => {
    try {
        const rides = await Ride.find({
            $or: [
                { rider: req.user.id },
                { driver: req.user.id }
            ]
        })
        .sort({ createdAt: -1 })
        .populate('rider', 'name phone')
        .populate('driver', 'name phone');

        res.json(rides);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/rides/:id/accept
// @desc    Accept a ride request (for drivers)
// @access  Private
router.put('/:id/accept', auth, async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            return res.status(404).json({ msg: 'Ride not found' });
        }

        if (ride.status !== 'requested') {
            return res.status(400).json({ msg: 'Ride is no longer available' });
        }

        // Check if user is a driver
        const driver = await User.findById(req.user.id);
        if (driver.role !== 'driver') {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        ride.driver = req.user.id;
        ride.status = 'accepted';
        await ride.save();

        // Notify rider
        req.app.get('io').emit('rideAccepted', {
            ride,
            driverId: req.user.id
        });

        res.json(ride);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/rides/:id/status
// @desc    Update ride status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['started', 'completed', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ msg: 'Invalid status' });
        }

        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            return res.status(404).json({ msg: 'Ride not found' });
        }

        // Verify user is either the rider or driver
        if (ride.rider.toString() !== req.user.id && 
            ride.driver.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        ride.status = status;
        await ride.save();

        // Notify both parties
        req.app.get('io').emit('rideStatusUpdated', {
            rideId: ride._id,
            status,
            updatedBy: req.user.id
        });

        res.json(ride);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
