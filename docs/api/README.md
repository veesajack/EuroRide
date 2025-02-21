# API Documentation

## Authentication

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

### POST /api/auth/login
Login a user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

## Rides

### POST /api/rides
Create a new ride request.

**Request Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "pickup": {
    "lat": "number",
    "lng": "number",
    "address": "string"
  },
  "destination": {
    "lat": "number",
    "lng": "number",
    "address": "string"
  },
  "rideType": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "status": "string",
  "price": "number",
  "driver": {
    "id": "string",
    "name": "string",
    "rating": "number"
  }
}
```

### GET /api/rides
Get user's ride history.

**Request Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "string",
    "status": "string",
    "price": "number",
    "createdAt": "string",
    "driver": {
      "id": "string",
      "name": "string",
      "rating": "number"
    }
  }
]
```

## WebSocket Events

### Connection
```javascript
socket.on('connect', () => {
  socket.emit('authenticate', { token: 'user_token' });
});
```

### Ride Updates
```javascript
socket.on('ride_status', (data) => {
  // data: { rideId, status, location }
});
```

### Driver Location
```javascript
socket.on('driver_location', (data) => {
  // data: { driverId, location: { lat, lng } }
});
```
