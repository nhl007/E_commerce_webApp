import React from 'react';
import { featured, jbl, phone, tv } from '../../../assets';
import ButtonGreen from '../../../components/ButtonGreen';
import CardBig from './CardBig';

const Featured = () => {
  return (
    <section className='flex mt-[68px]'>
      <div className='h-[532px] w-[364px] bg-whiteBg __shadow rounded-[10px] p-[32px] pt-[96px] mr-[30px] flex '>
        <div className=' self-end'>
          <img src={featured} width={297} height={405} alt='phone' />
        </div>
      </div>
      <div className=' flex flex-col w-[400px] self-end '>
        <h1 className='max-w-[294px] font-clash600 text-[48px] leading-[59px] text-font3'>
          Xbox One S PlayStation 4
        </h1>
        <h4 className=' mt-8 mb-[80px]'>Xbox One X Xbox One S PlayStation 4</h4>
        <p className=' mb-6'>
          <span className=' text-green2 text-[32px] leading-[39.39px] mr-3'>
            $798.00
          </span>
          <span className=' line-through text-fontRed'>$998.00</span>
        </p>
        <div className='flex flex-col mb-[100px]'>
          <div className=' flex justify-between'>
            <p className=''>Sold: 14</p>
            <p className=''>Available: 20</p>
          </div>
          <div className='mt-[18px] relative flex items-center'>
            <div className='absolute w-[358px] h-[5px] bg-[#D9D9D9]'></div>
            <div className=' absolute max-w-[358px] w-[150px] h-[10px] bg-green2 rounded-[15px]'></div>
          </div>
        </div>
        <div className=' w-[110px]'>
          <ButtonGreen text={'Shop Now'} height={'44px'} width={'110px'} />
        </div>
      </div>
      <div className=' flex flex-col gap-[32px] ml-[52px]'>
        <CardBig
          image={jbl}
          heading={'JBL Boombox'}
          description={'Loudspeaker Wireless speaker'}
          price={'$10.95'}
        />
        <CardBig
          image={tv}
          heading={'Samsung Smart TV'}
          description={'4K resolution Ultra-high-definition television'}
          price={'$10.95'}
        />
      </div>
    </section>
  );
};

export default Featured;
