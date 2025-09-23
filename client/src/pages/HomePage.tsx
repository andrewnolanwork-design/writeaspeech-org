import { Link } from 'react-router-dom';

// Import hero image
import professionalSpeechImage from '../assets/images/Woman Giving Professional Speech.png';

// Import testimonial images
import bestmanSpeechImage from '../assets/images/Bestman Speech.png';
import retirementSpeechImage from '../assets/images/Retirement Speech.png';
import officePresentationImage from '../assets/images/Office Presentation.png';

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
            Your personal AI speechwriter with flexible pricing for every need
          </p>
          <div className="hero-buttons">
            <Link to="/builder" className="btn btn-primary">Try Free • Pay-Per-Speech • Monthly Plans</Link>
            <Link to="/pricing" className="btn btn-secondary">View Pricing</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-container">
            <div className="professional-speech-image">
              <img 
                src={professionalSpeechImage} 
                alt="Professional woman giving a confident speech" 
                className="hero-main-image"
              />
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
                <img 
                  src={bestmanSpeechImage} 
                  alt="Best man giving wedding speech" 
                  className="testimonial-img"
                />
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
                <img 
                  src={retirementSpeechImage} 
                  alt="Person giving retirement speech" 
                  className="testimonial-img"
                />
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
                <img 
                  src={officePresentationImage} 
                  alt="Professional giving business presentation" 
                  className="testimonial-img"
                />
              </div>
              <div className="testimonial-content">
                <p>"As someone who hates public speaking, this gave me the confidence I needed. The speech was professional yet personal - exactly what I needed."</p>
                <div className="testimonial-author">
                  <strong>Amanda Xu</strong>
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
              <h3>Flexible Pricing for Every Need</h3>
              <p>Choose from our <strong>Free Trial</strong>, <strong>Pay-Per-Speech ($19)</strong>, or <strong>Monthly Subscription ($9.99/month)</strong> options.</p>
              <div className="contact-details">
                <p>✅ Start with a free trial speech</p>
                <p>✅ Perfect single speeches for important events</p>
                <p>✅ Regular speeches with monthly plans</p>
                <p>✅ All plans include practice tools and export options</p>
              </div>
              <div className="hero-buttons" style={{ marginTop: '2rem' }}>
                <Link to="/pricing" className="btn btn-primary">View All Pricing Options</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
