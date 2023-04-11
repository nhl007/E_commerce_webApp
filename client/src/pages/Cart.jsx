import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useProductContext } from '../contexts/product/productContext';
import { headphone } from '../assets';

const Cart = () => {
  const { cart } = useProductContext();
  return (
    <div>
      <NavBar />
      <div className=' w-full flex justify-start flex-col'>
        <div className='text-3xl text-font1 font-clash600 mt-8'>
          <h1>Your Items </h1>
        </div>
        <p className=' self-end my-2'>Price</p>
        <div className=' h-[1px] w-full bg-font5 mb-4' />
        <div className='w-full gap-6 flex flex-col p-[10px] px-4 py-4'>
          {cart.map((item, index) => {
            const [quantity, setQuantity] = useState(1);
            return (
              <div key={index} className='w-full flex gap-6 relative'>
                <input type='checkbox' />
                <div className='flex w-[180px] h-[auto]'>
                  <img src={headphone} />
                </div>
                <div className=' ml-4 flex flex-col gap-2 text-2xl'>
                  <h1>{item.name}</h1>
                  <p className=' max-w-[600px]'>{item.description}</p>
                  <p>In Stock : {item.stock} </p>
                  <div className=' mt-2'>
                    <button
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity((quantity) => quantity - 1);
                        }
                      }}
                      className='text-2xl text-font1 bg-font5 px-2'
                    >
                      -
                    </button>
                    &nbsp;Quantity : {quantity}&nbsp;
                    <button
                      onClick={() => {
                        console.log('ok');
                        setQuantity((quantity) => quantity + 1);
                      }}
                      className=' text-2xl text-font1 bg-font5 px-2'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className=' absolute right-4 text-2xl'>
                  {quantity * Number(item.price)} $
                </div>
              </div>
            );
          })}
          <div className=' h-[1px] w-full bg-font5 mb-4' />
          <p className=' self-end my-2'>Total</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
