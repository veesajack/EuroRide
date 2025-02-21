import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { bookRide } from '../../../store/slices/rideSlice';
import useGeolocation from '../../../hooks/useGeolocation';

const RideForm = () => {
  const dispatch = dispatch();
  const { location } = useGeolocation();
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    rideType: 'standard'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(bookRide({
      ...formData,
      pickupCoords: location
    }));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Book a Ride
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Pickup Location"
          name="pickup"
          value={formData.pickup}
          onChange={(e) => setFormData({
            ...formData,
            pickup: e.target.value
          })}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={(e) => setFormData({
            ...formData,
            destination: e.target.value
          })}
          margin="normal"
          required
        />

        <Box sx={{ height: 300, my: 2 }}>
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.lat, location.lng]} />
          </MapContainer>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Book Now
        </Button>
      </form>
    </Box>
  );
};

export default RideForm;
