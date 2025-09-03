const stripe = require('stripe');

// Initialize Stripe
let stripeClient;

if (process.env.STRIPE_SECRET_KEY) {
  stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
} else {
  console.warn('Stripe secret key not configured - using mock payment processing');
  
  // Create a mock Stripe client for development
  stripeClient = {
    paymentIntents: {
      create: async (params) => {
        console.log('Mock Stripe: Creating payment intent', params);
        return {
          id: 'pi_mock_' + Date.now(),
          client_secret: 'pi_mock_' + Date.now() + '_secret_mock',
          amount: params.amount,
          currency: params.currency,
          status: 'requires_payment_method',
          created: Math.floor(Date.now() / 1000),
          metadata: params.metadata || {}
        };
      },
      
      retrieve: async (paymentIntentId) => {
        console.log('Mock Stripe: Retrieving payment intent', paymentIntentId);
        return {
          id: paymentIntentId,
          status: 'succeeded',
          amount: 1900,
          currency: 'usd',
          created: Math.floor(Date.now() / 1000)
        };
      },
      
      confirm: async (paymentIntentId, params) => {
        console.log('Mock Stripe: Confirming payment intent', paymentIntentId, params);
        return {
          id: paymentIntentId,
          status: 'succeeded',
          amount: 1900,
          currency: 'usd',
          created: Math.floor(Date.now() / 1000)
        };
      }
    },
    
    customers: {
      create: async (params) => {
        console.log('Mock Stripe: Creating customer', params);
        return {
          id: 'cus_mock_' + Date.now(),
          email: params.email,
          name: params.name,
          created: Math.floor(Date.now() / 1000)
        };
      }
    },
    
    webhooks: {
      constructEvent: (payload, sig, secret) => {
        console.log('Mock Stripe: Constructing webhook event');
        return {
          id: 'evt_mock_' + Date.now(),
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_mock_123',
              status: 'succeeded',
              amount: 3900
            }
          }
        };
      }
    }
  };
}

/**
 * Create a payment intent for speech generation
 */
async function createPaymentIntent({
  amount = 3900, // $39.00 in cents
  currency = 'usd',
  userId,
  speechData,
  customerEmail
}) {
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency,
      metadata: {
        userId: userId || 'guest',
        speechOccasion: speechData?.occasion || 'unknown',
        speechStyle: speechData?.style || 'unknown',
        customerEmail: customerEmail || 'unknown'
      },
      description: 'AI-Generated Personalized Speech'
    });

    return paymentIntent;
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    throw error;
  }
}

/**
 * Verify a payment intent
 */
async function verifyPaymentIntent(paymentIntentId) {
  try {
    const paymentIntent = await stripeClient.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Stripe payment verification error:', error);
    throw error;
  }
}

/**
 * Create a customer
 */
async function createCustomer({ email, name, userId }) {
  try {
    const customer = await stripeClient.customers.create({
      email,
      name,
      metadata: {
        userId: userId || 'guest'
      }
    });

    return customer;
  } catch (error) {
    console.error('Stripe customer creation error:', error);
    throw error;
  }
}

/**
 * Handle webhook events
 */
function constructWebhookEvent(payload, signature, secret) {
  try {
    const event = stripeClient.webhooks.constructEvent(payload, signature, secret);
    return event;
  } catch (error) {
    console.error('Stripe webhook verification error:', error);
    throw error;
  }
}

/**
 * Get publishable key for frontend
 */
function getPublishableKey() {
  return process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_mock_key';
}

module.exports = {
  stripe: stripeClient,
  createPaymentIntent,
  verifyPaymentIntent,
  createCustomer,
  constructWebhookEvent,
  getPublishableKey
};
