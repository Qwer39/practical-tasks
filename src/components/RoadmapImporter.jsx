import { useState } from 'react';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import './RoadmapImporter.css';

function RoadmapImporter() {
  const { technologies, loading, error, addTechnology } = useTechnologiesApi();
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState('');
  const [selectedRoadmap, setSelectedRoadmap] = useState('frontend');

  const roadmapExamples = {
    frontend: {
      name: 'Frontend Developer',
      description: 'Дорожная карта фронтенд разработчика 2024',
      technologies: [
        { title: 'HTML5', category: 'frontend', difficulty: 'beginner', description: 'Семантическая верстка' },
        { title: 'CSS3', category: 'frontend', difficulty: 'beginner', description: 'Стилизация и анимации' },
        { title: 'JavaScript', category: 'frontend', difficulty: 'beginner', description: 'Основы языка' },
        { title: 'React', category: 'frontend', difficulty: 'intermediate', description: 'Библиотека UI' },
        { title: 'TypeScript', category: 'frontend', difficulty: 'intermediate', description: 'Типизированный JavaScript' },
        { title: 'Next.js', category: 'frontend', difficulty: 'advanced', description: 'Фреймворк React' },
        { title: 'Webpack', category: 'frontend', difficulty: 'advanced', description: 'Сборщик проектов' }
      ]
    },
    backend: {
      name: 'Backend Developer',
      description: 'Дорожная карта бэкенд разработчика 2024',
      technologies: [
        { title: 'Node.js', category: 'backend', difficulty: 'beginner', description: 'Среда выполнения JS' },
        { title: 'Express.js', category: 'backend', difficulty: 'beginner', description: 'Фреймворк для Node.js' },
        { title: 'REST API', category: 'backend', difficulty: 'intermediate', description: 'Проектирование API' },
        { title: 'MongoDB', category: 'database', difficulty: 'intermediate', description: 'NoSQL база данных' },
        { title: 'PostgreSQL', category: 'database', difficulty: 'intermediate', description: 'SQL база данных' },
        { title: 'Docker', category: 'devops', difficulty: 'advanced', description: 'Контейнеризация' },
        { title: 'Redis', category: 'backend', difficulty: 'advanced', description: 'Кэширование' }
      ]
    },
    devops: {
      name: 'DevOps Engineer',
      description: 'Дорожная карта DevOps инженера 2024',
      technologies: [
        { title: 'Linux', category: 'devops', difficulty: 'beginner', description: 'Основы Linux' },
        { title: 'Git', category: 'devops', difficulty: 'beginner', description: 'Система контроля версий' },
        { title: 'Docker', category: 'devops', difficulty: 'intermediate', description: 'Контейнеризация' },
        { title: 'Kubernetes', category: 'devops', difficulty: 'advanced', description: 'Оркестрация контейнеров' },
        { title: 'AWS', category: 'devops', difficulty: 'advanced', description: 'Облачная платформа' },
        { title: 'CI/CD', category: 'devops', difficulty: 'intermediate', description: 'Непрерывная интеграция' },
        { title: 'Terraform', category: 'devops', difficulty: 'advanced', description: 'Infrastructure as Code' }
      ]
    }
  };

  const handleImportRoadmap = async (roadmapType) => {
    try {
      setImporting(true);
      setImportStatus('Импорт дорожной карты...');

      const roadmap = roadmapExamples[roadmapType];
      if (!roadmap) {
        throw new Error('Дорожная карта не найдена');
      }

      let importedCount = 0;
      let skippedCount = 0;

      // Импортируем каждую технологию
      for (const tech of roadmap.technologies) {
        try {
          // Проверяем, существует ли уже такая технология
          const exists = technologies.some(t => 
            t.title.toLowerCase() === tech.title.toLowerCase()
          );

          if (!exists) {
            await addTechnology({
              ...tech,
              resources: [`https://${tech.title.toLowerCase().replace(/\s+/g, '')}.org`],
              status: 'not-started'
            });
            importedCount++;
          } else {
            skippedCount++;
          }
        } catch (err) {
          console.error(`Ошибка импорта ${tech.title}:`, err);
        }
      }

      setImportStatus(`✅ Успешно импортировано ${importedCount} технологий. Пропущено: ${skippedCount} (уже существуют)`);
      
      // Очищаем статус через 5 секунд
      setTimeout(() => {
        setImportStatus('');
      }, 5000);

    } catch (err) {
      setImportStatus(`❌ Ошибка импорта: ${err.message}`);
      console.error('Ошибка импорта:', err);
    } finally {
      setImporting(false);
    }
  };

  const handleFileImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setImporting(true);
      setImportStatus('Чтение файла...');

      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          
          if (!Array.isArray(imported)) {
            throw new Error('Неверный формат данных. Ожидается массив технологий');
          }

          let importedCount = 0;
          let skippedCount = 0;

          for (const tech of imported.slice(0, 20)) { // Ограничиваем 20 технологиями
            try {
              const exists = technologies.some(t => 
                t.title.toLowerCase() === tech.title.toLowerCase()
              );

              if (!exists) {
                await addTechnology({
                  ...tech,
                  status: tech.status || 'not-started'
                });
                importedCount++;
              } else {
                skippedCount++;
              }
            } catch (err) {
              console.error(`Ошибка импорта ${tech.title}:`, err);
            }
          }

          setImportStatus(`✅ Импортировано ${importedCount} технологий из файла. Пропущено: ${skippedCount}`);
          
          setTimeout(() => {
            setImportStatus('');
          }, 5000);

        } catch (err) {
          setImportStatus(`❌ Ошибка парсинга JSON: ${err.message}`);
        } finally {
          setImporting(false);
          event.target.value = '';
        }
      };

      reader.onerror = () => {
        setImportStatus('❌ Ошибка чтения файла');
        setImporting(false);
        event.target.value = '';
      };

      reader.readAsText(file);

    } catch (err) {
      setImportStatus(`❌ Ошибка: ${err.message}`);
      setImporting(false);
      event.target.value = '';
    }
  };

  return (
    <div className="roadmap-importer">
      <div className="importer-header">
        <h3>🗺️ Импорт дорожной карты</h3>
        <p>Импортируйте готовые дорожные карты для быстрого старта</p>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {importStatus && (
        <div className={`import-status ${importStatus.includes('❌') ? 'error' : 'success'}`}>
          {importStatus}
        </div>
      )}

      <div className="roadmap-selection">
        <h4>Выберите дорожную карту:</h4>
        <div className="roadmap-options">
          {Object.entries(roadmapExamples).map(([key, roadmap]) => (
            <div 
              key={key}
              className={`roadmap-card ${selectedRoadmap === key ? 'selected' : ''}`}
              onClick={() => setSelectedRoadmap(key)}
            >
              <div className="roadmap-icon">
                {key === 'frontend' && '💻'}
                {key === 'backend' && '⚙️'}
                {key === 'devops' && '🚀'}
              </div>
              <h5>{roadmap.name}</h5>
              <p className="roadmap-description">{roadmap.description}</p>
              <div className="roadmap-stats">
                <span className="stat">📚 {roadmap.technologies.length} технологий</span>
                <span className="stat">⏱️ {roadmap.technologies.length * 2} часов</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRoadmap && (
        <div className="roadmap-preview">
          <h4>Предпросмотр:</h4>
          <div className="preview-list">
            {roadmapExamples[selectedRoadmap].technologies.map((tech, index) => (
              <div key={index} className="preview-item">
                <span className="item-index">{index + 1}</span>
                <div className="item-content">
                  <div className="item-header">
                    <span className="item-title">{tech.title}</span>
                    <span className={`item-difficulty difficulty-${tech.difficulty}`}>
                      {tech.difficulty === 'beginner' && '👶 Начинающий'}
                      {tech.difficulty === 'intermediate' && '🚀 Средний'}
                      {tech.difficulty === 'advanced' && '🔥 Продвинутый'}
                    </span>
                  </div>
                  <p className="item-description">{tech.description}</p>
                  <div className="item-footer">
                    <span className={`item-category category-${tech.category}`}>
                      {tech.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="import-actions">
        <button
          onClick={() => handleImportRoadmap(selectedRoadmap)}
          disabled={importing}
          className="btn-import"
        >
          {importing ? '⏳ Импорт...' : '📥 Импортировать выбранную карту'}
        </button>

        <div className="file-import">
          <label className="file-input-label">
            📁 Импорт из JSON файла
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              disabled={importing}
            />
          </label>
          <p className="file-hint">Файл должен содержать массив объектов технологий</p>
        </div>
      </div>

      <div className="import-info">
        <h4>ℹ️ Информация об импорте:</h4>
        <ul>
          <li>Технологии, которые уже существуют, будут пропущены</li>
          <li>Каждая технология импортируется с базовыми ресурсами</li>
          <li>Статус по умолчанию: "Не начато"</li>
          <li>Максимум 20 технологий из файла JSON</li>
        </ul>
      </div>
    </div>
  );
}

export default RoadmapImporter;