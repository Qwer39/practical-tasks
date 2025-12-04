// pages/Dashboard.jsx (упрощённая версия для теста)
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="page">
      <h1>Панель управления</h1>
      <p>✅ Вы успешно вошли в систему!</p>
      <p>Это защищенная страница.</p>
      <div className="quick-links">
        <Link to="/technologies" className="btn btn-primary">
          Перейти к технологиям
        </Link>
        <Link to="/" className="btn btn-secondary">
          На главную
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;