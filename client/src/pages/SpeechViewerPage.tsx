import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpeech } from '../api/speech';
import type { Speech } from '../api/speech';
import './SpeechViewerPage.css';

const SpeechViewerPage: React.FC = () => {
  const { speechId } = useParams<{ speechId: string }>();
  
  const [speech, setSpeech] = useState<Speech | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFreeTrial, setIsFreeTrial] = useState(false);

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
        const isFree = response.speech.content?.includes('free trial') || 
                      (response.speech.wordCount && response.speech.wordCount < 350);
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

  const handleExport = (format: 'pdf' | 'text' | 'cue-cards') => {
    if (!speech) return;
    
    // For now, just download as text
    const element = document.createElement('a');
    const file = new Blob([speech.content || ''], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${speech.title || 'speech'}.${format === 'pdf' ? 'txt' : 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
                onClick={() => handleExport('text')} 
                className="action-btn export-btn"
                disabled={isFreeTrial}
              >
                <span className="btn-icon">📄</span>
                Export Text
              </button>
              <button 
                onClick={() => handleExport('pdf')} 
                className="action-btn export-btn"
                disabled={isFreeTrial}
              >
                <span className="btn-icon">📑</span>
                Export PDF
              </button>
              <Link 
                to={`/practice/${speechId}`} 
                className="action-btn practice-btn"
              >
                <span className="btn-icon">🎯</span>
                Practice Mode
              </Link>
              {!isFreeTrial && (
                <Link 
                  to={`/builder?edit=${speechId}`} 
                  className="action-btn edit-btn"
                >
                  <span className="btn-icon">✏️</span>
                  Edit Speech
                </Link>
              )}
            </div>
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
                <p key={index} className="speech-paragraph">
                  {paragraph}
                </p>
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
      </div>
    </div>
  );
};

export default SpeechViewerPage;
