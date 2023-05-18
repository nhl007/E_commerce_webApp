import React, { useEffect, useState } from 'react';
import { logo, signin } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import { useFeatureContext } from '../../contexts/feature/FeatureContext';
import Alert from '../../components/Alert';
import { Loading } from '../../components';

const AuthModel = ({ type }) => {
  const navigate = useNavigate();
  const { showAlert, displayAlert, isloading } = useFeatureContext();
  // const { googleLogin, registerLogin, user } = useAuthContext();
  const { user, registerLogin } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (type === 'register') {
      if (!name || !password || !email || !password_confirmation) {
        displayAlert('Please provide all the required fields');
      } else {
        const data = {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        };

        await registerLogin(data, type);
      }
    } else {
      if (!password || !email) {
        displayAlert('Please provide all the required fields');
      } else {
        const data = {
          email: email,
          password: password,
        };
        await registerLogin(data, type);
      }
    }
  };

  return (
    <>
      {isloading && <Loading />}
      {showAlert && <Alert />}
      <div className=' flex justify-center items-center min-h-[100vh] sm:px-4'>
        <div className=' flex justify-center items-center gap-[213px] sm:gap-0'>
          <img
            src={signin}
            alt='authentication'
            width={381}
            height={385}
            className=' object-cover sm:hidden'
          />
          <div className=' flex flex-col w-[40.3rem] sm:w-[32rem]  '>
            <Link className='flex items-end self-center mb-8' to='/'>
              <div className='w-[2.4rem] h-auto'>
                <img src={logo} width={24} height={24} alt='A.Mart' />
              </div>
              <h1 className=' font-clash600 text-font1 text-[3rem] sm:text-[2.4rem] '>
                .Mart
              </h1>
            </Link>
            <h1 className=' font-clash700 text-[28px] leading-[42px]'>
              {type === 'register'
                ? 'Create an account.'
                : 'Login to your account'}
            </h1>
            <p className='text-font5 leading-[24px]'>
              {type === 'register'
                ? " We'de love to have you on board. Join over 500+ customers around the globe and enhance productivity."
                : ''}
            </p>

            {/* //todo :: google auth button */}
            {/* 
          <button
            onClick={googleLogin}
            className=' flex justify-center items-center py-[12px] leading-6 text-font2 bg-font3 __input_auth mt-[44px]'
          >
            <svg
              className=' mr-3'
              width='25'
              height='24'
              viewBox='0 0 25 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M23.001 12.2332C23.001 11.3699 22.9296 10.7399 22.7748 10.0865H12.7153V13.9832H18.62C18.501 14.9515 17.8582 16.4099 16.4296 17.3898L16.4096 17.5203L19.5902 19.935L19.8106 19.9565C21.8343 18.1249 23.001 15.4298 23.001 12.2332Z'
                fill='#4285F4'
              />
              <path
                d='M12.7147 22.5C15.6075 22.5 18.0361 21.5666 19.8099 19.9566L16.429 17.3899C15.5242 18.0082 14.3099 18.4399 12.7147 18.4399C9.88142 18.4399 7.47669 16.6083 6.61947 14.0766L6.49382 14.087L3.18656 16.5954L3.14331 16.7132C4.90519 20.1432 8.52423 22.5 12.7147 22.5Z'
                fill='#34A853'
              />
              <path
                d='M6.6201 14.0766C6.39391 13.4233 6.26301 12.7233 6.26301 12C6.26301 11.2766 6.39391 10.5766 6.6082 9.92329L6.6022 9.78415L3.25349 7.23552L3.14393 7.28659C2.41777 8.70994 2.0011 10.3083 2.0011 12C2.0011 13.6916 2.41777 15.2899 3.14393 16.7133L6.6201 14.0766Z'
                fill='#FBBC05'
              />
              <path
                d='M12.7148 5.55997C14.7267 5.55997 16.0838 6.41163 16.8576 7.12335L19.8814 4.23C18.0243 2.53834 15.6076 1.5 12.7148 1.5C8.52426 1.5 4.9052 3.85665 3.14331 7.28662L6.60759 9.92332C7.47672 7.39166 9.88146 5.55997 12.7148 5.55997Z'
                fill='#EB4335'
              />
            </svg>
            {type === 'register'
              ? 'Sign Up with Google'
              : 'Sign in with Google'}
          </button> */}

            <div className=' __input_auth my-[2.4rem]'></div>

            <form onSubmit={onSubmit} className=' flex flex-col gap-6'>
              {type === 'register' ? (
                <div className=' flex flex-col gap-[6px]'>
                  <label htmlFor='name'>
                    Name <span className=' text-fontRed'>*</span>
                  </label>
                  <input
                    autoComplete='true'
                    onChange={(e) => setName(e.target.value)}
                    name='name'
                    type='text'
                    maxLength={40}
                    className=' h-[48px] px-4 py-[12px] bg-whiteBg __input_auth focus:outline-none text-[16px] leading-[24px] text-font5'
                  />
                </div>
              ) : (
                ''
              )}
              <div className=' flex flex-col gap-[6px]'>
                <label htmlFor='email'>
                  Email <span className=' text-fontRed'>*</span>
                </label>
                <input
                  autoComplete='true'
                  onChange={(e) => setEmail(e.target.value)}
                  name='email'
                  type='text'
                  maxLength={40}
                  className=' h-[48px] px-4 py-[12px] bg-whiteBg __input_auth focus:outline-none text-[16px] leading-[24px] text-font5'
                />
              </div>
              <div className=' flex flex-col gap-[6px]'>
                <label htmlFor='password'>
                  Password <span className=' text-fontRed'>*</span>
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='true'
                  name='password'
                  type='password'
                  maxLength={40}
                  className=' h-[48px] px-4 py-[12px] bg-whiteBg __input_auth focus:outline-none text-[16px] leading-[24px] text-font5'
                />
              </div>
              {type === 'register' ? (
                <div className=' flex flex-col gap-[6px]'>
                  <label htmlFor='password_confirmation'>
                    Password <span className=' text-fontRed'>*</span>
                  </label>
                  <input
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                    autoComplete='true'
                    name='password_confirmation'
                    type='password'
                    maxLength={40}
                    className=' h-[48px] px-4 py-[12px] bg-whiteBg __input_auth focus:outline-none text-[16px] leading-[24px] text-font5'
                  />
                </div>
              ) : (
                ''
              )}
              <button className=' flex justify-center items-center py-[1.6rem] leading-6 text-font2 bg-font3 __input_auth mt-[2.4rem]'>
                {type === 'register' ? 'Sign up' : 'Sign In'}
              </button>
              <p className='text-font5 leading-[24px] mb-9'>
                {type === 'register' ? (
                  <Link to='/sign-in'>
                    Already have an account?
                    <span className=' underline'> Login here.</span>
                  </Link>
                ) : (
                  <Link to='/register'>
                    Create an account?
                    <span className=' underline'> Signup here.</span>
                  </Link>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModel;
