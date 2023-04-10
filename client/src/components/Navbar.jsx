import React from 'react';
import Search from './Search';
import { favIcon, cartIcon, accountIcon } from '../assets';
import { Link } from 'react-router-dom';
import { useProductContext } from '../contexts/product/productContext';

const NavBar = () => {
  const { totalCartProducts } = useProductContext();
  return (
    <nav className=' flex  justify-between'>
      <h1 className=' font-clash600 text-font1 text-[32px] leading-[39px]'>
        <Link to='/'>GGT.Mart</Link>
      </h1>
      <Search />
      <div className=' flex gap-[28px] items-center justify-center'>
        <img src={favIcon} alt='fav' />
        <Link to='/sign-in'>
          <img src={accountIcon} alt='profile' />
        </Link>
        <div className=' relative'>
          <img src={cartIcon} alt='cart' />
          {totalCartProducts !== 0 ? (
            <span className=' text-xl text-fontRed absolute bottom-[-13px] right-[-13px]'>
              {totalCartProducts}
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
