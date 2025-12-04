import { useState, useEffect } from 'react';
import './WindowSizeTracker.css';

function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getScreenType = () => {
    if (windowSize.width < 768) return 'мобильный';
    if (windowSize.width < 1024) return 'планшет';
    return 'десктоп';
  };

  return (
   <div className="window-size-tracker">
      <h2> Отслеживание размера окна</h2>
      <div className="size-info">
        <div className="size-item">
          <span className="label">Ширина:</span>
          <span className="value">{windowSize.width}px</span>
        </div>
        <div className="size-item">
          <span className="label">Высота:</span>
          <span className="value">{windowSize.height}px</span>
        </div>
        <div className="size-item">
          <span className="label">Тип экрана:</span>
          <span className={`value screen-type ${getScreenType().replace(' ', '-')}`}>
            {getScreenType()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WindowSizeTracker;