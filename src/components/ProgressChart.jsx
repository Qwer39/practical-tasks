import { useRef, useEffect } from 'react';
import './ProgressChart.css';

function ProgressChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || Object.keys(data).length === 0) return;

    const ctx = canvas.getContext('2d');
    const categories = Object.keys(data);
    const maxTotal = Math.max(...Object.values(data).map(d => d.total));
    
    // Очищаем canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Настройки
    const padding = 40;
    const barWidth = 40;
    const spacing = 20;
    const chartHeight = canvas.height - padding * 2;
    const chartWidth = canvas.width - padding * 2;
    const startX = padding;
    const startY = canvas.height - padding;
    
    // Рисуем оси
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + chartWidth, startY);
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, padding);
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
    
    // Рисуем столбцы
    categories.forEach((category, index) => {
      const x = startX + index * (barWidth + spacing) + spacing;
      const totalHeight = (data[category].total / maxTotal) * chartHeight;
      const completedHeight = (data[category].completed / maxTotal) * chartHeight;
      
      // Общее количество (серый)
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(x, startY - totalHeight, barWidth, totalHeight);
      
      // Завершенные (зеленый)
      ctx.fillStyle = '#4caf50';
      ctx.fillRect(x, startY - completedHeight, barWidth, completedHeight);
      
      // Подписи
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(category, x + barWidth/2, startY + 15);
      
      // Процент
      const percentage = data[category].total > 0 
        ? Math.round((data[category].completed / data[category].total) * 100)
        : 0;
      ctx.fillStyle = '#666';
      ctx.font = '10px Arial';
      ctx.fillText(`${percentage}%`, x + barWidth/2, startY - completedHeight - 5);
    });
  }, [data]);

  if (Object.keys(data).length === 0) {
    return (
      <div className="chart-placeholder">
        Нет данных для отображения графика
      </div>
    );
  }

  return (
    <div className="progress-chart">
      <canvas 
        ref={canvasRef} 
        width="600" 
        height="400"
        className="chart-canvas"
      ></canvas>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#4caf50' }}></span>
          <span>Завершено</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#e0e0e0' }}></span>
          <span>Всего</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressChart;