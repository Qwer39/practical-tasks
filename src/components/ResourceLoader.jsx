import { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import './ResourceLoader.css';

function ResourceLoader({ technologyId, technologyName }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    url: '',
    type: 'documentation',
    description: ''
  });

  // Используем кастомный хук для загрузки ресурсов
  const { data: apiResources, loading: apiLoading, error: apiError, refetch } = useApi(
    technologyId ? `https://jsonplaceholder.typicode.com/posts?userId=${technologyId}&_limit=5` : null
  );

  // Трансформируем данные API в нужный формат
  useEffect(() => {
    if (apiResources) {
      const formattedResources = apiResources.map(resource => ({
        id: resource.id,
        title: resource.title,
        url: `https://example.com/resource/${resource.id}`,
        type: ['documentation', 'tutorial', 'video', 'article', 'course'][Math.floor(Math.random() * 5)],
        description: resource.body,
        added: new Date().toISOString(),
        rating: Math.floor(Math.random() * 5) + 1
      }));
      setResources(formattedResources);
    }
  }, [apiResources]);

  const loadExternalResources = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Имитация запроса к внешнему API для получения ресурсов
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Моковые данные внешних ресурсов
      const externalResources = [
        {
          id: Date.now() + 1,
          title: `Официальная документация ${technologyName}`,
          url: `https://${technologyName.toLowerCase()}.org/docs`,
          type: 'documentation',
          description: 'Официальная документация с примерами и руководствами',
          added: new Date().toISOString(),
          rating: 5,
          external: true
        },
        {
          id: Date.now() + 2,
          title: `Видеокурс по ${technologyName}`,
          url: 'https://youtube.com/playlist?list=example',
          type: 'video',
          description: 'Полный видеокурс для начинающих и продвинутых',
          added: new Date().toISOString(),
          rating: 4,
          external: true
        },
        {
          id: Date.now() + 3,
          title: `Статья на Medium: "Освоение ${technologyName}"`,
          url: 'https://medium.com/example',
          type: 'article',
          description: 'Подробная статья с лучшими практиками',
          added: new Date().toISOString(),
          rating: 4,
          external: true
        }
      ];
      
      setResources(prev => [...externalResources, ...prev]);
      
    } catch (err) {
      setError('Не удалось загрузить внешние ресурсы');
      console.error('Ошибка загрузки ресурсов:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    
    if (!newResource.title.trim() || !newResource.url.trim()) {
      setError('Заполните обязательные поля');
      return;
    }

    const resource = {
      id: Date.now(),
      ...newResource,
      added: new Date().toISOString(),
      rating: 0,
      external: false
    };

    setResources(prev => [resource, ...prev]);
    setNewResource({ title: '', url: '', type: 'documentation', description: '' });
    setShowForm(false);
    setError(null);
  };

  const handleDeleteResource = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот ресурс?')) {
      setResources(prev => prev.filter(resource => resource.id !== id));
    }
  };

  const handleRateResource = (id, rating) => {
    setResources(prev => prev.map(resource => 
      resource.id === id ? { ...resource, rating } : resource
    ));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'documentation': return '📚';
      case 'tutorial': return '📖';
      case 'video': return '🎬';
      case 'article': return '📰';
      case 'course': return '🎓';
      default: return '🔗';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'documentation': return '#3498db';
      case 'tutorial': return '#2ecc71';
      case 'video': return '#e74c3c';
      case 'article': return '#9b59b6';
      case 'course': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="resource-loader">
      <div className="resource-header">
        <h3>📚 Ресурсы для изучения {technologyName}</h3>
        <div className="resource-stats">
          <span className="stat">Всего: {resources.length}</span>
          <span className="stat">Загружено: {resources.filter(r => r.external).length}</span>
          <span className="stat">Добавлено: {resources.filter(r => !r.external).length}</span>
        </div>
      </div>

      <div className="resource-controls">
        <button 
          onClick={loadExternalResources} 
          disabled={loading || apiLoading}
          className="btn-load-external"
        >
          {loading ? '⏳ Загрузка...' : '🌐 Загрузить внешние ресурсы'}
        </button>
        
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-add-resource"
        >
          {showForm ? '✕ Отмена' : '➕ Добавить ресурс'}
        </button>
        
        <button 
          onClick={refetch} 
          disabled={apiLoading}
          className="btn-refresh"
        >
          {apiLoading ? '🔄 Обновление...' : '🔄 Обновить из API'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="dismiss-error">
            ✕
          </button>
        </div>
      )}

      {apiError && (
        <div className="api-error">
          <span className="error-icon">⚠️</span>
          <span>Ошибка API: {apiError}</span>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleAddResource} className="resource-form">
          <div className="form-group">
            <label htmlFor="title">Название ресурса *</label>
            <input
              type="text"
              id="title"
              value={newResource.title}
              onChange={(e) => setNewResource({...newResource, title: e.target.value})}
              placeholder="Например: React документация"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="url">URL *</label>
              <input
                type="url"
                id="url"
                value={newResource.url}
                onChange={(e) => setNewResource({...newResource, url: e.target.value})}
                placeholder="https://example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Тип ресурса</label>
              <select
                id="type"
                value={newResource.type}
                onChange={(e) => setNewResource({...newResource, type: e.target.value})}
              >
                <option value="documentation">📚 Документация</option>
                <option value="tutorial">📖 Туториал</option>
                <option value="video">🎬 Видео</option>
                <option value="article">📰 Статья</option>
                <option value="course">🎓 Курс</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              value={newResource.description}
              onChange={(e) => setNewResource({...newResource, description: e.target.value})}
              placeholder="Краткое описание ресурса..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              💾 Сохранить ресурс
            </button>
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="btn-cancel"
            >
              Отмена
            </button>
          </div>
        </form>
      )}

      {(loading || apiLoading) && (
        <div className="loading-resources">
          <div className="spinner"></div>
          <p>Загрузка ресурсов...</p>
        </div>
      )}

      {resources.length > 0 ? (
        <div className="resources-list">
          <h4>Список ресурсов:</h4>
          <div className="resources-grid">
            {resources.map(resource => (
              <div key={resource.id} className="resource-card">
                <div className="resource-header">
                  <div className="resource-type" style={{ backgroundColor: getTypeColor(resource.type) }}>
                    <span className="type-icon">{getTypeIcon(resource.type)}</span>
                    <span className="type-name">{resource.type}</span>
                  </div>
                  <div className="resource-actions">
                    {!resource.external && (
                      <button 
                        onClick={() => handleDeleteResource(resource.id)}
                        className="btn-delete"
                        title="Удалить"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>

                <div className="resource-content">
                  <h5>{resource.title}</h5>
                  <p className="resource-description">{resource.description}</p>
                  
                  <div className="resource-meta">
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      🔗 {new URL(resource.url).hostname}
                    </a>
                    <span className="resource-date">
                      {new Date(resource.added).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>

                <div className="resource-footer">
                  <div className="rating">
                    <span>Рейтинг:</span>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => handleRateResource(resource.id, star)}
                          className={`star ${star <= resource.rating ? 'active' : ''}`}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                    <span className="rating-value">{resource.rating}/5</span>
                  </div>
                  
                  {resource.external && (
                    <span className="external-badge" title="Загружено из внешнего источника">
                      🌐 Внешний
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !loading && !apiLoading && (
        <div className="no-resources">
          <div className="no-resources-icon">📚</div>
          <h4>Ресурсы не найдены</h4>
          <p>Загрузите внешние ресурсы или добавьте свой первый ресурс</p>
        </div>
      )}

      <div className="resource-info">
        <h4>💡 Информация о ресурсах:</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-icon">📚</span>
            <span className="info-text">Документация - официальная информация</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📖</span>
            <span className="info-text">Туториалы - пошаговые руководства</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🎬</span>
            <span className="info-text">Видео - лекции и демонстрации</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📰</span>
            <span className="info-text">Статьи - углубленные материалы</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🎓</span>
            <span className="info-text">Курсы - структурированное обучение</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceLoader;