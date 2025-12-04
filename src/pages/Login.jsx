import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Простая проверка (в реальном приложении - запрос к серверу)
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        onLogin(username);
        navigate(from, { replace: true });
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } catch (err) {
      setError('Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setUsername('demo');
    setPassword('demo123');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🔐 Вход в систему</h1>
          <p>Войдите в свой аккаунт для доступа к трекеру технологий</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              required
              disabled={loading}
              className={error ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              disabled={loading}
              className={error ? 'error' : ''}
            />
          </div>

          {error && (
            <div className="error-message" role="alert">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Запомнить меня</span>
            </label>
            <a href="/forgot-password" className="forgot-password">
              Забыли пароль?
            </a>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Вход...
              </>
            ) : 'Войти'}
          </button>

          <button 
            type="button" 
            className="btn btn-secondary demo-btn"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            Демо-вход
          </button>
        </form>

        <div className="login-footer">
          <p>Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
          <div className="login-hint">
            <p><strong>Тестовые данные:</strong></p>
            <p>Логин: <code>admin</code>, Пароль: <code>admin</code></p>
            <p>Логин: <code>demo</code>, Пароль: <code>demo123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;