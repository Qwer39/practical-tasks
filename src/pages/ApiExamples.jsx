import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ApiExamples.css';

function ApiExamples() {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="api-examples-page">
      <div className="page-header">
        <h1>🌐 Примеры работы с API</h1>
        <p>Практическое занятие №24: Извлечение данных из API и их обработка</p>
      </div>

      <div className="tabs-navigation">
        <button
          className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          📋 Информация
        </button>
        <button
          className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          📡 Базовые запросы
        </button>
        <button
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          🔍 Поиск с Debounce
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'info' && (
          <div className="info-content">
            <h2>Примеры работы с API</h2>
            <p>На этой странице демонстрируются различные способы работы с API в React-приложении:</p>
            
            <div className="examples-list">
              <div className="example-card">
                <h3>📡 Базовые запросы</h3>
                <p>Использование fetch, useState и useEffect для получения данных</p>
              </div>
              
              <div className="example-card">
                <h3>🔍 Поиск с Debounce</h3>
                <p>Оптимизация поисковых запросов с задержкой и отменой</p>
              </div>
              
              <div className="example-card">
                <h3>🎣 Кастомный хук</h3>
                <p>Создание переиспользуемого хука для работы с API</p>
              </div>
            </div>
            
            <div className="instructions">
              <h3>Чтобы добавить полную функциональность:</h3>
              <ol>
                <li>Создайте папку <code>src/hooks/</code> с хуками useApi.jsx и useDebounce.jsx</li>
                <li>Создайте компоненты в папке <code>src/components/</code>:
                  <ul>
                    <li>UserList.jsx - для загрузки пользователей</li>
                    <li>ProductSearch.jsx - для поиска продуктов</li>
                    <li>TechnologySearch.jsx - для поиска технологий</li>
                  </ul>
                </li>
                <li>Импортируйте их в этот файл</li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'basic' && (
          <div className="basic-api-example">
            <h2>Пример базового запроса к API</h2>
            <div className="code-example">
              <pre>{`// Пример использования fetch
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      setUsers(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
}, []);`}</pre>
            </div>
            <div className="mock-data">
              <h3>Пример данных (заглушка):</h3>
              <div className="user-card">
                <h4>Иван Иванов</h4>
                <p>Email: ivan@example.com</p>
                <p>Город: Москва</p>
              </div>
              <div className="user-card">
                <h4>Анна Петрова</h4>
                <p>Email: anna@example.com</p>
                <p>Город: Санкт-Петербург</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="search-example">
            <h2>Пример поиска с Debounce</h2>
            <div className="search-demo">
              <input
                type="text"
                placeholder="Введите запрос для поиска..."
                className="search-input"
                onChange={(e) => {
                  // Здесь будет логика поиска с debounce
                  console.log('Search:', e.target.value);
                }}
              />
              <p className="search-hint">
                При вводе запрос отправляется с задержкой 500ms для оптимизации
              </p>
            </div>
            <div className="code-example">
              <pre>{`// Пример реализации debounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};`}</pre>
            </div>
          </div>
        )}
      </div>

      <div className="back-to-home">
        <Link to="/" className="btn-back">
          ← Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default ApiExamples;