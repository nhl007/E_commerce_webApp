import React, { useEffect, useState } from 'react';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useProductContext } from '../contexts/product/productContext';
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  AdjustmentsVerticalIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuthContext } from '../contexts/auth/AuthContext';

const NavBar = () => {
  const { totalCartProducts } = useProductContext();
  const { user, userType, logout } = useAuthContext();
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  const logUserOut = async () => {
    await logout();
    navigate('/sign-in');
  };
  return (
    <nav className=' flex  justify-between relative'>
      <h1 className=' font-clash600 text-font1 text-[32px] leading-[39px]'>
        <Link to='/'>GGT.Mart</Link>
      </h1>
      <Search />
      <div className=' flex gap-[28px] items-center justify-center'>
        <div className=' relative'>
          <Link to='/cart'>
            <ShoppingCartIcon width={24} className=' text-green1' />
          </Link>
          {totalCartProducts !== 0 ? (
            <span className=' text-xl text-fontRed absolute bottom-[-13px] right-[-13px]'>
              {totalCartProducts}
            </span>
          ) : (
            ''
          )}
        </div>
        <Link to='/orders'>
          <ShoppingBagIcon width={24} className=' text-green1' />
        </Link>
        {user ? (
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
            A
          </button>
        ) : (
          <Link to='/sign-in'>
            <UserCircleIcon width={24} className=' text-green1' />
          </Link>
        )}
        {userType === 'admin' && (
          <Link to='/admin'>
            <AdjustmentsVerticalIcon width={24} className=' text-green1' />
          </Link>
        )}
      </div>
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
        <button onClick={logUserOut} className=' hover:underline under'>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
