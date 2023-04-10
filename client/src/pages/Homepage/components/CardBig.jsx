import React from 'react';
import { cartIcon } from '../../../assets';

const CardBig = ({ image, heading, description, price }) => {
  return (
    <div className='flex flex-col w-[375px] h-[250px] rounded-[10px] pl-[36px] pr-[24px] pt-[50px] relative __shadow'>
      <div className=' absolute top-6 right-6 cursor-pointer'>
        <img src={cartIcon} width={20} height={20} alt='cart' />
      </div>
      <h1 className=' font-clash600 text-[24px] leading-[30px] text-font1'>
        {heading}
      </h1>
      <div className='flex mt-[16px]'>
        <div className=' flex flex-col gap-4'>
          <p className=' max-w-[151px] text-[11px] leading-[14px] mb-[38px]'>
            {description}
          </p>

          <h1 className='font-clash600 text-[24px] leading-[30px] text-font1'>
            {price}
          </h1>
        </div>
        <div className=' flex w-[195px] h-[136px]'>
          <img src={image} className=' object-cover' />
        </div>
      </div>
    </div>
  );
};

export default CardBig;
