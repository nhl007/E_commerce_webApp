import React, { useState } from 'react';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useProductContext } from '../contexts/product/productContext';
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  AdjustmentsVerticalIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuthContext } from '../contexts/auth/AuthContext';
import { logo } from '../assets';

const NavBar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const { totalCartProducts } = useProductContext();
  const { user, userType, logout } = useAuthContext();
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  const logUserOut = async () => {
    await logout();
    navigate('/sign-in');
  };
  return (
    <nav className=' flex justify-between relative items-center'>
      <Link className='flex items-end' to='/'>
        <div className='w-[2.4rem] h-auto'>
          <img width={24} height={24} src={logo} alt='A' />
        </div>
        <h1 className=' font-clash600 text-font1 text-[3rem] sm:text-[2.4rem] sm:hidden '>
          .Mart
        </h1>
      </Link>
      <Search />
      {/* //? desktop Navbar */}
      <div className=' flex gap-[28px] items-center justify-center sm:hidden'>
        <div className=' relative'>
          <Link to='/cart'>
            <ShoppingCartIcon className='w-[2.4rem] h-auto text-green1' />
          </Link>
          {totalCartProducts !== 0 ? (
            <span className=' text-xl text-fontRed absolute bottom-[-13px] right-[-13px]'>
              {totalCartProducts}
            </span>
          ) : (
            ''
          )}
        </div>
        {user ? (
          <div className=' flex gap-[28px] items-center justify-center'>
            <Link to='/orders'>
              <ShoppingBagIcon className=' text-green1 w-[2.4rem] h-auto' />
            </Link>
            <button
              onMouseEnter={() => {
                setProfile(true);
              }}
              onClick={() => {
                setProfile((prev) => !prev);
              }}
              className=' rounded-[50%] px-4 py-2  bg-green4 text-font2'
              to='profile'
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
          </div>
        ) : (
          <button
            className=' px-[1.2rem] py-[.8rem] bg-green1 text-white rounded hover:text-black transition-colors duration-500'
            onClick={() => {
              navigate('/sign-in');
            }}
          >
            Login/Register
          </button>
        )}
        {userType === 'admin' && (
          <Link to='/admin'>
            <AdjustmentsVerticalIcon className=' w-[2.4rem] h-auto text-green1' />
          </Link>
        )}
      </div>
      {/* //? desktop Navbar Modal */}
      <div
        onMouseEnter={() => {
          setProfile(true);
        }}
        onMouseLeave={() => {
          setProfile(false);
        }}
        className={`${
          profile ? 'flex flex-col' : 'hidden'
        } bg-whiteBg absolute right-[.8rem] top-[5rem] py-[1.6rem] px-[1.6rem] border-green1 border-2 z-[999] justify-center items-center gap-[1.2rem]`}
      >
        <Link className=' hover:underline' to='/profile'>
          View Profile
        </Link>
        <button onClick={logUserOut} className=' hover:underline'>
          Logout
        </button>
      </div>
      {/* //? Mobile Navbar */}
      <div
        className='hidden sm:flex'
        onClick={() => setMobileNav((prev) => !prev)}
      >
        {mobileNav ? (
          <XMarkIcon
            width={24}
            height={24}
            className=' text-green1 border-t-2 border-b-2'
          />
        ) : (
          <Bars3Icon
            width={24}
            height={24}
            className=' text-green1 border-t-2 border-b-2'
          />
        )}
      </div>
      {mobileNav ? (
        <div className=' flex flex-col justify-center p-[2rem] absolute top-[4rem] right-0 bg-font3 text-green1 z-[999] gap-4'>
          <div className='flex justify-start items-center gap-2'>
            <Link to='/cart' className=' flex items-center gap-2'>
              <ShoppingCartIcon width={24} className=' text-green1' /> Cart
            </Link>
            {totalCartProducts !== 0 ? (
              <span className=' text-xl text-fontRed '>
                ({totalCartProducts})
              </span>
            ) : (
              ''
            )}
          </div>
          {user ? (
            <>
              <Link className=' flex gap-2 items-center' to='/orders'>
                <ShoppingBagIcon width={24} className=' text-green1' /> Orders
              </Link>

              {userType === 'admin' && (
                <Link className=' flex gap-2 items-center' to='/admin'>
                  <AdjustmentsVerticalIcon
                    width={24}
                    className=' text-green1'
                  />{' '}
                  Admin
                </Link>
              )}
              <Link
                style={{
                  alignItems: 'center',
                }}
                to='/profile'
                className='flex gap-2'
              >
                <p className=' rounded-[50%] px-3 py-1  bg-green4 text-font2'>
                  {user.name.charAt(0).toUpperCase()}
                </p>
                {user.name}
              </Link>

              <button
                className=' px-[.8rem] py-[.4rem] bg-green1 rounded hover:text-black transition-colors text-whiteBg duration-500'
                onClick={logUserOut}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className=' px-[.8rem] py-[.4rem] bg-green1 rounded hover:text-black transition-colors text-whiteBg duration-500'
              onClick={() => {
                navigate('/sign-in');
              }}
            >
              Login/Register
            </button>
          )}
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
