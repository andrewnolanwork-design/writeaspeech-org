import React, { useState, useEffect } from 'react';
import { createPaymentIntent, confirmPayment } from '../../api/payment';
import type { SpeechData } from '../../api/speech';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  speechData: SpeechData;
  userId?: string;
  onSuccess: (speechId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  speechData,
  userId,
  onSuccess
}) => {
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      initializePayment();
    }
  }, [isOpen]);

  const initializePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await createPaymentIntent(speechData, userId);
      setPaymentIntent(response.paymentIntent);
    } catch (error: any) {
      setError(error.message || 'Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentIntent) return;
    
    setProcessing(true);
    setError(null);

    try {
      // For demo purposes, we'll simulate payment success with test cards
      if (cardNumber.replace(/\s/g, '') === '4242424242424242') {
        // Simulate successful payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const confirmation = await confirmPayment(paymentIntent.id, speechData, userId);
        
        alert(`Payment successful! Your speech is being generated.
        
Order ID: ${confirmation.order.id}
Amount: $${confirmation.payment.amount / 100}

You will be redirected to view your speech.`);
        
        onSuccess(confirmation.speech.id);
      } else {
        throw new Error('Please use test card number: 4242 4242 4242 4242');
      }
    } catch (error: any) {
      setError(error.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  console.log('💳 PaymentModal render - isOpen:', isOpen);
  
  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-header">
          <h2>Complete Your Payment</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="payment-content">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>AI-Generated Speech</span>
              <span>$19.00</span>
            </div>
            <div className="summary-item">
              <span>Occasion: {speechData.occasion}</span>
            </div>
            <div className="summary-item">
              <span>Style: {speechData.style}</span>
            </div>
            <div className="summary-total">
              <span>Total: $19.00</span>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Initializing payment...</p>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="payment-form">
              <div className="test-info">
                <p><strong>Test Mode:</strong> Use card number <code>4242 4242 4242 4242</code></p>
                <p>Any future date and any 3-digit CVC</p>
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-large"
                disabled={processing || !paymentIntent}
              >
                {processing ? 'Processing...' : `Pay $19.00`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
