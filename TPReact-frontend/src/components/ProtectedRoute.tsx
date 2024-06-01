import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  // Simular un usuario y contraseña hardcodeados
  const hardcodedUser = { username: 'admin', password: '123456' };

  // Obtener el usuario del almacenamiento local o usar el usuario hardcodeado
  const usuario = JSON.parse(localStorage.getItem('usuario') || JSON.stringify(hardcodedUser));

  if (!usuario || usuario.username !== hardcodedUser.username || usuario.password !== hardcodedUser.password) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;