import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormModel from './FormModel';

const SignIn = () => {
  const navigate = useNavigate();
  const onSubmit = (e, msg) => {
    e.preventDefault();
    console.log('submitted from sign in', msg);
    navigate('/');
  };
  return (
    <>
      <FormModel
        type='signin'
        onclick={onSubmit}
        navigate={() => navigate('/registration')}
      />
    </>
  );
};

export default SignIn;
