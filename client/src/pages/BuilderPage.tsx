import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateSpeech } from '../api';
import { useAuth } from '../contexts/AuthContext';
import PaymentModal from '../components/payment/PaymentModal';
import type { SpeechData, KeyPoint, PersonalStory, Person } from '../api/speech';

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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [speechData, setSpeechData] = useState<SpeechData>({
    occasion: '',
    style: '',
    length: '',
    audience: '',
    people: [],
    key_points: [],
    personal_stories: []
  });
  
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [customAudience, setCustomAudience] = useState('');
  const [customOccasion, setCustomOccasion] = useState('');
  
  // State for managing dynamic content
  const [peopleInputs, setPeopleInputs] = useState([
    { name: '', relationship: '' },
    { name: '', relationship: '' },
    { name: '', relationship: '' },
    { name: '', relationship: '' }
  ]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedStoryPrompts, setSelectedStoryPrompts] = useState<string[]>([]);
  
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
      price: '$19',
      buttonText: 'Generate My Speech - $19',
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

  const totalSteps = 8; // Increased to accommodate people step and combined content step

  // Function to display generated speech content
  const displayGeneratedSpeech = (speech: any) => {
    // Navigate to the speech viewer page
    navigate(`/speech/${speech.id}`);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return speechData.occasion !== '' || customOccasion.trim() !== '';
      case 2: return speechData.style !== '';
      case 3: return speechData.length !== '';
      case 4: return selectedAudiences.length > 0 || customAudience.trim() !== '';
      case 5: return peopleInputs.some(p => p.name.trim() !== ''); // At least one person name required
      case 6: return speechData.key_points.length > 0 || speechData.personal_stories.length > 0; // At least some content
      case 7: return true; // Review step
      case 8: return true; // Final review step
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
      } else if (currentStep === 5) {
        // Convert people inputs to Person objects
        const people: Person[] = peopleInputs
          .filter(p => p.name.trim() !== '')
          .map((p, index) => ({
            id: `person_${index}_${Date.now()}`,
            name: p.name.trim(),
            relationship: p.relationship.trim() || undefined
          }));
        setSpeechData({ ...speechData, people });
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

  // Helper functions for managing people inputs
  const updatePersonInput = (index: number, field: 'name' | 'relationship', value: string) => {
    setPeopleInputs(prev => {
      const newInputs = [...prev];
      newInputs[index] = { ...newInputs[index], [field]: value };
      return newInputs;
    });
  };

  // Helper functions for managing key points
  const addKeyPoint = (text: string, isFromTheme: boolean = false) => {
    if (text.trim()) {
      const newKeyPoint: KeyPoint = {
        id: Date.now().toString(),
        text: text.trim(),
        detail: '',
        linkedPeople: []
      };
      setSpeechData(prev => ({
        ...prev,
        key_points: [...prev.key_points, newKeyPoint]
      }));
      
      if (isFromTheme) {
        setSelectedThemes(prev => [...prev, text]);
      }
    }
  };

  const updateKeyPoint = (pointId: string, updates: Partial<KeyPoint>) => {
    setSpeechData(prev => ({
      ...prev,
      key_points: prev.key_points.map(kp => 
        kp.id === pointId ? { ...kp, ...updates } : kp
      )
    }));
  };

  const removeKeyPoint = (pointId: string) => {
    setSpeechData(prev => ({
      ...prev,
      key_points: prev.key_points.filter(kp => kp.id !== pointId)
    }));
  };

  // Helper functions for managing personal stories
  const addPersonalStory = (text: string, isFromPrompt: boolean = false) => {
    if (text.trim()) {
      const newStory: PersonalStory = {
        id: Date.now().toString(),
        text: text.trim(),
        detail: '',
        linkedPeople: []
      };
      setSpeechData(prev => ({
        ...prev,
        personal_stories: [...prev.personal_stories, newStory]
      }));
      
      if (isFromPrompt) {
        setSelectedStoryPrompts(prev => [...prev, text]);
      }
    }
  };

  const updatePersonalStory = (storyId: string, updates: Partial<PersonalStory>) => {
    setSpeechData(prev => ({
      ...prev,
      personal_stories: prev.personal_stories.map(ps => 
        ps.id === storyId ? { ...ps, ...updates } : ps
      )
    }));
  };

  const removePersonalStory = (storyId: string) => {
    setSpeechData(prev => ({
      ...prev,
      personal_stories: prev.personal_stories.filter(ps => ps.id !== storyId)
    }));
  };

  // Helper functions for getting theme and story suggestions based on occasion and style
  const getThemeSuggestions = () => {
    const occasion = speechData.occasion || customOccasion;
    const style = speechData.style;
    
    const themes: Record<string, Record<string, string[]>> = {
      'Wedding': {
        'Heartfelt': ['Love story', 'Friendship journey', 'Future hopes', 'Family bonds', 'Shared values', 'Perfect match'],
        'Witty': ['Funny habits', 'Dating disasters', 'Couple quirks', 'Inside jokes', 'Wedding planning chaos', 'Perfect imperfections'],
        'Formal': ['Character testimonial', 'Shared achievements', 'Professional respect', 'Life partnership', 'Family honor'],
        'Inspiring': ['Overcoming challenges', 'Growing together', 'Dreams achieved', 'Love conquers all', 'Future possibilities']
      },
      'Birthday': {
        'Heartfelt': ['Cherished memories', 'Personal growth', 'Life impact', 'Friendship bonds', 'Special qualities', 'Grateful moments'],
        'Witty': ['Age jokes', 'Embarrassing moments', 'Funny habits', 'Life adventures', 'Getting older gracefully', 'Birthday traditions'],
        'Formal': ['Professional achievements', 'Personal milestones', 'Character appreciation', 'Life contributions'],
        'Inspiring': ['Life lessons', 'Dreams pursued', 'Challenges overcome', 'Future goals', 'Personal evolution']
      },
      'Retirement': {
        'Heartfelt': ['Career dedication', 'Mentorship impact', 'Work family', 'Legacy created', 'Personal sacrifices', 'Well-deserved rest'],
        'Witty': ['Work stories', 'Office characters', 'Technology struggles', 'Meeting humor', 'Workplace quirks'],
        'Formal': ['Professional accomplishments', 'Industry contributions', 'Leadership examples', 'Institutional knowledge'],
        'Inspiring': ['Career journey', 'Achievements unlocked', 'New adventures', 'Wisdom shared', 'Future possibilities']
      }
    };
    
    return themes[occasion]?.[style] || themes['Birthday']['Heartfelt'];
  };

  const getStoryPrompts = () => {
    const occasion = speechData.occasion || customOccasion;
    
    const prompts: Record<string, string[]> = {
      'Wedding': [
        'How you first met the couple',
        'When you knew they were perfect for each other',
        'A funny dating story',
        'Their most romantic moment',
        'Wedding planning adventures',
        'Why they make each other better'
      ],
      'Birthday': [
        'Your favorite memory together',
        'When they helped you through tough times',
        'A funny adventure you shared',
        'How they surprised you',
        'Their most embarrassing moment',
        'When they showed their true character'
      ],
      'Retirement': [
        'Your first day working together',
        'A challenging project you tackled',
        'Their most helpful advice',
        'A funny work situation',
        'How they mentored others',
        'Their lasting impact on the workplace'
      ]
    };
    
    return prompts[occasion] || prompts['Birthday'];
  };

  const getGuidanceText = () => {
    if (currentStep === 6) { // Combined content step
      return "Choose from our suggested themes and story prompts, or add your own custom content. You can mix and match to create the perfect speech structure.";
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
        
        // Show the speech content in a better way
        displayGeneratedSpeech(speechResponse.speech);
        
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
      
      // Show the generated speech content
      displayGeneratedSpeech(speechResponse.speech);
      
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
            <h2>Who will your speech be about?</h2>
            <p>Add the names of people you'll be speaking about in your speech (up to 4 people)</p>
            
            <div className="people-section">
              <div className="add-person-form">
                <div className="input-row">
                  {peopleInputs.map((person, index) => (
                    <div key={index} className="person-input-group">
                      <h4>Person {index + 1} {index === 0 && <span className="required">*</span>}</h4>
                      <div className="input-fields">
                        <input
                          type="text"
                          value={person.name}
                          onChange={(e) => updatePersonInput(index, 'name', e.target.value)}
                          placeholder={index === 0 ? "Person's name (required)" : "Person's name (optional)"}
                          className="person-name-input"
                        />
                        <input
                          type="text"
                          value={person.relationship}
                          onChange={(e) => updatePersonInput(index, 'relationship', e.target.value)}
                          placeholder="Relationship (e.g., bride, best friend)"
                          className="person-relationship-input"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {peopleInputs.some(p => p.name.trim() !== '') && (
                <div className="people-preview">
                  <h4>People in your speech:</h4>
                  <div className="people-preview-list">
                    {peopleInputs
                      .filter(p => p.name.trim() !== '')
                      .map((person, index) => (
                        <div key={index} className="person-preview-item">
                          <span className="person-name">{person.name}</span>
                          {person.relationship && (
                            <span className="person-relationship">({person.relationship})</span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              <div className="help-text">
                <p>💡 <strong>Tip:</strong> At least one person is required. Include key people like the bride, groom, family members, or honorees.</p>
                <p>🎯 <strong>Examples:</strong> "Sarah (bride)", "Michael (groom)", "Tom (best friend)", "Mom (mother)"</p>
                <small>You'll be able to link specific stories and points to these people in the next step.</small>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="step-content">
            <h2>Let's Build Your Speech Content</h2>
            <div className="guidance-text">
              <p>{getGuidanceText()}</p>
            </div>
            
            <div className="content-builder">
              {/* Key Themes Section */}
              <div className="section-group">
                <h3>🎯 Key Themes</h3>
                <p>Select themes that resonate with your speech, or add your own:</p>
                
                <div className="theme-suggestions">
                  {getThemeSuggestions().map((theme) => (
                    <button
                      key={theme}
                      className={`theme-suggestion ${selectedThemes.includes(theme) ? 'selected' : ''}`}
                      onClick={() => {
                        if (selectedThemes.includes(theme)) {
                          setSelectedThemes(prev => prev.filter(t => t !== theme));
                          // Remove from key points if it was added from theme
                          const themePoint = speechData.key_points.find(kp => kp.text === theme);
                          if (themePoint) {
                            removeKeyPoint(themePoint.id);
                          }
                        } else {
                          addKeyPoint(theme, true);
                        }
                      }}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
                
                {/* Custom theme input */}
                <div className="custom-input-section">
                  <input
                    type="text"
                    placeholder="Add your own theme or key point..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addKeyPoint(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="custom-theme-input"
                  />
                </div>
              </div>

              {/* Story Prompts Section */}
              <div className="section-group">
                <h3>📖 Story Ideas</h3>
                <p>Choose story prompts that inspire you, or add your own stories:</p>
                
                <div className="story-suggestions">
                  {getStoryPrompts().map((prompt) => (
                    <button
                      key={prompt}
                      className={`story-suggestion ${selectedStoryPrompts.includes(prompt) ? 'selected' : ''}`}
                      onClick={() => {
                        if (selectedStoryPrompts.includes(prompt)) {
                          setSelectedStoryPrompts(prev => prev.filter(p => p !== prompt));
                          // Remove from personal stories if it was added from prompt
                          const promptStory = speechData.personal_stories.find(ps => ps.text === prompt);
                          if (promptStory) {
                            removePersonalStory(promptStory.id);
                          }
                        } else {
                          addPersonalStory(prompt, true);
                        }
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                
                {/* Custom story input */}
                <div className="custom-input-section">
                  <input
                    type="text"
                    placeholder="Add your own story idea..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addPersonalStory(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="custom-story-input"
                  />
                </div>
              </div>

              {/* Added Content Summary */}
              {(speechData.key_points.length > 0 || speechData.personal_stories.length > 0) && (
                <div className="content-summary">
                  <h4>📝 Your Speech Elements</h4>
                  
                  {speechData.key_points.length > 0 && (
                    <div className="summary-section">
                      <h5>Key Points & Themes:</h5>
                      {speechData.key_points.map((point) => (
                        <div key={point.id} className="content-item">
                          <span className="content-text">{point.text}</span>
                          <button
                            onClick={() => removeKeyPoint(point.id)}
                            className="btn btn-danger btn-tiny"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {speechData.personal_stories.length > 0 && (
                    <div className="summary-section">
                      <h5>Stories & Anecdotes:</h5>
                      {speechData.personal_stories.map((story) => (
                        <div key={story.id} className="content-item">
                          <span className="content-text">{story.text}</span>
                          <button
                            onClick={() => removePersonalStory(story.id)}
                            className="btn btn-danger btn-tiny"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="step-content">
            <h2>Add Details & Link to People</h2>
            <p>Add more detail to your themes and stories, and link them to specific people:</p>
            
            <div className="detail-editor">
              {/* Key Points Detail Editor */}
              {speechData.key_points.length > 0 && (
                <div className="section-group">
                  <h3>🎯 Refine Your Key Points</h3>
                  {speechData.key_points.map((point) => (
                    <div key={point.id} className="content-detail-item">
                      <div className="content-header">
                        <strong>{point.text}</strong>
                      </div>
                      <div className="detail-inputs">
                        <textarea
                          value={point.detail}
                          onChange={(e) => updateKeyPoint(point.id, { detail: e.target.value })}
                          placeholder="Add more details about this point... (optional)"
                          className="detail-textarea"
                          rows={2}
                        />
                        <div className="people-linking">
                          <label>Link to people:</label>
                          <div className="people-checkboxes">
                            {speechData.people.map((person) => (
                              <label key={person.id} className="person-checkbox">
                                <input
                                  type="checkbox"
                                  checked={point.linkedPeople.includes(person.id)}
                                  onChange={(e) => {
                                    const linkedPeople = e.target.checked
                                      ? [...point.linkedPeople, person.id]
                                      : point.linkedPeople.filter(id => id !== person.id);
                                    updateKeyPoint(point.id, { linkedPeople });
                                  }}
                                />
                                {person.name}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Personal Stories Detail Editor */}
              {speechData.personal_stories.length > 0 && (
                <div className="section-group">
                  <h3>📖 Develop Your Stories</h3>
                  {speechData.personal_stories.map((story) => (
                    <div key={story.id} className="content-detail-item">
                      <div className="content-header">
                        <strong>{story.text}</strong>
                      </div>
                      <div className="detail-inputs">
                        <textarea
                          value={story.detail}
                          onChange={(e) => updatePersonalStory(story.id, { detail: e.target.value })}
                          placeholder="Tell us more about this story... (optional)"
                          className="detail-textarea"
                          rows={3}
                        />
                        <div className="people-linking">
                          <label>Link to people:</label>
                          <div className="people-checkboxes">
                            {speechData.people.map((person) => (
                              <label key={person.id} className="person-checkbox">
                                <input
                                  type="checkbox"
                                  checked={story.linkedPeople.includes(person.id)}
                                  onChange={(e) => {
                                    const linkedPeople = e.target.checked
                                      ? [...story.linkedPeople, person.id]
                                      : story.linkedPeople.filter(id => id !== person.id);
                                    updatePersonalStory(story.id, { linkedPeople });
                                  }}
                                />
                                {person.name}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="help-text">
                <small>💡 The more details you provide, the more personalized your speech will be. Linking content to specific people helps create more targeted and meaningful stories.</small>
              </div>
            </div>
          </div>
        );

      case 8:
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
                <strong>People:</strong> {speechData.people.map(p => p.name).join(', ') || 'None specified'}
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
