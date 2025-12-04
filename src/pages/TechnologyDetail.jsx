import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';

function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { technologies, updateStatus } = useTechnologies();
  const [technology, setTechnology] = useState(null);

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(techId));
    setTechnology(tech);
  }, [techId, technologies]);

  const handleStatusChange = (newStatus) => {
    updateStatus(parseInt(techId), newStatus);
  };

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }

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
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>{technology.title}</h1>
      </div>

      <div className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Категория</h3>
          <span className="category-tag">{technology.category}</span>
        </div>

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            {Object.entries(statusTexts).map(([status, text]) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`status-btn ${technology.status === status ? 'active' : ''}`}
                style={{ 
                  backgroundColor: technology.status === status ? statusColors[status] : '#eee',
                  color: technology.status === status ? 'white' : '#666'
                }}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {technology.notes && (
          <div className="detail-section">
            <h3>Мои заметки</h3>
            <div className="notes-box">
              <p>{technology.notes}</p>
            </div>
          </div>
        )}

        <div className="detail-section">
          <h3>Действия</h3>
          <div className="action-buttons">
            <button onClick={() => navigate(`/edit-technology/${techId}`)} className="btn">
              Редактировать
            </button>
            <button onClick={() => navigate('/technologies')} className="btn">
              К списку технологий
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetail;