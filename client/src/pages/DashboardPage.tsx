import { useState } from 'react';

interface Speech {
  id: string;
  title: string;
  occasion: string;
  createdAt: string;
  status: 'draft' | 'completed';
  wordCount: number;
}

const DashboardPage: React.FC = () => {
  const [speeches] = useState<Speech[]>([
    {
      id: '1',
      title: 'Best Man Speech for Jake\'s Wedding',
      occasion: 'Wedding',
      createdAt: '2024-01-15',
      status: 'completed',
      wordCount: 650
    },
    {
      id: '2',
      title: 'Retirement Speech for Dad',
      occasion: 'Retirement',
      createdAt: '2024-01-10',
      status: 'draft',
      wordCount: 450
    }
  ]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Speeches</h1>
          <button className="btn btn-primary">
            + Create New Speech
          </button>
        </div>

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
                <h3>{speech.title}</h3>
                <span className={`status-badge ${speech.status}`}>
                  {speech.status === 'completed' ? 'Completed' : 'Draft'}
                </span>
              </div>
              <div className="speech-meta">
                <p>{speech.occasion} • {speech.wordCount} words</p>
                <p>Created {new Date(speech.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="speech-actions">
                <button className="btn btn-secondary btn-small">
                  Edit
                </button>
                <button className="btn btn-primary btn-small">
                  Practice
                </button>
                <button className="btn btn-outline btn-small">
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
              <button className="btn btn-primary">
                Create Your First Speech
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
