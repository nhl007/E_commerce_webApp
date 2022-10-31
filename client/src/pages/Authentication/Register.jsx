import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/authContext/authContext';
import FormModel from './FormModel';

const Register = () => {
  const { token, authSetup } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const onSubmit = async (e, values) => {
    e.preventDefault();
    await authSetup('register', values, 'Successfully Registered');
  };
  return (
    <>
      <FormModel type='register' onclick={onSubmit} />
    </>
  );
};

export default Register;
