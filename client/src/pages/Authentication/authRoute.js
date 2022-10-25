import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFeatureContext } from '../../contexts/features/featureContext';

const Auth = ({ children }) => {
  const { isUser } = useFeatureContext();
  if (!isUser) {
    return <Navigate to='/' />;
  }
  return children;
};

export default Auth;
