import { useState } from 'react';
import { Link } from 'react-router-dom';
import TechnologyForm from '../components/TechnologyForm/TechnologyForm';
import AccessibleForm from '../components/AccessibleForm/AccessibleForm';
import DataImportExport from '../components/DataImportExport/DataImportExport';
import './FormsExamplesPage.css';

function FormsExamplesPage() {
  const [activeTab, setActiveTab] = useState('technology');
  const [formData, setFormData] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveTechnology = (data) => {
    const newData = {
      ...data,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setFormData(prev => [...prev, newData]);
    setShowSuccess(true);
    
    // Скрыть сообщение через 3 секунды
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
    
    console.log('Сохраненные данные:', newData);
  };

  const handleCancel = () => {
    console.log('Форма отменена');
  };

  const tabs = [
    { id: 'technology', label: '📝 Форма технологии', icon: '⚛️' },
    { id: 'accessible', label: '♿ Доступная форма', icon: '👁️' },
    { id: 'import-export', label: '📁 Импорт/Экспорт', icon: '🔄' }
  ];

  return (
    <div className="forms-examples-page">
      <div className="page-header">
        <h1>🎯 Практика №25: Формы React</h1>
        <p className="subtitle">Валидация, доступность и работа с данными</p>
      </div>

      {showSuccess && (
        <div className="success-notification">
          <div className="success-content">
            <span className="success-icon">✓</span>
            <div>
              <h3>Успешно!</h3>
              <p>Данные формы сохранены. Всего сохранено форм: {formData.length}</p>
            </div>
            <button 
              onClick={() => setShowSuccess(false)}
              className="close-notification"
              aria-label="Закрыть уведомление"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="page-content">
        <div className="sidebar">
          <h3>📋 Примеры форм</h3>
          <nav className="tabs-navigation">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="stats-card">
            <h4>📊 Статистика</h4>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">Сохранено форм:</span>
                <span className="stat-value">{formData.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Активная вкладка:</span>
                <span className="stat-value">
                  {tabs.find(t => t.id === activeTab)?.label || 'Не выбрана'}
                </span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h4>🎯 Цели практики</h4>
            <ul>
              <li>Валидация форм в реальном времени</li>
              <li>Доступность (ARIA, семантика)</li>
              <li>Импорт/экспорт данных (JSON)</li>
              <li>Обработка ошибок и состояния</li>
              <li>UX/UI улучшения</li>
            </ul>
          </div>
        </div>

        <div className="main-content">
          <div className="content-header">
            <h2>
              {activeTab === 'technology' && '📝 Форма добавления технологии'}
              {activeTab === 'accessible' && '♿ Доступная контактная форма'}
              {activeTab === 'import-export' && '📁 Импорт и экспорт данных'}
            </h2>
            <div className="content-actions">
              <button 
                onClick={() => window.print()} 
                className="btn-secondary"
              >
                🖨️ Печать
              </button>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-secondary"
              >
                🔄 Обновить
              </button>
            </div>
          </div>

          <div className="tab-content">
            {activeTab === 'technology' && (
              <div className="form-container">
                <TechnologyForm 
                  onSave={handleSaveTechnology}
                  onCancel={handleCancel}
                  initialData={{
                    title: '',
                    description: '',
                    category: 'frontend',
                    difficulty: 'beginner',
                    deadline: '',
                    resources: ['']
                  }}
                />
                <div className="form-info">
                  <h3>ℹ️ Особенности этой формы:</h3>
                  <ul>
                    <li>Валидация в реальном времени</li>
                    <li>Динамическое добавление/удаление полей</li>
                    <li>Проверка URL ресурсов</li>
                    <li>Автоматическая очистка пустых полей</li>
                    <li>Блокировка отправки при ошибках</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'accessible' && (
              <div className="form-container">
                <AccessibleForm />
                <div className="accessibility-tips">
                  <h3>💡 Советы по доступности:</h3>
                  <div className="tips-grid">
                    <div className="tip-card">
                      <h4>🏷️ Правильные метки</h4>
                      <p>Используйте htmlFor и id для связывания меток с полями</p>
                    </div>
                    <div className="tip-card">
                      <h4>🎯 ARIA атрибуты</h4>
                      <p>Добавляйте aria-required, aria-invalid, aria-describedby</p>
                    </div>
                    <div className="tip-card">
                      <h4>🔊 Оповещения</h4>
                      <p>Используйте role="alert" для сообщений об ошибках</p>
                    </div>
                    <div className="tip-card">
                      <h4>⌨️ Навигация</h4>
                      <p>Обеспечьте полную навигацию с клавиатуры</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'import-export' && (
              <div className="form-container">
                <DataImportExport />
                <div className="data-management-info">
                  <h3>📊 Управление данными:</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-icon">📁</span>
                      <div>
                        <h4>JSON Формат</h4>
                        <p>Стандартный формат обмена данными</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">🔄</span>
                      <div>
                        <h4>Drag & Drop</h4>
                        <p>Перетаскивайте файлы для импорта</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">⚡</span>
                      <div>
                        <h4>Быстрый экспорт</h4>
                        <p>Скачивайте данные в один клик</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">🛡️</span>
                      <div>
                        <h4>Безопасность</h4>
                        <p>Проверка формата перед импортом</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="content-footer">
            <div className="navigation-buttons">
              <Link to="/api-examples" className="btn-back">
                ← К API примерам
              </Link>
              <Link to="/" className="btn-primary">
                🏠 На главную
              </Link>
            </div>
            <div className="page-info">
              <p>Практическое занятие №25: Формы React с валидацией и доступностью</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormsExamplesPage;