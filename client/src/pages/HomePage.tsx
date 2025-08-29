import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Craft the perfect speech for <span className="highlight">any occasion</span>
          </h1>
          <p className="hero-subtitle">
            Your personal AI speechwriter for weddings, events, and presentations
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Create My Speech for Free</button>
            <button className="btn btn-secondary">See How It Works</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-graphic">
            <div className="floating-card card-1">🎤</div>
            <div className="floating-card card-2">✍️</div>
            <div className="floating-card card-3">💫</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Public speaking doesn't have to be stressful. Our AI-powered speech builder guides you through a simple process to create a personalized, memorable speech that matches your voice and the occasion's tone.
              </p>
              <div className="features">
                <div className="feature">
                  <h3>🎯 Choose Your Style</h3>
                  <p>Select from different speech styles - witty, formal, heartfelt, or inspiring</p>
                </div>
                <div className="feature">
                  <h3>💬 Answer Simple Questions</h3>
                  <p>Our AI asks tailored questions about your event and personal stories</p>
                </div>
                <div className="feature">
                  <h3>✨ Get Your Perfect Speech</h3>
                  <p>Receive a complete, personalized speech with practice tools included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Perfect for Any Occasion</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">💒</div>
              <h3>Wedding Speeches</h3>
              <p>Best man, maid of honor, parent speeches that celebrate love and create lasting memories</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎉</div>
              <h3>Special Events</h3>
              <p>Birthday toasts, retirement parties, anniversaries, and milestone celebrations</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>Professional Presentations</h3>
              <p>Work presentations, award acceptances, and graduation speeches that inspire</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Ready to Write Your Speech?</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Simple, One-Time Payment</h3>
              <p>Get your personalized speech and all practice tools for just <strong>$39</strong>. No subscriptions, no hidden fees.</p>
              <div className="contact-details">
                <p>✅ Complete personalized speech</p>
                <p>✅ Teleprompter and practice tools</p>
                <p>✅ Multiple export formats (PDF, text, cue cards)</p>
                <p>✅ Pacing analysis and audio recording</p>
              </div>
              <div className="hero-buttons" style={{ marginTop: '2rem' }}>
                <button className="btn btn-primary">Start Writing My Speech</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
