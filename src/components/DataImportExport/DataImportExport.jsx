import { useState } from 'react';
import './DataImportExport.css';

function DataImportExport() {
  // Состояние для списка технологий
  const [technologies, setTechnologies] = useState([
    { id: 1, title: 'React', category: 'frontend', status: 'in-progress' },
    { id: 2, title: 'Node.js', category: 'backend', status: 'not-started' },
    { id: 3, title: 'TypeScript', category: 'language', status: 'completed' }
  ]);

  // Состояние для сообщений о статусе операций
  const [status, setStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Экспорт данных в JSON-файл
  const exportToJSON = () => {
    try {
      // Преобразуем данные в JSON-строку с форматированием
      const dataStr = JSON.stringify(technologies, null, 2);

      // Создаем Blob объект из строки
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      // Создаем временную ссылку для скачивания
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;

      // Программно кликаем по ссылке для начала скачивания
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Освобождаем память
      URL.revokeObjectURL(url);

      setStatus('✅ Данные успешно экспортированы в JSON файл');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('❌ Ошибка экспорта данных');
      console.error('Ошибка экспорта:', error);
    }
  };

  // Импорт данных из JSON-файла
  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // Обработчик завершения чтения файла
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);

        // Проверка что импортированные данные - это массив
        if (!Array.isArray(imported)) {
          throw new Error('Неверный формат данных');
        }

        // Проверяем структуру данных
        const validatedData = imported.map((item, index) => ({
          id: item.id || Date.now() + index,
          title: item.title || `Технология ${index + 1}`,
          category: item.category || 'other',
          status: item.status || 'not-started',
          description: item.description || '',
          resources: item.resources || []
        }));

        setTechnologies(prev => [...prev, ...validatedData]);
        setStatus(`✅ Импортировано ${validatedData.length} технологий`);
        setTimeout(() => setStatus(''), 3000);
      } catch (error) {
        setStatus('❌ Ошибка импорта: неверный формат файла');
        console.error('Ошибка импорта:', error);
      }
    };

    // Запускаем асинхронное чтение файла как текста
    reader.readAsText(file);

    // Сбрасываем значение input для возможности повторного импорта
    event.target.value = '';
  };

  // Обработчики drag-and-drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      // Используем ту же логику чтения что и в importFromJSON
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            const validatedData = imported.map((item, index) => ({
              id: item.id || Date.now() + index,
              title: item.title || `Технология ${index + 1}`,
              category: item.category || 'other',
              status: item.status || 'not-started'
            }));

            setTechnologies(prev => [...prev, ...validatedData]);
            setStatus(`✅ Импортировано ${validatedData.length} технологий через drag-and-drop`);
            setTimeout(() => setStatus(''), 3000);
          }
        } catch (error) {
          setStatus('❌ Ошибка импорта: неверный формат файла');
        }
      };
      reader.readAsText(file);
    }
  };

  // Очистка всех данных
  const clearAllData = () => {
    if (window.confirm('Вы уверены, что хотите очистить все данные? Это действие нельзя отменить.')) {
      setTechnologies([]);
      setStatus('✅ Все данные очищены');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  // Добавление тестовых данных
  const addSampleData = () => {
    const sampleData = [
      { id: Date.now() + 1, title: 'Vue.js', category: 'frontend', status: 'not-started' },
      { id: Date.now() + 2, title: 'Express', category: 'backend', status: 'in-progress' },
      { id: Date.now() + 3, title: 'MongoDB', category: 'database', status: 'not-started' }
    ];
    setTechnologies(prev => [...prev, ...sampleData]);
    setStatus('✅ Добавлены тестовые данные');
    setTimeout(() => setStatus(''), 2000);
  };

  // Удаление конкретной технологии
  const deleteTechnology = (id) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== id));
    setStatus('✅ Технология удалена');
    setTimeout(() => setStatus(''), 2000);
  };

  // Форматирование даты для экспорта
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="data-import-export">
      <div className="header">
        <h1>📁 Импорт и экспорт данных</h1>
        <p className="subtitle">Управляйте данными технологий через JSON файлы</p>
      </div>

      {/* Статусное сообщение */}
      {status && (
        <div className={`status-message ${status.includes('✅') ? 'success' : 'error'}`}>
          {status}
        </div>
      )}

      <div className="controls-section">
        <h2>⚙️ Управление данными</h2>
        
        <div className="controls-grid">
          {/* Экспорт */}
          <div className="control-card">
            <h3>📤 Экспорт данных</h3>
            <p>Сохраните все технологии в JSON файл</p>
            <div className="export-info">
              <p><strong>Формат:</strong> JSON</p>
              <p><strong>Кодировка:</strong> UTF-8</p>
              <p><strong>Всего записей:</strong> {technologies.length}</p>
            </div>
            <button 
              onClick={exportToJSON} 
              disabled={technologies.length === 0}
              className="btn-export"
            >
              Экспортировать в JSON
            </button>
          </div>

          {/* Импорт */}
          <div className="control-card">
            <h3>📥 Импорт данных</h3>
            <p>Загрузите технологии из JSON файла</p>
            <div className="import-options">
              <label className="file-input-label">
                <span className="file-input-text">Выберите файл</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={importFromJSON}
                  className="file-input"
                />
              </label>
              <p className="file-hint">Поддерживаются только JSON файлы</p>
            </div>
          </div>

          {/* Управление */}
          <div className="control-card">
            <h3>🛠️ Управление</h3>
            <p>Быстрые действия с данными</p>
            <div className="quick-actions">
              <button onClick={addSampleData} className="btn-secondary">
                Добавить тестовые данные
              </button>
              <button 
                onClick={clearAllData} 
                disabled={technologies.length === 0}
                className="btn-danger"
              >
                Очистить все данные
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Область drag-and-drop */}
      <div className="drag-drop-section">
        <h3>📁 Drag & Drop импорт</h3>
        <p>Перетащите JSON файл в область ниже</p>
        <div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragging ? (
            <div className="drop-message active">
              <span className="drop-icon">📂</span>
              <p>Отпустите файл для импорта</p>
            </div>
          ) : (
            <div className="drop-message">
              <span className="drop-icon">📁</span>
              <p>Перетащите JSON файл сюда</p>
              <p className="drop-hint">или нажмите для выбора файла</p>
            </div>
          )}
        </div>
      </div>

      {/* Список технологий */}
      <div className="technologies-section">
        <div className="section-header">
          <h2>📋 Список технологий ({technologies.length})</h2>
          <div className="section-stats">
            <span className="stat">
              <span className="stat-label">Завершено:</span>
              <span className="stat-value">
                {technologies.filter(t => t.status === 'completed').length}
              </span>
            </span>
            <span className="stat">
              <span className="stat-label">В процессе:</span>
              <span className="stat-value">
                {technologies.filter(t => t.status === 'in-progress').length}
              </span>
            </span>
            <span className="stat">
              <span className="stat-label">Не начато:</span>
              <span className="stat-value">
                {technologies.filter(t => t.status === 'not-started').length}
              </span>
            </span>
          </div>
        </div>

        {technologies.length > 0 ? (
          <div className="technologies-list">
            {technologies.map(tech => (
              <div key={tech.id} className="technology-item">
                <div className="tech-info">
                  <h4>{tech.title}</h4>
                  <div className="tech-meta">
                    <span className={`category-badge category-${tech.category}`}>
                      {tech.category}
                    </span>
                    <span className={`status-badge status-${tech.status}`}>
                      {tech.status === 'completed' && '✅ Завершено'}
                      {tech.status === 'in-progress' && '🔄 В процессе'}
                      {tech.status === 'not-started' && '⏳ Не начато'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTechnology(tech.id)}
                  className="btn-delete"
                  aria-label={`Удалить ${tech.title}`}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>Нет данных</h3>
            <p>Импортируйте данные или добавьте тестовые</p>
          </div>
        )}
      </div>

      {/* Информация о формате */}
      <div className="format-info">
        <h3>ℹ️ Формат JSON файла:</h3>
        <div className="code-example">
          <pre>{`[
  {
    "id": 1,
    "title": "React",
    "category": "frontend",
    "status": "in-progress",
    "description": "Библиотека для UI",
    "resources": ["https://react.dev"]
  },
  {
    "id": 2,
    "title": "Node.js",
    "category": "backend",
    "status": "not-started"
  }
]`}</pre>
        </div>
        <p className="info-note">Все поля кроме "id" и "title" являются необязательными</p>
      </div>
    </div>
  );
}

export default DataImportExport;