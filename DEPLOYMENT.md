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

## Backend Deployment to Render

### Step 1: Deploy to Render

1. **Go to [render.com](https://render.com)**
   - Sign in with your GitHub account

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository: `andrewnolanwork-design/writeaspeech-org`

3. **Configure Service Settings**
   - **Name:** `writeaspeech-api`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (for testing) or Starter ($7/month for production)

4. **Add Environment Variables**
   
   **Required for basic functionality:**
   ```
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-app.vercel.app
   JWT_SECRET=your-long-random-secret-here
   ```
   
   **Optional (for full functionality):**
   ```
   OPENAI_API_KEY=sk-your-openai-key-here
   STRIPE_SECRET_KEY=sk_your-stripe-secret-key
   STRIPE_PUBLISHABLE_KEY=pk_your-stripe-public-key
   STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
   FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy from your GitHub repo
   - Your API will be available at `https://writeaspeech-api.onrender.com`

### Step 2: Update Frontend Configuration

1. **Update Vercel Environment Variables**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add environment variable:
     ```
     VITE_API_URL=https://writeaspeech-api.onrender.com/api
     ```

2. **Redeploy Frontend**
   - Trigger a new deployment in Vercel
   - Your frontend will now connect to the live backend

### Step 3: Test End-to-End

1. **Visit your deployed frontend**
2. **Test the speech builder flow**
3. **Verify API connections are working**
4. **Check browser console for any errors**

## Production API Setup (Optional but Recommended)

### OpenAI Configuration
1. **Get API Key:** [platform.openai.com](https://platform.openai.com)
2. **Add to Render:** `OPENAI_API_KEY=sk-your-key-here`
3. **Benefits:** Real AI-generated speeches instead of mock content

### Stripe Configuration
1. **Create Account:** [stripe.com](https://stripe.com)
2. **Get API Keys:** Dashboard → Developers → API keys
3. **Add to Render:**
   ```
   STRIPE_SECRET_KEY=sk_your-secret-key
   STRIPE_PUBLISHABLE_KEY=pk_your-public-key
   ```
4. **Set up Webhooks:** Point to `https://writeaspeech-api.onrender.com/api/payment/webhook`
5. **Benefits:** Real payment processing for $39 speech generation

### Firebase Configuration
1. **Create Project:** [console.firebase.google.com](https://console.firebase.google.com)
2. **Generate Service Account:** Project Settings → Service Accounts
3. **Add to Render:**
   ```
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
   FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
   ```
4. **Benefits:** Real user authentication and data persistence

## Next Steps After Deployment

1. **Test the complete deployed application**
2. **Monitor performance and errors**
3. **Add real API keys for full functionality**
4. **Configure custom domain (optional)**
5. **Set up monitoring and analytics**
6. **Consider upgrading to paid plans for production traffic**

## Deployment Status

- **Frontend:** ✅ Ready for Vercel deployment
- **Backend:** ✅ Ready for Render deployment  
- **Database:** ✅ Firebase integration ready
- **Payments:** ✅ Stripe integration ready
- **AI:** ✅ OpenAI integration ready

Your writeaspeech.org is production-ready! 🚀
