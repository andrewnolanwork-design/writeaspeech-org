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
        <title>Refund Policy - writeaspeech.org | 30-Day Money-Back Guarantee</title>
        <meta name="description" content="We offer a 30-day money-back guarantee on writeaspeech.org. Learn about our hassle-free refund process and customer satisfaction commitment." />
        <meta name="keywords" content="refund policy, money back guarantee, writeaspeech refund, speech writing refund, customer satisfaction" />
        <meta property="og:title" content="Refund Policy - writeaspeech.org | 30-Day Money-Back Guarantee" />
        <meta property="og:description" content="We offer a 30-day money-back guarantee with a hassle-free refund process." />
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
                Your satisfaction is <span className="highlight-text">guaranteed</span>
              </h1>
              <p className="legal-hero-subtitle">
                We're confident you'll love writeaspeech.org, but if you're not completely satisfied, 
                we offer a hassle-free 30-day money-back guarantee. No questions asked.
              </p>
              <div className="legal-meta">
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>Last updated: December 2024</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">✅</span>
                  <span>30-Day Guarantee</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⚡</span>
                  <span>Quick Processing</span>
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
                <h3 className="toc-title">Refund Guarantee</h3>
                <div className="guarantee-highlight">
                  <div className="guarantee-badge">30 Days</div>
                  <p>Full money-back guarantee</p>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className={`legal-main-content ${isVisible ? 'animate-in-delay-3' : ''}`}>
              {/* Guarantee Section */}
              <section className="legal-section">
                <div className="section-header">
                  <div className="section-icon">🛡️</div>
                  <div className="section-title-content">
                    <h2>Our Guarantee to You</h2>
                    <p>We stand behind our service with a comprehensive 30-day money-back guarantee.</p>
                  </div>
                </div>

                <div className="guarantee-showcase">
                  <div className="guarantee-card featured">
                    <div className="guarantee-icon">✅</div>
                    <h3>30-Day Money-Back Guarantee</h3>
                    <p>If you're not completely satisfied with writeaspeech.org within 30 days of purchase, we'll provide a full refund. No questions asked, no hassle.</p>
                    <div className="guarantee-features">
                      <ul className="feature-list">
                        <li><span className="list-icon">✓</span>Full refund within 30 days</li>
                        <li><span className="list-icon">✓</span>No questions asked policy</li>
                        <li><span className="list-icon">✓</span>Quick 5-10 business day processing</li>
                        <li><span className="list-icon">✓</span>Refund to original payment method</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to Request */}
              <section className="legal-section">
                <div className="section-header">
                  <div className="section-icon">📧</div>
                  <div className="section-title-content">
                    <h2>How to Request a Refund</h2>
                    <p>Getting a refund is simple and straightforward.</p>
                  </div>
                </div>

                <div className="refund-process">
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Contact Support</h4>
                      <p>Email us at <a href="mailto:refunds@writeaspeech.org" className="contact-link">refunds@writeaspeech.org</a> with your refund request</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Confirmation</h4>
                      <p>We'll confirm your refund request within 24 hours</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Processing</h4>
                      <p>Refund processed within 5-10 business days to your original payment method</p>
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
                    <p>For all refund-related inquiries</p>
                    <a href="mailto:refunds@writeaspeech.org" className="contact-button">refunds@writeaspeech.org</a>
                  </div>
                  <div className="contact-card">
                    <div className="contact-icon">💬</div>
                    <h3>General Support</h3>
                    <p>For questions about our service</p>
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
