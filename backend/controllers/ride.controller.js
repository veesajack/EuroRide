const rideService = require('../services/ride.service');

exports.createRide = async (req, res) => {
  try {
    const ride = await rideService.createRide({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRides = async (req, res) => {
  try {
    const rides = await rideService.getRidesByUser(req.user.id);
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRideById = async (req, res) => {
  try {
    const ride = await rideService.getRideById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRideStatus = async (req, res) => {
  try {
    const ride = await rideService.updateRideStatus(
      req.params.id,
      req.body.status
    );
    res.json(ride);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
