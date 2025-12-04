import './TechnologyCard.css';


import { useState } from 'react';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(technology.notes);

  const handleStatusClick = (newStatus) => {
    onStatusChange(technology.id, newStatus);
  };

  const handleSaveNotes = () => {
    onNotesChange(technology.id, tempNotes);
    setIsEditingNotes(false);
  };

  const statusColors = {
    'completed': '#4CAF50',
    'in-progress': '#FF9800',
    'not-started': '#F44336'
  };

  const statusTexts = {
    'completed': 'Завершено',
    'in-progress': 'В процессе',
    'not-started': 'Не начато'
  };

  return (
    <div className="technology-card" style={{ borderLeft: `5px solid ${statusColors[technology.status]}` }}>
      <div className="card-header">
        <h3>{technology.title}</h3>
        <span className="category-badge">{technology.category}</span>
      </div>
      
      <p className="description">{technology.description}</p>
      
      <div className="status-section">
        <span className="status-label">Статус:</span>
        <div className="status-buttons">
          {Object.entries(statusTexts).map(([status, text]) => (
            <button
              key={status}
              className={`status-btn ${technology.status === status ? 'active' : ''}`}
              onClick={() => handleStatusClick(status)}
              style={{ backgroundColor: technology.status === status ? statusColors[status] : '#eee' }}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      <div className="notes-section">
        <h4>Заметки:</h4>
        {isEditingNotes ? (
          <div>
            <textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              rows="3"
            />
            <div className="notes-actions">
              <button onClick={handleSaveNotes}>Сохранить</button>
              <button onClick={() => setIsEditingNotes(false)}>Отмена</button>
            </div>
          </div>
        ) : (
          <div>
            <p>{technology.notes || 'Заметок нет'}</p>
            <button onClick={() => setIsEditingNotes(true)}>
              {technology.notes ? 'Редактировать' : 'Добавить заметки'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologyCard;