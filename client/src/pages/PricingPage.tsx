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
        <title>Pricing Plans - writeaspeech.org | Free Trial, Pay-Per-Speech & Monthly Plans</title>
        <meta name="description" content="Flexible AI speech writing pricing: Free trial, pay-per-speech $19, or monthly subscription $9.99. Choose the perfect plan for your needs." />
        <meta name="keywords" content="speech writing pricing, AI speechwriter plans, free trial speech, pay per speech, monthly speech subscription" />
        <meta property="og:title" content="Pricing Plans - writeaspeech.org | Free Trial, Pay-Per-Speech & Monthly Plans" />
        <meta property="og:description" content="Flexible AI speech writing pricing: Free trial, pay-per-speech $19, or monthly subscription $9.99." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing Plans - writeaspeech.org | Free Trial, Pay-Per-Speech & Monthly Plans" />
        <meta name="twitter:description" content="Flexible AI speech writing pricing: Free trial, pay-per-speech $19, or monthly subscription $9.99." />
        <link rel="canonical" href="https://writeaspeech.org/pricing" />
      </head>

      <div className="pricing-page">
        <div className="pricing-container">
          {/* Hero Section */}
          <section className={`pricing-hero ${isVisible ? 'animate-in' : ''}`}>
            <div className="pricing-hero-content">
              <span className="pricing-badge">💰 Flexible Pricing</span>
              <h1 className="pricing-hero-title">
                Choose Your <span className="highlight-text">Perfect Plan</span>
              </h1>
              <p className="pricing-hero-subtitle">
                From free trials to premium features - we have the right option for every speaker and every budget.
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
                  <span className="stat-number">3 Plans</span>
                  <span className="stat-label">Perfect Options</span>
                </div>
              </div>
            </div>
          </section>

          {/* Three-Tier Pricing Section */}
          <section className={`pricing-tiers ${isVisible ? 'animate-in-delay' : ''}`}>
            <div className="pricing-tiers-container">
              
              {/* Tier 1: Free Trial */}
              <div className="pricing-tier-card free-tier">
                <div className="tier-header">
                  <div className="tier-badge free">
                    <span className="badge-icon">🎁</span>
                    <span>Perfect to Try</span>
                  </div>
                  <div className="tier-icon">
                    <div className="speech-graphic">✨</div>
                  </div>
                  <h2 className="tier-title">Free Trial</h2>
                  <p className="tier-subtitle">Experience the magic with no commitment</p>
                </div>

                <div className="tier-pricing">
                  <div className="price-display">
                    <span className="currency">$</span>
                    <span className="amount">0</span>
                    <div className="price-details">
                      <span className="period">completely free</span>
                      <span className="limitations">300 words max, watermark</span>
                    </div>
                  </div>
                </div>

                <div className="tier-features">
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Short speech generation (under 300 words)</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>All 4 speech styles available</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Basic teleprompter access</span>
                  </div>
                  <div className="feature-item limited">
                    <span className="feature-check">⚠️</span>
                    <span>Watermarked output</span>
                  </div>
                  <div className="feature-item limited">
                    <span className="feature-check">⚠️</span>
                    <span>Limited export options</span>
                  </div>
                </div>

                <div className="tier-cta">
                  <Link to="/builder?plan=free" className="cta-button free">
                    <span className="cta-text">Start Free Trial</span>
                    <span className="cta-arrow">→</span>
                  </Link>
                  <p className="cta-note">No credit card required</p>
                </div>
              </div>

              {/* Tier 2: Pay-Per-Speech */}
              <div className="pricing-tier-card premium-tier popular">
                <div className="tier-header">
                  <div className="tier-badge premium">
                    <span className="badge-icon">⭐</span>
                    <span>Most Popular</span>
                  </div>
                  <div className="tier-icon">
                    <div className="speech-graphic">💍</div>
                  </div>
                  <h2 className="tier-title">Pay-Per-Speech</h2>
                  <p className="tier-subtitle">Perfect for that one important moment</p>
                </div>

                <div className="tier-pricing">
                  <div className="price-display">
                    <span className="currency">$</span>
                    <span className="amount">19</span>
                    <div className="price-details">
                      <span className="period">per speech</span>
                      <span className="savings">Save $480+ vs professional writers</span>
                    </div>
                  </div>
                </div>

                <div className="tier-features">
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Complete unlimited-length speech</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>All 4 speech styles + tone adjustment</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Unlimited revisions</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Full practice toolkit</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>All export formats (PDF, text, cue cards)</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Priority support</span>
                  </div>
                </div>

                <div className="tier-cta">
                  <Link to="/builder?plan=premium" className="cta-button premium">
                    <span className="cta-text">Perfect My Speech</span>
                    <span className="cta-arrow">→</span>
                  </Link>
                  <p className="cta-note">30-day money-back guarantee</p>
                </div>
              </div>

              {/* Tier 3: Monthly Subscription */}
              <div className="pricing-tier-card subscription-tier">
                <div className="tier-header">
                  <div className="tier-badge subscription">
                    <span className="badge-icon">💼</span>
                    <span>Best Value</span>
                  </div>
                  <div className="tier-icon">
                    <div className="speech-graphic">🚀</div>
                  </div>
                  <h2 className="tier-title">Monthly Subscription</h2>
                  <p className="tier-subtitle">For regular speakers who need more</p>
                </div>

                <div className="tier-pricing">
                  <div className="price-display">
                    <span className="currency">$</span>
                    <span className="amount">9.99</span>
                    <div className="price-details">
                      <span className="period">per month</span>
                      <span className="savings">Up to 5 speeches monthly</span>
                    </div>
                  </div>
                </div>

                <div className="tier-features">
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>5 complete speeches per month</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>All premium features included</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Speech library & saved templates</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Advanced practice analytics</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Priority customer support</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Cancel anytime</span>
                  </div>
                </div>

                <div className="tier-cta">
                  <Link to="/builder?plan=subscription" className="cta-button subscription">
                    <span className="cta-text">Start Subscription</span>
                    <span className="cta-arrow">→</span>
                  </Link>
                  <p className="cta-note">Cancel anytime, 30-day guarantee</p>
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
                          <div className="best-value-badge">3 Great Options</div>
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
                          <span className="value">Free to $19</span>
                          <span className="badge">Flexible Options</span>
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
                  Start Free Trial →
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
                <div className="faq-icon">🎁</div>
                <h3 className="faq-question">What's included in the free trial?</h3>
                <p className="faq-answer">You can create one short speech (under 300 words) with all our speech styles. Perfect to experience our AI quality before upgrading!</p>
              </div>
              <div className="faq-item-modern">
                <div className="faq-icon">💍</div>
                <h3 className="faq-question">When should I choose pay-per-speech?</h3>
                <p className="faq-answer">Perfect for important one-time events like weddings, graduations, or eulogies where you need a premium, full-length speech with unlimited revisions.</p>
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
                <div className="faq-icon">💼</div>
                <h3 className="faq-question">Who should choose the monthly subscription?</h3>
                <p className="faq-answer">Ideal for professionals, students, or anyone who regularly gives speeches. Get 5 complete speeches monthly - perfect for sales professionals, managers, or frequent speakers.</p>
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
                    <Link to="/builder?plan=free" className="primary-cta-button">
                      <span className="cta-button-text">Start Free Trial</span>
                      <span className="cta-button-price">$0 to try</span>
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
