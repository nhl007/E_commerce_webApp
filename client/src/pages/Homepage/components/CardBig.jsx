import React from 'react';
import { cartIcon } from '../../../assets';
import { useProductContext } from '../../../contexts/product/productContext';

const CardBig = ({ id, image, heading, description, price }) => {
  const { addToCart, cardClickEvent } = useProductContext();
  const truncate = (words = '', maxlength) => {
    if (words.length > maxlength) {
      return `${words.slice(0, maxlength)} …`;
    }
    return `${words.slice(0, maxlength)}`;
  };

  return (
    <section className='flex flex-col w-[37.5rem] sm:w-full h-[25.0rem] rounded-[1rem] pl-[3.6rem] sm:pl-4 pr-[2.4rem] pt-[5rem] relative __shadow cursor-grabbing'>
      <button
        onClick={() => addToCart(id)}
        className='flex justify-center items-center w-[6rem] h-[6rem] absolute top-[2.4rem] right-[2.4rem] cursor-pointer z-[999]'
      >
        <img src={cartIcon} width={24} height={24} alt='cart' />
      </button>
      <div onClick={() => cardClickEvent(id)}>
        <h1 className=' font-clash600 text-[2.4rem] leading-[3rem] text-font1'>
          {heading}
        </h1>
        <div className='flex mt-[1.6rem] gap-[1.6rem]'>
          <div className=' flex flex-col gap-[1.6rem] self-end'>
            <p className=' max-w-[15.1rem] text-[1.2rem] leading-[1.4rem]'>
              {truncate(description, 110)}
            </p>

            <h1 className='font-clash600 text-[2.4rem] leading-[3rem] text-font1'>
              {'$ ' + price}
            </h1>
          </div>
          <div className=' w-[8rem] h-auto m-auto'>
            <img src={image} className=' object-cover' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardBig;
