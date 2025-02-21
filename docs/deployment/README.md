# Deployment Guide

## Prerequisites

1. Accounts needed:
   - GitHub
   - Vercel
   - Netlify
   - MongoDB Atlas
   - Apple Developer Account (for iOS)
   - Google Play Console (for Android)

2. Environment Setup:
   - Node.js 16.x or later
   - Docker and Docker Compose
   - Xcode (for iOS)
   - Android Studio (for Android)

## Backend Deployment (Vercel)

1. **Setup Vercel Project**
   ```bash
   cd backend
   vercel
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Navigate to Project Settings
   - Add Environment Variables:
     ```
     MONGODB_URI=
     JWT_SECRET=
     NODE_ENV=production
     ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## Frontend Deployment (Netlify)

1. **Setup Netlify Project**
   ```bash
   cd frontend
   netlify init
   ```

2. **Configure Environment Variables**
   - Go to Netlify Dashboard
   - Navigate to Site Settings
   - Add Environment Variables:
     ```
     REACT_APP_API_URL=
     REACT_APP_SOCKET_URL=
     ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Mobile App Deployment

### Android

1. **Generate Keystore**
   ```bash
   cd mobile/android
   keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure Gradle**
   Edit `android/app/build.gradle`:
   ```gradle
   signingConfigs {
       release {
           storeFile file("release.keystore")
           storePassword System.getenv("KEYSTORE_PASSWORD")
           keyAlias "release"
           keyPassword System.getenv("KEY_PASSWORD")
       }
   }
   ```

3. **Build APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

### iOS

1. **Configure Xcode Project**
   - Open `ios/EuroRide.xcworkspace`
   - Set Bundle Identifier
   - Configure Signing

2. **Archive App**
   ```bash
   cd ios
   xcodebuild -workspace EuroRide.xcworkspace -scheme EuroRide archive
   ```

## Database Setup (MongoDB Atlas)

1. **Create Cluster**
   - Go to MongoDB Atlas
   - Create New Cluster
   - Choose Region and Configuration

2. **Configure Network Access**
   - Add IP Whitelist
   - Create Database User

3. **Get Connection String**
   - Click "Connect"
   - Choose "Connect Your Application"
   - Copy Connection String

## CI/CD Setup

1. **Configure GitHub Secrets**
   ```
   VERCEL_TOKEN=
   VERCEL_ORG_ID=
   VERCEL_PROJECT_ID=
   NETLIFY_AUTH_TOKEN=
   NETLIFY_SITE_ID=
   MONGODB_URI=
   JWT_SECRET=
   ```

2. **Enable GitHub Actions**
   - Go to Repository Settings
   - Actions > General
   - Enable Actions

## Monitoring and Logging

1. **Setup Application Monitoring**
   - Install Sentry
   - Configure Error Tracking
   - Setup Performance Monitoring

2. **Configure Logging**
   - Setup Winston
   - Configure Log Rotation
   - Setup Log Aggregation

## SSL Configuration

1. **Vercel (Backend)**
   - SSL included by default
   - Configure custom domain if needed

2. **Netlify (Frontend)**
   - SSL included by default
   - Configure custom domain if needed

## Backup Strategy

1. **Database Backup**
   ```bash
   # Automated backup script
   mongodump --uri="$MONGODB_URI" --out=backup/
   ```

2. **Configure Automated Backups**
   - Setup MongoDB Atlas Backup
   - Configure Retention Policy

## Rollback Procedures

1. **Backend Rollback**
   ```bash
   vercel rollback
   ```

2. **Frontend Rollback**
   ```bash
   netlify rollback
   ```

## Performance Optimization

1. **Frontend**
   - Enable code splitting
   - Configure CDN
   - Optimize images

2. **Backend**
   - Configure caching
   - Optimize database queries
   - Setup load balancing
