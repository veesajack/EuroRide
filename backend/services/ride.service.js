const Ride = require('../models/ride.model');
const { calculatePrice } = require('../utils/pricing');
const { validateRideData } = require('../utils/validators');

class RideService {
  async createRide(rideData) {
    validateRideData(rideData);
    
    const price = await calculatePrice(
      rideData.pickup,
      rideData.destination,
      rideData.rideType
    );

    const ride = new Ride({
      ...rideData,
      price,
      status: 'pending'
    });

    return ride.save();
  }

  async getRidesByUser(userId) {
    return Ride.find({ userId })
      .sort({ createdAt: -1 })
      .populate('driver', 'name rating');
  }

  async getRideById(rideId) {
    return Ride.findById(rideId)
      .populate('driver', 'name rating vehicle')
      .populate('userId', 'name phone');
  }

  async updateRideStatus(rideId, status) {
    const validStatuses = ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid ride status');
    }

    return Ride.findByIdAndUpdate(
      rideId,
      { status },
      { new: true }
    );
  }
}

module.exports = new RideService();
