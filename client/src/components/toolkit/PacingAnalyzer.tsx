import { useState, useEffect, useRef } from 'react';

interface PacingAnalyzerProps {
  speechContent: string;
  onClose: () => void;
}

interface PacingData {
  timestamp: number;
  wordsPerMinute: number;
  totalWords: number;
  elapsedTime: number;
}

const PacingAnalyzer: React.FC<PacingAnalyzerProps> = ({ speechContent, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [, setPacingData] = useState<PacingData[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [pausedTime, setPausedTime] = useState(0);
  const [averageWPM, setAverageWPM] = useState(0);
  const [currentWPM, setCurrentWPM] = useState(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const intervalRef = useRef<number | null>(null);
  const words = speechContent.split(' ').filter(word => word.trim() !== '');
  const targetWPM = 150; // ideal speaking pace
  const minWPM = 120;
  const maxWPM = 180;

  useEffect(() => {
    if (isRecording && !isPaused && startTime) {
      intervalRef.current = window.setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = (now - startTime - pausedTime) / 1000;
        const elapsedMinutes = elapsedSeconds / 60;
        
        if (elapsedMinutes > 0 && currentWord > 0) {
          const instantWPM = currentWord / elapsedMinutes;
          const newDataPoint: PacingData = {
            timestamp: now,
            wordsPerMinute: instantWPM,
            totalWords: currentWord,
            elapsedTime: elapsedSeconds
          };
          
          setPacingData(prev => [...prev, newDataPoint]);
          setCurrentWPM(Math.round(instantWPM));
          
          // Calculate average WPM
          const avgWPM = currentWord / elapsedMinutes;
          setAverageWPM(Math.round(avgWPM));
          
          // Generate recommendations
          updateRecommendations(instantWPM, avgWPM);
        }
      }, 1000);
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
  }, [isRecording, isPaused, startTime, currentWord, pausedTime]);

  const updateRecommendations = (currentWPM: number, avgWPM: number) => {
    const newRecommendations: string[] = [];
    
    if (currentWPM < minWPM) {
      newRecommendations.push('🐌 Speaking too slowly - try to increase your pace');
    } else if (currentWPM > maxWPM) {
      newRecommendations.push('🏃 Speaking too fast - slow down for clarity');
    } else {
      newRecommendations.push('✅ Good pacing - maintain this speed');
    }
    
    if (avgWPM < minWPM) {
      newRecommendations.push('📊 Overall pace is slow - consider speeding up');
    } else if (avgWPM > maxWPM) {
      newRecommendations.push('📊 Overall pace is fast - practice slowing down');
    }
    
    setRecommendations(newRecommendations);
  };

  const startRecording = () => {
    setIsRecording(true);
    setStartTime(Date.now());
    setPacingData([]);
    setCurrentWord(0);
    setPausedTime(0);
  };

  const pauseRecording = () => {
    if (isPaused) {
      // Resume
      setPausedTime(prev => prev + (Date.now() - (startTime || 0)));
      setStartTime(Date.now());
      setIsPaused(false);
    } else {
      // Pause
      setIsPaused(true);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
  };

  const resetSession = () => {
    setIsRecording(false);
    setIsPaused(false);
    setCurrentWord(0);
    setPacingData([]);
    setStartTime(null);
    setPausedTime(0);
    setAverageWPM(0);
    setCurrentWPM(0);
    setRecommendations([]);
  };

  const handleWordClick = (wordIndex: number) => {
    if (isRecording && !isPaused) {
      setCurrentWord(wordIndex + 1);
    }
  };

  const getWordClass = (index: number) => {
    if (index < currentWord) return 'word-completed';
    if (index === currentWord) return 'word-current';
    return 'word-upcoming';
  };

  const getPacingColor = (wpm: number) => {
    if (wpm < minWPM) return '#ff6b6b'; // red
    if (wpm > maxWPM) return '#ffa726'; // orange
    return '#4caf50'; // green
  };

  const getProgressPercentage = () => {
    return Math.min((currentWord / words.length) * 100, 100);
  };

  const getEstimatedDuration = () => {
    if (averageWPM > 0) {
      const remainingWords = words.length - currentWord;
      const remainingMinutes = remainingWords / averageWPM;
      return Math.round(remainingMinutes * 60); // return seconds
    }
    return 0;
  };

  return (
    <div className="pacing-overlay">
      <div className="pacing-container">
        <div className="pacing-header">
          <h2>📊 Pacing Analyzer</h2>
          <button 
            className="btn btn-secondary btn-small"
            onClick={onClose}
          >
            ✕ Close
          </button>
        </div>

        <div className="pacing-controls">
          <div className="control-buttons">
            {!isRecording ? (
              <button 
                className="btn btn-primary"
                onClick={startRecording}
              >
                🎤 Start Practice
              </button>
            ) : (
              <>
                <button 
                  className="btn btn-secondary"
                  onClick={pauseRecording}
                >
                  {isPaused ? '▶️ Resume' : '⏸️ Pause'}
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={stopRecording}
                >
                  ⏹️ Stop
                </button>
              </>
            )}
            
            <button 
              className="btn btn-outline"
              onClick={resetSession}
            >
              🔄 Reset
            </button>
          </div>

          <div className="pacing-stats">
            <div className="stat-card">
              <h4>Current WPM</h4>
              <span 
                className="stat-value"
                style={{ color: getPacingColor(currentWPM) }}
              >
                {currentWPM}
              </span>
            </div>
            
            <div className="stat-card">
              <h4>Average WPM</h4>
              <span 
                className="stat-value"
                style={{ color: getPacingColor(averageWPM) }}
              >
                {averageWPM}
              </span>
            </div>
            
            <div className="stat-card">
              <h4>Target WPM</h4>
              <span className="stat-value target">
                {targetWPM}
              </span>
            </div>
            
            <div className="stat-card">
              <h4>Progress</h4>
              <span className="stat-value">
                {Math.round(getProgressPercentage())}%
              </span>
            </div>
          </div>
        </div>

        <div className="pacing-content">
          <div className="speech-text">
            {words.map((word, index) => (
              <span
                key={index}
                className={`pacing-word ${getWordClass(index)}`}
                onClick={() => handleWordClick(index)}
              >
                {word}{' '}
              </span>
            ))}
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="progress-info">
            <span>Words: {currentWord} / {words.length}</span>
            {getEstimatedDuration() > 0 && (
              <span>Est. remaining: {Math.floor(getEstimatedDuration() / 60)}:{(getEstimatedDuration() % 60).toString().padStart(2, '0')}</span>
            )}
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="recommendations">
            <h4>💡 Real-time Feedback</h4>
            <ul>
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PacingAnalyzer;
