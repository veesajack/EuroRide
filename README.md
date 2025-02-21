# EuroRide - Modern Ride-Sharing Platform

EuroRide is a full-stack ride-sharing application built with React, Node.js, and React Native, featuring real-time tracking, secure payments, and an intuitive user interface.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.x
- MongoDB >= 4.4
- Docker and Docker Compose (optional)
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/veesajack/EuroRide.git
   cd EuroRide
   ```

2. **Using Docker (Recommended)**
   ```bash
   # Start all services
   docker-compose up

   # Access the application:
   # Frontend: http://localhost:3000
   # Backend: http://localhost:5000
   ```

3. **Manual Setup**

   Backend:
   ```bash
   cd backend
   cp .env.example .env  # Configure your environment variables
   npm install
   npm run dev
   ```

   Frontend:
   ```bash
   cd frontend
   cp .env.example .env  # Configure your environment variables
   npm install
   npm start
   ```

   Mobile:
   ```bash
   cd mobile
   cp .env.example .env  # Configure your environment variables
   npm install
   npm start
   ```

## 🏗️ Project Structure

```
├── backend/          # Node.js/Express backend
├── frontend/         # React web application
├── mobile/           # React Native mobile app
├── docs/            # Documentation
└── docker/          # Docker configuration
```

See [project-structure.md](./project-structure.md) for detailed structure.

## 🔧 Configuration

### Environment Variables

Backend (.env):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bikeride
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Frontend (.env):
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

## 🚢 Deployment

### Backend Deployment (Vercel)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd backend
   vercel
   ```

### Frontend Deployment (Netlify)

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Deploy:
   ```bash
   cd frontend
   netlify deploy
   ```

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run mobile tests
cd mobile
npm test
```

## 📱 Mobile App

Build Android APK:
```bash
cd mobile
npm run android:build
```

Build iOS IPA:
```bash
cd mobile
npm run ios:build
```

## 🔒 Security

- JWT authentication
- Rate limiting
- Input validation
- CSRF protection
- Secure headers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@euroride.com or join our Slack channel.
