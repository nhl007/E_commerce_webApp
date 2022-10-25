import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../../components';
import { useFeatureContext } from '../../contexts/features/featureContext';

// const formData = {};

const FormModel = ({ type, onclick, navigate }) => {
  const { showAlert } = useFeatureContext();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordAgain: '',
  });
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    onclick(e, values);
  };
  return (
    <div className=' w-[full] h-[100%] flex flex-col justify-center items-center p-[50px] '>
      {showAlert ? <Alert /> : ''}
      <div className='flex flex-col justify-center items-center bg-slate-500 p-6 rounded-md shadow-2xl'>
        <div>
          <Link to='/'>
            <img
              className='mx-auto h-12 w-auto'
              src='https://i0.wp.com/www.ggtpc.com/wp-content/uploads/2022/02/site-logo.png?resize=2048%2C921&ssl=1'
              alt='Your Company'
            />
          </Link>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            {type === 'signin'
              ? 'Sign in to your account'
              : ' Create a new account'}
          </h2>
        </div>
        <div>
          <form
            className=' flex flex-col gap-5 justify-center items-center mt-6 py-4 px-2 '
            onSubmit={onSubmit}
          >
            {type === 'register' ? (
              <div className=' flex justify-between items-center gap-4'>
                <label className=' sr-only' htmlFor='email'>
                  Name:
                </label>
                <input
                  onChange={handleChange}
                  placeholder='Enter your name'
                  className=' w-[300px] h-[40px] py-2 px-4'
                  name='name'
                  type='text'
                  maxLength={30}
                  required
                />
              </div>
            ) : (
              ''
            )}
            <div className=' flex justify-between items-center gap-4'>
              <label className=' sr-only' htmlFor='email'>
                Email :{' '}
              </label>
              <input
                onChange={handleChange}
                placeholder='Enter your email address'
                className=' w-[300px] h-[40px] py-2 px-4'
                name='email'
                type='email'
                maxLength={30}
                required
              />
            </div>
            <div className=' flex justify-between items-center gap-4'>
              <label className=' sr-only' htmlFor='email'>
                Password :
              </label>
              <input
                onChange={handleChange}
                placeholder='Enter your password'
                className=' w-[300px] h-[40px] py-2 px-4'
                name='password'
                type='password'
                minLength={6}
                maxLength={30}
                required
              />
            </div>
            {type === 'register' ? (
              <div className=' flex justify-between items-center gap-4'>
                <label className=' sr-only' htmlFor='email'>
                  Password :
                </label>
                <input
                  onChange={handleChange}
                  placeholder='Enter your password again'
                  className=' w-[300px] h-[40px] py-2 px-4'
                  name='passwordAgain'
                  type='password'
                  minLength={6}
                  maxLength={30}
                  required
                />
              </div>
            ) : (
              ''
            )}
            <button className=' mt-2 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <svg
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              {type === 'signin' ? 'Sign In' : 'Register'}
            </button>
          </form>
          {type === 'signin' ? (
            <div className='ml-2 w-[300px]'>
              <div className=' flex justify-center items-center flex-col'>
                <div className=' flex flex-row justify-start items-center w-full'>
                  <div className=' border-2 bg-black w-full'></div>
                  <h2 className=' w-full ml-6'> new to GGT </h2>{' '}
                  <div className=' border-2 bg-black w-full'></div>{' '}
                </div>
              </div>
              <div>
                <button
                  onClick={navigate}
                  className=' mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                    <svg
                      className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                  Create an Account
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default FormModel;
