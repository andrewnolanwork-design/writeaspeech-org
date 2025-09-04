import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PricingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Pricing - writeaspeech.org | AI Speech Writing for $19</title>
        <meta name="description" content="Create perfect speeches with AI for just $19. One-time payment, lifetime access to all features. No subscriptions, no hidden fees. 30-day money-back guarantee." />
        <meta name="keywords" content="speech writing, AI speechwriter, wedding speech, presentation writing, public speaking, speech generator, affordable speech writing" />
        <meta property="og:title" content="Pricing - writeaspeech.org | AI Speech Writing for $19" />
        <meta property="og:description" content="Create perfect speeches with AI for just $19. One-time payment, lifetime access to all features." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing - writeaspeech.org | AI Speech Writing for $19" />
        <meta name="twitter:description" content="Create perfect speeches with AI for just $19. One-time payment, lifetime access to all features." />
        <link rel="canonical" href="https://writeaspeech.org/pricing" />
      </head>

      <div className="pricing-page">
        <div className="pricing-container">
          {/* Hero Section */}
          <section className={`pricing-hero ${isVisible ? 'animate-in' : ''}`}>
            <div className="pricing-hero-content">
              <span className="pricing-badge">💰 Simple Pricing</span>
              <h1 className="pricing-hero-title">
                One Price. <span className="highlight-text">Everything Included.</span>
              </h1>
              <p className="pricing-hero-subtitle">
                No subscriptions, no tiers, no hidden fees. Just one simple payment for lifetime access to all features.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Speeches Created</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30 Days</span>
                  <span className="stat-label">Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Pricing Card */}
          <section className={`pricing-main ${isVisible ? 'animate-in-delay' : ''}`}>
            <div className="pricing-card-container">
              <div className="pricing-card-modern">
                <div className="pricing-card-header">
                  <div className="popular-badge">
                    <span className="badge-icon">⭐</span>
                    <span>Most Popular</span>
                  </div>
                  <div className="pricing-icon">
                    <div className="speech-graphic">🎤</div>
                  </div>
                  <h2 className="package-title">Complete Speech Package</h2>
                  <p className="package-subtitle">Everything you need for the perfect speech</p>
                </div>

                <div className="pricing-amount">
                  <div className="price-display">
                    <span className="currency">$</span>
                    <span className="amount">19</span>
                    <div className="price-details">
                      <span className="period">one-time payment</span>
                      <span className="savings">Save $480+ vs traditional writers</span>
                    </div>
                  </div>
                </div>

                <div className="features-grid">
                  <div className="feature-category">
                    <h4 className="category-title">🤖 AI-Powered Writing</h4>
                    <div className="feature-list">
                      <div className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>Personalized speech generation</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>4 unique styles (witty, formal, heartfelt, inspiring)</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>Unlimited revisions & editing</span>
                      </div>
                    </div>
                  </div>

                  <div className="feature-category">
                    <h4 className="category-title">🎯 Practice Tools</h4>
                    <div className="feature-list">
                      <div className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>Interactive teleprompter</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>Pacing analysis & timing tools</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>Audio recording & playback</span>
                      </div>
                    </div>
                  </div>

                  <div className="feature-category">
                    <h4 className="category-title">📄 Export & Share</h4>
                    <div className="feature-list">
                      <div className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>PDF, text & cue card formats</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>Print-ready layouts</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>Lifetime access to all content</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pricing-cta-section">
                  <Link to="/builder" className="cta-button-modern">
                    <span className="cta-text">Start Creating My Speech</span>
                    <span className="cta-arrow">→</span>
                  </Link>
                  <div className="guarantee-badge">
                    <span className="guarantee-icon">🛡️</span>
                    <span className="guarantee-text">30-day money-back guarantee</span>
                  </div>
                  <div className="payment-security">
                    <span className="security-text">Secure payment by</span>
                    <div className="payment-icons">
                      <span className="payment-brand">Stripe</span>
                    </div>
                  </div>
                </div>
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

          {/* Comparison Table */}
          <section className={`comparison-section ${isVisible ? 'animate-in-delay-2' : ''}`}>
            <div className="comparison-header-text">
              <h2 className="comparison-title">See How We Compare</h2>
              <p className="comparison-subtitle">
                Why choose writeaspeech.org over traditional speechwriters and other options?
              </p>
            </div>

            <div className="comparison-table-modern">
              <div className="table-container">
                <table className="comparison-table">
                  <thead>
                    <tr className="table-header">
                      <th className="feature-column">
                        <span className="column-title">Features</span>
                      </th>
                      <th className="writeaspeech-column highlighted">
                        <div className="column-header">
                          <div className="logo-badge">
                            <span className="logo-icon">🎤</span>
                            <span className="brand-name">writeaspeech.org</span>
                          </div>
                          <div className="best-value-badge">Best Value</div>
                        </div>
                      </th>
                      <th className="traditional-column">
                        <div className="column-header">
                          <span className="service-name">Traditional Writer</span>
                          <span className="service-price">$200-500+</span>
                        </div>
                      </th>
                      <th className="diy-column">
                        <div className="column-header">
                          <span className="service-name">DIY Writing</span>
                          <span className="service-price">Free (but costly)</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-row">
                      <td className="feature-name">
                        <span className="feature-icon">💰</span>
                        <span>Cost</span>
                      </td>
                      <td className="writeaspeech-cell highlighted">
                        <div className="cell-content winner">
                          <span className="value">$19 one-time</span>
                          <span className="badge">Best Deal</span>
                        </div>
                      </td>
                      <td className="traditional-cell">
                        <div className="cell-content">
                          <span className="value expensive">$200-500+ per speech</span>
                        </div>
                      </td>
                      <td className="diy-cell">
                        <div className="cell-content">
                          <span className="value">Free (time cost high)</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="table-row">
                      <td className="feature-name">
                        <span className="feature-icon">⚡</span>
                        <span>Delivery Time</span>
                      </td>
                      <td className="writeaspeech-cell highlighted">
                        <div className="cell-content winner">
                          <span className="value">Instant</span>
                          <span className="badge">Fastest</span>
                        </div>
                      </td>
                      <td className="traditional-cell">
                        <div className="cell-content">
                          <span className="value">3-7 days</span>
                        </div>
                      </td>
                      <td className="diy-cell">
                        <div className="cell-content">
                          <span className="value">Hours to weeks</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="table-row">
                      <td className="feature-name">
                        <span className="feature-icon">🔄</span>
                        <span>Revisions</span>
                      </td>
                      <td className="writeaspeech-cell highlighted">
                        <div className="cell-content winner">
                          <span className="value">Unlimited</span>
                          <span className="badge">No Limits</span>
                        </div>
                      </td>
                      <td className="traditional-cell">
                        <div className="cell-content">
                          <span className="value">2-3 rounds</span>
                        </div>
                      </td>
                      <td className="diy-cell">
                        <div className="cell-content">
                          <span className="value">Self-managed</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="table-row">
                      <td className="feature-name">
                        <span className="feature-icon">🎯</span>
                        <span>Practice Tools</span>
                      </td>
                      <td className="writeaspeech-cell highlighted">
                        <div className="cell-content winner">
                          <span className="value">Full Toolkit</span>
                          <span className="badge">Complete</span>
                        </div>
                      </td>
                      <td className="traditional-cell">
                        <div className="cell-content">
                          <span className="value not-included">Not included</span>
                        </div>
                      </td>
                      <td className="diy-cell">
                        <div className="cell-content">
                          <span className="value not-included">None</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="table-row">
                      <td className="feature-name">
                        <span className="feature-icon">📄</span>
                        <span>Export Formats</span>
                      </td>
                      <td className="writeaspeech-cell highlighted">
                        <div className="cell-content winner">
                          <span className="value">PDF, Text, Cue Cards</span>
                          <span className="badge">3 Formats</span>
                        </div>
                      </td>
                      <td className="traditional-cell">
                        <div className="cell-content">
                          <span className="value">Text/Word only</span>
                        </div>
                      </td>
                      <td className="diy-cell">
                        <div className="cell-content">
                          <span className="value">Manual formatting</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="table-row">
                      <td className="feature-name">
                        <span className="feature-icon">🛡️</span>
                        <span>Guarantee</span>
                      </td>
                      <td className="writeaspeech-cell highlighted">
                        <div className="cell-content winner">
                          <span className="value">30-day money-back</span>
                          <span className="badge">Risk-Free</span>
                        </div>
                      </td>
                      <td className="traditional-cell">
                        <div className="cell-content">
                          <span className="value">Varies</span>
                        </div>
                      </td>
                      <td className="diy-cell">
                        <div className="cell-content">
                          <span className="value not-included">No guarantee</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="comparison-cta">
              <div className="cta-content">
                <h3>Ready to experience the difference?</h3>
                <p>Join thousands who chose the smarter way to write speeches</p>
                <Link to="/builder" className="comparison-cta-button">
                  Get Started for $19 →
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={`faq-section ${isVisible ? 'animate-in-delay-3' : ''}`}>
            <div className="faq-header">
              <h2 className="faq-title">Frequently Asked Questions</h2>
              <p className="faq-subtitle">Everything you need to know about our pricing and service</p>
            </div>
            
            <div className="faq-grid">
              <div className="faq-item-modern">
                <div className="faq-icon">💳</div>
                <h3 className="faq-question">Is this really a one-time payment?</h3>
                <p className="faq-answer">Yes! You pay $19 once and get lifetime access to all features. No monthly subscriptions or recurring charges.</p>
              </div>
              <div className="faq-item-modern">
                <div className="faq-icon">🔄</div>
                <h3 className="faq-question">Can I create multiple speeches?</h3>
                <p className="faq-answer">Absolutely! Your one-time payment gives you access to create unlimited speeches for any occasion, anytime.</p>
              </div>
              <div className="faq-item-modern">
                <div className="faq-icon">🛡️</div>
                <h3 className="faq-question">What's your refund policy?</h3>
                <p className="faq-answer">We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll provide a full refund, no questions asked.</p>
              </div>
              <div className="faq-item-modern">
                <div className="faq-icon">💎</div>
                <h3 className="faq-question">What payment methods do you accept?</h3>
                <p className="faq-answer">We accept all major credit cards, PayPal, and other secure payment methods through Stripe for your convenience.</p>
              </div>
              <div className="faq-item-modern">
                <div className="faq-icon">⚡</div>
                <h3 className="faq-question">How quickly can I get my speech?</h3>
                <p className="faq-answer">Instantly! Our AI generates your personalized speech in seconds. You can start practicing and refining immediately.</p>
              </div>
              <div className="faq-item-modern">
                <div className="faq-icon">🎯</div>
                <h3 className="faq-question">What if I need help or support?</h3>
                <p className="faq-answer">We provide unlimited revisions and support. Our team is here to ensure you get the perfect speech for your occasion.</p>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className={`final-cta-section ${isVisible ? 'animate-in-delay-4' : ''}`}>
            <div className="final-cta-container">
              <div className="cta-background">
                <div className="cta-content-modern">
                  <div className="cta-badge">🚀 Ready to Get Started?</div>
                  <h2 className="cta-title">Create Your Perfect Speech Today</h2>
                  <p className="cta-description">
                    Join over 10,000 satisfied customers who chose the smart way to write memorable speeches. 
                    Get started in seconds with our one-time payment.
                  </p>
                  
                  <div className="cta-buttons-modern">
                    <Link to="/builder" className="primary-cta-button">
                      <span className="cta-button-text">Start Creating My Speech</span>
                      <span className="cta-button-price">Only $19</span>
                    </Link>
                    <Link to="/help" className="secondary-cta-button">
                      <span className="help-icon">💬</span>
                      <span>Have Questions?</span>
                    </Link>
                  </div>

                  <div className="cta-guarantees">
                    <div className="guarantee-item">
                      <span className="guarantee-icon">⚡</span>
                      <span>Instant Access</span>
                    </div>
                    <div className="guarantee-item">
                      <span className="guarantee-icon">🛡️</span>
                      <span>30-Day Guarantee</span>
                    </div>
                    <div className="guarantee-item">
                      <span className="guarantee-icon">🔒</span>
                      <span>Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
