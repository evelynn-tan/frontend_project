import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // 1. Cek apakah ada token di localStorage
  const token = localStorage.getItem('token');
  const location = useLocation();

  // 2. Jika TIDAK ADA token, alihkan ke halaman login
  if (!token) {
    // state={{ from: location }} berguna agar setelah login, pengguna bisa
    // diarahkan kembali ke halaman yang tadinya ingin ia buka.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Jika ADA token, tampilkan halaman yang diminta (children)
  return children;
};

export default ProtectedRoute;