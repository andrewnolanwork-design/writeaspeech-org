import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RefundPolicyPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Refund Policy - writeaspeech.org | Fair & Transparent Refund Terms</title>
        <meta name="description" content="Our transparent refund policy for writeaspeech.org. Learn about refund eligibility for pay-per-speech and subscription plans, plus our satisfaction guarantee." />
        <meta name="keywords" content="refund policy, writeaspeech refund, speech writing refund, satisfaction guarantee, pay per speech refund" />
        <meta property="og:title" content="Refund Policy - writeaspeech.org | Fair & Transparent Refund Terms" />
        <meta property="og:description" content="Our transparent refund policy designed to be fair to everyone while ensuring you get value for your investment." />
        <link rel="canonical" href="https://writeaspeech.org/refund" />
      </head>

      <div className="legal-page">
        <div className="legal-container">
          {/* Hero Section */}
          <section className={`legal-hero ${isVisible ? 'animate-in' : ''}`}>
            <div className="legal-hero-content">
              <div className="legal-badge">
                <span className="badge-icon">💰</span>
                <span>Refund Policy</span>
              </div>
              <h1 className="legal-hero-title">
                Fair & <span className="highlight-text">transparent</span> refunds
              </h1>
              <p className="legal-hero-subtitle">
                Our goal is for you to be delighted with the speech our AI helps you create. 
                This policy is designed to be transparent and fair to everyone, ensuring you get 
                the value you paid for while protecting our service from misuse.
              </p>
              <div className="legal-meta">
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>Last updated: December 2024</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⚖️</span>
                  <span>Fair & Balanced</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">🛡️</span>
                  <span>Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Navigation */}
          <section className={`legal-navigation ${isVisible ? 'animate-in-delay' : ''}`}>
            <div className="legal-nav-container">
              <h3 className="nav-title">Legal Pages</h3>
              <div className="legal-nav-links">
                <Link to="/privacy" className="nav-link">
                  <span className="nav-icon">🔒</span>
                  <span>Privacy Policy</span>
                </Link>
                <Link to="/terms" className="nav-link">
                  <span className="nav-icon">📋</span>
                  <span>Terms of Service</span>
                </Link>
                <Link to="/refund" className="nav-link active">
                  <span className="nav-icon">💰</span>
                  <span>Refund Policy</span>
                </Link>
              </div>
            </div>
          </section>

          <div className="legal-content-wrapper">
            {/* Sidebar */}
            <aside className={`table-of-contents ${isVisible ? 'animate-in-delay-2' : ''}`}>
              <div className="toc-container">
                <h3 className="toc-title">Quick Navigation</h3>
                <div className="refund-summary">
                  <div className="summary-item">
                    <span className="summary-icon">💳</span>
                    <span>Pay-per-speech: Limited refunds</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">📅</span>
                    <span>Monthly: Cancel anytime</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">🔄</span>
                    <span>Annual: 14-day window</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">✨</span>
                    <span>Satisfaction guarantee</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className={`legal-main-content ${isVisible ? 'animate-in-delay-3' : ''}`}>
              
              {/* Pay-Per-Speech Section */}
              <section className="legal-section">
                <div className="section-header">
                  <div className="section-icon">💳</div>
                  <div className="section-title-content">
                    <h2>Pay-Per-Speech Refunds ($19)</h2>
                    <p>For single speech purchases, refunds are limited to specific technical circumstances.</p>
                  </div>
                </div>

                <div className="refund-policy-grid">
                  <div className="policy-card refund-yes">
                    <div className="card-header">
                      <div className="card-icon">✅</div>
                      <h3>Refunds ARE Issued For:</h3>
                    </div>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span><strong>Complete Technical Failure:</strong> If our system accepts your payment but fails to generate or deliver your speech</li>
                      <li><span className="list-icon">✓</span><strong>Fundamentally Unusable Output:</strong> If the generated speech is complete nonsense or contradicts your prompt (e.g., you ask for a groom named Tom, it writes about bride Sarah)</li>
                      <li><span className="list-icon">✓</span><strong>Accidental Duplicate Purchase:</strong> If you are accidentally charged twice for the same speech</li>
                    </ul>
                    <div className="policy-note">
                      <strong>Note:</strong> Evidence of the generated text must be provided for unusable output claims.
                    </div>
                  </div>

                  <div className="policy-card refund-no">
                    <div className="card-header">
                      <div className="card-icon">❌</div>
                      <h3>Refunds Are NOT Issued For:</h3>
                    </div>
                    <ul className="feature-list">
                      <li><span className="list-icon">✗</span><strong>Subjective Dissatisfaction:</strong> "Not funny enough," personal taste, or simply changing your mind</li>
                      <li><span className="list-icon">✗</span><strong>Event Cancellation:</strong> If your wedding, presentation, or event is cancelled or postponed</li>
                      <li><span className="list-icon">✗</span><strong>Post-Download Change of Mind:</strong> Once the final speech is generated and made available to you</li>
                    </ul>
                    <div className="policy-note">
                      <strong>Important:</strong> You waive your 14-day right to cancel during checkout. We offer a free trial to demonstrate quality beforehand.
                    </div>
                  </div>
                </div>
              </section>

              {/* Subscription Section */}
              <section className="legal-section">
                <div className="section-header">
                  <div className="section-icon">📅</div>
                  <div className="section-title-content">
                    <h2>Subscription Plan Refunds</h2>
                    <p>Standard SaaS practices apply to our monthly and annual subscription plans.</p>
                  </div>
                </div>

                <div className="subscription-policies">
                  <div className="subscription-card">
                    <div className="subscription-header">
                      <h3>📱 Monthly Subscription ($9.99/month)</h3>
                    </div>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span>Cancel anytime to stop future payments</li>
                      <li><span className="list-icon">✓</span>Access continues until end of current billing period</li>
                      <li><span className="list-icon">✗</span>No pro-rated refunds for partial months</li>
                    </ul>
                  </div>

                  <div className="subscription-card">
                    <div className="subscription-header">
                      <h3>📆 Annual Subscription</h3>
                    </div>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span><strong>14-day full refund window</strong> from initial purchase</li>
                      <li><span className="list-icon">✓</span>Provided you haven't used the service excessively (max 2-3 speeches)</li>
                      <li><span className="list-icon">✗</span>No pro-rated refunds after 14-day period</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Satisfaction Guarantee Section */}
              <section className="legal-section">
                <div className="section-header">
                  <div className="section-icon">✨</div>
                  <div className="section-title-content">
                    <h2>Our Satisfaction Guarantee</h2>
                    <p>Instead of cash refunds, we offer solutions to ensure you get a speech you love.</p>
                  </div>
                </div>

                <div className="satisfaction-showcase">
                  <div className="satisfaction-card featured">
                    <div className="satisfaction-icon">🔄</div>
                    <h3>Free Re-generation Credits</h3>
                    <p>If you're unhappy with your speech for subjective reasons (tone wasn't quite right, etc.), we'll immediately offer you 1-2 credits to re-run the AI with different prompts at no extra cost.</p>
                  </div>
                  
                  <div className="satisfaction-card">
                    <div className="satisfaction-icon">👨‍💼</div>
                    <h3>Human Assistance</h3>
                    <p>For premium-tier customers, we offer a quick review by a support agent who can help you refine your prompts for a better result.</p>
                  </div>
                </div>

                <div className="guarantee-benefit">
                  <p><strong>Why this works:</strong> This approach turns a negative experience into a positive one, builds customer loyalty, and often solves the problem without needing a cash refund.</p>
                </div>
              </section>

              {/* Summary Table */}
              <section className="legal-section">
                <div className="section-header">
                  <div className="section-icon">📊</div>
                  <div className="section-title-content">
                    <h2>Refund Policy Summary</h2>
                    <p>Quick reference for all our refund policies.</p>
                  </div>
                </div>

                <div className="refund-table-container">
                  <table className="refund-summary-table">
                    <thead>
                      <tr>
                        <th>Product Type</th>
                        <th>Refundable?</th>
                        <th>Conditions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Pay-Per-Speech</strong></td>
                        <td><span className="refund-status limited">Limited</span></td>
                        <td>Only for complete technical failure or fundamentally unusable output. User must waive 14-day cooling-off period before generation.</td>
                      </tr>
                      <tr>
                        <td><strong>Monthly Subscription</strong></td>
                        <td><span className="refund-status no">No</span></td>
                        <td>Cancel anytime to stop future payments. No refunds for current billing period.</td>
                      </tr>
                      <tr>
                        <td><strong>Annual Subscription</strong></td>
                        <td><span className="refund-status yes">Yes, within 14 days</span></td>
                        <td>Full refund available within 14 days of initial purchase, provided service usage is low. No pro-rated refunds after 14 days.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* How to Request Section */}
              <section className="legal-section">
                <div className="section-header">
                  <div className="section-icon">📧</div>
                  <div className="section-title-content">
                    <h2>How to Request a Refund</h2>
                    <p>For eligible refund requests, here's how to proceed.</p>
                  </div>
                </div>

                <div className="refund-process">
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Contact Support</h4>
                      <p>Email us at <a href="mailto:refunds@writeaspeech.org" className="contact-link">refunds@writeaspeech.org</a> with your refund request and relevant details</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Review Process</h4>
                      <p>We'll review your request against our policy criteria within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Resolution</h4>
                      <p>Eligible refunds processed within 5-10 business days. Otherwise, we'll offer our satisfaction guarantee alternatives</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="legal-section">
                <div className="contact-grid">
                  <div className="contact-card primary">
                    <div className="contact-icon">💰</div>
                    <h3>Refund Requests</h3>
                    <p>For all refund-related inquiries and requests</p>
                    <a href="mailto:refunds@writeaspeech.org" className="contact-button">refunds@writeaspeech.org</a>
                  </div>
                  <div className="contact-card">
                    <div className="contact-icon">💬</div>
                    <h3>Satisfaction Guarantee</h3>
                    <p>For re-generation credits and assistance</p>
                    <a href="mailto:support@writeaspeech.org" className="contact-button">support@writeaspeech.org</a>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicyPage;
