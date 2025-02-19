import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../socket';
import { requestRide } from '../slices/rideSlice';

const BookRideScreen = () => {
  const [location, setLocation] = useState(null);
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [price, setPrice] = useState(0);
  const [nearbyDrivers, setNearbyDrivers] = useState([]);

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();

    socket.on('nearbyDriversUpdate', (drivers) => {
      setNearbyDrivers(drivers);
    });

    return () => {
      socket.off('nearbyDriversUpdate');
    };
  }, []);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    
    if (!pickup) {
      setPickup(coordinate);
    } else if (!destination) {
      setDestination(coordinate);
    }
  };

  const calculatePrice = () => {
    if (pickup && destination) {
      // Simple price calculation based on distance
      const R = 6371; // Earth's radius in km
      const dLat = (destination.latitude - pickup.latitude) * Math.PI / 180;
      const dLon = (destination.longitude - pickup.longitude) * Math.PI / 180;
      
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(pickup.latitude * Math.PI / 180) * Math.cos(destination.latitude * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      const basePrice = 5;
      const pricePerKm = 2;
      const calculatedPrice = basePrice + distance * pricePerKm;
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

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={location}
        onPress={handleMapPress}
      >
        {pickup && (
          <Marker
            coordinate={pickup}
            title="Pickup"
            pinColor="green"
          />
        )}
        {destination && (
          <Marker
            coordinate={destination}
            title="Destination"
            pinColor="red"
          />
        )}
        {nearbyDrivers.map(driver => (
          <Marker
            key={driver.id}
            coordinate={driver.location}
            title={`Driver ${driver.name}`}
            image={require('../../assets/bike-marker.png')}
          />
        ))}
      </MapView>

      <View style={styles.panel}>
        <Text style={styles.title}>Book a Ride</Text>
        
        {pickup && (
          <Text style={styles.text}>
            Pickup: {pickup.latitude.toFixed(4)}, {pickup.longitude.toFixed(4)}
          </Text>
        )}
        {destination && (
          <Text style={styles.text}>
            Destination: {destination.latitude.toFixed(4)}, {destination.longitude.toFixed(4)}
          </Text>
        )}
        {price > 0 && (
          <Text style={styles.price}>
            Estimated Price: ${price}
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, (!pickup || !destination) && styles.buttonDisabled]}
            onPress={calculatePrice}
            disabled={!pickup || !destination}
          >
            <Text style={styles.buttonText}>Calculate Price</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, (!pickup || !destination || !price) && styles.buttonDisabled]}
            onPress={handleBookRide}
            disabled={!pickup || !destination || !price}
          >
            <Text style={styles.buttonText}>Book Ride</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BookRideScreen;
