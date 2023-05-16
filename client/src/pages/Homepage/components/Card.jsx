import { cartIcon } from '../../../assets';
import { useProductContext } from '../../../contexts/product/productContext';
const Card = ({
  image,
  heading,
  description,
  price,
  background,
  id,
  cartBtn = true,
}) => {
  const { addToCart, cardClickEvent } = useProductContext();
  const truncate = (words = '', maxlength) => {
    if (words.length > maxlength) {
      return `${words.slice(0, maxlength)} …`;
    }
    return `${words.slice(0, maxlength)}`;
  };

  // const des = truncate(description, 110);

  return (
    <section className='z-50 relative cursor-grab'>
      <div
        onClick={() => cardClickEvent(id)}
        className={` flex flex-col rounded-[1rem] px-4 py-[1.2rem] w-[27.7rem] ${
          background ? ' bg-[#F5F5F5]' : 'bg-green3'
        } `}
      >
        <h1 className=' text-ellipsis whitespace-nowrap overflow-hidden font-clash600 text-[2rem] leading-[3rem]'>
          {heading}
        </h1>
        <div className='h-[10.8rem] flex items-end pt-[1.2rem]'>
          <div className='absolute bottom-4 flex flex-col gap-2'>
            <p
              // style={{
              //   wordBreak: 'break-all',
              // }}
              className=' w-[13rem] max-h-[7rem] text-[1.2rem] leading-[1.4rem] whitespace-wrap overflow-hidden '
            >
              {truncate(description, 100)}
            </p>

            <h1 className='font-clash600 text-[2.4rem] leading-[3rem]'>
              {' $' + price}
            </h1>
          </div>
          <div className='absolute max-w-[9rem] h-auto bottom-[1.2rem] right-[3.2rem]'>
            <img src={image} />
          </div>
        </div>
      </div>
      {cartBtn && (
        <button
          onClick={() => addToCart(id)}
          className='absolute bottom-[1.2rem] flex justify-center items-center w-[6rem] h-auto text-whiteBg right-[-1.5rem] cursor-pointer z-[999]'
        >
          <img src={cartIcon} width={20} height={20} alt='image' />
        </button>
      )}
    </section>
  );
};

export default Card;
