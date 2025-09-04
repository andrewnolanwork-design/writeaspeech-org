import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Terms of Service - writeaspeech.org | User Agreement & Legal Terms</title>
        <meta name="description" content="Read our terms of service and user agreement. Learn about your rights and responsibilities when using writeaspeech.org for AI-powered speech writing." />
        <meta name="keywords" content="terms of service, user agreement, legal terms, speech writing terms, writeaspeech conditions" />
        <meta property="og:title" content="Terms of Service - writeaspeech.org | User Agreement & Legal Terms" />
        <meta property="og:description" content="Read our terms of service and user agreement for writeaspeech.org." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://writeaspeech.org/terms" />
      </head>

      <div className="legal-page">
        <div className="legal-container">
          {/* Hero Section */}
          <section className={`legal-hero ${isVisible ? 'animate-in' : ''}`}>
            <div className="legal-hero-content">
              <div className="legal-badge">
                <span className="badge-icon">📋</span>
                <span>Terms of Service</span>
              </div>
              <h1 className="legal-hero-title">
                Clear terms for a <span className="highlight-text">great experience</span>
              </h1>
              <p className="legal-hero-subtitle">
                These terms outline our mutual agreement and ensure everyone has a positive experience 
                using writeaspeech.org. We've made them as clear and fair as possible.
              </p>
              <div className="legal-meta">
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>Last updated: December 2024</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⚖️</span>
                  <span>Fair & Transparent</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">🤝</span>
                  <span>User-Friendly Terms</span>
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
                <Link to="/terms" className="nav-link active">
                  <span className="nav-icon">📋</span>
                  <span>Terms of Service</span>
                </Link>
                <Link to="/refund" className="nav-link">
                  <span className="nav-icon">💰</span>
                  <span>Refund Policy</span>
                </Link>
              </div>
            </div>
          </section>

          <div className="legal-content-wrapper">
            {/* Simplified sidebar for mobile */}
            <aside className={`table-of-contents ${isVisible ? 'animate-in-delay-2' : ''}`}>
              <div className="toc-container">
                <h3 className="toc-title">Quick Navigation</h3>
                <div className="terms-summary">
                  <div className="summary-item">
                    <span className="summary-icon">💰</span>
                    <span>One-time payment: $19</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">🛡️</span>
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">✅</span>
                    <span>Lifetime access included</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className={`legal-main-content ${isVisible ? 'animate-in-delay-3' : ''}`}>
              <section className="legal-intro">
                <div className="intro-card">
                  <div className="intro-icon">📋</div>
                  <div className="intro-content">
                    <h2>Simple Terms, Great Service</h2>
                    <p>
                      By using writeaspeech.org, you agree to these terms. We've designed our service 
                      and these terms to be fair, transparent, and user-friendly.
                    </p>
                  </div>
                </div>
              </section>

              {/* Key Terms Section */}
              <section className="legal-section">
                <div className="section-header">
                  <div className="section-icon">🎯</div>
                  <div className="section-title-content">
                    <h2>Key Terms Summary</h2>
                    <p>Here are the most important points you should know:</p>
                  </div>
                </div>

                <div className="terms-highlights">
                  <div className="highlight-card">
                    <h3>💰 Payment & Access</h3>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span>One-time payment of $19 for lifetime access</li>
                      <li><span className="list-icon">✓</span>Secure payment processing through Stripe</li>
                      <li><span className="list-icon">✓</span>Immediate access to all features upon payment</li>
                      <li><span className="list-icon">✓</span>No recurring charges or hidden fees</li>
                    </ul>
                  </div>
                  
                  <div className="highlight-card">
                    <h3>🎤 Your Content Rights</h3>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span>You own all speeches you create</li>
                      <li><span className="list-icon">✓</span>Use your speeches however you want</li>
                      <li><span className="list-icon">✓</span>We don't claim rights to your content</li>
                      <li><span className="list-icon">✓</span>Your personal stories remain private</li>
                    </ul>
                  </div>
                  
                  <div className="highlight-card">
                    <h3>🛡️ Our Guarantee</h3>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span>30-day money-back guarantee</li>
                      <li><span className="list-icon">✓</span>Professional AI-powered speech generation</li>
                      <li><span className="list-icon">✓</span>Reliable service and support</li>
                      <li><span className="list-icon">✓</span>Regular updates and improvements</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="legal-section">
                <div className="section-header">
                  <div className="section-icon">📧</div>
                  <div className="section-title-content">
                    <h2>Questions About These Terms?</h2>
                    <p>We're here to help clarify anything about our terms of service.</p>
                  </div>
                </div>

                <div className="contact-grid">
                  <div className="contact-card primary">
                    <div className="contact-icon">📋</div>
                    <h3>Legal Questions</h3>
                    <p>For questions about terms, refunds, or legal matters</p>
                    <a href="mailto:legal@writeaspeech.org" className="contact-button">legal@writeaspeech.org</a>
                  </div>
                  <div className="contact-card">
                    <div className="contact-icon">💬</div>
                    <h3>General Support</h3>
                    <p>For technical support and general questions</p>
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

export default TermsOfServicePage;
