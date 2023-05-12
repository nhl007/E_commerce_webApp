import React, { memo } from 'react';
import { phone } from '../../../assets';

const Banner = () => {
  return (
    <div className='lg:ml-[-4rem] xl:ml-[-12rem] sm:ml-0 px-[12rem] sm:px-0 w-[100vw] sm:w-full h-[25.1rem] sm:h-auto mt-[9.4rem] sm:mt-[4.8rem]  bg-greyBg flex justify-center mb-[8rem] sm:mb-[4.8rem]'>
      <div className='flex sm:flex-col w-full relative'>
        <div className=' flex flex-col pt-8 order-2'>
          <h1 className='font-clash600 text-[48px] sm:text-[3.2rem] sm:leading-[3.9rem] leading-[59px] text-font1 mb-4'>
            Samsung S22 Ultra
          </h1>
          <p className='mb-[4.4rem] sm:mb-[2.4rem]'>
            New! Samsung - Galaxy S22 Ultra 512GB (Unlocked)
          </p>
          <p className='font-clash600 text-[32px] leading-[3.9rem] text-font1 mb-[1.6rem] sm:mb-0'>
            $1,379.99
          </p>
        </div>
        <div className='w-[570px] sm:w-full h-[309px] sm:h-auto bottom-0 right-0 absolute sm:static'>
          <img className=' object-cover' alt='phone' src={phone} />
        </div>
      </div>
    </div>
  );
};

export default memo(Banner);
