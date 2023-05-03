import React from 'react';
import NavBar from '../../components/NavBar';
import { headphone } from '../../assets';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <NavBar />
      <div className=' flex flex-col mt-[6rem]'>
        <h1 className=' self-center text-[3.2rem] font-clash600'>
          Admin Dashboard
        </h1>
        <div className='w-full  flex justify-around mt-[10rem]'>
          <Link
            to='/admin/users'
            className='flex flex-col justify-center items-center gap-[1.6rem]'
          >
            <div className=' max-w-[30rem] h-auto'>
              <img alt='user' src={headphone} />
            </div>
            <h1 className=' font-clash600 text-[2.4rem]'>Users</h1>
          </Link>
          <Link
            to='/admin/products'
            className='flex flex-col justify-center items-center gap-[1.6rem]'
          >
            <div className=' max-w-[30rem] h-auto'>
              <img alt='user' src={headphone} />
            </div>
            <h1 className=' font-clash600 text-[2.4rem]'>Products</h1>
          </Link>
          <Link
            to='/admin/orders'
            className='flex flex-col justify-center items-center gap-[1.6rem]'
          >
            <div className=' max-w-[30rem] h-auto'>
              <img alt='user' src={headphone} />
            </div>
            <h1 className=' font-clash600 text-[2.4rem]'>Orders</h1>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
