import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1 className="page-title">About writeaspeech.org</h1>
          <p className="page-subtitle">
            Empowering people to deliver memorable speeches with confidence, one word at a time.
          </p>
        </section>

        {/* Mission Section */}
        <section className="about-mission">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                We believe that everyone has a story worth telling and the right to tell it with confidence. 
                Public speaking shouldn't be a barrier to sharing your thoughts, celebrating special moments, 
                or advancing your career.
              </p>
              <p>
                writeaspeech.org was born from a simple observation: most people dread public speaking, 
                but they don't have to. With the right preparation, tools, and guidance, anyone can deliver 
                a speech that resonates with their audience and leaves a lasting impression.
              </p>
            </div>
            <div className="mission-visual">
              <div className="mission-icon">🎯</div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <h2>Our Story</h2>
          <div className="story-timeline">
            <div className="story-item">
              <div className="story-year">2023</div>
              <div className="story-content">
                <h3>The Problem We Saw</h3>
                <p>
                  After witnessing countless friends and colleagues struggle with wedding speeches, 
                  work presentations, and special occasion toasts, we realized there was a gap in the market. 
                  Professional speech writers were expensive and impersonal, while generic templates lacked 
                  the personal touch that makes speeches memorable.
                </p>
              </div>
            </div>
            <div className="story-item">
              <div className="story-year">2024</div>
              <div className="story-content">
                <h3>The Solution We Built</h3>
                <p>
                  We developed an AI-powered platform that combines the personalization of a professional 
                  speech writer with the convenience and affordability of modern technology. Our system 
                  learns from your responses to create speeches that sound like you, not a robot.
                </p>
              </div>
            </div>
            <div className="story-item">
              <div className="story-year">Today</div>
              <div className="story-content">
                <h3>The Impact We're Making</h3>
                <p>
                  Thousands of people have used writeaspeech.org to deliver speeches that moved audiences, 
                  celebrated special moments, and advanced their careers. We're proud to be part of their 
                  success stories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Personalization</h3>
              <p>
                Every speech is unique because every person and every occasion is unique. 
                We don't believe in one-size-fits-all solutions.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Accessibility</h3>
              <p>
                Great speech writing shouldn't be a luxury. We make professional-quality 
                speeches accessible to everyone, regardless of budget.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>
                We're committed to delivering speeches that not only meet but exceed 
                expectations. Your success is our success.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Privacy</h3>
              <p>
                Your personal stories and information are sacred. We protect your privacy 
                and never share your content without permission.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">👨‍💻</div>
              </div>
              <div className="member-info">
                <h3>Andrew Nolan</h3>
                <p className="member-role">Founder & CEO</p>
                <p className="member-bio">
                  Former public speaking coach with 10+ years helping people overcome 
                  their fear of speaking. Passionate about making great communication 
                  accessible to everyone.
                </p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">👩‍💻</div>
              </div>
              <div className="member-info">
                <h3>Sarah Chen</h3>
                <p className="member-role">Head of AI & Product</p>
                <p className="member-bio">
                  AI researcher and former speechwriter who believes technology should 
                  enhance human creativity, not replace it. Leads our AI development 
                  and product strategy.
                </p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">👨‍🎨</div>
              </div>
              <div className="member-info">
                <h3>Marcus Rodriguez</h3>
                <p className="member-role">Head of Design</p>
                <p className="member-bio">
                  User experience designer focused on making complex technology feel 
                  simple and intuitive. Ensures every interaction with our platform 
                  is smooth and enjoyable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="about-technology">
          <h2>Our Technology</h2>
          <div className="tech-content">
            <div className="tech-text">
              <p>
                We use cutting-edge AI technology to understand your unique voice and style, 
                then craft speeches that sound authentically like you. Our system combines:
              </p>
              <ul className="tech-features">
                <li><strong>Natural Language Processing:</strong> Understanding context and nuance</li>
                <li><strong>Style Analysis:</strong> Learning your communication preferences</li>
                <li><strong>Emotional Intelligence:</strong> Matching tone to occasion and audience</li>
                <li><strong>Speech Structure:</strong> Following proven frameworks for maximum impact</li>
              </ul>
            </div>
            <div className="tech-visual">
              <div className="tech-icon">🤖</div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Speeches Created</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Countries Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Ready to Join Our Community?</h2>
            <p>
              Become part of a growing community of confident speakers who trust 
              writeaspeech.org to help them share their stories.
            </p>
            <div className="cta-buttons">
              <Link to="/builder" className="btn btn-primary btn-large">
                Create Your First Speech
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

export default AboutPage;
