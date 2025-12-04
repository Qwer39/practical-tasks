import { useState, useEffect } from 'react';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

        if (!response.ok) {
          throw new Error('Не удалось загрузить данные пользователя');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="user-profile loading">
        <div className="spinner"></div>
        <p>Загрузка профиля...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile error">
        <div className="error-icon">⚠️</div>
        <h3>Ошибка загрузки</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>👤 Профиль пользователя</h2>
      <div className="user-card">
        <div className="user-header">
          <div className="avatar-placeholder">
            {user.name.charAt(0)}
          </div>
          <div className="user-main-info">
            <h3>{user.name}</h3>
            <p className="username">@{user.username}</p>
          </div>
        </div>
        
        <div className="user-details">
          <div className="detail-item">
            <span className="detail-label"> Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label"> Телефон:</span>
            <span className="detail-value">{user.phone}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label"> Website:</span>
            <a 
              href={`http://${user.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="website-link"
            >
              {user.website}
            </a>
          </div>
          <div className="detail-item">
            <span className="detail-label"> Компания:</span>
            <span className="detail-value">{user.company.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label"> Город:</span>
            <span className="detail-value">{user.address.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;