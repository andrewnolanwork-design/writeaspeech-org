import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  speechCount: number;
  subscription: string;
  provider?: string;
}

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const profileData: UserProfile = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || currentUser.email || '',
            createdAt: data.createdAt?.toDate() || new Date(),
            speechCount: data.speechCount || 0,
            subscription: data.subscription || 'free',
            provider: data.provider || 'email'
          };
          setProfile(profileData);
          setEditForm({
            firstName: profileData.firstName,
            lastName: profileData.lastName
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser || !profile) return;
    
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        updatedAt: new Date()
      });
      
      setProfile({
        ...profile,
        firstName: editForm.firstName,
        lastName: editForm.lastName
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditForm({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || ''
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="error-state">
            <h2>Profile Not Found</h2>
            <p>Unable to load your profile information.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {profile.firstName.charAt(0).toUpperCase()}
              {profile.lastName.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-title">
            <h1>My Profile</h1>
            <p>Manage your account information and preferences</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditing && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                      placeholder="Enter your first name"
                    />
                  ) : (
                    <div className="form-value">{profile.firstName || 'Not set'}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                      placeholder="Enter your last name"
                    />
                  ) : (
                    <div className="form-value">{profile.lastName || 'Not set'}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="form-value email-value">
                  {profile.email}
                  <span className="email-badge">
                    {profile.provider === 'google' ? 'Google Account' : 'Email Account'}
                  </span>
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h2>Account Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{profile.speechCount}</div>
                <div className="stat-label">Speeches Created</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{profile.subscription}</div>
                <div className="stat-label">Subscription Plan</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {profile.createdAt.toLocaleDateString()}
                </div>
                <div className="stat-label">Member Since</div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <Link to="/builder" className="btn btn-primary btn-large">
                Create New Speech
              </Link>
              <Link to="/dashboard" className="btn btn-outline btn-large">
                View My Speeches
              </Link>
              <a 
                href="#" 
                className="btn btn-outline btn-large"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Practice tools coming soon! For now, use the speech builder to create and practice your speeches.');
                }}
              >
                Download Practice Tools
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
