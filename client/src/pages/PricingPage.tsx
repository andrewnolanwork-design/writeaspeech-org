import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="container">
        {/* Header Section */}
        <section className="pricing-header">
          <h1 className="page-title">Simple, Transparent Pricing</h1>
          <p className="page-subtitle">
            One-time payment for complete access to all features. No subscriptions, no hidden fees.
          </p>
        </section>

        {/* Main Pricing Card */}
        <section className="pricing-main">
          <div className="pricing-card featured">
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-header">
              <h2>Complete Speech Package</h2>
              <div className="pricing-price">
                <span className="price">$19</span>
                <span className="period">one-time</span>
              </div>
              <p className="pricing-description">
                Everything you need to create, practice, and deliver the perfect speech
              </p>
            </div>
            
            <div className="pricing-features">
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <span>AI-powered personalized speech generation</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <span>Multiple speech styles (witty, formal, heartfelt, inspiring)</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <span>Interactive teleprompter for practice</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <span>Pacing analysis and timing tools</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <span>Audio recording and playback</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <span>Multiple export formats (PDF, text, cue cards)</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <span>Unlimited speech revisions</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <span>Lifetime access to all tools</span>
              </div>
            </div>

            <div className="pricing-cta">
              <Link to="/builder" className="btn btn-primary btn-large">
                Start Creating My Speech
              </Link>
              <p className="pricing-guarantee">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="pricing-value">
          <h2>Why Choose Our Pricing?</h2>
          <div className="value-grid">
            <div className="value-item">
              <div className="value-icon">💰</div>
              <h3>No Hidden Costs</h3>
              <p>What you see is what you pay. No monthly fees, no surprise charges, no premium tiers.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🔄</div>
              <h3>Unlimited Revisions</h3>
              <p>Not satisfied? We'll help you refine your speech until it's perfect for your occasion.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">⚡</div>
              <h3>Instant Access</h3>
              <p>Get started immediately after payment. No waiting, no approval process.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🛡️</div>
              <h3>Money-Back Guarantee</h3>
              <p>If you're not completely satisfied, we'll refund your payment within 30 days.</p>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="pricing-comparison">
          <h2>Compare with Traditional Options</h2>
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="comparison-feature">Feature</div>
              <div className="comparison-writeaspeech">writeaspeech.org</div>
              <div className="comparison-traditional">Traditional Speech Writer</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-feature">Cost</div>
              <div className="comparison-writeaspeech">$19 one-time</div>
              <div className="comparison-traditional">$200-500+ per speech</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-feature">Turnaround Time</div>
              <div className="comparison-writeaspeech">Instant</div>
              <div className="comparison-traditional">3-7 days</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-feature">Revisions</div>
              <div className="comparison-writeaspeech">Unlimited</div>
              <div className="comparison-traditional">2-3 rounds</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-feature">Practice Tools</div>
              <div className="comparison-writeaspeech">Included</div>
              <div className="comparison-traditional">Not included</div>
            </div>
            <div className="comparison-row">
              <div className="comparison-feature">Multiple Formats</div>
              <div className="comparison-writeaspeech">PDF, Text, Cue Cards</div>
              <div className="comparison-traditional">Text only</div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pricing-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>Is this really a one-time payment?</h3>
              <p>Yes! You pay $19 once and get lifetime access to all features. No monthly subscriptions or recurring charges.</p>
            </div>
            <div className="faq-item">
              <h3>What if I need help with my speech?</h3>
              <p>We provide unlimited revisions and support. If you're not happy with your speech, we'll work with you to make it perfect.</p>
            </div>
            <div className="faq-item">
              <h3>Can I use this for multiple speeches?</h3>
              <p>Absolutely! Your one-time payment gives you access to create unlimited speeches for any occasion.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, PayPal, and other secure payment methods through Stripe.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a money-back guarantee?</h3>
              <p>Yes! If you're not completely satisfied within 30 days, we'll provide a full refund, no questions asked.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pricing-cta-section">
          <div className="cta-content">
            <h2>Ready to Create Your Perfect Speech?</h2>
            <p>Join thousands of satisfied customers who've delivered memorable speeches with confidence.</p>
            <div className="cta-buttons">
              <Link to="/builder" className="btn btn-primary btn-large">
                Get Started Now - $19
              </Link>
              <Link to="/help" className="btn btn-secondary">
                Have Questions? Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingPage;
