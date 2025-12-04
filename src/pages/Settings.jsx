import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Settings.css';

function Settings({ currentTheme = 'light', onThemeChange }) {
  const [settings, setSettings] = useState({
    theme: currentTheme,
    notifications: true,
    autoSave: true,
    language: 'ru'
  });
  
  const [technologies, setTechnologies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Загружаем настройки из localStorage
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(prev => ({
        ...prev,
        ...JSON.parse(savedSettings),
        theme: currentTheme
      }));
    }

    // Загружаем список технологий для статистики
    const savedTech = localStorage.getItem('technologies');
    if (savedTech) {
      setTechnologies(JSON.parse(savedTech));
    }
  }, [currentTheme]);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
    
    // Если меняем тему, вызываем колбэк
    if (key === 'theme' && onThemeChange) {
      onThemeChange(value);
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(technologies, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) {
          throw new Error('Неверный формат данных');
        }
        localStorage.setItem('technologies', JSON.stringify(imported));
        alert(`Импортировано ${imported.length} технологий`);
        navigate('/technologies');
      } catch (error) {
        alert('Ошибка импорта: неверный формат файла');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleResetData = () => {
    if (window.confirm('Вы уверены? Все данные будут удалены безвозвратно.')) {
      localStorage.removeItem('technologies');
      alert('Данные успешно сброшены');
      navigate('/');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Вы уверены? Это очистит все настройки и данные приложения.')) {
      localStorage.clear();
      alert('Все данные и настройки очищены');
      navigate('/');
    }
  };

  return (
    <div className="page settings-page">
      <div className="page-header">
        <h1>⚙️ Настройки приложения</h1>
        <Link to="/" className="btn btn-secondary">
          ← На главную
        </Link>
      </div>

      <div className="settings-container">
        {/* Настройки внешнего вида */}
        <div className="settings-section">
          <h2>Внешний вид</h2>
          <div className="setting-item">
            <label>
              <span>Тема оформления</span>
              <select 
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
              >
                <option value="light">🌞 Светлая</option>
                <option value="dark">🌙 Темная</option>
                <option value="auto">🔄 Авто (следует системным настройкам)</option>
              </select>
            </label>
            <p className="setting-description">
              {settings.theme === 'light' && 'Чистая светлая тема'}
              {settings.theme === 'dark' && 'Комфортная темная тема'}
              {settings.theme === 'auto' && 'Автоматически подстраивается под систему'}
            </p>
          </div>

          <div className="setting-item">
            <label>
              <span>Язык интерфейса</span>
              <select 
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <option value="ru">🇷🇺 Русский</option>
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
              </select>
            </label>
          </div>
        </div>

        {/* Настройки уведомлений */}
        <div className="settings-section">
          <h2>Уведомления</h2>
          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              <span>Включить уведомления о дедлайнах</span>
            </label>
          </div>
        </div>

        {/* Настройки данных */}
        <div className="settings-section">
          <h2>Управление данными</h2>
          
          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
              />
              <span>Автосохранение изменений</span>
            </label>
          </div>

          <div className="data-actions">
            <div className="action-item">
              <h4>Экспорт данных</h4>
              <p>Скачайте все ваши технологии в JSON-файл</p>
              <button 
                onClick={handleExportData}
                disabled={technologies.length === 0}
                className="btn btn-primary"
              >
                📥 Экспортировать данные
              </button>
            </div>

            <div className="action-item">
              <h4>Импорт данных</h4>
              <p>Загрузите технологии из JSON-файла</p>
              <label className="file-upload">
                📤 Выбрать файл
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                />
              </label>
            </div>

            <div className="action-item">
              <h4>Сброс данных</h4>
              <p>Удалить все технологии</p>
              <button 
                onClick={handleResetData}
                disabled={technologies.length === 0}
                className="btn btn-warning"
              >
                🗑️ Сбросить данные
              </button>
            </div>
          </div>
        </div>

        {/* Опасная зона */}
        <div className="settings-section danger-zone">
          <h2>⚠️ Опасная зона</h2>
          <div className="action-item">
            <h4>Полный сброс</h4>
            <p>Удалит все настройки и данные приложения</p>
            <button 
              onClick={handleClearAll}
              className="btn btn-danger"
            >
              🚨 Очистить всё
            </button>
          </div>
        </div>

        {/* Информация о приложении */}
        <div className="settings-section">
          <h2>О приложении</h2>
          <div className="app-info">
            <p><strong>Версия:</strong> 1.0.0</p>
            <p><strong>Количество технологий:</strong> {technologies.length}</p>
            <p><strong>Последнее обновление:</strong> {new Date().toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;