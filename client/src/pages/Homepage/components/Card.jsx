import React from 'react';
import { cartIcon } from '../../../assets';
import { useProductContext } from '../../../contexts/product/productContext';
import { useFeatureContext } from '../../../contexts/feature/FeatureContext';
import Alert from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { currencyFormatter } from '../../../utils/mathOperations';
const Card = ({ image, heading, description, price, background, id }) => {
  const navigate = useNavigate();
  const { addToCart, cart } = useProductContext();
  const { showAlert, displayAlert } = useFeatureContext();
  const addTOCart = () => {
    if (!cart.length) {
      addToCart(id);
    } else {
      let isSaved = false;
      cart?.map((item) => {
        if (item._id === id) {
          isSaved = true;
        }
      });
      if (!isSaved) {
        addToCart(id);
        displayAlert('Item added to cart !');
      } else {
        displayAlert('The item is already in the cart!', false);
      }
    }
  };
  return (
    <section className=' z-50 relative'>
      <div
        onClick={() => navigate(`/products/${id}`)}
        className={` flex flex-col w-[277px] h-[auto] rounded-[10px] px-4 pt-4 ${
          background ? ' bg-[#F5F5F5]' : 'bg-green3'
        } `}
      >
        {showAlert && <Alert />}
        <h1 className='w-full text-ellipsis whitespace-nowrap overflow-hidden font-clash600 text-[20px] leading-[30px]'>
          {heading}
        </h1>
        <div className=' h-[108px] flex items-end mt-[12px]'>
          <div className='absolute bottom-4 flex flex-col gap-4'>
            <p className=' w-[115px] text-[11px] leading-[14px] '>
              {description}
            </p>

            <h1 className='font-clash600 text-[24px] leading-[30px]'>
              {currencyFormatter(price)}
            </h1>
          </div>
          <div className='absolute bottom-[18px] right-[32px]'>
            <img src={image} width={107} height={100} />
          </div>
        </div>
      </div>
      <button
        onClick={addTOCart}
        className='absolute bottom-[20px] text-whiteBg right-4 cursor-pointer z-[999]'
      >
        <img src={cartIcon} width={20} height={20} alt='fav' />
      </button>
    </section>
  );
};

export default Card;
