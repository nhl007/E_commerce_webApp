import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/authContext/authContext';
import FormModel from './FormModel';

const SignIn = () => {
  const { token, authSetup } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmit = async (e, values) => {
    e.preventDefault();
    await authSetup('signin', values, 'Successfully Signed In');
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
