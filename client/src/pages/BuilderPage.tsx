import { useState } from 'react';

interface SpeechData {
  occasion: string;
  style: string;
  length: string;
  audience: string;
  key_points: string[];
  personal_stories: string[];
}

const BuilderPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [speechData, setSpeechData] = useState<SpeechData>({
    occasion: '',
    style: '',
    length: '',
    audience: '',
    key_points: [],
    personal_stories: []
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
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
                placeholder="Share any specific points, memories, or messages you want to include..."
                rows={6}
              />
              <div className="personal-touches">
                <h3>Personal Stories (Optional)</h3>
                <textarea
                  placeholder="Any personal anecdotes or funny stories you'd like to include?"
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
              disabled={!speechData.occasion && currentStep === 1}
            >
              Next
            </button>
          ) : (
            <button className="btn btn-primary btn-large">
              Generate My Speech - $39
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
