import React from 'react';
import { Link } from 'react-router-dom';

function AddTechnology() {
  return (
    <div className="page">
      <h1>Добавить новую технологию</h1>
      <p>Здесь будет форма добавления технологии (Практическое занятие 25)</p>
      <Link to="/technologies" className="btn">
        ← Назад к списку
      </Link>
    </div>
  );
}

export default AddTechnology;