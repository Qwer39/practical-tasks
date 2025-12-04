import { useState, useEffect } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);

      // В реальном приложении здесь будет запрос к вашему API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockTechnologies = [
        {
          id: 1,
          title: 'React',
          description: 'Библиотека для создания пользовательских интерфейсов',
          category: 'frontend',
          difficulty: 'beginner',
          status: 'in-progress',
          resources: ['https://react.dev', 'https://ru.reactjs.org'],
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Node.js',
          description: 'Среда выполнения JavaScript на сервере',
          category: 'backend',
          difficulty: 'intermediate',
          status: 'not-started',
          resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/'],
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          title: 'TypeScript',
          description: 'Типизированное надмножество JavaScript',
          category: 'language',
          difficulty: 'intermediate',
          status: 'completed',
          resources: ['https://www.typescriptlang.org'],
          createdAt: new Date().toISOString()
        }
      ];

      setTechnologies(mockTechnologies);

    } catch (err) {
      setError('Не удалось загрузить технологии');
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTechnology = async (techData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newTech = {
        id: Date.now(),
        ...techData,
        createdAt: new Date().toISOString(),
        status: techData.status || 'not-started',
        resources: techData.resources || []
      };

      setTechnologies(prev => [...prev, newTech]);
      return newTech;

    } catch (err) {
      throw new Error('Не удалось добавить технологию');
    }
  };

  const updateTechnology = async (id, updates) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setTechnologies(prev => prev.map(tech =>
        tech.id === id ? { ...tech, ...updates } : tech
      ));

    } catch (err) {
      throw new Error('Не удалось обновить технологию');
    }
  };

  const deleteTechnology = async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setTechnologies(prev => prev.filter(tech => tech.id !== id));
    } catch (err) {
      throw new Error('Не удалось удалить технологию');
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology,
    updateTechnology,
    deleteTechnology,
    stats: {
      total: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      inProgress: technologies.filter(t => t.status === 'in-progress').length,
      notStarted: technologies.filter(t => t.status === 'not-started').length,
      byCategory: technologies.reduce((acc, tech) => {
        acc[tech.category] = (acc[tech.category] || 0) + 1;
        return acc;
      }, {})
    }
  };
}

export default useTechnologiesApi;