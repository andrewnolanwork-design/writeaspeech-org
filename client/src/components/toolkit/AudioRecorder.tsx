import { useState, useRef, useEffect } from 'react';

interface AudioRecorderProps {
  speechContent: string;
  onClose: () => void;
}

interface Recording {
  id: string;
  blob: Blob;
  url: string;
  duration: number;
  timestamp: Date;
  name: string;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ speechContent, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Load saved recordings from localStorage
    const savedRecordings = localStorage.getItem('speech-recordings');
    if (savedRecordings) {
      try {
        const parsed = JSON.parse(savedRecordings);
        setRecordings(parsed.map((r: any) => ({
          ...r,
          timestamp: new Date(r.timestamp)
        })));
      } catch (error) {
        console.error('Failed to load recordings:', error);
      }
    }

    return () => {
      stopAudioLevel();
    };
  }, []);

  const saveRecordings = (newRecordings: Recording[]) => {
    const toSave = newRecordings.map(r => ({
      ...r,
      url: '', // Don't save URLs as they're temporary
      blob: '' // Don't save blobs in localStorage
    }));
    localStorage.setItem('speech-recordings', JSON.stringify(toSave));
  };

  const startAudioLevel = async (stream: MediaStream) => {
    try {
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      
      analyzerRef.current.fftSize = 256;
      const bufferLength = analyzerRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      source.connect(analyzerRef.current);
      
      const updateLevel = () => {
        if (analyzerRef.current) {
          analyzerRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255 * 100);
        }
        
        if (isRecording) {
          requestAnimationFrame(updateLevel);
        }
      };
      
      updateLevel();
    } catch (error) {
      console.error('Error setting up audio level monitoring:', error);
    }
  };

  const stopAudioLevel = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyzerRef.current = null;
    setAudioLevel(0);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
      
      streamRef.current = stream;
      audioChunksRef.current = [];
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
        const url = URL.createObjectURL(blob);
        
        const newRecording: Recording = {
          id: Date.now().toString(),
          blob,
          url,
          duration: recordingTime,
          timestamp: new Date(),
          name: `Practice Session ${new Date().toLocaleString()}`
        };

        setRecordings(prev => {
          const updated = [newRecording, ...prev];
          saveRecordings(updated);
          return updated;
        });
        setCurrentRecording(newRecording);
        
        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        stopAudioLevel();
      };

      mediaRecorderRef.current.start(100); // Collect data every 100ms
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Start audio level monitoring
      startAudioLevel(stream);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = window.setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
      setIsPaused(!isPaused);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const playRecording = (recording: Recording) => {
    if (playingId === recording.id) {
      // Stop playing
      setPlayingId(null);
      return;
    }

    const audio = new Audio(recording.url);
    audio.onended = () => setPlayingId(null);
    audio.onerror = () => {
      setPlayingId(null);
      alert('Error playing recording');
    };
    
    setPlayingId(recording.id);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
      setPlayingId(null);
    });
  };

  const deleteRecording = (id: string) => {
    setRecordings(prev => {
      const updated = prev.filter(r => r.id !== id);
      saveRecordings(updated);
      return updated;
    });
    
    if (currentRecording?.id === id) {
      setCurrentRecording(null);
    }
  };

  const downloadRecording = (recording: Recording) => {
    const a = document.createElement('a');
    a.href = recording.url;
    a.download = `${recording.name}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAudioLevelClass = () => {
    if (audioLevel < 20) return 'level-low';
    if (audioLevel < 60) return 'level-medium';
    return 'level-high';
  };

  return (
    <div className="recorder-overlay">
      <div className="recorder-container">
        <div className="recorder-header">
          <h2>🎙️ Audio Recorder</h2>
          <button 
            className="btn btn-secondary btn-small"
            onClick={onClose}
          >
            ✕ Close
          </button>
        </div>

        <div className="recording-section">
          <div className="recording-controls">
            {!isRecording ? (
              <button 
                className="btn btn-primary btn-large"
                onClick={startRecording}
              >
                🎙️ Start Recording
              </button>
            ) : (
              <div className="recording-active">
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
              </div>
            )}
          </div>

          {isRecording && (
            <div className="recording-status">
              <div className="recording-timer">
                <span className="recording-dot">🔴</span>
                <span className="time">{formatTime(recordingTime)}</span>
              </div>
              
              <div className="audio-level">
                <div className="level-label">Audio Level:</div>
                <div className="level-meter">
                  <div 
                    className={`level-bar ${getAudioLevelClass()}`}
                    style={{ width: `${audioLevel}%` }}
                  />
                </div>
                <div className="level-value">{Math.round(audioLevel)}%</div>
              </div>
            </div>
          )}
        </div>

        <div className="speech-reference">
          <h3>📝 Speech Reference</h3>
          <div className="speech-text-preview">
            {speechContent}
          </div>
        </div>

        <div className="recordings-section">
          <h3>🎵 Your Recordings ({recordings.length})</h3>
          
          {recordings.length === 0 ? (
            <div className="no-recordings">
              <p>No recordings yet. Start practicing to create your first recording!</p>
            </div>
          ) : (
            <div className="recordings-list">
              {recordings.map((recording) => (
                <div key={recording.id} className="recording-item">
                  <div className="recording-info">
                    <h4>{recording.name}</h4>
                    <div className="recording-meta">
                      <span>Duration: {formatTime(recording.duration)}</span>
                      <span>Date: {recording.timestamp.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="recording-actions">
                    <button 
                      className={`btn btn-small ${playingId === recording.id ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => playRecording(recording)}
                    >
                      {playingId === recording.id ? '⏹️ Stop' : '▶️ Play'}
                    </button>
                    
                    <button 
                      className="btn btn-outline btn-small"
                      onClick={() => downloadRecording(recording)}
                    >
                      💾 Download
                    </button>
                    
                    <button 
                      className="btn btn-outline btn-small recording-delete"
                      onClick={() => deleteRecording(recording.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
