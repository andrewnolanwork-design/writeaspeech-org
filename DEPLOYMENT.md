# 🚀 Deployment Guide

## Quick Vercel Deployment

### Step 1: Frontend Deployment to Vercel

1. **Go to [vercel.com](https://vercel.com)**
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Search for and select `andrewnolanwork-design/writeaspeech-org`

3. **Configure Project Settings**
   - **Framework Preset:** Vite (should auto-detect)
   - **Root Directory:** `client` ⚠️ **Important!**
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `dist` (auto-filled)

4. **Environment Variables (Optional for testing)**
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
   
   Leave this blank initially to test with mock data.

5. **Deploy!**
   - Click "Deploy"
   - Vercel will build and deploy your site
   - You'll get a URL like `https://writeaspeech-org-xxx.vercel.app`

### Step 2: Backend Deployment (Optional)

**Option A: Test Frontend Only (Recommended First)**
- The frontend will work with mock data
- API calls will fail gracefully with error messages
- Perfect for testing UI/UX

**Option B: Deploy Backend to Render**

1. **Go to [render.com](https://render.com)**
   - Sign in with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repo

3. **Configure Service**
   - **Name:** `writeaspeech-api`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Add Environment Variables**
   ```
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

5. **Deploy Backend**
   - Service will be available at `https://writeaspeech-api.onrender.com`

### Step 3: Connect Frontend to Backend

1. **Update Vercel Environment Variables**
   ```
   VITE_API_URL=https://writeaspeech-api.onrender.com/api
   ```

2. **Redeploy Frontend**
   - Go to Vercel dashboard
   - Trigger new deployment

## What You'll See

### ✅ **Working with Mock Data:**
- Beautiful UI for speech building
- Complete multi-step form
- Mock speech generation
- Simulated payment flow
- Error handling demonstrations

### ✅ **Working with Real APIs (when configured):**
- Real OpenAI speech generation
- Actual Stripe payments
- Firebase authentication
- Full end-to-end functionality

## Current Status

- **Frontend:** Ready for deployment ✅
- **Backend:** Ready with mock fallbacks ✅
- **Database:** Uses mocks (Firebase optional) ✅
- **Payments:** Uses mocks (Stripe optional) ✅
- **AI:** Uses mocks (OpenAI optional) ✅

## Troubleshooting

### Common Issues:

1. **Build fails on Vercel:**
   - Make sure Root Directory is set to `client`
   - Check that all dependencies are in `client/package.json`

2. **API calls fail:**
   - Expected behavior with mock backend
   - Check browser console for detailed error messages

3. **404 on page refresh:**
   - Vercel should handle this with the `vercel.json` config
   - Make sure the config file is in the `client` directory

## Next Steps After Deployment

1. **Test the deployed frontend**
2. **Add real API keys when ready:**
   - OpenAI for speech generation
   - Stripe for payments
   - Firebase for authentication
3. **Configure custom domain (optional)**
4. **Set up monitoring and analytics**
