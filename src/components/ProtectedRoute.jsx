// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn }) {
  const location = useLocation();

  if (!isLoggedIn) {
    // Сохраняем страницу, на которую пытались перейти
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;