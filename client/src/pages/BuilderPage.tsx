import { useState, useEffect } from 'react';
import { generateSpeech } from '../api';
import { useAuth } from '../contexts/AuthContext';
import PaymentModal from '../components/payment/PaymentModal';
import type { SpeechData } from '../api';

// Using SpeechData interface from API

// Define pricing plan types
type PricingPlan = 'free' | 'premium' | 'subscription';

interface PlanDetails {
  name: string;
  price: string;
  buttonText: string;
  description: string;
  limitations?: string[];
}

const BuilderPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [speechData, setSpeechData] = useState<SpeechData>({
    occasion: '',
    style: '',
    length: '',
    audience: '',
    key_points: [],
    personal_stories: []
  });
  
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [customAudience, setCustomAudience] = useState('');
  const [customOccasion, setCustomOccasion] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Pricing plan state
  const [currentPlan, setCurrentPlan] = useState<PricingPlan>('premium'); // Default to premium

  // Pricing plan configurations
  const planDetails: Record<PricingPlan, PlanDetails> = {
    free: {
      name: 'Free Trial',
      price: 'Free',
      buttonText: 'Generate Free Speech',
      description: 'Create a short speech (300 words max) with watermark',
      limitations: ['300 words maximum', 'Watermarked output', 'Limited export options']
    },
    premium: {
      name: 'Pay-Per-Speech',
      price: '$24.99',
      buttonText: 'Generate My Speech - $24.99',
      description: 'Complete unlimited-length speech with all features'
    },
    subscription: {
      name: 'Monthly Subscription',
      price: '$9.99/month',
      buttonText: 'Generate My Speech - $9.99/month',
      description: '5 speeches per month with premium features'
    }
  };

  // Detect pricing plan from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan') as PricingPlan;
    
    if (planParam && ['free', 'premium', 'subscription'].includes(planParam)) {
      setCurrentPlan(planParam);
    }
  }, []);

  const totalSteps = 7; // Increased from 5 to 7 steps

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return speechData.occasion !== '' || customOccasion.trim() !== '';
      case 2: return speechData.style !== '';
      case 3: return speechData.length !== '';
      case 4: return selectedAudiences.length > 0 || customAudience.trim() !== '';
      case 5: return speechData.key_points.length > 0;
      case 6: return true; // Personal stories optional
      case 7: return true; // Review step
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps && isStepValid()) {
      // Update speechData based on current step before moving to next
      if (currentStep === 1) {
        setSpeechData({ ...speechData, occasion: speechData.occasion || customOccasion });
      } else if (currentStep === 4) {
        const audienceText = [...selectedAudiences, customAudience].filter(Boolean).join(', ');
        setSpeechData({ ...speechData, audience: audienceText });
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleAudienceToggle = (audience: string) => {
    setSelectedAudiences(prev => 
      prev.includes(audience) 
        ? prev.filter(a => a !== audience)
        : [...prev, audience]
    );
  };

  const getGuidanceText = () => {
    const occasion = speechData.occasion || customOccasion;
    const style = speechData.style;
    
    if (currentStep === 5) { // Key points
      if (occasion.toLowerCase().includes('wedding')) {
        return style === 'Heartfelt' 
          ? "Share meaningful moments, how you know the couple, what makes their relationship special, and your hopes for their future together."
          : "Include funny stories about the couple, embarrassing moments (keep it light!), and witty observations about their relationship.";
      } else if (occasion.toLowerCase().includes('retirement')) {
        return "Highlight career achievements, memorable moments working together, their impact on colleagues, and what they'll be missed for.";
      } else if (occasion.toLowerCase().includes('birthday')) {
        return "Share favorite memories, what makes them special, achievements you're proud of, and hopes for the year ahead.";
      }
      return "What are the main messages you want to convey? Think about why this person/occasion is important and what you want people to remember.";
    } else if (currentStep === 6) { // Personal stories
      if (occasion.toLowerCase().includes('wedding')) {
        return "Share a story about how you met the couple, a funny moment from your friendship, or something that shows their character.";
      } else if (occasion.toLowerCase().includes('retirement')) {
        return "Tell a story that captures their work personality, a project you worked on together, or a moment that defines them professionally.";
      }
      return "Think of a specific moment or anecdote that illustrates your relationship with them or shows their character.";
    }
    return "";
  };

  const handleGenerateSpeech = async () => {
    console.log('🎯 handleGenerateSpeech called, plan:', currentPlan);
    
    // Validate all required fields are filled
    if (!speechData.occasion || !speechData.style || !speechData.length || !speechData.audience.trim()) {
      setError('Please complete all required fields before generating your speech.');
      return;
    }
    
    setError(null);
    
    // For free plan, generate speech directly without payment
    if (currentPlan === 'free') {
      console.log('✅ Free plan - generating speech directly');
      try {
        setIsLoading(true);
        
        // Generate the speech with free limitations
        const speechResponse = await generateSpeech({
          ...speechData,
          // Add free plan limitations
          additionalContext: 'FREE_TRIAL_300_WORDS_MAX'
        });
        
        console.log('Free speech generated successfully:', speechResponse.speech);
        alert(`Free speech generated successfully! Note: This is a watermarked trial version limited to 300 words.`);
        
      } catch (error) {
        console.error('Error generating free speech:', error);
        setError('Failed to generate speech. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // For paid plans, show payment modal
      console.log('✅ Paid plan - showing payment modal');
      setShowPaymentModal(true);
      console.log('💳 showPaymentModal set to:', true);
    }
  };

  const handlePaymentSuccess = async (speechId: string) => {
    setShowPaymentModal(false);
    
    try {
      setIsLoading(true);
      
      // Generate the actual speech
      const speechResponse = await generateSpeech(speechData);
      console.log('Speech generated successfully:', speechResponse.speech);
      console.log('Speech ID from payment:', speechId); // Use the speechId parameter
      
      // Show success message
      alert(`Payment successful! Speech generated successfully! 
      
Title: ${speechResponse.speech.title || 'Your Speech'}
Word Count: ${speechResponse.speech.wordCount}
Duration: ${speechResponse.speech.estimatedDuration}
Speech ID: ${speechId}

In a real implementation, you would be redirected to view your completed speech.`);
      
    } catch (error: any) {
      console.error('Error generating speech:', error);
      setError(error.message || 'There was an error generating your speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>What's the occasion?</h2>
            <p>Tell us about the event you're speaking at</p>
            <div className="occasion-grid">
              {['Wedding', 'Birthday', 'Retirement', 'Business Event', 'Graduation', 'Funeral', 'Anniversary', 'Promotion'].map((occasion) => (
                <button
                  key={occasion}
                  className={`occasion-card ${speechData.occasion === occasion ? 'selected' : ''}`}
                  onClick={() => setSpeechData({ ...speechData, occasion })}
                >
                  {occasion}
                </button>
              ))}
            </div>
            <div className="custom-input-section">
              <label>Other occasion:</label>
              <input
                type="text"
                value={customOccasion}
                onChange={(e) => setCustomOccasion(e.target.value)}
                placeholder="Enter custom occasion..."
                className="custom-input"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="step-content">
            <h2>What style fits your personality?</h2>
            <p>Choose the tone that feels most authentic to you</p>
            <div className="style-grid">
              {[
                { name: 'Heartfelt', desc: 'Emotional and sincere' },
                { name: 'Witty', desc: 'Funny and entertaining' },
                { name: 'Formal', desc: 'Professional and polished' },
                { name: 'Inspiring', desc: 'Motivational and uplifting' }
              ].map((style) => (
                <button
                  key={style.name}
                  className={`style-card ${speechData.style === style.name ? 'selected' : ''}`}
                  onClick={() => setSpeechData({ ...speechData, style: style.name })}
                >
                  <h3>{style.name}</h3>
                  <p>{style.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="step-content">
            <h2>How long should your speech be?</h2>
            <p>We'll help you hit the perfect timing</p>
            <div className="length-options">
              {[
                { duration: '2-3 minutes', words: '300-450 words', type: 'Short & Sweet' },
                { duration: '3-5 minutes', words: '450-750 words', type: 'Just Right' },
                { duration: '5-7 minutes', words: '750-1050 words', type: 'Detailed' }
              ].map((option) => (
                <button
                  key={option.duration}
                  className={`length-card ${speechData.length === option.duration ? 'selected' : ''}`}
                  onClick={() => setSpeechData({ ...speechData, length: option.duration })}
                >
                  <h3>{option.type}</h3>
                  <p>{option.duration}</p>
                  <span>{option.words}</span>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="step-content">
            <h2>Who will be your audience?</h2>
            <p>Select all that apply - this helps us tailor the tone and content</p>
            <div className="audience-grid">
              {['Family', 'Friends', 'Work Colleagues', 'Business Partners', 'Customers/Clients', 'Community Members', 'Students', 'Industry Professionals'].map((audience) => (
                <button
                  key={audience}
                  className={`audience-card ${selectedAudiences.includes(audience) ? 'selected' : ''}`}
                  onClick={() => handleAudienceToggle(audience)}
                >
                  {audience}
                </button>
              ))}
            </div>
            <div className="custom-input-section">
              <label>Additional audience details:</label>
              <input
                type="text"
                value={customAudience}
                onChange={(e) => setCustomAudience(e.target.value)}
                placeholder="Any other audience details..."
                className="custom-input"
              />
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="step-content">
            <h2>What key points do you want to include?</h2>
            <div className="guidance-text">
              <p>{getGuidanceText()}</p>
            </div>
            <div className="key-points-section">
              <textarea
                className="key-points-input"
                value={speechData.key_points.join('\n')}
                onChange={(e) => setSpeechData({ 
                  ...speechData, 
                  key_points: e.target.value.split('\n').filter(point => point.trim() !== '') 
                })}
                placeholder="Enter your key points... (one per line)"
                rows={8}
              />
              <div className="help-text">
                <small>💡 Tip: Add each main point on a separate line. We'll help you develop these into compelling content.</small>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="step-content">
            <h2>Personal Stories (Optional)</h2>
            <div className="guidance-text">
              <p>{getGuidanceText()}</p>
            </div>
            <div className="personal-stories-section">
              <textarea
                className="personal-stories-input"
                value={speechData.personal_stories.join('\n')}
                onChange={(e) => setSpeechData({ 
                  ...speechData, 
                  personal_stories: e.target.value.split('\n').filter(story => story.trim() !== '') 
                })}
                placeholder="Share personal anecdotes or stories... (one per line)"
                rows={6}
              />
              <div className="help-text">
                <small>💡 Personal stories make speeches memorable. Even one good story can make a big impact!</small>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="step-content">
            <h2>Review Your Speech Details</h2>
            <p>Everything looks good? Let's create your personalized speech!</p>
            
            {/* Pricing Plan Indicator */}
            <div className={`pricing-plan-indicator ${currentPlan}`}>
              <div className="plan-header">
                <h3>📋 Selected Plan: {planDetails[currentPlan].name}</h3>
                <div className="plan-price">{planDetails[currentPlan].price}</div>
              </div>
              <p className="plan-description">{planDetails[currentPlan].description}</p>
              {planDetails[currentPlan].limitations && (
                <div className="plan-limitations">
                  <strong>Note:</strong>
                  <ul>
                    {planDetails[currentPlan].limitations!.map((limitation, index) => (
                      <li key={index}>{limitation}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="review-summary">
              <div className="summary-item">
                <strong>Occasion:</strong> {speechData.occasion || customOccasion}
              </div>
              <div className="summary-item">
                <strong>Style:</strong> {speechData.style}
              </div>
              <div className="summary-item">
                <strong>Length:</strong> {speechData.length}
              </div>
              <div className="summary-item">
                <strong>Audience:</strong> {[...selectedAudiences, customAudience].filter(Boolean).join(', ')}
              </div>
              <div className="summary-item">
                <strong>Key Points:</strong> {speechData.key_points.length} points added
              </div>
              <div className="summary-item">
                <strong>Personal Stories:</strong> {speechData.personal_stories.length} stories added
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="builder-page">
      <div className="builder-container">
        <div className="builder-header">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="step-indicator">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        <div className="builder-content">
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button 
                className="btn btn-secondary btn-small"
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </div>
          )}
          {renderStep()}
        </div>

        <div className="builder-navigation">
          {currentStep > 1 && (
            <button 
              className="btn btn-secondary" 
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          
          <div className="nav-spacer" />
          
          {currentStep < totalSteps ? (
            <button 
              className="btn btn-primary" 
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              Next
            </button>
          ) : (
            <button 
              className="btn btn-primary btn-large"
              onClick={handleGenerateSpeech}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : planDetails[currentPlan].buttonText}
            </button>
          )}
        </div>

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          speechData={speechData}
          userId={currentUser?.uid}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </div>
  );
};

export default BuilderPage;
