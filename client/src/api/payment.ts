import { apiGet, apiPost } from './config';
import type { SpeechData } from './speech';

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentConfig {
  publishableKey: string;
  currency: string;
  amount: number;
  productName: string;
  description: string;
}

export interface PaymentIntentResponse {
  paymentIntent: PaymentIntent;
  publishableKey: string;
}

export interface PaymentConfirmationResponse {
  message: string;
  payment: {
    id: string;
    status: string;
    amount: number;
    currency: string;
    created: number;
  };
  order: {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
  };
  speech: {
    id: string;
    status: string;
    message: string;
  };
}

export interface Order {
  id: string;
  amount: number;
  currency: string;
  status: string;
  speechTitle: string;
  createdAt: string;
}

export interface OrderHistoryResponse {
  orders: Order[];
}

// Create a payment intent for speech generation
export async function createPaymentIntent(
  speechData: SpeechData,
  userId?: string
): Promise<PaymentIntentResponse> {
  console.log('🔍 createPaymentIntent called with:', { speechData, userId });
  
  // Validate speechData before sending
  if (!speechData || typeof speechData !== 'object') {
    throw new Error('Invalid speech data provided');
  }
  
  if (!speechData.occasion || !speechData.style || !speechData.length || !speechData.audience) {
    throw new Error('Missing required speech data fields');
  }
  
  const payload = {
    speechData,
    userId,
  };
  
  console.log('📤 Sending payload to backend:', JSON.stringify(payload, null, 2));
  
  return apiPost<PaymentIntentResponse>('/payment/create-payment-intent', payload);
}

// Confirm payment after successful Stripe processing
export async function confirmPayment(
  paymentIntentId: string,
  speechData: SpeechData,
  userId?: string
): Promise<PaymentConfirmationResponse> {
  return apiPost<PaymentConfirmationResponse>('/payment/confirm-payment', {
    paymentIntentId,
    speechData,
    userId,
  });
}

// Get payment configuration
export async function getPaymentConfig(): Promise<PaymentConfig> {
  return apiGet<PaymentConfig>('/payment/config');
}

// Get order history for a user
export async function getOrderHistory(userId: string): Promise<OrderHistoryResponse> {
  return apiGet<OrderHistoryResponse>(`/payment/orders/${userId}`);
}

// Format price for display
export function formatPrice(amountInCents: number, currency: string = 'usd'): string {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
