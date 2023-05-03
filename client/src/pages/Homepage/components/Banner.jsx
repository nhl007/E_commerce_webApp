import React from 'react';
import { adPhone } from '../../../assets';
import { phone } from '../../../assets';

const Banner = () => {
  return (
    <div className='ml-[-12rem] lg:ml-[-3rem] px-[12rem] w-[100vw] h-[251px] mt-[94px] bg-greyBg flex justify-center mb-[80px]'>
      <div className='flex w-full relative'>
        <div className=' flex flex-col pt-8'>
          <h1 className='font-clash600 text-[48px] leading-[59px] text-font1 mb-4'>
            Samsung S22 Ultra
          </h1>
          <p className='mb-[44px]'>
            New! Samsung - Galaxy S22 Ultra 512GB (Unlocked)
          </p>
          <p className='font-clash600 text-[32px] leading-[39px] text-font1 mb-4'>
            $1,379.99
          </p>
        </div>
        <div className='w-[570px] h-[309px] bottom-0 right-0 absolute'>
          <img className=' object-cover' alt='phone' src={phone} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
