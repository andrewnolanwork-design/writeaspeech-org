import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setIsVisible(true);
    
    // Add scroll spy for table of contents
    const handleScroll = () => {
      const sections = document.querySelectorAll('.legal-section');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          current = section.id;
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'information-collect', title: 'Information We Collect', icon: '📊' },
    { id: 'how-we-use', title: 'How We Use Information', icon: '🎯' },
    { id: 'contact', title: 'Contact Us', icon: '📧' }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Privacy Policy - writeaspeech.org | Data Protection & Security</title>
        <meta name="description" content="Read our comprehensive privacy policy. Learn how writeaspeech.org protects your personal information, speech content, and data with industry-leading security measures." />
        <meta name="keywords" content="privacy policy, data protection, personal information, speech security, GDPR compliance, data rights" />
        <meta property="og:title" content="Privacy Policy - writeaspeech.org | Data Protection & Security" />
        <meta property="og:description" content="Read our comprehensive privacy policy and learn how we protect your personal information and speech content." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy - writeaspeech.org | Data Protection & Security" />
        <meta name="twitter:description" content="Read our comprehensive privacy policy and learn how we protect your personal information." />
        <link rel="canonical" href="https://writeaspeech.org/privacy" />
      </head>

      <div className="legal-page">
        <div className="legal-container">
          {/* Hero Section */}
          <section className={`legal-hero ${isVisible ? 'animate-in' : ''}`}>
            <div className="legal-hero-content">
              <div className="legal-badge">
                <span className="badge-icon">🔒</span>
                <span>Privacy Policy</span>
              </div>
              <h1 className="legal-hero-title">
                Your privacy is our <span className="highlight-text">top priority</span>
              </h1>
              <p className="legal-hero-subtitle">
                We're committed to protecting your personal information and being transparent about how we collect, 
                use, and safeguard your data. This policy explains everything you need to know.
              </p>
              <div className="legal-meta">
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>Last updated: December 2024</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⚖️</span>
                  <span>GDPR Compliant</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">🔐</span>
                  <span>Industry Standard Security</span>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Navigation */}
          <section className={`legal-navigation ${isVisible ? 'animate-in-delay' : ''}`}>
            <div className="legal-nav-container">
              <h3 className="nav-title">Legal Pages</h3>
              <div className="legal-nav-links">
                <Link to="/privacy" className="nav-link active">
                  <span className="nav-icon">🔒</span>
                  <span>Privacy Policy</span>
                </Link>
                <Link to="/terms" className="nav-link">
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
            {/* Table of Contents */}
            <aside className={`table-of-contents ${isVisible ? 'animate-in-delay-2' : ''}`}>
              <div className="toc-container">
                <h3 className="toc-title">Table of Contents</h3>
                <nav className="toc-nav">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`toc-link ${activeSection === item.id ? 'active' : ''}`}
                    >
                      <span className="toc-icon">{item.icon}</span>
                      <span className="toc-text">{item.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className={`legal-main-content ${isVisible ? 'animate-in-delay-3' : ''}`}>
              {/* Introduction */}
              <section className="legal-intro">
                <div className="intro-card">
                  <div className="intro-icon">🛡️</div>
                  <div className="intro-content">
                    <h2>Our Commitment to Privacy</h2>
                    <p>
                      At writeaspeech.org, we are committed to protecting your privacy and ensuring the security 
                      of your personal information. This Privacy Policy explains how we collect, use, disclose, 
                      and safeguard your information when you use our website and services.
                    </p>
                    <p>
                      By using our service, you agree to the collection and use of information in accordance 
                      with this policy. If you do not agree with our policies and practices, please do not 
                      use our service.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information We Collect */}
              <section id="information-collect" className="legal-section">
                <div className="section-header">
                  <div className="section-icon">📊</div>
                  <div className="section-title-content">
                    <h2>Information We Collect</h2>
                    <p>We collect information to provide you with the best possible service while respecting your privacy.</p>
                  </div>
                </div>

                <div className="info-grid">
                  <div className="info-card">
                    <div className="card-header">
                      <div className="card-icon">👤</div>
                      <h3>Personal Information</h3>
                    </div>
                    <p>Information you provide when creating an account and using our service:</p>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span><strong>Account Information:</strong> Name, email address, and password</li>
                      <li><span className="list-icon">✓</span><strong>Profile Information:</strong> Additional details you choose to provide</li>
                      <li><span className="list-icon">✓</span><strong>Payment Information:</strong> Billing details (processed securely through Stripe)</li>
                      <li><span className="list-icon">✓</span><strong>Speech Content:</strong> The speeches and personal stories you create</li>
                      <li><span className="list-icon">✓</span><strong>Communication Data:</strong> Messages sent to our support team</li>
                    </ul>
                  </div>

                  <div className="info-card">
                    <div className="card-header">
                      <div className="card-icon">📱</div>
                      <h3>Automatically Collected</h3>
                    </div>
                    <p>Information we collect automatically when you use our service:</p>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span><strong>Usage Data:</strong> How you interact with our features and time spent</li>
                      <li><span className="list-icon">✓</span><strong>Device Information:</strong> Browser type, OS, IP address, and identifiers</li>
                      <li><span className="list-icon">✓</span><strong>Cookies & Tracking:</strong> Information from cookies and similar technologies</li>
                      <li><span className="list-icon">✓</span><strong>Log Data:</strong> Server logs with access times and pages viewed</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section id="how-we-use" className="legal-section">
                <div className="section-header">
                  <div className="section-icon">🎯</div>
                  <div className="section-title-content">
                    <h2>How We Use Your Information</h2>
                    <p>We use your information to provide, improve, and personalize our services.</p>
                  </div>
                </div>

                <div className="usage-grid">
                  <div className="usage-card primary">
                    <h3>🎤 Service Delivery</h3>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span>Generate personalized speeches using AI</li>
                      <li><span className="list-icon">✓</span>Provide practice tools and teleprompter features</li>
                      <li><span className="list-icon">✓</span>Save and manage your speech library</li>
                      <li><span className="list-icon">✓</span>Export speeches in multiple formats</li>
                    </ul>
                  </div>
                  <div className="usage-card">
                    <h3>🔧 Service Improvement</h3>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span>Analyze usage patterns to enhance features</li>
                      <li><span className="list-icon">✓</span>Improve AI speech generation quality</li>
                      <li><span className="list-icon">✓</span>Optimize website performance and user experience</li>
                      <li><span className="list-icon">✓</span>Develop new features based on user needs</li>
                    </ul>
                  </div>
                  <div className="usage-card">
                    <h3>📞 Communication</h3>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span>Respond to your support requests</li>
                      <li><span className="list-icon">✓</span>Send important service updates</li>
                      <li><span className="list-icon">✓</span>Notify you of new features (with consent)</li>
                      <li><span className="list-icon">✓</span>Provide customer support and assistance</li>
                    </ul>
                  </div>
                  <div className="usage-card">
                    <h3>🛡️ Security & Legal</h3>
                    <ul className="feature-list">
                      <li><span className="list-icon">✓</span>Protect against fraud and unauthorized access</li>
                      <li><span className="list-icon">✓</span>Comply with legal obligations</li>
                      <li><span className="list-icon">✓</span>Enforce our terms of service</li>
                      <li><span className="list-icon">✓</span>Investigate and prevent security incidents</li>
                    </ul>
                  </div>
                </div>
              </section>
          
              {/* Contact Section */}
              <section id="contact" className="legal-section">
                <div className="section-header">
                  <div className="section-icon">📧</div>
                  <div className="section-title-content">
                    <h2>Questions? We're Here to Help</h2>
                    <p>Contact our privacy team for any questions about your data or this policy.</p>
                  </div>
                </div>

                <div className="contact-grid">
                  <div className="contact-card primary">
                    <div className="contact-icon">🔒</div>
                    <h3>Privacy Team</h3>
                    <p>For privacy-specific questions and data requests</p>
                    <a href="mailto:privacy@writeaspeech.org" className="contact-button">privacy@writeaspeech.org</a>
                  </div>
                  <div className="contact-card">
                    <div className="contact-icon">💬</div>
                    <h3>General Support</h3>
                    <p>For general questions and technical support</p>
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

export default PrivacyPolicyPage;
