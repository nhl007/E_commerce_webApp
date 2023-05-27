import React, { useEffect } from 'react';
import ButtonGreen from '../../../components/ButtonGreen';
import CardBig from './CardBig';
import Category from './Category';
import Card from './Card';
import { memberIcon, moneyIcon, supportIcon } from '../../../assets';
import Recommended from './Recommended';
import { useProductContext } from '../../../contexts/product/productContext';
import { useNavigate } from 'react-router-dom';

const Featured = () => {
  // const percentage = percentageCal(14, 20) + '%';
  const navigate = useNavigate();

  const { addToCart, featuredProducts, getFeaturedProducts } =
    useProductContext();

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  const featuredAddToCart = async (id) => {
    await addToCart(id);
    navigate('/cart');
  };

  return (
    <>
      {featuredProducts.length && (
        <>
          <section className=' flex flex-row sm:flex-col justify-start items-end sm:items-start mt-[5.3rem] gap-[3.2rem] sm:gap-[1.6rem] relative'>
            <Category />
            <div className=' sm:hidden  absolute right-0 top-[1rem]'>
              <div className=' flex justify-center items-center gap-[3.2rem] font-clash600 pr-1'>
                <p>Top Deals</p>
              </div>
            </div>
            <div className=' w-[70rem] sm:max-w-full px-[4.8rem] sm:px-[2.4rem] pt-[3.2rem] pb-[3.2rem] flex flex-col sm:gap-[1.6rem] __shadow rounded-[1rem] bg-whiteBg'>
              <h1 className=' font-clash600 text-[4.8rem] sm:text-[3.2rem] leading-[5.9rem]  sm:leading-[4rem] text-font1 w-full max-h-[6.5rem] whitespace-wrap overflow-hidden overflow-ellipsis'>
                {featuredProducts[0].name}
              </h1>
              <div className=' flex gap-[4.8rem] h-[21.9rem]'>
                <div className=' flex flex-col self-end'>
                  <p className=' max-w-[29rem] text-[1.2rem] leading-[1.4rem] mb-[1.6rem]'>
                    {featuredProducts[0].description}
                  </p>

                  <h1 className='font-clash600 text-[2.4rem] leading-[3rem] text-font1 mb-[1.6rem]'>
                    {'$ ' + featuredProducts[0].price}
                  </h1>

                  <ButtonGreen
                    onClick={() => featuredAddToCart(featuredProducts[0]._id)}
                    text={'Shop Now'}
                    width={'11rem'}
                    height={'4.4rem'}
                  />
                </div>
                <div className='flex justify-center items-center max-w-[16.5rem] h-auto '>
                  <img
                    width={160}
                    height={160}
                    alt='img'
                    src={featuredProducts[0].images[0].url}
                  />
                </div>
              </div>
            </div>
            <div className='sm:w-full flex flex-col gap-[2rem] sm:mt-[2.4rem] sm:justify-center sm:items-center'>
              <Card
                id={featuredProducts[1]._id}
                image={featuredProducts[1].images[0].url}
                heading={featuredProducts[1].name}
                description={featuredProducts[1].description}
                price={featuredProducts[1].price}
              />
              <Card
                id={featuredProducts[2]._id}
                image={featuredProducts[2].images[0].url}
                heading={featuredProducts[2].name}
                description={featuredProducts[2].description}
                price={featuredProducts[2].price}
              />
            </div>
          </section>
          <section className=' flex sm:flex-col mt-[12.8rem] sm:mt-[4.8rem] gap-[4rem] sm:gap-[2.4rem] justify-center  items-center sm:items-start'>
            <Marketing
              icon={supportIcon}
              text={'Support online 24 hours a day'}
              heading={'24/7 SupportMoney'}
            />
            <Marketing
              icon={moneyIcon}
              text={'Money back guarantee within 15 days '}
              heading={'Money Return'}
            />
            <Marketing
              icon={memberIcon}
              text={'On every order over $120.00 or Free Shipping'}
              heading={'Member Offers'}
            />
          </section>
          <section className='flex sm:flex-col mt-[6.8rem]'>
            <div className='h-[532px] sm:h-auto w-[36.4rem] bg-whiteBg __shadow rounded-[1rem] p-[3.2rem] sm:p-[1.6rem] pt-[9.6rem] sm:pt-[2.4rem] mr-[3rem] sm:mr-0 flex '>
              <div className='self-end'>
                <img
                  src={featuredProducts[3].images[0].url}
                  width={297}
                  height={405}
                  alt='image'
                />
              </div>
            </div>
            <div className=' flex flex-col w-[40rem] sm:w-full self-end sm:py-6 '>
              <h1 className='max-w-[29.4rem] font-clash600 text-[4.8rem] sm:text-[3.2rem] leading-[5.9rem]  sm:leading-[4rem] text-font3'>
                {featuredProducts[3].name}
              </h1>
              <h4 className=' mt-8 mb-[8rem] sm:mb-[2.4rem]'>
                {featuredProducts[3].description}
              </h4>
              <p className=' mb-[2.4rem]'>
                <span className=' text-green2 text-[3.2rem] leading-[3.939rem] mr-3'>
                  {'$ ' + featuredProducts[3].price}
                </span>
              </p>
              {/* <div className='flex flex-col mb-[10rem] sm:mb-[3.2rem]'>
            <div className=' flex justify-between'>
              <p className=''>Sold: 14</p>
              <p className=''>Available: 20</p>
            </div>
            <div className='mt-[1.8rem] relative flex items-center'>
              <div className='absolute w-full h-[.5rem] bg-[#D9D9D9]'></div>
              <div
                style={{
                  width: `${percentage}`,
                }}
                className={`absolute h-[.5rem] bg-green2 rounded-[1.5rem]`}
              ></div>
            </div>
          </div> */}
              <div className=' w-[11rem]'>
                <ButtonGreen
                  onClick={() => featuredAddToCart(featuredProducts[3]._id)}
                  text={'Shop Now'}
                  height={'44px'}
                  width={'110px'}
                />
              </div>
            </div>
            <div className=' flex flex-col gap-[3.2rem] ml-[5.2rem] sm:ml-0'>
              <CardBig
                id={featuredProducts[4]._id}
                image={featuredProducts[4].images[0].url}
                heading={featuredProducts[4].name}
                description={featuredProducts[4].description}
                price={featuredProducts[4].price}
              />
              <CardBig
                id={featuredProducts[5]._id}
                image={featuredProducts[5].images[0].url}
                heading={featuredProducts[5].name}
                description={featuredProducts[5].description}
                price={featuredProducts[5].price}
              />
            </div>
          </section>
          <Recommended products={featuredProducts.slice(6)} />
        </>
      )}
    </>
  );
};

export default Featured;

const Marketing = ({ icon, heading, text }) => {
  return (
    <section className=' flex gap-[3.2rem] justify-center items-center'>
      <div className=' w-[4.8rem] h-[4.8rem] rounded-[50%] bg-green2 flex justify-center items-center'>
        <img src={icon} width={20} height={20} alt='icon' />
      </div>

      <div className=' flex flex-col gap-[.8rem]'>
        <p>{heading}</p>
        <p>{text}</p>
      </div>
    </section>
  );
};
