import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../socket';
import { requestRide } from '../slices/rideSlice';

const RideBooking = () => {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [price, setPrice] = useState(0);
  const [nearbyDrivers, setNearbyDrivers] = useState([]);
  
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194
  };

  useEffect(() => {
    // Listen for nearby drivers
    socket.on('nearbyDriversUpdate', (drivers) => {
      setNearbyDrivers(drivers);
    });

    return () => {
      socket.off('nearbyDriversUpdate');
    };
  }, []);

  const handleMapClick = (event) => {
    if (!pickup) {
      setPickup({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    } else if (!destination) {
      setDestination({
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    }
  };

  const calculatePrice = () => {
    if (pickup && destination) {
      // Simple price calculation based on distance
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(pickup.lat, pickup.lng),
        new google.maps.LatLng(destination.lat, destination.lng)
      );
      
      const basePrice = 5;
      const pricePerKm = 2;
      const calculatedPrice = basePrice + (distance / 1000) * pricePerKm;
      setPrice(Math.round(calculatedPrice));
    }
  };

  const handleBookRide = () => {
    if (pickup && destination) {
      dispatch(requestRide({
        pickup,
        destination,
        price,
        riderId: user.id
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book a Ride</h1>
      
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onClick={handleMapClick}
        >
          {pickup && <Marker position={pickup} label="P" />}
          {destination && <Marker position={destination} label="D" />}
          {nearbyDrivers.map(driver => (
            <Marker
              key={driver.id}
              position={driver.location}
              icon={{
                url: '/bike-icon.png',
                scaledSize: new window.google.maps.Size(30, 30)
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Ride Details</h2>
          {pickup && (
            <p className="text-gray-600">
              Pickup: {pickup.lat.toFixed(4)}, {pickup.lng.toFixed(4)}
            </p>
          )}
          {destination && (
            <p className="text-gray-600">
              Destination: {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
            </p>
          )}
          {price > 0 && (
            <p className="text-lg font-semibold text-green-600 mt-2">
              Estimated Price: ${price}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculatePrice}
            disabled={!pickup || !destination}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Calculate Price
          </button>
          <button
            onClick={handleBookRide}
            disabled={!pickup || !destination || price === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Book Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideBooking;
