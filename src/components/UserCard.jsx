import './UserCard.css';

function UserCard({ name, role, avatarUrl, isOnline }) {
  return (
    <div className="user-card">
      <div className="avatar-section">
        <img src={avatarUrl} alt={`Аватар ${name}`} />
        <div className={`status-indicator ${isOnline ? 'status-online' : 'status-offline'}`}></div>
        <p className={isOnline ? 'status-online-text' : 'status-offline-text'}>
          {isOnline ? 'online' : 'offline'}
        </p>
      </div>
      
      <div className="user-info">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </div>
  );
}

export default UserCard;