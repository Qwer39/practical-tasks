import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="page home-page">
      <div className="hero-section">
        <h1>Добро пожаловать в Трекер технологий</h1>
        <p className="hero-description">
          Управляйте своим прогрессом в изучении современных технологий. 
          Отслеживайте, что вы изучили, что в процессе и что планируете.
        </p>
        <div className="hero-actions">
          <Link to="/technologies" className="btn btn-primary btn-lg">
            Начать отслеживание
          </Link>
          <Link to="/about" className="btn btn-secondary btn-lg">
            Узнать больше
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Возможности трекера</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Управление технологиями</h3>
            <p>Добавляйте, редактируйте и отслеживайте технологии, которые вы изучаете.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Статистика и прогресс</h3>
            <p>Наглядные графики и отчеты о вашем прогрессе по категориям и статусам.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Настройки и импорт</h3>
            <p>Экспортируйте и импортируйте данные, настраивайте тему и уведомления.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Безопасность</h3>
            <p>Ваши данные сохраняются локально и защищены.</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Быстрые действия</h2>
        <div className="actions-grid">
          <Link to="/add-technology" className="action-card">
            <span className="action-icon">➕</span>
            <span className="action-text">Добавить технологию</span>
          </Link>
          <Link to="/statistics" className="action-card">
            <span className="action-icon">📊</span>
            <span className="action-text">Посмотреть статистику</span>
          </Link>
          <Link to="/settings" className="action-card">
            <span className="action-icon">⚙️</span>
            <span className="action-text">Настройки приложения</span>
          </Link>
          <Link to="/technologies" className="action-card">
            <span className="action-icon">👁️</span>
            <span className="action-text">Просмотреть все технологии</span>
          </Link>
        </div>
      </div>

      <div className="recent-tech-section">
        <h2>Недавно добавленные технологии</h2>
        <div className="tech-preview">
          <div className="tech-item">
            <h3>React</h3>
            <p>Библиотека для создания пользовательских интерфейсов</p>
            <span className="tech-status status-in-progress">В процессе</span>
          </div>
          <div className="tech-item">
            <h3>Node.js</h3>
            <p>Среда выполнения JavaScript на сервере</p>
            <span className="tech-status status-completed">Завершено</span>
          </div>
          <div className="tech-item">
            <h3>TypeScript</h3>
            <p>Типизированное надмножество JavaScript</p>
            <span className="tech-status status-not-started">Не начато</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;