import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HelpPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const faqData = {
    'getting-started': [
      {
        id: 1,
        question: "How do I get started with writeaspeech.org?",
        answer: "Getting started is easy! Simply click 'Create My Speech' on our homepage, choose your speech style, answer a few questions about your occasion and personal stories, and our AI will generate a personalized speech for you. The entire process takes just 5-10 minutes."
      },
      {
        id: 2,
        question: "What types of speeches can I create?",
        answer: "You can create speeches for any occasion including wedding speeches (best man, maid of honor, parent speeches), special events (birthdays, anniversaries, retirement parties), professional presentations, graduation speeches, and more. Our AI adapts to any occasion and audience."
      },
      {
        id: 3,
        question: "Do I need to create an account?",
        answer: "Yes, creating an account is required to save your speeches and access all features. You can sign up with your email address or use Google authentication for quick access. Your account is free to create and use."
      },
      {
        id: 4,
        question: "How long does it take to generate a speech?",
        answer: "Speech generation is instant! Once you complete the questionnaire, our AI creates your personalized speech in seconds. You can then review, edit, and refine it as needed using our built-in tools."
      }
    ],
    'features': [
      {
        id: 5,
        question: "What speech styles are available?",
        answer: "We offer four main speech styles: Witty (humorous and engaging), Formal (professional and structured), Heartfelt (emotional and personal), and Inspiring (motivational and uplifting). Each style is tailored to different occasions and audiences."
      },
      {
        id: 6,
        question: "How does the teleprompter work?",
        answer: "Our teleprompter displays your speech in large, easy-to-read text that scrolls at your preferred speed. You can adjust the font size, scroll speed, and background color to match your comfort level. It's perfect for practice and actual delivery."
      },
      {
        id: 7,
        question: "What is pacing analysis?",
        answer: "Pacing analysis helps you practice the timing of your speech. It shows you how long each section should take and provides visual cues to help you maintain the right pace during delivery. This ensures you stay within your allotted time."
      },
      {
        id: 8,
        question: "Can I export my speech in different formats?",
        answer: "Yes! You can export your speech as a PDF document, plain text file, or printable cue cards. Each format is optimized for different use cases - PDF for formal delivery, text for easy editing, and cue cards for quick reference."
      }
    ],
    'billing': [
      {
        id: 9,
        question: "How much does writeaspeech.org cost?",
        answer: "We offer three flexible pricing options: Free Trial (short speeches with watermarks), Pay-Per-Speech ($24.99 for premium full-length speeches), and Monthly Subscription ($9.99/month for 5 speeches monthly). Choose what works best for your needs!"
      },
      {
        id: 10,
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment methods through Stripe. All payments are processed securely and encrypted."
      },
      {
        id: 11,
        question: "Is there a money-back guarantee?",
        answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with your speech or our service, contact us within 30 days for a full refund, no questions asked."
      },
      {
        id: 12,
        question: "Can I get a refund if I'm not satisfied?",
        answer: "Absolutely. We stand behind our service and offer a 30-day money-back guarantee. If you're not happy with your speech or our platform, we'll provide a full refund. Contact our support team to process your refund."
      }
    ],
    'technical': [
      {
        id: 13,
        question: "What browsers are supported?",
        answer: "writeaspeech.org works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience."
      },
      {
        id: 14,
        question: "Do I need to download any software?",
        answer: "No downloads required! writeaspeech.org is a web-based platform that works entirely in your browser. You can access all features from any device with an internet connection."
      },
      {
        id: 15,
        question: "Is my data secure?",
        answer: "Yes, we take data security seriously. All data is encrypted in transit and at rest. We use industry-standard security practices and never share your personal information or speech content with third parties."
      },
      {
        id: 16,
        question: "Can I use this on my mobile device?",
        answer: "Yes! Our platform is fully responsive and works great on smartphones and tablets. You can create, edit, and practice your speeches on any device."
      }
    ]
  };

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'features', name: 'Features', icon: '✨' },
    { id: 'billing', name: 'Billing', icon: '💳' },
    { id: 'technical', name: 'Technical', icon: '🔧' }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // Filter FAQs based on search query
  const filteredFaqData = Object.entries(faqData).reduce((acc, [category, faqs]) => {
    const filteredFaqs = faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredFaqs.length > 0) {
      (acc as any)[category] = filteredFaqs;
    }
    return acc;
  }, {} as typeof faqData);

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Help Center - writeaspeech.org | FAQs & Support</title>
        <meta name="description" content="Get help with writeaspeech.org. Find answers to common questions about speech writing, pricing, features, and support. 24/7 customer assistance available." />
        <meta name="keywords" content="writeaspeech help, speech writing support, FAQ, customer service, speech generator help, AI speechwriter assistance" />
        <meta property="og:title" content="Help Center - writeaspeech.org | FAQs & Support" />
        <meta property="og:description" content="Get help with writeaspeech.org. Find answers to common questions and get the support you need." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Help Center - writeaspeech.org | FAQs & Support" />
        <meta name="twitter:description" content="Get help with writeaspeech.org. Find answers to common questions and get the support you need." />
        <link rel="canonical" href="https://writeaspeech.org/help" />
      </head>

      <div className="help-page">
        <div className="help-container">
          {/* Hero Section */}
          <section className={`help-hero-modern ${isVisible ? 'animate-in' : ''}`}>
            <div className="help-hero-content">
              <div className="hero-badge-help">
                <span className="badge-icon">💬</span>
                <span>Help Center</span>
              </div>
              <h1 className="help-hero-title">
                How can we <span className="highlight-text">help you</span> today?
              </h1>
              <p className="help-hero-subtitle">
                Find answers to common questions, get step-by-step guidance, or contact our support team. 
                We're here to help you create amazing speeches with confidence.
              </p>
              
              {/* Search Bar */}
              <div className="help-search-container">
                <div className="search-bar">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search for help articles, features, or common questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button 
                      className="clear-search"
                      onClick={() => setSearchQuery('')}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="search-suggestions">
                  <span>Popular searches:</span>
                  <button onClick={() => setSearchQuery('pricing')}>Pricing</button>
                  <button onClick={() => setSearchQuery('teleprompter')}>Teleprompter</button>
                  <button onClick={() => setSearchQuery('export')}>Export speech</button>
                  <button onClick={() => setSearchQuery('refund')}>Refund</button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions Section */}
          <section className={`quick-actions-modern ${isVisible ? 'animate-in-delay' : ''}`}>
            <div className="quick-actions-header">
              <h2 className="section-title">Quick Actions</h2>
              <p className="section-subtitle">Get started with the most common tasks</p>
            </div>
            <div className="quick-actions-grid">
              <Link to="/builder" className="action-card primary">
                <div className="action-icon">🎤</div>
                <div className="action-content">
                  <h3>Create a Speech</h3>
                  <p>Start building your personalized speech in minutes</p>
                  <span className="action-arrow">→</span>
                </div>
              </Link>
              <Link to="/pricing" className="action-card">
                <div className="action-icon">💰</div>
                <div className="action-content">
                  <h3>View Pricing</h3>
                  <p>See our simple, transparent pricing</p>
                  <span className="action-arrow">→</span>
                </div>
              </Link>
              <a href="mailto:support@writeaspeech.org" className="action-card">
                <div className="action-icon">📧</div>
                <div className="action-content">
                  <h3>Contact Support</h3>
                  <p>Get help from our expert team</p>
                  <span className="action-arrow">→</span>
                </div>
              </a>
              <Link to="/about" className="action-card">
                <div className="action-icon">ℹ️</div>
                <div className="action-content">
                  <h3>Learn More</h3>
                  <p>Discover more about our platform</p>
                  <span className="action-arrow">→</span>
                </div>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={`faq-section-modern ${isVisible ? 'animate-in-delay-2' : ''}`}>
            <div className="faq-header-modern">
              <h2 className="faq-title-modern">Frequently Asked Questions</h2>
              <p className="faq-subtitle-modern">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Find answers to common questions organized by category'}
              </p>
            </div>
            
            {!searchQuery && (
              <div className="category-tabs-modern">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-tab-modern ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="tab-icon">{category.icon}</span>
                    <span className="tab-name">{category.name}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="faq-content-modern">
              {searchQuery ? (
                // Show filtered results across all categories
                Object.entries(filteredFaqData).length === 0 ? (
                  <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No results found</h3>
                    <p>Try searching with different keywords or browse our categories above.</p>
                  </div>
                ) : (
                  Object.entries(filteredFaqData).map(([category, faqs]) => (
                    <div key={category} className="search-category">
                      <h3 className="search-category-title">
                        {categories.find(c => c.id === category)?.icon} {categories.find(c => c.id === category)?.name}
                      </h3>
                      {faqs.map(faq => (
                        <div key={faq.id} className="faq-card-modern">
                          <button
                            className="faq-question-modern"
                            onClick={() => toggleFaq(faq.id)}
                          >
                            <span className="question-text">{faq.question}</span>
                            <span className={`faq-toggle-modern ${openFaq === faq.id ? 'open' : ''}`}>
                              <span className="toggle-icon">+</span>
                            </span>
                          </button>
                          {openFaq === faq.id && (
                            <div className="faq-answer-modern">
                              <p>{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))
                )
              ) : (
                // Show current category FAQs
                faqData[activeCategory as keyof typeof faqData]?.map(faq => (
                  <div key={faq.id} className="faq-card-modern">
                    <button
                      className="faq-question-modern"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span className="question-text">{faq.question}</span>
                      <span className={`faq-toggle-modern ${openFaq === faq.id ? 'open' : ''}`}>
                        <span className="toggle-icon">+</span>
                      </span>
                    </button>
                    {openFaq === faq.id && (
                      <div className="faq-answer-modern">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Support Section */}
          <section className={`support-section-modern ${isVisible ? 'animate-in-delay-3' : ''}`}>
            <div className="support-header">
              <h2 className="support-title">Still Need Help?</h2>
              <p className="support-subtitle">Our dedicated support team is here to help you succeed</p>
            </div>
            
            <div className="support-grid">
              <div className="support-card primary">
                <div className="support-card-header">
                  <div className="support-icon">💬</div>
                  <div className="support-badge">Most Popular</div>
                </div>
                <h3>Live Chat</h3>
                <p>Get instant help from our support team. Average response time: 2 minutes.</p>
                <div className="support-features">
                  <span className="feature">✓ Real-time assistance</span>
                  <span className="feature">✓ Screen sharing available</span>
                  <span className="feature">✓ Mon-Fri, 9AM-6PM EST</span>
                </div>
                <button className="support-cta">Start Chat Now</button>
              </div>
              
              <div className="support-card">
                <div className="support-card-header">
                  <div className="support-icon">📧</div>
                  <div className="response-time">24h response</div>
                </div>
                <h3>Email Support</h3>
                <p>Send us detailed questions and get comprehensive answers from our experts.</p>
                <div className="support-features">
                  <span className="feature">✓ Detailed responses</span>
                  <span className="feature">✓ File attachments</span>
                  <span className="feature">✓ Follow-up support</span>
                </div>
                <a href="mailto:support@writeaspeech.org" className="support-cta secondary">
                  Send Email
                </a>
              </div>
              
              <div className="support-card">
                <div className="support-card-header">
                  <div className="support-icon">📞</div>
                  <div className="response-time">Immediate</div>
                </div>
                <h3>Phone Support</h3>
                <p>Call us for urgent issues or complex problems that need immediate attention.</p>
                <div className="support-features">
                  <span className="feature">✓ Voice support</span>
                  <span className="feature">✓ Technical guidance</span>
                  <span className="feature">✓ Priority assistance</span>
                </div>
                <a href="tel:+1-555-SPEECH" className="support-cta secondary">
                  Call Now
                </a>
              </div>
            </div>

            <div className="support-stats">
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2 min</span>
                <span className="stat-label">Avg Response Time</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Knowledge Base</span>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className={`help-cta-modern ${isVisible ? 'animate-in-delay-4' : ''}`}>
            <div className="help-cta-container">
              <div className="help-cta-background">
                <div className="help-cta-content">
                  <div className="cta-badge-help">🚀 Ready to Get Started?</div>
                  <h2 className="help-cta-title">Create your perfect speech today</h2>
                  <p className="help-cta-description">
                    Don't let public speaking anxiety hold you back. Join thousands who've found their voice with writeaspeech.org.
                  </p>
                  
                  <div className="help-cta-buttons">
                    <Link to="/builder" className="primary-help-cta-button">
                      <span className="cta-button-text">Start Free Trial</span>
                      <span className="cta-button-price">$0 to try</span>
                    </Link>
                    <Link to="/pricing" className="secondary-help-cta-button">
                      <span className="pricing-icon">💰</span>
                      <span>View Pricing</span>
                    </Link>
                  </div>

                  <div className="help-cta-guarantees">
                    <div className="guarantee-item">
                      <span className="guarantee-icon">⚡</span>
                      <span>Instant Generation</span>
                    </div>
                    <div className="guarantee-item">
                      <span className="guarantee-icon">🛡️</span>
                      <span>30-Day Guarantee</span>
                    </div>
                    <div className="guarantee-item">
                      <span className="guarantee-icon">💬</span>
                      <span>24/7 Support</span>
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

export default HelpPage;
