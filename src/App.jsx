import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Компоненты из 23-й практики (роутинг)
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Компоненты из 24-й практики (API)
import ApiExamples from './pages/ApiExamples';

// Компоненты из 25-й практики (формы)
import FormsExamplesPage from './pages/FormsExamplesPage';

// Компоненты из 26-й практики (Material-UI)
import MaterialUIPage from './pages/MaterialUIPage';

function App() {
  // Состояния для авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [theme, setTheme] = useState('light');

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('username') || '';
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    setIsLoggedIn(loggedIn);
    setUserName(user);
    setTheme(savedTheme);
  }, []);

  // Обработчик входа
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserName(user);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', user);
  };

  // Обработчик выхода
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  };

  // Обработчик изменения темы
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
      <div className={`app theme-${theme}`} data-theme={theme}>
        <Navigation 
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogout={handleLogout}
        />
        
        <main className="main-content">
          <Routes>
            {/* Основные маршруты */}
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />
            <Route path="/statistics" element={<Statistics />} />
            
            <Route 
              path="/settings" 
              element={
                <Settings 
                  currentTheme={theme}
                  onThemeChange={handleThemeChange}
                />
              } 
            />
            
            <Route 
              path="/login" 
              element={
                <Login onLogin={handleLogin} />
              } 
            />
            
            {/* Практические работы */}
            <Route path="/api-examples" element={<ApiExamples />} />
            <Route path="/forms-examples" element={<FormsExamplesPage />} />
            <Route path="/material-ui" element={<MaterialUIPage />} />
            
            {/* Защищенные маршруты */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <div className="page">
                    <div className="page-header">
                      <h1>Административная панель</h1>
                      <p className="page-subtitle">Добро пожаловать, {userName}!</p>
                    </div>
                    
                    <div className="admin-dashboard">
                      <div className="dashboard-stats">
                        <div className="stat-card">
                          <div className="stat-icon">📊</div>
                          <div className="stat-info">
                            <h3>Активность</h3>
                            <p className="stat-value">85%</p>
                            <p className="stat-label">за последнюю неделю</p>
                          </div>
                        </div>
                        
                        <div className="stat-card">
                          <div className="stat-icon">👥</div>
                          <div className="stat-info">
                            <h3>Пользователи</h3>
                            <p className="stat-value">156</p>
                            <p className="stat-label">активных пользователей</p>
                          </div>
                        </div>
                        
                        <div className="stat-card">
                          <div className="stat-icon">📚</div>
                          <div className="stat-info">
                            <h3>Технологии</h3>
                            <p className="stat-value">42</p>
                            <p className="stat-label">всего технологий</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="admin-actions">
                        <h2>Быстрые действия</h2>
                        <div className="action-buttons">
                          <button className="action-btn">
                            <span className="action-icon">➕</span>
                            <span className="action-text">Добавить технологию</span>
                          </button>
                          
                          <button className="action-btn">
                            <span className="action-icon">👥</span>
                            <span className="action-text">Управление пользователями</span>
                          </button>
                          
                          <button className="action-btn">
                            <span className="action-icon">📊</span>
                            <span className="action-text">Просмотр статистики</span>
                          </button>
                          
                          <button className="action-btn">
                            <span className="action-icon">⚙️</span>
                            <span className="action-text">Настройки системы</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Страница 404 */}
            <Route path="*" element={
              <div className="page">
                <div className="error-page">
                  <div className="error-icon">404</div>
                  <h1>Страница не найдена</h1>
                  <p>Извините, запрашиваемая страница не существует.</p>
                  <div className="error-actions">
                    <a href="/" className="btn-primary">Вернуться на главную</a>
                    <a href="/technologies" className="btn-secondary">Перейти к технологиям</a>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🚀</span>
                <div>
                  <h3>Трекер технологий</h3>
                  <p>Изучай. Отслеживай. Достигай.</p>
                </div>
              </div>
              <p className="footer-description">
                Платформа для отслеживания прогресса в изучении современных технологий разработки.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Навигация</h4>
              <ul className="footer-links">
                <li><a href="/">🏠 Главная</a></li>
                <li><a href="/technologies">📚 Технологии</a></li>
                <li><a href="/api-examples">🌐 API Примеры</a></li>
                <li><a href="/forms-examples">📝 Формы</a></li>
                <li><a href="/material-ui">🎨 Material-UI</a></li>
                <li><a href="/statistics">📈 Статистика</a></li>
                <li><a href="/settings">⚙️ Настройки</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Практические работы</h4>
              <ul className="footer-links">
                <li><a href="/technologies">🎯 Практика 23: Роутинг</a></li>
                <li><a href="/api-examples">🌐 Практика 24: API</a></li>
                <li><a href="/forms-examples">📝 Практика 25: Формы</a></li>
                <li><a href="/material-ui">🎨 Практика 26: Material-UI</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Поддержка</h4>
              <ul className="footer-links">
                <li><a href="/help">❓ Помощь</a></li>
                <li><a href="/contact">📞 Контакты</a></li>
                <li><a href="/privacy">🔒 Конфиденциальность</a></li>
                <li><a href="/terms">📄 Условия использования</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="copyright">
              <p>© {new Date().getFullYear()} Трекер технологий. Все права защищены.</p>
              <p className="footer-note">Учебный проект для изучения React и веб-разработки</p>
            </div>
            
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">🐙</span>
                <span className="social-text">GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">🐦</span>
                <span className="social-text">Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">💼</span>
                <span className="social-text">LinkedIn</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;