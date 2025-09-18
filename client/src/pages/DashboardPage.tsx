import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserSpeeches, getSpeech } from '../api/speech';
import type { Speech } from '../api/speech';
import PracticeToolkit from '../components/toolkit/PracticeToolkit';
import ExportModal from '../components/common/ExportModal';

const DashboardPage: React.FC = () => {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const [practiceToolkitOpen, setPracticeToolkitOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedSpeech, setSelectedSpeech] = useState<Speech | null>(null);
  const [speechContent, setSpeechContent] = useState<string>('');

  // Fetch user speeches on component mount
  useEffect(() => {
    const fetchSpeeches = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getUserSpeeches(currentUser.uid);
        setSpeeches(response.speeches);
        setError(null);
      } catch (err) {
        console.error('Error fetching speeches:', err);
        setError('Failed to load your speeches. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpeeches();
  }, [currentUser]);

  const openPracticeToolkit = async (speech: Speech) => {
    try {
      setSelectedSpeech(speech);
      if (speech.content) {
        setSpeechContent(speech.content);
      } else {
        const response = await getSpeech(speech.id);
        setSpeechContent(response.speech.content || '');
      }
      setPracticeToolkitOpen(true);
    } catch (err) {
      console.error('Error loading speech content:', err);
      setError('Failed to load speech content.');
    }
  };

  const closePracticeToolkit = () => {
    setPracticeToolkitOpen(false);
    setSelectedSpeech(null);
    setSpeechContent('');
  };

  const openExportModal = async (speech: Speech) => {
    try {
      setSelectedSpeech(speech);
      if (speech.content) {
        setSpeechContent(speech.content);
      } else {
        const response = await getSpeech(speech.id);
        setSpeechContent(response.speech.content || '');
      }
      setExportModalOpen(true);
    } catch (err) {
      console.error('Error loading speech content:', err);
      setError('Failed to load speech content.');
    }
  };

  const closeExportModal = () => {
    setExportModalOpen(false);
    setSelectedSpeech(null);
    setSpeechContent('');
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your speeches...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Speeches</h1>
          <Link to="/builder" className="btn btn-primary">
            + Create New Speech
          </Link>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Speeches</h3>
            <span className="stat-number">{speeches.length}</span>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <span className="stat-number">
              {speeches.filter(s => s.status === 'completed').length}
            </span>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <span className="stat-number">
              {speeches.filter(s => s.status === 'draft').length}
            </span>
          </div>
        </div>

        <div className="speeches-grid">
          {speeches.map((speech) => (
            <div key={speech.id} className="speech-card">
              <div className="speech-header">
                <h3>{speech.title || `${speech.style} ${speech.occasion} Speech`}</h3>
                <span className={`status-badge ${speech.status}`}>
                  {speech.status === 'completed' ? 'Completed' : speech.status === 'generating' ? 'Generating...' : 'Draft'}
                </span>
              </div>
              <div className="speech-meta">
                <p>{speech.occasion} • {speech.style} • {speech.wordCount || 0} words</p>
                <p>Created {new Date(speech.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="speech-actions">
                <Link 
                  to={`/speech/${speech.id}`}
                  className="btn btn-secondary btn-small"
                >
                  View
                </Link>
                <button 
                  className="btn btn-primary btn-small"
                  onClick={() => openPracticeToolkit(speech)}
                  disabled={speech.status !== 'completed'}
                >
                  Practice
                </button>
                <button 
                  className="btn btn-outline btn-small"
                  onClick={() => openExportModal(speech)}
                  disabled={speech.status !== 'completed'}
                >
                  Export
                </button>
              </div>
            </div>
          ))}
          
          {speeches.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No speeches yet</h3>
              <p>Create your first speech to get started</p>
              <Link to="/builder" className="btn btn-primary">
                Create Your First Speech
              </Link>
            </div>
          )}
        </div>

        {practiceToolkitOpen && selectedSpeech && speechContent && (
          <PracticeToolkit
            speechContent={speechContent}
            speechTitle={selectedSpeech.title || `${selectedSpeech.style} ${selectedSpeech.occasion} Speech`}
            onClose={closePracticeToolkit}
          />
        )}

        {exportModalOpen && selectedSpeech && speechContent && (
          <ExportModal
            speechContent={speechContent}
            speechTitle={selectedSpeech.title || `${selectedSpeech.style} ${selectedSpeech.occasion} Speech`}
            speechMeta={{
              occasion: selectedSpeech.occasion,
              wordCount: selectedSpeech.wordCount || 0,
              estimatedDuration: selectedSpeech.estimatedDuration || '3-5 minutes'
            }}
            onClose={closeExportModal}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
