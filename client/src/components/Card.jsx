import React from 'react';
import { useEffect } from 'react';
import { useProductContext } from '../contexts/products/productContext';

const Card = () => {
  const { products, fetchProduct } = useProductContext();
  useEffect(() => {
    fetchProduct();
  }, []);
  const source =
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  return (
    <>
      <div className='home__container px-4'>
        {products.map((product, index) => (
          <div className='flex flex-col shadow-lg p-5 gap-2' key={index}>
            <div className=' w-full object-cover'>
              <img src={source} alt='ss' />
            </div>
            <div className=' flex justify-between items-center'>
              <div>
                <div className=''>{product.name}</div>
                <div>{product.ratings}</div>
                <div>{product.price}</div>
              </div>
              <button
                onClick={() => {
                  console.log(products);
                }}
              >
                add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
