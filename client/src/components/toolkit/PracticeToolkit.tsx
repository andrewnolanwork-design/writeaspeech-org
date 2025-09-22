import { useState } from 'react';
import Teleprompter from './Teleprompter';
import PacingAnalyzer from './PacingAnalyzer';
import AudioRecorder from './AudioRecorder';

interface PracticeToolkitProps {
  speechContent: string;
  speechTitle: string;
  onClose: () => void;
  fullscreen?: boolean;
}

type ToolkitMode = 'menu' | 'teleprompter' | 'pacing' | 'recorder';

const PracticeToolkit: React.FC<PracticeToolkitProps> = ({ 
  speechContent, 
  speechTitle, 
  onClose,
  fullscreen = false
}) => {
  const [currentMode, setCurrentMode] = useState<ToolkitMode>('menu');

  const handleModeChange = (mode: ToolkitMode) => {
    setCurrentMode(mode);
  };

  const handleToolClose = () => {
    setCurrentMode('menu');
  };

  if (currentMode === 'teleprompter') {
    return (
      <Teleprompter 
        speechContent={speechContent} 
        onClose={handleToolClose}
      />
    );
  }

  if (currentMode === 'pacing') {
    return (
      <PacingAnalyzer 
        speechContent={speechContent} 
        onClose={handleToolClose}
      />
    );
  }

  if (currentMode === 'recorder') {
    return (
      <AudioRecorder 
        speechContent={speechContent} 
        onClose={handleToolClose}
      />
    );
  }

  // Main menu
  return (
    <div className={`toolkit-overlay ${fullscreen ? 'fullscreen' : ''}`}>
      <div className="toolkit-container">
        <div className="toolkit-header">
          <h2>🎯 Practice Toolkit</h2>
          <p className="speech-title">"{speechTitle}"</p>
          <button 
            className="btn btn-secondary btn-small"
            onClick={onClose}
          >
            ✕ Close
          </button>
        </div>

        <div className="toolkit-menu">
          <div className="tool-card" onClick={() => handleModeChange('teleprompter')}>
            <div className="tool-icon">🎤</div>
            <h3>Teleprompter</h3>
            <p>Practice with scrolling text and adjustable speed controls</p>
            <div className="tool-features">
              <span>• Auto-scrolling text</span>
              <span>• Speed control</span>
              <span>• Font size adjustment</span>
              <span>• Progress tracking</span>
            </div>
            <button className="btn btn-primary">
              Launch Teleprompter
            </button>
          </div>

          <div className="tool-card" onClick={() => handleModeChange('pacing')}>
            <div className="tool-icon">📊</div>
            <h3>Pacing Analyzer</h3>
            <p>Track your speaking pace and get real-time feedback</p>
            <div className="tool-features">
              <span>• Real-time WPM tracking</span>
              <span>• Pacing recommendations</span>
              <span>• Progress visualization</span>
              <span>• Performance analytics</span>
            </div>
            <button className="btn btn-primary">
              Launch Analyzer
            </button>
          </div>

          <div className="tool-card" onClick={() => handleModeChange('recorder')}>
            <div className="tool-icon">🎙️</div>
            <h3>Audio Recorder</h3>
            <p>Record your practice sessions and track improvement</p>
            <div className="tool-features">
              <span>• High-quality recording</span>
              <span>• Audio level monitoring</span>
              <span>• Playback & review</span>
              <span>• Export recordings</span>
            </div>
            <button className="btn btn-primary">
              Launch Recorder
            </button>
          </div>
        </div>

        <div className="toolkit-tips">
          <h3>💡 Practice Tips</h3>
          <div className="tips-grid">
            <div className="tip">
              <strong>🎯 Start with the teleprompter</strong>
              <p>Get familiar with your speech content and practice smooth delivery</p>
            </div>
            <div className="tip">
              <strong>📊 Monitor your pacing</strong>
              <p>Aim for 120-180 words per minute for optimal audience comprehension</p>
            </div>
            <div className="tip">
              <strong>🎙️ Record multiple sessions</strong>
              <p>Compare recordings to track your improvement over time</p>
            </div>
            <div className="tip">
              <strong>⏰ Practice regularly</strong>
              <p>Short, frequent practice sessions are more effective than long ones</p>
            </div>
          </div>
        </div>

        <div className="toolkit-stats">
          <h3>📈 Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-label">Speech Length</span>
              <span className="stat-value">{speechContent.split(' ').length} words</span>
            </div>
            <div className="stat">
              <span className="stat-label">Est. Duration</span>
              <span className="stat-value">
                {Math.ceil(speechContent.split(' ').length / 150)} minutes
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Recommended WPM</span>
              <span className="stat-value">120-180</span>
            </div>
            <div className="stat">
              <span className="stat-label">Practice Sessions</span>
              <span className="stat-value">
                {localStorage.getItem('speech-recordings') ? 
                  JSON.parse(localStorage.getItem('speech-recordings') || '[]').length : 0
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeToolkit;
