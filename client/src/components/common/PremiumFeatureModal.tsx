import React from 'react';
import { Link } from 'react-router-dom';

interface PremiumFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
  featureIcon: string;
}

const PremiumFeatureModal: React.FC<PremiumFeatureModalProps> = ({
  isOpen,
  onClose,
  featureName,
  featureDescription,
  featureIcon,
}) => {
  if (!isOpen) return null;

  const features = [
    {
      icon: '📄',
      title: 'Professional Export Formats',
      description: 'Export as Word, PDF, or formatted cue cards'
    },
    {
      icon: '🎯',
      title: 'Advanced Practice Tools',
      description: 'Teleprompter, pacing analysis, and audio recording'
    },
    {
      icon: '✏️',
      title: 'Full Speech Editing',
      description: 'Edit and regenerate sections of your speech'
    },
    {
      icon: '💾',
      title: 'Save & Organize',
      description: 'Save unlimited speeches to your dashboard'
    },
    {
      icon: '🚫',
      title: 'No Watermarks',
      description: 'Clean, professional output without trial markings'
    },
    {
      icon: '📏',
      title: 'Unlimited Length',
      description: 'Create speeches of any length for your needs'
    }
  ];

  return (
    <div className="premium-modal-overlay" onClick={onClose}>
      <div className="premium-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="premium-modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="premium-modal-header">
          <div className="feature-highlight">
            <div className="feature-icon-large">{featureIcon}</div>
            <h2>Upgrade to Access {featureName}</h2>
            <p className="feature-description">{featureDescription}</p>
          </div>
        </div>

        <div className="premium-modal-content">
          <div className="unlock-message">
            <h3>🔓 Unlock All Premium Features</h3>
            <p>Get access to professional tools that make your speech creation and practice experience exceptional.</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pricing-options">
            <div className="pricing-card recommended">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <div className="pricing-icon">💳</div>
                <h3>Pay-Per-Speech</h3>
                <div className="pricing-amount">
                  <span className="currency">$</span>
                  <span className="amount">19</span>
                </div>
                <p className="pricing-description">Perfect for one-time events</p>
              </div>
              <ul className="pricing-features">
                <li>✓ Complete unlimited-length speech</li>
                <li>✓ All export formats (Word, PDF, cue cards)</li>
                <li>✓ Full practice toolkit</li>
                <li>✓ Professional editing tools</li>
                <li>✓ No watermarks</li>
              </ul>
              <Link 
                to="/builder?plan=premium" 
                className="btn btn-primary btn-large"
                onClick={onClose}
              >
                Create Premium Speech - $19
              </Link>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <div className="pricing-icon">📅</div>
                <h3>Monthly Subscription</h3>
                <div className="pricing-amount">
                  <span className="currency">$</span>
                  <span className="amount">9.99</span>
                  <span className="period">/month</span>
                </div>
                <p className="pricing-description">For regular speech creators</p>
              </div>
              <ul className="pricing-features">
                <li>✓ 5 premium speeches per month</li>
                <li>✓ All premium features included</li>
                <li>✓ Priority customer support</li>
                <li>✓ Cancel anytime</li>
              </ul>
              <Link 
                to="/builder?plan=subscription" 
                className="btn btn-secondary btn-large"
                onClick={onClose}
              >
                Start Subscription - $9.99/mo
              </Link>
            </div>
          </div>
        </div>

        <div className="premium-modal-footer">
          <div className="trial-info">
            <p><strong>Continue with Free Trial:</strong> Create short speeches with watermarks, or upgrade for the full experience.</p>
          </div>
          <div className="footer-actions">
            <button 
              className="btn btn-outline"
              onClick={onClose}
            >
              Continue with Free Trial
            </button>
            <Link 
              to="/pricing" 
              className="btn btn-link"
              onClick={onClose}
            >
              View All Pricing Options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatureModal;
