import { Link } from 'react-router-dom';

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
            Your personal AI speechwriter creates personalized speeches for just $19
          </p>
          <div className="hero-buttons">
            <Link to="/builder" className="btn btn-primary">Create My Speech - $19</Link>
            <a href="#about" className="btn btn-secondary">See How It Works</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <div className="hero-placeholder">
              <div className="speech-icon">🎤</div>
              <div className="hero-text">Professional Speech Writing</div>
            </div>
            <div className="speech-elements">
              <div className="speech-bubble">
                "Today, I want to share..."
              </div>
              <div className="confidence-indicator">
                ✨ Confident & Prepared
              </div>
            </div>
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

      {/* Testimonials Section */}
      <section id="testimonials" className="section">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-image">
                <div className="testimonial-placeholder wedding">
                  <div className="testimonial-icon">💒</div>
                  <div className="testimonial-category">Wedding Speech</div>
                </div>
              </div>
              <div className="testimonial-content">
                <p>"The AI helped me write the perfect best man speech. It captured exactly what I wanted to say about my friend, and everyone loved it!"</p>
                <div className="testimonial-author">
                  <strong>Michael R.</strong>
                  <span>Best Man Speech</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-image">
                <div className="testimonial-placeholder retirement">
                  <div className="testimonial-icon">🎉</div>
                  <div className="testimonial-category">Retirement Speech</div>
                </div>
              </div>
              <div className="testimonial-content">
                <p>"I was dreading giving a speech at my dad's retirement party. This made it so easy - the speech was heartfelt and brought tears to everyone's eyes."</p>
                <div className="testimonial-author">
                  <strong>Sarah L.</strong>
                  <span>Retirement Speech</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-image">
                <div className="testimonial-placeholder business">
                  <div className="testimonial-icon">💼</div>
                  <div className="testimonial-category">Business Presentation</div>
                </div>
              </div>
              <div className="testimonial-content">
                <p>"As someone who hates public speaking, this gave me the confidence I needed. The speech was professional yet personal - exactly what I needed."</p>
                <div className="testimonial-author">
                  <strong>David Chen</strong>
                  <span>Work Presentation</span>
                </div>
              </div>
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
                <Link to="/builder" className="btn btn-primary">Start Writing My Speech</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
