import React from 'react';
import { cartIcon } from '../../../assets';
import { useProductContext } from '../../../contexts/product/productContext';
import { useFeatureContext } from '../../../contexts/feature/FeatureContext';
import Alert from '../../../components/Alert';

const Card = ({ image, heading, description, price, background, id }) => {
  const { addToCart, cart } = useProductContext();
  const { showAlert, displayAlert } = useFeatureContext();
  const addTOCart = () => {
    if (cart.includes(id)) {
      //!todo
      displayAlert('The item is already in the cart!', false);
    } else {
      addToCart(id);
    }
  };
  return (
    <div
      className={`relative flex flex-col w-[277px] h-[auto] rounded-[10px] px-4 pt-4 ${
        background ? ' bg-[#F5F5F5]' : 'bg-green3'
      } `}
    >
      {showAlert && <Alert />}
      <h1 className=' font-clash600 text-[20px] leading-[30px]'>{heading}</h1>
      <div className=' h-[108px] flex items-end mt-[12px]'>
        <div className='absolute bottom-4 flex flex-col gap-4'>
          <p className=' w-[115px] text-[11px] leading-[14px]'>{description}</p>

          <h1 className='font-clash600 text-[24px] leading-[30px]'>
            {price} $
          </h1>
        </div>
        <div className='absolute bottom-[18px] right-[32px]'>
          <img src={image} width={107} height={100} />
        </div>
        <button
          onClick={addTOCart}
          className='absolute bottom-[20px] text-whiteBg right-4 cursor-pointer'
        >
          <img src={cartIcon} width={20} height={20} alt='fav' />
        </button>
      </div>
    </div>
  );
};

export default Card;
