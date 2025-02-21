# BikeRide Application

A full-stack application for managing and tracking bike rides, featuring real-time location tracking, route planning, and social features.

## Project Structure

- `backend/` - Node.js/Express backend server
- `frontend/` - React web application
- `mobile/` - React Native mobile app
- `docs/` - Project documentation

## Features

- Real-time location tracking using Socket.IO
- Interactive maps with Leaflet
- Material-UI based responsive design
- Secure authentication and authorization
- Mobile app support

## Prerequisites

- Node.js >= 16.x
- MongoDB (for backend)
- npm or yarn

## Quick Start

### Backend

```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env  # Configure your environment variables
npm start
```

### Mobile App

```bash
cd mobile
npm install
npm start
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_SOCKET_URL` - WebSocket server URL

## Deployment

The application is configured for deployment on:
- Backend: Vercel
- Frontend: Netlify
- Database: MongoDB Atlas

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
