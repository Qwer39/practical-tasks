import { useState, useEffect, useRef, useCallback } from 'react';
import useDebounce from '../hooks/useDebounce';
import './TechnologySearch.css';

function TechnologySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const abortControllerRef = useRef(null);

  // Загрузка истории из localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('techSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Сохранение в историю
  const saveToHistory = useCallback((term) => {
    if (!term.trim()) return;
    
    const updatedHistory = [
      term,
      ...searchHistory.filter(item => item !== term).slice(0, 9)
    ];
    setSearchHistory(updatedHistory);
    localStorage.setItem('techSearchHistory', JSON.stringify(updatedHistory));
  }, [searchHistory]);

  // Поиск технологий
  const searchTechnologies = useCallback(async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      // Используем публичное API с технологиями
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+language:javascript&sort=stars&order=desc&per_page=10`,
        { 
          signal: abortControllerRef.current.signal,
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
      }

      const data = await response.json();
      const formattedResults = data.items.map(item => ({
        id: item.id,
        name: item.name,
        fullName: item.full_name,
        description: item.description,
        language: item.language,
        stars: item.stargazers_count,
        forks: item.forks_count,
        url: item.html_url,
        updated: item.updated_at,
        owner: item.owner.login,
        ownerAvatar: item.owner.avatar_url
      }));

      setResults(formattedResults);
      saveToHistory(query);

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        console.error('Ошибка поиска:', err);
      }
    } finally {
      setLoading(false);
    }
  }, [saveToHistory]);

  // Выполняем поиск при изменении debounced значения
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchTechnologies(debouncedSearchTerm);
    } else {
      setResults([]);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedSearchTerm, searchTechnologies]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('techSearchHistory');
  };

  const handleTechSelect = (tech) => {
    setSelectedTech(tech);
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    setSelectedTech(null);
    setError(null);
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="technology-search">
      <div className="search-header">
        <h2>🔍 Поиск технологий GitHub</h2>
        <p>Поиск репозиториев JavaScript с debounce (500ms)</p>
      </div>

      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Введите технологию (React, Vue, Angular)..."
            className="search-input"
            aria-label="Поиск технологий"
          />
          {searchTerm && (
            <button 
              onClick={handleClear} 
              className="clear-button"
              aria-label="Очистить поиск"
            >
              ✕
            </button>
          )}
          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            <button onClick={() => searchTechnologies(searchTerm)} className="retry-button">
              Повторить
            </button>
          </div>
        )}

        {/* История поиска */}
        {searchHistory.length > 0 && !searchTerm && (
          <div className="search-history">
            <div className="history-header">
              <h4>📚 История поиска</h4>
              <button onClick={clearHistory} className="clear-history-button">
                Очистить историю
              </button>
            </div>
            <div className="history-tags">
              {searchHistory.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(term)}
                  className="history-tag"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Подсказки */}
        {!searchTerm && !loading && (
          <div className="search-hints">
            <h4>💡 Популярные технологии:</h4>
            <div className="hint-tags">
              {['React', 'Vue', 'Angular', 'Node.js', 'TypeScript', 'Next.js', 'Express', 'MongoDB'].map(tech => (
                <button
                  key={tech}
                  onClick={() => setSearchTerm(tech)}
                  className="hint-tag"
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Результаты поиска */}
        {results.length > 0 && (
          <div className="search-results">
            <div className="results-header">
              <h3>📊 Найдено репозиториев: {results.length}</h3>
              <div className="sort-options">
                <span>Сортировка: </span>
                <select className="sort-select">
                  <option value="stars">По звездам</option>
                  <option value="forks">По форкам</option>
                  <option value="updated">По обновлению</option>
                </select>
              </div>
            </div>

            <div className="results-grid">
              {results.map(tech => (
                <div 
                  key={tech.id} 
                  className={`tech-card ${selectedTech?.id === tech.id ? 'selected' : ''}`}
                  onClick={() => handleTechSelect(tech)}
                >
                  <div className="tech-header">
                    <div className="tech-owner">
                      <img 
                        src={tech.ownerAvatar} 
                        alt={tech.owner}
                        className="owner-avatar"
                      />
                      <span className="owner-name">{tech.owner}</span>
                    </div>
                    <div className="tech-stats">
                      <span className="stat" title="Звезды">⭐ {tech.stars}</span>
                      <span className="stat" title="Форки">🔱 {tech.forks}</span>
                    </div>
                  </div>
                  
                  <h4 className="tech-name">{tech.name}</h4>
                  <p className="tech-description">{tech.description || 'Нет описания'}</p>
                  
                  <div className="tech-footer">
                    <span className="tech-language">
                      <span className="language-dot"></span>
                      {tech.language || 'JavaScript'}
                    </span>
                    <a 
                      href={tech.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="github-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Открыть в GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Детали выбранной технологии */}
        {selectedTech && (
          <div className="tech-detail">
            <div className="detail-header">
              <h3>📋 Детали технологии</h3>
              <button 
                onClick={() => setSelectedTech(null)}
                className="close-detail-button"
              >
                ✕
              </button>
            </div>
            <div className="detail-content">
              <div className="detail-main">
                <h4>{selectedTech.fullName}</h4>
                <p>{selectedTech.description}</p>
              </div>
              <div className="detail-stats">
                <div className="stat-item">
                  <span className="stat-label">Язык:</span>
                  <span className="stat-value">{selectedTech.language || 'JavaScript'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Звезды:</span>
                  <span className="stat-value">⭐ {selectedTech.stars.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Форки:</span>
                  <span className="stat-value">🔱 {selectedTech.forks.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Обновлен:</span>
                  <span className="stat-value">
                    {new Date(selectedTech.updated).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
              <div className="detail-actions">
                <a 
                  href={selectedTech.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  🔗 Открыть репозиторий
                </a>
                <button 
                  onClick={() => {
                    // Добавление в избранное
                    const favorites = JSON.parse(localStorage.getItem('techFavorites') || '[]');
                    const updatedFavorites = [...favorites, selectedTech];
                    localStorage.setItem('techFavorites', JSON.stringify(updatedFavorites));
                    alert('Добавлено в избранное!');
                  }}
                  className="btn-secondary"
                >
                  ⭐ Добавить в избранное
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Сообщение о пустом результате */}
        {debouncedSearchTerm && !loading && results.length === 0 && !error && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>Ничего не найдено</h3>
            <p>Попробуйте изменить запрос или выберите из подсказок</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologySearch;