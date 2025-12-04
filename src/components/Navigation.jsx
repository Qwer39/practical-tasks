import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Navigation.css';

function Navigation({ isLoggedIn, userName, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Определяем активный путь
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        {/* Бренд и логотип */}
        <div className="nav-brand">
          <Link to="/" className="brand-link" onClick={closeMobileMenu}>
            <span className="brand-icon">🚀</span>
            <div className="brand-text">
              <h2 className="brand-title">Трекер технологий</h2>
              <p className="brand-subtitle">Практики 23-26</p>
            </div>
          </Link>
        </div>

        {/* Кнопка мобильного меню */}
        <button 
          className="mobile-menu-toggle" 
          onClick={handleMobileMenuToggle}
          aria-label="Открыть меню"
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Основное меню */}
        <div className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Главная</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/technologies" 
                className={`nav-link ${isActive('/technologies') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">📚</span>
                <span className="nav-text">Технологии</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/api-examples" 
                className={`nav-link ${isActive('/api-examples') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">🌐</span>
                <span className="nav-text">API Примеры</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/forms-examples" 
                className={`nav-link ${isActive('/forms-examples') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">📝</span>
                <span className="nav-text">Формы</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/material-ui" 
                className={`nav-link ${isActive('/material-ui') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">🎨</span>
                <span className="nav-text">Material-UI</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/statistics" 
                className={`nav-link ${isActive('/statistics') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">📈</span>
                <span className="nav-text">Статистика</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/settings" 
                className={`nav-link ${isActive('/settings') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">⚙️</span>
                <span className="nav-text">Настройки</span>
              </Link>
            </li>
          </ul>

          {/* Блок пользователя */}
          <div className="nav-user">
            {isLoggedIn ? (
              <div className="user-info">
                <div className="user-greeting">
                  <div className="user-avatar">
                    <span className="avatar-icon">👤</span>
                  </div>
                  <div className="user-details">
                    <span className="user-name">{userName}</span>
                    <span className="user-status">Онлайн</span>
                  </div>
                </div>
                <div className="user-actions">
                  <Link 
                    to="/add-technology" 
                    className="btn-add"
                    onClick={closeMobileMenu}
                  >
                    <span className="btn-icon">➕</span>
                    <span className="btn-text">Добавить</span>
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="btn-logout"
                    aria-label="Выйти из системы"
                  >
                    <span className="btn-icon">🚪</span>
                    <span className="btn-text">Выйти</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link 
                  to="/login" 
                  className="btn-login"
                  onClick={closeMobileMenu}
                >
                  <span className="btn-icon">🔑</span>
                  <span className="btn-text">Войти</span>
                </Link>
                <Link 
                  to="/register" 
                  className="btn-register"
                  onClick={closeMobileMenu}
                >
                  <span className="btn-icon">📝</span>
                  <span className="btn-text">Регистрация</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Мобильное меню оверлей */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
}

export default Navigation;