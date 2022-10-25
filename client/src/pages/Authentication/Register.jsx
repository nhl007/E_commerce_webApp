import React from 'react';
import { useAuthContext } from '../../contexts/authContext/authContext';
import FormModel from './FormModel';

const Register = () => {
  const { register } = useAuthContext();
  const onSubmit = async (e, values) => {
    e.preventDefault();
    await register(values);
  };
  return (
    <>
      <FormModel type='register' onclick={onSubmit} />;
    </>
  );
};

export default Register;
