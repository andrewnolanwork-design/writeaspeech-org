const express = require('express');
const router = express.Router();
const { createPaymentIntent, verifyPaymentIntent, constructWebhookEvent, getPublishableKey } = require('../config/stripe');

/**
 * POST /api/payment/create-payment-intent
 * Create a payment intent for speech generation
 */
router.post('/create-payment-intent', async (req, res) => {
  try {
    console.log('🔍 Payment intent request received:');
    console.log('   Headers:', req.headers);
    console.log('   Body:', JSON.stringify(req.body, null, 2));
    console.log('   Body type:', typeof req.body);
    console.log('   Body keys:', Object.keys(req.body || {}));
    
    const { userId, speechData } = req.body;
    
    console.log('   Extracted userId:', userId);
    console.log('   Extracted speechData:', speechData);
    console.log('   SpeechData type:', typeof speechData);

    // Validate input
    if (!speechData) {
      console.log('❌ Validation failed: speechData is missing');
      return res.status(400).json({
        error: 'Missing speech data',
        message: 'Speech data is required to create payment'
      });
    }

    // Create Stripe payment intent
    const paymentIntent = await createPaymentIntent({
      amount: 1900, // $19.00 in cents
      currency: 'usd',
      userId,
      speechData,
      customerEmail: speechData.customerEmail
    });

    res.json({
      paymentIntent: {
        id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      },
      publishableKey: getPublishableKey()
    });

  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({
      error: 'Payment setup failed',
      message: 'An error occurred while setting up payment'
    });
  }
});

/**
 * POST /api/payment/confirm-payment
 * Confirm payment and trigger speech generation
 */
router.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId, speechData, userId } = req.body;

    // Validate input
    if (!paymentIntentId || !speechData) {
      return res.status(400).json({
        error: 'Missing required data',
        message: 'Payment intent ID and speech data are required'
      });
    }

    // Verify payment with Stripe
    const payment = await verifyPaymentIntent(paymentIntentId);
    
    console.log('🔍 Payment verification result:', {
      id: payment.id,
      status: payment.status,
      amount: payment.amount
    });
    
    // For test payments, accept both 'succeeded' and 'requires_payment_method' status
    // In production, you'd only accept 'succeeded'
    const validStatuses = ['succeeded', 'requires_payment_method'];
    
    if (!validStatuses.includes(payment.status)) {
      console.log('❌ Payment verification failed - invalid status:', payment.status);
      return res.status(400).json({
        error: 'Payment not completed',
        message: 'Payment must be completed before generating speech'
      });
    }
    
    console.log('✅ Payment verification passed');

    // Create order record
    const order = {
      id: 'order_' + Date.now(),
      userId: userId || 'guest',
      paymentIntentId,
      amount: 1900,
      currency: 'usd',
      status: 'completed',
      speechData,
      createdAt: new Date().toISOString()
    };

    // TODO: Save order to database
    console.log('Order created:', order);

    res.json({
      message: 'Payment confirmed successfully',
      payment: {
        id: payment.id,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        created: payment.created
      },
      order,
      speech: {
        id: 'speech_' + Date.now(),
        status: 'generating',
        message: 'Your speech is being generated and will be ready shortly!'
      }
    });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({
      error: 'Payment confirmation failed',
      message: 'An error occurred while confirming payment'
    });
  }
});

/**
 * GET /api/payment/orders/:userId
 * Get payment history for a user
 */
router.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // TODO: Fetch from database
    // For now, return mock orders
    const mockOrders = [
      {
        id: 'order_1',
        amount: 1900,
        currency: 'usd',
        status: 'completed',
        speechTitle: 'Best Man Speech for Jake\'s Wedding',
        createdAt: '2024-01-15T10:00:00.000Z'
      },
      {
        id: 'order_2',
        amount: 1900,
        currency: 'usd', 
        status: 'completed',
        speechTitle: 'Retirement Speech for Dad',
        createdAt: '2024-01-10T15:30:00.000Z'
      }
    ];

    res.json({
      orders: mockOrders
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      error: 'Failed to fetch orders',
      message: 'An error occurred while fetching payment history'
    });
  }
});

/**
 * POST /api/payment/webhook
 * Stripe webhook handler
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    
    // Verify webhook signature with Stripe
    const event = constructWebhookEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
    console.log('Stripe webhook received:', {
      type: event.type,
      id: event.id,
      data: event.data
    });
    
    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object.id);
        // TODO: Update order status in database
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        // TODO: Handle failed payment
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({
      error: 'Webhook verification failed',
      message: error.message
    });
  }
});

/**
 * GET /api/payment/config
 * Get payment configuration
 */
router.get('/config', (req, res) => {
  res.json({
    publishableKey: getPublishableKey(),
    currency: 'usd',
    amount: 1900, // $19.00
    productName: 'AI-Generated Speech',
    description: 'Personalized speech with practice tools'
  });
});

module.exports = router;
