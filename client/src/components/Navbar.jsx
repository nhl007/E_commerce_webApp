import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext/authContext';
import { useFeatureContext } from '../contexts/features/featureContext';

const Navbar = () => {
  const { isUser } = useFeatureContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  return (
    <>
      <div className=' flex flex-row justify-between bg-primary text-teal-50 py-2 px-8 items-center'>
        <h1 className=' tracking-[10px]'>GGT</h1>
        <div className=' flex flex-row  justify-between gap-4'>
          <div className=' flex gap-4 items-center flex-shrink-0'>
            <Link to='/'>Home </Link>
            <Link to='/orders'>Orders </Link>
            <Link>WishList </Link>
            <Link>History</Link>
          </div>
          <div className=' flex flex-shrink-[2] gap-2 bg-transparent'>
            <button className=' bg-orange-700 p-2 rounded-md text-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </button>
            <button
              onClick={() => {
                navigate('/sign_in');
              }}
              className=' bg-orange-700 p-2 rounded-md text-slate-100'
            >
              Sign In
            </button>
            {isUser ? (
              <button
                onClick={logout}
                className=' bg-orange-700 p-2 rounded-md text-slate-100'
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('/registration');
                }}
                className=' bg-orange-700 p-2 rounded-md text-slate-100'
              >
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
