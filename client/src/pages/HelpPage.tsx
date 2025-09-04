import { useState } from 'react';
import { Link } from 'react-router-dom';

const HelpPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        answer: "We offer a simple, one-time payment of $19 for complete access to all features. This includes unlimited speech generation, all practice tools, and lifetime access. No monthly subscriptions or hidden fees."
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

  return (
    <div className="page-container">
      <div className="container">
        {/* Header Section */}
        <section className="help-header">
          <h1 className="page-title">Help Center</h1>
          <p className="page-subtitle">
            Find answers to common questions and get the support you need
          </p>
        </section>

        {/* Quick Help Section */}
        <section className="quick-help">
          <h2>Quick Help</h2>
          <div className="quick-help-grid">
            <Link to="/builder" className="quick-help-card">
              <div className="quick-help-icon">🎤</div>
              <h3>Create a Speech</h3>
              <p>Start building your personalized speech in minutes</p>
            </Link>
            <Link to="/pricing" className="quick-help-card">
              <div className="quick-help-icon">💰</div>
              <h3>View Pricing</h3>
              <p>See our simple, transparent pricing structure</p>
            </Link>
            <a href="mailto:support@writeaspeech.org" className="quick-help-card">
              <div className="quick-help-icon">📧</div>
              <h3>Contact Support</h3>
              <p>Get help from our support team</p>
            </a>
            <Link to="/about" className="quick-help-card">
              <div className="quick-help-icon">ℹ️</div>
              <h3>Learn More</h3>
              <p>Discover more about our platform</p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="help-faq">
          <h2>Frequently Asked Questions</h2>
          
          {/* Category Tabs */}
          <div className="faq-categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="faq-content">
            {faqData[activeCategory as keyof typeof faqData]?.map(faq => (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle">
                    {openFaq === faq.id ? '−' : '+'}
                  </span>
                </button>
                {openFaq === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Video Tutorials Section */}
        <section className="help-tutorials">
          <h2>Video Tutorials</h2>
          <div className="tutorials-grid">
            <div className="tutorial-card">
              <div className="tutorial-thumbnail">
                <div className="play-button">▶️</div>
                <div className="tutorial-placeholder">Video Thumbnail</div>
              </div>
              <div className="tutorial-info">
                <h3>Getting Started Guide</h3>
                <p>Learn how to create your first speech in 5 minutes</p>
                <span className="tutorial-duration">5:30</span>
              </div>
            </div>
            <div className="tutorial-card">
              <div className="tutorial-thumbnail">
                <div className="play-button">▶️</div>
                <div className="tutorial-placeholder">Video Thumbnail</div>
              </div>
              <div className="tutorial-info">
                <h3>Using the Teleprompter</h3>
                <p>Master the teleprompter for confident delivery</p>
                <span className="tutorial-duration">3:45</span>
              </div>
            </div>
            <div className="tutorial-card">
              <div className="tutorial-thumbnail">
                <div className="play-button">▶️</div>
                <div className="tutorial-placeholder">Video Thumbnail</div>
              </div>
              <div className="tutorial-info">
                <h3>Practice Tools Overview</h3>
                <p>Explore all the tools to perfect your speech</p>
                <span className="tutorial-duration">7:20</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="help-contact">
          <div className="contact-content">
            <h2>Still Need Help?</h2>
            <p>
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">📧</div>
                <h3>Email Support</h3>
                <p>Get help via email within 24 hours</p>
                <a href="mailto:support@writeaspeech.org" className="contact-link">
                  support@writeaspeech.org
                </a>
              </div>
              <div className="contact-method">
                <div className="contact-icon">💬</div>
                <h3>Live Chat</h3>
                <p>Chat with us in real-time (Mon-Fri, 9AM-6PM EST)</p>
                <button className="contact-link">Start Chat</button>
              </div>
              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <h3>Phone Support</h3>
                <p>Call us for immediate assistance</p>
                <a href="tel:+1-555-SPEECH" className="contact-link">
                  +1 (555) SPEECH
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="help-cta">
          <div className="cta-content">
            <h2>Ready to Create Your Speech?</h2>
            <p>Don't let public speaking anxiety hold you back. Start creating your perfect speech today.</p>
            <div className="cta-buttons">
              <Link to="/builder" className="btn btn-primary btn-large">
                Create My Speech
              </Link>
              <Link to="/pricing" className="btn btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
