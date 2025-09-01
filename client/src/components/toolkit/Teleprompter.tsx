import { useState, useEffect, useRef } from 'react';

interface TeleprompterProps {
  speechContent: string;
  onClose: () => void;
}

const Teleprompter: React.FC<TeleprompterProps> = ({ speechContent, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50); // words per minute adjustment
  const [fontSize, setFontSize] = useState(24);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  
  const words = speechContent.split(' ');
  const baseSpeed = 150; // base words per minute
  const actualSpeed = (baseSpeed * speed) / 50; // adjust based on slider
  const intervalMs = (60 / actualSpeed) * 1000; // milliseconds per word

  useEffect(() => {
    if (isPlaying && autoScroll) {
      intervalRef.current = window.setInterval(() => {
        setCurrentWordIndex(prev => {
          const next = prev + 1;
          if (next >= words.length) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, intervalMs);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, autoScroll, intervalMs, words.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTeleprompter = () => {
    setIsPlaying(false);
    setCurrentWordIndex(0);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
  };

  const renderContent = () => {
    if (!autoScroll) {
      return (
        <div 
          className="teleprompter-text-static"
          style={{ fontSize: `${fontSize}px` }}
        >
          {speechContent}
        </div>
      );
    }

    return (
      <div 
        className="teleprompter-text-highlight"
        style={{ fontSize: `${fontSize}px` }}
      >
        {words.map((word, index) => (
          <span
            key={index}
            className={`word ${index === currentWordIndex ? 'current' : index < currentWordIndex ? 'past' : 'future'}`}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="teleprompter-overlay">
      <div className="teleprompter-container">
        <div className="teleprompter-header">
          <h2>🎤 Teleprompter</h2>
          <div className="teleprompter-controls">
            <div className="control-group">
              <label>Speed: {speed} WPM</label>
              <input
                type="range"
                min="20"
                max="100"
                value={speed}
                onChange={(e) => handleSpeedChange(Number(e.target.value))}
                className="speed-slider"
              />
            </div>
            
            <div className="control-group">
              <label>Font Size: {fontSize}px</label>
              <input
                type="range"
                min="16"
                max="48"
                value={fontSize}
                onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                className="font-slider"
              />
            </div>
            
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                />
                Auto-scroll
              </label>
            </div>
          </div>
          
          <button 
            className="btn btn-secondary btn-small"
            onClick={onClose}
          >
            ✕ Close
          </button>
        </div>

        <div className="teleprompter-content" ref={containerRef}>
          {renderContent()}
        </div>

        <div className="teleprompter-footer">
          <div className="playback-controls">
            <button 
              className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'}`}
              onClick={togglePlayPause}
              disabled={!autoScroll}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            
            <button 
              className="btn btn-outline"
              onClick={resetTeleprompter}
            >
              🔄 Reset
            </button>
          </div>
          
          <div className="progress-info">
            {autoScroll && (
              <>
                <span>Word {currentWordIndex + 1} of {words.length}</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teleprompter;
