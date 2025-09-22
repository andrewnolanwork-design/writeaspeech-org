import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSpeech, saveSpeech } from '../api/speech';
import type { Speech } from '../api/speech';
import { SpeechExporter, type SpeechExportData } from '../utils/exportUtils';
import PremiumFeatureModal from '../components/common/PremiumFeatureModal';
import { useAuth } from '../contexts/AuthContext';
import './SpeechViewerPage.css';

const SpeechViewerPage: React.FC = () => {
  const { speechId } = useParams<{ speechId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [speech, setSpeech] = useState<Speech | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState({ name: '', description: '', icon: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    const loadSpeech = async () => {
      if (!speechId) {
        setError('Speech ID not provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await getSpeech(speechId);
        setSpeech(response.speech);
        
        // Check if this is a free trial speech (you could add this to the speech data)
        // For now, we'll check if content is short or has certain markers
        const isFree = !!(response.speech.content?.includes('free trial') || 
                         (response.speech.wordCount && response.speech.wordCount < 350));
        setIsFreeTrial(isFree);
        
      } catch (error: any) {
        console.error('Error loading speech:', error);
        setError('Failed to load speech. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadSpeech();
  }, [speechId]);

  const handlePremiumFeatureClick = (featureName: string, featureDescription: string, featureIcon: string) => {
    if (isFreeTrial) {
      setPremiumFeature({ name: featureName, description: featureDescription, icon: featureIcon });
      setShowPremiumModal(true);
      return false;
    }
    return true;
  };

  const handleExport = async (format: 'pdf' | 'text' | 'word' | 'cue-cards') => {
    if (!speech) return;
    
    if (!handlePremiumFeatureClick(
      `Export ${format.toUpperCase()}`,
      `Export your speech as a professional ${format} document with proper formatting and styling.`,
      format === 'pdf' ? '📑' : format === 'word' ? '📘' : format === 'text' ? '📄' : '🗂️'
    )) return;

    try {
      const exportData: SpeechExportData = {
        title: speech.title || `${speech.occasion} Speech`,
        content: speech.content || '',
        metadata: {
          occasion: speech.occasion,
          wordCount: speech.wordCount || 0,
          estimatedDuration: speech.estimatedDuration || '3-5 minutes',
          audience: speech.audience,
          style: speech.style,
          createdAt: speech.createdAt,
        },
      };

      switch (format) {
        case 'word':
          await SpeechExporter.exportToWord(exportData);
          break;
        case 'pdf':
          await SpeechExporter.exportToPDF(exportData);
          break;
        case 'text':
          await SpeechExporter.exportToText(exportData);
          break;
        case 'cue-cards':
          await SpeechExporter.exportToCueCards(exportData);
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const handlePracticeMode = () => {
    if (!handlePremiumFeatureClick(
      'Practice Mode',
      'Access professional practice tools including teleprompter, pacing analysis, and audio recording.',
      '🎯'
    )) return;

    navigate(`/practice/${speechId}`);
  };

  const handleEditSpeech = () => {
    if (!handlePremiumFeatureClick(
      'Edit Speech',
      'Edit and regenerate sections of your speech with advanced AI assistance.',
      '✏️'
    )) return;

    setIsEditing(true);
  };

  const handleSaveSpeech = async () => {
    if (!handlePremiumFeatureClick(
      'Save Speech',
      'Save your speech to your personal dashboard for easy access and organization.',
      '💾'
    )) return;

    if (!speechId) return;

    setIsSaving(true);
    try {
      await saveSpeech(speechId, currentUser?.uid);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save speech. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSectionHover = (sectionIndex: number, isHovering: boolean) => {
    if (isEditing && isHovering) {
      setEditingSection(sectionIndex);
    } else if (!isHovering) {
      setEditingSection(null);
    }
  };

  const handleRegenerateSection = async (sectionIndex: number) => {
    if (!speech) return;
    
    try {
      // Here you would make an API call to regenerate the section
      // For now, we'll simulate the regeneration
      console.log(`Regenerating section ${sectionIndex}`);
      alert('Section regeneration feature coming soon!');
    } catch (error) {
      console.error('Regeneration failed:', error);
      alert('Failed to regenerate section. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="speech-viewer-page">
        <div className="speech-viewer-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <h2>Loading your speech...</h2>
            <p>Preparing your personalized content</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !speech) {
    return (
      <div className="speech-viewer-page">
        <div className="speech-viewer-container">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2>Speech Not Found</h2>
            <p>{error || 'The requested speech could not be found.'}</p>
            <div className="error-actions">
              <Link to="/builder" className="btn btn-primary">Create New Speech</Link>
              <Link to="/dashboard" className="btn btn-secondary">View My Speeches</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="speech-viewer-page">
      {isFreeTrial && (
        <div className="watermark-overlay">
          <div className="watermark-text">FREE TRIAL</div>
        </div>
      )}
      
      <div className="speech-viewer-container">
        {/* Header Section */}
        <header className="speech-header">
          <div className="speech-header-content">
            <div className="speech-breadcrumb">
              <Link to="/dashboard">My Speeches</Link>
              <span className="breadcrumb-separator">→</span>
              <span>{speech.title || 'Your Speech'}</span>
            </div>
            
            <div className="speech-title-section">
              <h1 className="speech-title">
                {speech.title || `${speech.occasion} Speech`}
              </h1>
              
              <div className="speech-metadata">
                <div className="metadata-item">
                  <span className="metadata-icon">🎤</span>
                  <span>{speech.style}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-icon">⏱️</span>
                  <span>{speech.estimatedDuration}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-icon">📝</span>
                  <span>{speech.wordCount} words</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-icon">👥</span>
                  <span>{speech.audience}</span>
                </div>
              </div>

              {isFreeTrial && (
                <div className="trial-notice">
                  <span className="trial-badge">🎁 Free Trial</span>
                  <span className="trial-text">
                    Upgrade to remove watermark and unlock full features
                  </span>
                </div>
              )}
            </div>

            <div className="speech-actions">
              <button 
                onClick={() => handleExport('word')} 
                className={`action-btn export-btn ${isFreeTrial ? 'premium-feature' : ''}`}
                title={isFreeTrial ? 'Premium Feature - Upgrade to access' : 'Export as Word document'}
              >
                <span className="btn-icon">📘</span>
                Export Word
                {isFreeTrial && <span className="premium-badge">Pro</span>}
              </button>
              <button 
                onClick={() => handleExport('pdf')} 
                className={`action-btn export-btn ${isFreeTrial ? 'premium-feature' : ''}`}
                title={isFreeTrial ? 'Premium Feature - Upgrade to access' : 'Export as PDF document'}
              >
                <span className="btn-icon">📑</span>
                Export PDF
                {isFreeTrial && <span className="premium-badge">Pro</span>}
              </button>
              <button 
                onClick={handlePracticeMode}
                className={`action-btn practice-btn ${isFreeTrial ? 'premium-feature' : ''}`}
                title={isFreeTrial ? 'Premium Feature - Upgrade to access' : 'Open practice mode'}
              >
                <span className="btn-icon">🎯</span>
                Practice Mode
                {isFreeTrial && <span className="premium-badge">Pro</span>}
              </button>
              <button 
                onClick={handleEditSpeech}
                className={`action-btn edit-btn ${isFreeTrial ? 'premium-feature' : ''}`}
                title={isFreeTrial ? 'Premium Feature - Upgrade to access' : 'Edit speech content'}
              >
                <span className="btn-icon">✏️</span>
                Edit Speech
                {isFreeTrial && <span className="premium-badge">Pro</span>}
              </button>
              <button 
                onClick={handleSaveSpeech}
                className={`action-btn save-btn ${isFreeTrial ? 'premium-feature' : ''} ${isSaving ? 'loading' : ''}`}
                disabled={isSaving}
                title={isFreeTrial ? 'Premium Feature - Upgrade to access' : 'Save to My Speeches'}
              >
                <span className="btn-icon">{isSaving ? '⏳' : '💾'}</span>
                {isSaving ? 'Saving...' : 'Save Speech'}
                {isFreeTrial && <span className="premium-badge">Pro</span>}
              </button>
            </div>

            {showSaveSuccess && (
              <div className="save-success-message">
                <span className="success-icon">✅</span>
                Speech saved to My Speeches!
              </div>
            )}

            {isEditing && (
              <div className="editing-notice">
                <span className="edit-icon">✏️</span>
                <span>Editing Mode: Hover over paragraphs to edit them</span>
                <button 
                  className="btn btn-small btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Exit Edit Mode
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Speech Content */}
        <main className="speech-content-section">
          <div className="speech-document">
            <div className="document-header">
              <h2 className="document-title">
                {speech.title || `${speech.occasion} Speech`}
              </h2>
              <div className="document-meta">
                <span>Created {new Date(speech.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>For {speech.audience}</span>
              </div>
            </div>

            <div className="speech-text">
              {speech.content?.split('\n\n').map((paragraph, index) => (
                <div 
                  key={index} 
                  className={`speech-paragraph-container ${isEditing ? 'editable' : ''}`}
                  onMouseEnter={() => handleSectionHover(index, true)}
                  onMouseLeave={() => handleSectionHover(index, false)}
                >
                  <p className="speech-paragraph">
                    {paragraph}
                  </p>
                  {isEditing && editingSection === index && (
                    <div className="paragraph-edit-controls">
                      <button 
                        className="edit-control-btn"
                        onClick={() => handleRegenerateSection(index)}
                        title="Regenerate this section"
                      >
                        🔄 Regenerate
                      </button>
                      <button 
                        className="edit-control-btn"
                        onClick={() => {
                          const newText = prompt('Edit this paragraph:', paragraph);
                          if (newText && newText.trim()) {
                            // Here you would update the paragraph
                            console.log('Update paragraph:', newText);
                          }
                        }}
                        title="Edit this section"
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isFreeTrial && (
              <div className="trial-footer">
                <div className="trial-footer-content">
                  <h3>🚀 Ready for the Full Experience?</h3>
                  <p>
                    Upgrade to get unlimited speech length, remove watermarks, 
                    and access all export formats and practice tools.
                  </p>
                  <div className="trial-footer-actions">
                    <Link to="/pricing" className="btn btn-primary">
                      View Pricing Plans
                    </Link>
                    <Link to="/builder?plan=premium" className="btn btn-secondary">
                      Create Premium Speech
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer Actions */}
        <footer className="speech-footer">
          <div className="footer-actions">
            <Link to="/builder" className="footer-btn">
              <span className="btn-icon">➕</span>
              Create Another Speech
            </Link>
            <Link to="/dashboard" className="footer-btn">
              <span className="btn-icon">📊</span>
              View All Speeches
            </Link>
            {!isFreeTrial && (
              <button 
                onClick={() => window.print()} 
                className="footer-btn"
              >
                <span className="btn-icon">🖨️</span>
                Print Speech
              </button>
            )}
          </div>
        </footer>

        {/* Premium Feature Modal */}
        <PremiumFeatureModal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          featureName={premiumFeature.name}
          featureDescription={premiumFeature.description}
          featureIcon={premiumFeature.icon}
        />
      </div>
    </div>
  );
};

export default SpeechViewerPage;
