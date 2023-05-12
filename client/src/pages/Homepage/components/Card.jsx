import { cartIcon } from '../../../assets';
import { useProductContext } from '../../../contexts/product/productContext';
import { useFeatureContext } from '../../../contexts/feature/FeatureContext';
import Alert from '../../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { currencyFormatter } from '../../../utils/mathOperations';
const Card = ({
  image,
  heading,
  description,
  price,
  background,
  id,
  cartBtn = true,
}) => {
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
    <section className='z-50 relative cursor-grab'>
      <div
        onClick={() => navigate(`/products/${id}`)}
        className={` flex flex-col rounded-[1rem] px-4 py-[1.2rem] w-[27.7rem] ${
          background ? ' bg-[#F5F5F5]' : 'bg-green3'
        } `}
      >
        {showAlert && <Alert />}
        <h1 className=' text-ellipsis whitespace-nowrap overflow-hidden font-clash600 text-[2rem] leading-[3rem]'>
          {heading}
        </h1>
        <div className='h-[10.8rem] flex items-end pt-[1.2rem]'>
          <div className='absolute bottom-4 flex flex-col gap-4'>
            <p className=' w-[13rem] text-[1.2rem] leading-[1.4rem] '>
              {description}
            </p>

            <h1 className='font-clash600 text-[2.4rem] leading-[3rem]'>
              {currencyFormatter(price)}
            </h1>
          </div>
          <div className='absolute bottom-[1.2rem] right-[3.2rem]'>
            <img src={image} width={107} height={100} />
          </div>
        </div>
      </div>
      {cartBtn && (
        <button
          onClick={addTOCart}
          className='absolute bottom-[2rem] text-whiteBg right-4 cursor-pointer z-[999]'
        >
          <img src={cartIcon} width={20} height={20} alt='fav' />
        </button>
      )}
    </section>
  );
};

export default Card;
