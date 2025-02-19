# BikeRide API Documentation

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "rider|driver",
    "phone": "string"
}
```

**Response:**
```json
{
    "token": "string",
    "user": {
        "id": "string",
        "name": "string",
        "email": "string",
        "role": "string",
        "phone": "string"
    }
}
```

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response:** Same as register

## Ride Endpoints

### Create Ride Request
```http
POST /api/rides
```

**Headers:**
```
x-auth-token: string
```

**Request Body:**
```json
{
    "pickup": {
        "lng": "number",
        "lat": "number",
        "address": "string"
    },
    "destination": {
        "lng": "number",
        "lat": "number",
        "address": "string"
    },
    "price": "number",
    "distance": "number",
    "duration": "number"
}
```

### Get User Rides
```http
GET /api/rides/user
```

**Headers:**
```
x-auth-token: string
```

### Accept Ride
```http
PUT /api/rides/:id/accept
```

**Headers:**
```
x-auth-token: string
```

## User Endpoints

### Update Location
```http
PUT /api/users/location
```

**Headers:**
```
x-auth-token: string
```

**Request Body:**
```json
{
    "longitude": "number",
    "latitude": "number"
}
```

### Get Nearby Drivers
```http
GET /api/users/nearby-drivers?longitude=number&latitude=number
```

**Headers:**
```
x-auth-token: string
```

## WebSocket Events

### Client to Server
- `updateLocation`: Update user's location
- `requestRide`: Create a new ride request
- `acceptRide`: Accept a ride request
- `updateRideStatus`: Update ride status

### Server to Client
- `newRideRequest`: Notify nearby drivers of new ride
- `rideAccepted`: Notify rider when a driver accepts
- `rideStatusUpdated`: Notify both parties of status changes
- `nearbyDriver`: Notify riders of nearby drivers
- `driverAvailabilityChanged`: Notify system of driver availability
