# BikeRide Deployment Guide

## Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account
- Domain name (for production)
- SSL certificate (for production)

## Local Development Setup

1. **Clone the Repository**
```bash
git clone <repository-url>
cd BikeRide
```

2. **Install Dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**
Create `.env` files in both backend and frontend directories:

Backend `.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000
```

4. **Run Development Servers**
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

## Production Deployment

### Backend Deployment (Using Heroku)

1. **Create Heroku App**
```bash
heroku create bikeride-backend
```

2. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_production_mongodb_uri
heroku config:set JWT_SECRET=your_production_jwt_secret
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-domain.com
```

3. **Deploy**
```bash
git subtree push --prefix backend heroku main
```

### Frontend Deployment (Using Netlify)

1. **Build the Frontend**
```bash
cd frontend
npm run build
```

2. **Deploy to Netlify**
- Create a new site in Netlify
- Upload the `build` directory
- Set environment variables in Netlify dashboard
- Configure custom domain

### MongoDB Atlas Setup

1. **Create Cluster**
- Create a new cluster in MongoDB Atlas
- Set up network access (IP whitelist)
- Create database user
- Get connection string

2. **Database Indexes**
```javascript
// Create geospatial index for location-based queries
db.users.createIndex({ location: "2dsphere" })
```

### SSL Certificate Setup

1. **Generate SSL Certificate**
- Use Let's Encrypt for free SSL
- Install certbot
- Run certificate generation

2. **Configure SSL in Nginx**
```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Checklist

1. **Security**
- [ ] SSL/HTTPS enabled
- [ ] Environment variables set
- [ ] API rate limiting configured
- [ ] CORS settings configured
- [ ] Security headers enabled

2. **Performance**
- [ ] Database indexes created
- [ ] Static assets compressed
- [ ] Caching configured

3. **Monitoring**
- [ ] Error logging setup
- [ ] Performance monitoring
- [ ] Uptime monitoring

4. **Backup**
- [ ] Database backup configured
- [ ] Automated backup testing

## Troubleshooting

### Common Issues

1. **Connection Issues**
```bash
# Check MongoDB connection
mongo your_mongodb_uri --eval "db.adminCommand('ping')"

# Check server logs
heroku logs --tail
```

2. **SSL Issues**
```bash
# Test SSL configuration
openssl s_client -connect your-domain.com:443
```

3. **WebSocket Issues**
```bash
# Check WebSocket connection
wscat -c wss://your-domain.com
```
