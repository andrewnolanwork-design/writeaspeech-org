# writeaspeech.org

**Craft the perfect speech for any occasion. Your personal AI speechwriter.**

## 🎯 Overview

writeaspeech.org is a web-based application that helps infrequent speakers write and practice memorable speeches. Using an AI "Style Engine," users are guided through a creative process to generate personalized speeches that match their voice and the event's tone.

## 🚀 Key Features

- **AI-Powered Speech Generation**: Personalized speeches using advanced AI
- **Style Engine**: Multiple speech styles (witty, formal, heartfelt, inspiring)
- **Practice Toolkit**: Teleprompter, pacing analysis, audio recording
- **Multiple Export Formats**: PDF, text, and cue cards
- **One-Time Payment**: $39 for complete access, no subscriptions

## 🎪 Target Occasions

- **Wedding Speeches**: Best man, maid of honor, parent speeches
- **Special Events**: Birthdays, anniversaries, retirement parties
- **Professional**: Presentations, awards, graduations

## 🏗️ Project Structure

```
writeaspeech-org/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # Node.js/Express backend
└── README.md        # This file
```

## 💻 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (optional, will use mocks in development)
- OpenAI API key (optional, will use mocks in development)
- Stripe account (optional, will use mocks in development)

### Setup Instructions

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd writeaspeech-org

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

2. **Configure environment variables:**

**Server Configuration:**
```bash
cd server
cp env.template .env
# Edit .env with your actual API keys (optional for development)
```

**Client Configuration:**
```bash
cd client
cp env.template .env
# Edit .env with your configuration (optional for development)
```

3. **Start the development servers:**

**Backend (Terminal 1):**
```bash
cd server
npm run dev
# Server runs on http://localhost:3001
```

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

### Features Implemented

✅ **Frontend Components:**
- Landing page with hero section and feature highlights
- Multi-step speech builder with validation
- User authentication pages (login/register)
- Dashboard with speech management
- Responsive design with modern UI

✅ **Backend API:**
- Speech generation using OpenAI GPT (with fallback mocks)
- User authentication system (with Firebase support)
- Payment processing with Stripe integration
- RESTful API endpoints for all features
- Error handling and validation

✅ **Integration:**
- Frontend API client with TypeScript
- Payment flow simulation
- Speech generation workflow
- Mock data for development without external APIs

### API Endpoints

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

**Speech Generation:**
- `POST /api/speech/generate` - Generate new speech
- `GET /api/speech/user/:userId` - Get user speeches
- `GET /api/speech/:speechId` - Get specific speech
- `PUT /api/speech/:speechId` - Update speech
- `DELETE /api/speech/:speechId` - Delete speech

**Payments:**
- `POST /api/payment/create-payment-intent` - Create payment
- `POST /api/payment/confirm-payment` - Confirm payment
- `GET /api/payment/orders/:userId` - Get order history
- `GET /api/payment/config` - Get payment config
- `POST /api/payment/webhook` - Stripe webhook

### Current State

The application is fully functional in development mode with:
- Complete UI/UX for speech building process
- Working API endpoints with mock responses
- Payment flow simulation
- Speech generation (mock + real AI when configured)
- Responsive design and error handling

## 🚀 Deployment

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Firebase/Firestore
- **Payments**: Stripe
- **AI**: OpenAI API

## 🔗 Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: Firebase/Firestore
- **AI**: OpenAI GPT-4
- **Payments**: Stripe
- **Hosting**: Vercel + Render

## 📄 License

All rights reserved © 2024 writeaspeech.org
