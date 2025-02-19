const API_URL = 'http://localhost:5000/api';

// Auth API calls
const api = {
    // Auth endpoints
    async register(userData) {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    async login(credentials) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            return await response.json();
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Ride endpoints
    async createRide(rideData) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/rides`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(rideData)
            });
            return await response.json();
        } catch (error) {
            console.error('Create ride error:', error);
            throw error;
        }
    },

    async getUserRides() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/rides/user`, {
                headers: {
                    'x-auth-token': token
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Get rides error:', error);
            throw error;
        }
    },

    // User endpoints
    async updateLocation(location) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/users/location`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(location)
            });
            return await response.json();
        } catch (error) {
            console.error('Update location error:', error);
            throw error;
        }
    },

    async getNearbyDrivers(location) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${API_URL}/users/nearby-drivers?longitude=${location.longitude}&latitude=${location.latitude}`,
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Get nearby drivers error:', error);
            throw error;
        }
    }
};
