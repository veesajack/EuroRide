# EuroRide Project Structure

## Backend (Node.js/Express)
```
backend/
├── config/
│   ├── database.js        # Database configuration
│   ├── socket.js         # Socket.io configuration
│   └── passport.js       # Authentication configuration
├── controllers/
│   ├── auth.controller.js
│   ├── ride.controller.js
│   ├── user.controller.js
│   └── payment.controller.js
├── middleware/
│   ├── auth.middleware.js
│   ├── validation.js
│   ├── error.js
│   └── security.js
├── models/
│   ├── user.model.js
│   ├── ride.model.js
│   ├── payment.model.js
│   └── review.model.js
├── routes/
│   ├── auth.routes.js
│   ├── ride.routes.js
│   ├── user.routes.js
│   └── payment.routes.js
├── services/
│   ├── auth.service.js
│   ├── ride.service.js
│   ├── payment.service.js
│   └── notification.service.js
├── utils/
│   ├── logger.js
│   ├── geocoding.js
│   └── validators.js
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/

## Frontend (React)
```
frontend/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── Modal/
│   │   ├── layout/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   └── Sidebar/
│   │   └── features/
│   │       ├── RideBooking/
│   │       ├── RideHistory/
│   │       └── UserProfile/
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useRide.js
│   │   └── useGeolocation.js
│   ├── pages/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── RideBooking/
│   │   ├── RideHistory/
│   │   └── Profile/
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   └── ride.service.js
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   └── rideSlice.js
│   │   └── index.js
│   ├── styles/
│   │   ├── theme.js
│   │   └── global.css
│   └── utils/
│       ├── constants.js
│       ├── helpers.js
│       └── validators.js
```

## Mobile (React Native)
```
mobile/
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── features/
│   ├── navigation/
│   │   ├── AppNavigator.js
│   │   └── AuthNavigator.js
│   ├── screens/
│   │   ├── Auth/
│   │   ├── Home/
│   │   └── Ride/
│   ├── services/
│   ├── store/
│   └── utils/
└── assets/
```

## Shared
```
shared/
├── constants/
├── types/
└── utils/
```

## Documentation
```
docs/
├── api/
├── architecture/
├── deployment/
└── testing/
```

## Configuration Files
```
./
├── .github/
│   └── workflows/
│       ├── backend.yml
│       └── frontend.yml
├── docker/
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── docker-compose.yml
├── README.md
├── package.json
└── docker-compose.yml
```
