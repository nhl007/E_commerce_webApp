import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/auth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { userType } = useAuthContext();
  if (userType !== 'admin') {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;
