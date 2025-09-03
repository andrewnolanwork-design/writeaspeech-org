import { useState } from 'react';
import { generateSpeech } from '../api';
import { useAuth } from '../contexts/AuthContext';
import PaymentModal from '../components/payment/PaymentModal';
import type { SpeechData } from '../api';

// Using SpeechData interface from API

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
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const totalSteps = 5;

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return speechData.occasion !== '';
      case 2: return speechData.style !== '';
      case 3: return speechData.length !== '';
      case 4: return speechData.audience.trim() !== '';
      case 5: return true; // Optional step
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps && isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGenerateSpeech = async () => {
    console.log('🎯 handleGenerateSpeech called');
    
    // Validate all required fields are filled
    if (!speechData.occasion || !speechData.style || !speechData.length || !speechData.audience.trim()) {
      setError('Please complete all required fields before generating your speech.');
      return;
    }
    
    console.log('✅ Validation passed, showing payment modal');
    setError(null);
    setShowPaymentModal(true);
    console.log('💳 showPaymentModal set to:', true);
  };

  const handlePaymentSuccess = async (speechId: string) => {
    setShowPaymentModal(false);
    
    try {
      setIsLoading(true);
      
      // Generate the actual speech
      const speechResponse = await generateSpeech(speechData);
      console.log('Speech generated successfully:', speechResponse.speech);
      
      // Show success message
      alert(`Payment successful! Speech generated successfully! 
      
Title: ${speechResponse.speech.title || 'Your Speech'}
Word Count: ${speechResponse.speech.wordCount}
Duration: ${speechResponse.speech.estimatedDuration}

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
              {['Wedding', 'Birthday', 'Retirement', 'Business Event', 'Graduation', 'Other'].map((occasion) => (
                <button
                  key={occasion}
                  className={`occasion-card ${speechData.occasion === occasion ? 'selected' : ''}`}
                  onClick={() => setSpeechData({ ...speechData, occasion })}
                >
                  {occasion}
                </button>
              ))}
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
            <h2>Tell us about your audience</h2>
            <p>Help us tailor the content to your listeners</p>
            <textarea
              className="audience-input"
              value={speechData.audience}
              onChange={(e) => setSpeechData({ ...speechData, audience: e.target.value })}
              placeholder="Who will be listening? (e.g., family and friends at a wedding, colleagues at a work event, etc.)"
              rows={4}
            />
          </div>
        );
      
      case 5:
        return (
          <div className="step-content">
            <h2>What key points do you want to include?</h2>
            <p>Share the main messages or stories you'd like in your speech</p>
            <div className="key-points-section">
              <textarea
                className="key-points-input"
                value={speechData.key_points.join('\n')}
                onChange={(e) => setSpeechData({ 
                  ...speechData, 
                  key_points: e.target.value.split('\n').filter(point => point.trim() !== '') 
                })}
                placeholder="Share any specific points, memories, or messages you want to include... (one per line)"
                rows={6}
              />
              <div className="personal-touches">
                <h3>Personal Stories (Optional)</h3>
                <textarea
                  value={speechData.personal_stories.join('\n')}
                  onChange={(e) => setSpeechData({ 
                    ...speechData, 
                    personal_stories: e.target.value.split('\n').filter(story => story.trim() !== '') 
                  })}
                  placeholder="Any personal anecdotes or funny stories you'd like to include? (one per line)"
                  rows={4}
                />
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
              disabled={!speechData.audience.trim() || isLoading}
            >
              {isLoading ? 'Processing...' : 'Generate My Speech - $39'}
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
