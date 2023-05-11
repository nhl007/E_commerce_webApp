import React from 'react';
import { cartIcon } from '../../../assets';

const CardBig = ({ image, heading, description, price }) => {
  return (
    <div className='flex flex-col w-[37.5rem] sm:w-full h-[25.0rem] rounded-[1rem] pl-[3.6rem] sm:pl-4 pr-[2.4rem] pt-[5rem] relative __shadow'>
      <div className=' absolute top-[2.4rem] right-[2.4rem] cursor-pointer'>
        <img src={cartIcon} width={20} height={20} alt='cart' />
      </div>
      <h1 className=' font-clash600 text-[2.4rem] leading-[3rem] text-font1'>
        {heading}
      </h1>
      <div className='flex mt-[1.6rem] gap-[1.6rem]'>
        <div className=' flex flex-col gap-[1.6rem] self-end'>
          <p className=' max-w-[15.1rem] text-[1.2rem] leading-[1.4rem]'>
            {description}
          </p>

          <h1 className='font-clash600 text-[2.4rem] leading-[3rem] text-font1'>
            {price}
          </h1>
        </div>
        <div className=' flex w-[19.5rem] h-[13.6rem]'>
          <img src={image} className=' object-cover' />
        </div>
      </div>
    </div>
  );
};

export default CardBig;
