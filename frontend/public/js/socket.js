// Initialize Socket.IO
const socket = io('http://localhost:5000');

const socketEvents = {
    init() {
        // Connection events
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Ride events
        socket.on('newRideRequest', (data) => {
            if (isDriver && data.nearbyDrivers.includes(userId)) {
                showNewRideAlert(data.ride);
            }
        });

        socket.on('rideAccepted', (data) => {
            if (data.ride.rider === userId) {
                showDriverFoundAlert(data);
            }
        });

        socket.on('rideStatusUpdated', (data) => {
            updateRideStatus(data);
        });

        // Location events
        socket.on('nearbyDriver', (data) => {
            if (isRider) {
                updateDriverMarker(data);
            }
        });

        socket.on('driverAvailabilityChanged', (data) => {
            updateDriverAvailability(data);
        });
    },

    // Emit events
    emitLocation(location) {
        socket.emit('updateLocation', location);
    },

    emitRideRequest(rideData) {
        socket.emit('requestRide', rideData);
    },

    emitRideAccepted(rideId) {
        socket.emit('acceptRide', rideId);
    },

    emitRideStatus(rideId, status) {
        socket.emit('updateRideStatus', { rideId, status });
    }
};
