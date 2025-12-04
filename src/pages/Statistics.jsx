import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgressChart from '../components/ProgressChart';
import './Statistics.css';

function Statistics() {
  const [technologies, setTechnologies] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    byCategory: {}
  });

  useEffect(() => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      const techData = JSON.parse(saved);
      setTechnologies(techData);
      calculateStats(techData);
    }
  }, []);

  const calculateStats = (techData) => {
    const total = techData.length;
    const completed = techData.filter(t => t.status === 'completed').length;
    const inProgress = techData.filter(t => t.status === 'in-progress').length;
    const notStarted = techData.filter(t => t.status === 'not-started').length;

    // Группировка по категориям
    const byCategory = {};
    techData.forEach(tech => {
      if (!byCategory[tech.category]) {
        byCategory[tech.category] = { total: 0, completed: 0 };
      }
      byCategory[tech.category].total++;
      if (tech.status === 'completed') {
        byCategory[tech.category].completed++;
      }
    });

    setStats({
      total,
      completed,
      inProgress,
      notStarted,
      byCategory
    });
  };

  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="page statistics-page">
      <div className="page-header">
        <h1>📈 Статистика изучения</h1>
        <Link to="/technologies" className="btn btn-secondary">
          ← К списку технологий
        </Link>
      </div>

      {technologies.length === 0 ? (
        <div className="empty-state">
          <p>Нет данных для статистики. Добавьте технологии!</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить технологию
          </Link>
        </div>
      ) : (
        <>
          {/* Общая статистика */}
          <div className="stats-overview">
            <div className="stat-card">
              <h3>Всего технологий</h3>
              <div className="stat-number">{stats.total}</div>
            </div>
            
            <div className="stat-card success">
              <h3>Завершено</h3>
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-percentage">
                {completionPercentage}%
              </div>
            </div>
            
            <div className="stat-card warning">
              <h3>В процессе</h3>
              <div className="stat-number">{stats.inProgress}</div>
            </div>
            
            <div className="stat-card info">
              <h3>Не начато</h3>
              <div className="stat-number">{stats.notStarted}</div>
            </div>
          </div>

          {/* Прогресс бар */}
          <div className="progress-section">
            <h3>Общий прогресс</h3>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {completionPercentage}% завершено ({stats.completed} из {stats.total})
            </div>
          </div>

          {/* График прогресса */}
          <div className="chart-section">
            <h3>Прогресс по категориям</h3>
            <ProgressChart data={stats.byCategory} />
          </div>

          {/* Детали по категориям */}
          <div className="category-stats">
            <h3>Статистика по категориям</h3>
            <div className="category-list">
              {Object.entries(stats.byCategory).map(([category, data]) => {
                const categoryPercentage = data.total > 0 
                  ? Math.round((data.completed / data.total) * 100)
                  : 0;
                
                return (
                  <div key={category} className="category-item">
                    <div className="category-header">
                      <h4>{category}</h4>
                      <span className="category-count">
                        {data.completed}/{data.total}
                      </span>
                    </div>
                    <div className="category-progress">
                      <div 
                        className="category-progress-bar"
                        style={{ width: `${categoryPercentage}%` }}
                      ></div>
                    </div>
                    <div className="category-percentage">
                      {categoryPercentage}% завершено
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Рекомендации */}
          <div className="recommendations">
            <h3>Рекомендации</h3>
            {stats.notStarted > 0 && (
              <div className="recommendation warning">
                <strong>Начать изучение:</strong> {stats.notStarted} технологий еще не начаты
              </div>
            )}
            {stats.inProgress > 0 && (
              <div className="recommendation info">
                <strong>Продолжить:</strong> {stats.inProgress} технологий находятся в процессе изучения
              </div>
            )}
            {stats.completed > 0 && (
              <div className="recommendation success">
                <strong>Отличная работа!</strong> Вы завершили {stats.completed} технологий
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Statistics;