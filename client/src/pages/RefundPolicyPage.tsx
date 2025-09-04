import { Link } from 'react-router-dom';

const RefundPolicyPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="container">
        {/* Header Section */}
        <section className="refund-header">
          <h1 className="page-title">Refund Policy</h1>
          <p className="page-subtitle">
            Last updated: December 2024
          </p>
        </section>

        {/* Introduction */}
        <section className="refund-intro">
          <p>
            At writeaspeech.org, we stand behind our service and want you to be completely 
            satisfied with your purchase. This Refund Policy outlines the terms and conditions 
            for refunds and our commitment to your satisfaction.
          </p>
        </section>

        {/* Money-Back Guarantee */}
        <section className="refund-section">
          <h2>30-Day Money-Back Guarantee</h2>
          <div className="guarantee-highlight">
            <div className="guarantee-icon">🛡️</div>
            <div className="guarantee-content">
              <h3>We're confident you'll love our service</h3>
              <p>
                If you're not completely satisfied with writeaspeech.org within 30 days of 
                your purchase, we'll provide a full refund, no questions asked.
              </p>
            </div>
          </div>
        </section>

        {/* Refund Eligibility */}
        <section className="refund-section">
          <h2>Refund Eligibility</h2>
          
          <h3>You are eligible for a refund if:</h3>
          <ul className="eligibility-list">
            <li>
              <span className="check-icon">✅</span>
              You request a refund within 30 days of your purchase
            </li>
            <li>
              <span className="check-icon">✅</span>
              You are not satisfied with the quality of your generated speech
            </li>
            <li>
              <span className="check-icon">✅</span>
              Our service does not meet your expectations
            </li>
            <li>
              <span className="check-icon">✅</span>
              You experience technical issues that we cannot resolve
            </li>
            <li>
              <span className="check-icon">✅</span>
              You change your mind about the service (within 30 days)
            </li>
          </ul>

          <h3>Refunds are not available for:</h3>
          <ul className="non-eligibility-list">
            <li>
              <span className="x-icon">❌</span>
              Requests made after 30 days from purchase
            </li>
            <li>
              <span className="x-icon">❌</span>
              Speeches that have been successfully generated and downloaded
            </li>
            <li>
              <span className="x-icon">❌</span>
              Accounts that have been terminated for Terms of Service violations
            </li>
            <li>
              <span className="x-icon">❌</span>
              Duplicate purchases made by mistake
            </li>
          </ul>
        </section>

        {/* How to Request a Refund */}
        <section className="refund-section">
          <h2>How to Request a Refund</h2>
          
          <div className="refund-steps">
            <div className="refund-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Contact Our Support Team</h3>
                <p>
                  Send an email to <a href="mailto:refunds@writeaspeech.org">refunds@writeaspeech.org</a> 
                  with your refund request. Please include:
                </p>
                <ul>
                  <li>Your account email address</li>
                  <li>Order number or transaction ID</li>
                  <li>Reason for the refund request</li>
                  <li>Any additional details that would help us understand your concern</li>
                </ul>
              </div>
            </div>

            <div className="refund-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Review and Processing</h3>
                <p>
                  Our support team will review your request within 24-48 hours. We may ask 
                  for additional information to better understand your situation and ensure 
                  we can improve our service.
                </p>
              </div>
            </div>

            <div className="refund-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Refund Processing</h3>
                <p>
                  Once approved, your refund will be processed within 5-10 business days. 
                  The refund will be credited to the original payment method used for the purchase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Timeline */}
        <section className="refund-section">
          <h2>Refund Timeline</h2>
          
          <div className="timeline-grid">
            <div className="timeline-item">
              <div className="timeline-time">Within 24-48 hours</div>
              <div className="timeline-action">Refund request reviewed</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">Within 5-10 business days</div>
              <div className="timeline-action">Refund processed to original payment method</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-time">Additional 3-5 business days</div>
              <div className="timeline-action">Refund appears on your statement (varies by bank)</div>
            </div>
          </div>

          <div className="timeline-note">
            <p>
              <strong>Note:</strong> Refund processing times may vary depending on your payment 
              method and financial institution. Credit card refunds typically appear within 
              3-5 business days, while PayPal refunds may be instant.
            </p>
          </div>
        </section>

        {/* Partial Refunds */}
        <section className="refund-section">
          <h2>Partial Refunds</h2>
          <p>
            In certain circumstances, we may offer partial refunds instead of full refunds:
          </p>
          
          <ul>
            <li><strong>Technical Issues:</strong> If you experienced technical problems that were resolved, we may offer a partial refund as a goodwill gesture</li>
            <li><strong>Service Interruption:</strong> If our service was unavailable for an extended period, we may provide a partial refund for the downtime</li>
            <li><strong>Feature Limitations:</strong> If specific features were not working as expected, we may offer a partial refund for those features</li>
          </ul>

          <p>
            Partial refunds are determined on a case-by-case basis and are at our discretion. 
            We will always work with you to find a fair resolution.
          </p>
        </section>

        {/* Chargebacks and Disputes */}
        <section className="refund-section">
          <h2>Chargebacks and Payment Disputes</h2>
          <p>
            If you initiate a chargeback or payment dispute with your bank or credit card 
            company, please contact us first. We're committed to resolving issues quickly 
            and amicably.
          </p>
          
          <div className="dispute-warning">
            <h3>Important Information</h3>
            <ul>
              <li>Chargebacks may result in account suspension</li>
              <li>We may request additional documentation for dispute resolution</li>
              <li>False chargebacks may result in permanent account termination</li>
              <li>We always prefer to resolve issues directly through our support team</li>
            </ul>
          </div>
        </section>

        {/* Refund Exceptions */}
        <section className="refund-section">
          <h2>Special Circumstances</h2>
          
          <h3>Duplicate Purchases</h3>
          <p>
            If you accidentally made duplicate purchases, contact us immediately. We'll 
            refund the duplicate charges and ensure you have access to the service.
          </p>

          <h3>Fraudulent Transactions</h3>
          <p>
            If you believe your account was used fraudulently, contact us immediately. 
            We'll investigate and take appropriate action, including refunding unauthorized 
            charges.
          </p>

          <h3>Technical Difficulties</h3>
          <p>
            If you experience technical issues that prevent you from using our service, 
            we'll work to resolve them quickly. If we cannot resolve the issues, we'll 
            provide a full refund.
          </p>
        </section>

        {/* Contact Information */}
        <section className="refund-section">
          <h2>Contact Us for Refunds</h2>
          <p>
            If you need to request a refund or have questions about our refund policy, 
            please contact us:
          </p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <h3>Email Support</h3>
              <p><a href="mailto:refunds@writeaspeech.org">refunds@writeaspeech.org</a></p>
              <p>Response within 24-48 hours</p>
            </div>
            <div className="contact-method">
              <h3>General Support</h3>
              <p><a href="mailto:support@writeaspeech.org">support@writeaspeech.org</a></p>
              <p>For general questions and assistance</p>
            </div>
            <div className="contact-method">
              <h3>Phone Support</h3>
              <p><a href="tel:+1-555-SPEECH">+1 (555) SPEECH</a></p>
              <p>Mon-Fri, 9AM-6PM EST</p>
            </div>
          </div>
        </section>

        {/* Satisfaction Commitment */}
        <section className="refund-section">
          <h2>Our Commitment to Your Satisfaction</h2>
          <div className="satisfaction-commitment">
            <p>
              We're committed to providing you with the best possible service. If you're 
              not satisfied with your experience, we want to know about it. Your feedback 
              helps us improve our service for everyone.
            </p>
            
            <div className="commitment-points">
              <div className="commitment-point">
                <span className="commitment-icon">🎯</span>
                <span>We listen to your feedback and concerns</span>
              </div>
              <div className="commitment-point">
                <span className="commitment-icon">⚡</span>
                <span>We respond quickly to refund requests</span>
              </div>
              <div className="commitment-point">
                <span className="commitment-icon">🤝</span>
                <span>We work with you to find fair solutions</span>
              </div>
              <div className="commitment-point">
                <span className="commitment-icon">🔄</span>
                <span>We continuously improve based on your input</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="refund-cta">
          <div className="cta-content">
            <h2>Ready to Try Our Service?</h2>
            <p>
              With our 30-day money-back guarantee, you have nothing to lose. 
              Create your perfect speech today with complete confidence.
            </p>
            <div className="cta-buttons">
              <Link to="/builder" className="btn btn-primary btn-large">
                Start Creating My Speech
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

export default RefundPolicyPage;
