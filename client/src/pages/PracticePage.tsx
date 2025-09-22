import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpeech } from '../api/speech';
import type { Speech } from '../api/speech';
import PracticeToolkit from '../components/toolkit/PracticeToolkit';

const PracticePage: React.FC = () => {
  const { speechId } = useParams<{ speechId: string }>();
  const [speech, setSpeech] = useState<Speech | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (error: any) {
        console.error('Error loading speech:', error);
        setError('Failed to load speech for practice mode.');
      } finally {
        setIsLoading(false);
      }
    };

    loadSpeech();
  }, [speechId]);

  if (isLoading) {
    return (
      <div className="practice-page">
        <div className="practice-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <h2>Loading Practice Mode...</h2>
            <p>Preparing your speech for practice</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !speech) {
    return (
      <div className="practice-page">
        <div className="practice-container">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2>Practice Mode Unavailable</h2>
            <p>{error || 'The requested speech could not be found for practice.'}</p>
            <div className="error-actions">
              <Link to="/builder" className="btn btn-primary">Create New Speech</Link>
              <Link to="/dashboard" className="btn btn-secondary">View My Speeches</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!speech.content) {
    return (
      <div className="practice-page">
        <div className="practice-container">
          <div className="error-state">
            <div className="error-icon">📝</div>
            <h2>Speech Not Ready</h2>
            <p>This speech doesn't have content ready for practice yet.</p>
            <div className="error-actions">
              <Link to={`/speech/${speechId}`} className="btn btn-primary">View Speech</Link>
              <Link to="/dashboard" className="btn btn-secondary">View My Speeches</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="practice-page">
      <PracticeToolkit
        speechContent={speech.content}
        speechTitle={speech.title || `${speech.style} ${speech.occasion} Speech`}
        onClose={() => window.history.back()}
        fullscreen={true}
      />
    </div>
  );
};

export default PracticePage;
