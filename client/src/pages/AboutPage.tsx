import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import team member images
import ceoImage from '../assets/images/CEO Image.png';
import headOfAiImage from '../assets/images/Head of AI.png';
import headOfDesignImage from '../assets/images/Head of Design.png';

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-advance timeline every 4 seconds
    const interval = setInterval(() => {
      setActiveTimelineItem((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>About Us - writeaspeech.org | AI-Powered Speech Writing Team</title>
        <meta name="description" content="Learn about the team behind writeaspeech.org. We're passionate about helping people deliver memorable speeches with confidence using AI technology. Meet our mission, values, and story." />
        <meta name="keywords" content="about writeaspeech, AI speech writing team, speech writing company, public speaking help, AI speechwriter founders, writing team" />
        <meta property="og:title" content="About Us - writeaspeech.org | AI-Powered Speech Writing Team" />
        <meta property="og:description" content="Learn about the team behind writeaspeech.org and our mission to help people deliver memorable speeches with confidence." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - writeaspeech.org | AI-Powered Speech Writing Team" />
        <meta name="twitter:description" content="Learn about the team behind writeaspeech.org and our mission to help people deliver memorable speeches." />
        <link rel="canonical" href="https://writeaspeech.org/about" />
      </head>

      <div className="about-page">
        <div className="about-container">
          {/* Hero Section */}
          <section className={`about-hero-modern ${isVisible ? 'animate-in' : ''}`}>
            <div className="about-hero-content">
              <div className="hero-badge">
                <span className="badge-icon">👋</span>
                <span>Meet the Team</span>
              </div>
              <h1 className="about-hero-title">
                We're on a mission to make <span className="highlight-text">great speeches</span> accessible to everyone
              </h1>
              <p className="about-hero-subtitle">
                Born from the belief that everyone has a story worth telling, writeaspeech.org combines AI technology 
                with human creativity to help you deliver speeches that truly resonate.
              </p>
              <div className="hero-stats-about">
                <div className="stat-card">
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Speeches Created</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Countries Served</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <div className="hero-visual-about">
              <div className="floating-elements">
                <div className="speech-bubble-float">💬 "Thank you for this amazing tool!"</div>
                <div className="speech-bubble-float">🎯 "Perfect for my wedding speech!"</div>
                <div className="speech-bubble-float">✨ "Made public speaking easy!"</div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className={`mission-section-modern ${isVisible ? 'animate-in-delay' : ''}`}>
            <div className="mission-container">
              <div className="mission-content-modern">
                <div className="mission-header">
                  <span className="section-badge">🎯 Our Mission</span>
                  <h2 className="mission-title">Empowering voices, one speech at a time</h2>
                </div>
                <div className="mission-grid">
                  <div className="mission-card">
                    <div className="mission-icon">💭</div>
                    <h3>Everyone Has a Story</h3>
                    <p>We believe that everyone has a unique story worth telling and the right to tell it with confidence. Your voice matters, and your message deserves to be heard.</p>
                  </div>
                  <div className="mission-card">
                    <div className="mission-icon">🚀</div>
                    <h3>Breaking Barriers</h3>
                    <p>Public speaking shouldn't be a barrier to sharing your thoughts, celebrating special moments, or advancing your career. We're here to remove those obstacles.</p>
                  </div>
                  <div className="mission-card">
                    <div className="mission-icon">🎨</div>
                    <h3>AI Meets Creativity</h3>
                    <p>Our platform combines the personalization of a professional speech writer with the convenience and affordability of modern AI technology.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Story Timeline Section */}
          <section className={`story-section-modern ${isVisible ? 'animate-in-delay-2' : ''}`}>
            <div className="story-header">
              <span className="section-badge">📖 Our Journey</span>
              <h2 className="story-title">How we're changing speech writing</h2>
              <p className="story-subtitle">From a simple observation to helping thousands find their voice</p>
            </div>
            
            <div className="timeline-modern">
              <div className="timeline-nav">
                {[
                  { year: '2023', title: 'The Problem', icon: '🔍' },
                  { year: '2024', title: 'The Solution', icon: '💡' },
                  { year: 'Today', title: 'The Impact', icon: '🌟' }
                ].map((item, index) => (
                  <button
                    key={index}
                    className={`timeline-nav-item ${activeTimelineItem === index ? 'active' : ''}`}
                    onClick={() => setActiveTimelineItem(index)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-year">{item.year}</span>
                    <span className="nav-title">{item.title}</span>
                  </button>
                ))}
              </div>
              
              <div className="timeline-content">
                <div className={`timeline-item ${activeTimelineItem === 0 ? 'active' : ''}`}>
                  <div className="timeline-visual">
                    <div className="visual-icon">🔍</div>
                  </div>
                  <div className="timeline-text">
                    <h3>The Problem We Discovered</h3>
                    <p>After witnessing countless friends and colleagues struggle with wedding speeches, work presentations, and special occasion toasts, we realized there was a significant gap in the market.</p>
                    <ul className="timeline-points">
                      <li>Professional speech writers cost $200-500+ per speech</li>
                      <li>Generic templates lacked personal touch</li>
                      <li>Most people felt overwhelmed and underprepared</li>
                      <li>Fear of public speaking was holding people back</li>
                    </ul>
                  </div>
                </div>
                
                <div className={`timeline-item ${activeTimelineItem === 1 ? 'active' : ''}`}>
                  <div className="timeline-visual">
                    <div className="visual-icon">💡</div>
                  </div>
                  <div className="timeline-text">
                    <h3>The Solution We Built</h3>
                    <p>We developed an AI-powered platform that democratizes professional speech writing, making it accessible, affordable, and deeply personal.</p>
                    <ul className="timeline-points">
                      <li>AI that learns your unique voice and style</li>
                      <li>Personalized speeches for just $19</li>
                      <li>Complete practice toolkit included</li>
                      <li>Instant generation with unlimited revisions</li>
                    </ul>
                  </div>
                </div>
                
                <div className={`timeline-item ${activeTimelineItem === 2 ? 'active' : ''}`}>
                  <div className="timeline-visual">
                    <div className="visual-icon">🌟</div>
                  </div>
                  <div className="timeline-text">
                    <h3>The Impact We're Making</h3>
                    <p>Today, thousands of people have used writeaspeech.org to deliver speeches that moved audiences, celebrated special moments, and advanced their careers.</p>
                    <ul className="timeline-points">
                      <li>10,000+ speeches successfully delivered</li>
                      <li>98% customer satisfaction rate</li>
                      <li>Users across 50+ countries worldwide</li>
                      <li>Countless confidence transformations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className={`values-section-modern ${isVisible ? 'animate-in-delay-3' : ''}`}>
            <div className="values-header">
              <span className="section-badge">💎 Our Values</span>
              <h2 className="values-title">What drives us every day</h2>
              <p className="values-subtitle">The principles that guide our decisions and shape our product</p>
            </div>
            
            <div className="values-grid-modern">
              <div className="value-card-modern">
                <div className="value-header">
                  <div className="value-icon-modern">🎯</div>
                  <h3>Personalization First</h3>
                </div>
                <p>Every speech is unique because every person and every occasion is unique. We don't believe in one-size-fits-all solutions.</p>
                <div className="value-features">
                  <span className="feature-tag">Unique Voice</span>
                  <span className="feature-tag">Custom Style</span>
                  <span className="feature-tag">Personal Stories</span>
                </div>
              </div>
              
              <div className="value-card-modern">
                <div className="value-header">
                  <div className="value-icon-modern">🤝</div>
                  <h3>Accessibility for All</h3>
                </div>
                <p>Great speech writing shouldn't be a luxury. We make professional-quality speeches accessible to everyone, regardless of budget.</p>
                <div className="value-features">
                  <span className="feature-tag">Affordable</span>
                  <span className="feature-tag">Easy to Use</span>
                  <span className="feature-tag">No Barriers</span>
                </div>
              </div>
              
              <div className="value-card-modern">
                <div className="value-header">
                  <div className="value-icon-modern">✨</div>
                  <h3>Quality Excellence</h3>
                </div>
                <p>We're committed to delivering speeches that not only meet but exceed expectations. Your success is our success.</p>
                <div className="value-features">
                  <span className="feature-tag">High Standards</span>
                  <span className="feature-tag">Continuous Improvement</span>
                  <span className="feature-tag">Expert Quality</span>
                </div>
              </div>
              
              <div className="value-card-modern">
                <div className="value-header">
                  <div className="value-icon-modern">🛡️</div>
                  <h3>Privacy Protection</h3>
                </div>
                <p>Your personal stories and information are sacred. We protect your privacy and never share your content without permission.</p>
                <div className="value-features">
                  <span className="feature-tag">Secure</span>
                  <span className="feature-tag">Confidential</span>
                  <span className="feature-tag">Your Data</span>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className={`team-section-modern ${isVisible ? 'animate-in-delay-4' : ''}`}>
            <div className="team-header">
              <span className="section-badge">👥 Our Team</span>
              <h2 className="team-title">Meet the people behind writeaspeech.org</h2>
              <p className="team-subtitle">A passionate team dedicated to helping you find your voice</p>
            </div>
            
            <div className="team-grid-modern">
              <div className="team-card-modern">
                <div className="member-avatar-modern">
                  <div className="member-photo-container">
                    <img 
                      src={ceoImage} 
                      alt="Andrew Nolan - Founder & CEO" 
                      className="member-photo"
                    />
                  </div>
                  <div className="member-status">
                    <span className="status-dot"></span>
                    <span>Available</span>
                  </div>
                </div>
                <div className="member-content">
                  <h3 className="member-name">Andrew Nolan</h3>
                  <p className="member-role">Founder & CEO</p>
                  <p className="member-bio">Former public speaking coach with 10+ years helping people overcome their fear of speaking. Passionate about making great communication accessible to everyone.</p>
                  <div className="member-expertise">
                    <span className="expertise-tag">Public Speaking</span>
                    <span className="expertise-tag">Leadership</span>
                    <span className="expertise-tag">Product Vision</span>
                  </div>
                </div>
              </div>
              
              <div className="team-card-modern">
                <div className="member-avatar-modern">
                  <div className="member-photo-container">
                    <img 
                      src={headOfAiImage} 
                      alt="Sarah Chen - Head of AI & Product" 
                      className="member-photo"
                    />
                  </div>
                  <div className="member-status">
                    <span className="status-dot"></span>
                    <span>Available</span>
                  </div>
                </div>
                <div className="member-content">
                  <h3 className="member-name">Sarah Chen</h3>
                  <p className="member-role">Head of AI & Product</p>
                  <p className="member-bio">AI researcher and former speechwriter who believes technology should enhance human creativity, not replace it. Leads our AI development and product strategy.</p>
                  <div className="member-expertise">
                    <span className="expertise-tag">AI Development</span>
                    <span className="expertise-tag">NLP</span>
                    <span className="expertise-tag">Product Strategy</span>
                  </div>
                </div>
              </div>
              
              <div className="team-card-modern">
                <div className="member-avatar-modern">
                  <div className="member-photo-container">
                    <img 
                      src={headOfDesignImage} 
                      alt="Marcus Rodriguez - Head of Design" 
                      className="member-photo"
                    />
                  </div>
                  <div className="member-status">
                    <span className="status-dot"></span>
                    <span>Available</span>
                  </div>
                </div>
                <div className="member-content">
                  <h3 className="member-name">Marcus Rodriguez</h3>
                  <p className="member-role">Head of Design</p>
                  <p className="member-bio">User experience designer focused on making complex technology feel simple and intuitive. Ensures every interaction with our platform is smooth and enjoyable.</p>
                  <div className="member-expertise">
                    <span className="expertise-tag">UX Design</span>
                    <span className="expertise-tag">User Research</span>
                    <span className="expertise-tag">Interface Design</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className={`technology-section-modern ${isVisible ? 'animate-in-delay-5' : ''}`}>
            <div className="tech-container">
              <div className="tech-header">
                <span className="section-badge">🤖 Our Technology</span>
                <h2 className="tech-title">AI that understands your unique voice</h2>
                <p className="tech-subtitle">Cutting-edge technology that creates speeches that sound authentically like you</p>
              </div>
              
              <div className="tech-grid">
                <div className="tech-card">
                  <div className="tech-icon-modern">🧠</div>
                  <h3>Natural Language Processing</h3>
                  <p>Advanced AI that understands context, nuance, and the subtle art of persuasive communication.</p>
                </div>
                <div className="tech-card">
                  <div className="tech-icon-modern">🎨</div>
                  <h3>Style Analysis</h3>
                  <p>Machine learning algorithms that adapt to your unique communication style and preferences.</p>
                </div>
                <div className="tech-card">
                  <div className="tech-icon-modern">❤️</div>
                  <h3>Emotional Intelligence</h3>
                  <p>Smart tone matching that ensures your speech resonates perfectly with your audience and occasion.</p>
                </div>
                <div className="tech-card">
                  <div className="tech-icon-modern">📐</div>
                  <h3>Speech Structure</h3>
                  <p>Proven frameworks and storytelling techniques for maximum impact and memorable delivery.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className={`final-about-cta ${isVisible ? 'animate-in-delay-6' : ''}`}>
            <div className="about-cta-container">
              <div className="cta-background-about">
                <div className="cta-content-about">
                  <div className="cta-badge-about">🚀 Ready to Get Started?</div>
                  <h2 className="cta-title-about">Join our community of confident speakers</h2>
                  <p className="cta-description-about">
                    Become part of a growing community of people who trust writeaspeech.org 
                    to help them share their stories with confidence and impact.
                  </p>
                  
                  <div className="about-cta-stats">
                    <div className="cta-stat">
                      <span className="cta-stat-number">10,000+</span>
                      <span className="cta-stat-label">Success Stories</span>
                    </div>
                    <div className="cta-stat">
                      <span className="cta-stat-number">98%</span>
                      <span className="cta-stat-label">Satisfaction Rate</span>
                    </div>
                    <div className="cta-stat">
                      <span className="cta-stat-number">50+</span>
                      <span className="cta-stat-label">Countries</span>
                    </div>
                  </div>

                  <div className="about-cta-buttons">
                    <Link to="/builder" className="primary-about-cta-button">
                      <span className="cta-button-text">Create Your First Speech</span>
                      <span className="cta-button-price">Only $19</span>
                    </Link>
                    <Link to="/pricing" className="secondary-about-cta-button">
                      <span className="pricing-icon">💰</span>
                      <span>View Pricing Details</span>
                    </Link>
                  </div>

                  <div className="about-cta-features">
                    <div className="feature-item-cta">
                      <span className="feature-icon">⚡</span>
                      <span>Instant Generation</span>
                    </div>
                    <div className="feature-item-cta">
                      <span className="feature-icon">🛡️</span>
                      <span>30-Day Guarantee</span>
                    </div>
                    <div className="feature-item-cta">
                      <span className="feature-icon">🔄</span>
                      <span>Unlimited Revisions</span>
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

export default AboutPage;
