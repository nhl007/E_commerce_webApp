import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/auth/AuthContext';

const ProtectedRoute = ({ children, permission }) => {
  const { userType } = useAuthContext();
  if (permission === 'all' && userType) {
    return children;
  } else if (permission === userType) {
    return children;
  } else {
    return <Navigate to='/' />;
  }
};

export default ProtectedRoute;
