import React, { useEffect, useState } from 'react';
import { NavBar, Footer } from '../components';
import { useProductContext } from '../contexts/product/productContext';
import { headphone } from '../assets';
import { TrashIcon } from '@heroicons/react/24/outline';
import CheckoutPage from './CheckoutPage';

const Cart = () => {
  const { cart, removeFromCart } = useProductContext();
  const [total, setTotal] = useState(0);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    let sum = cart?.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    setTotal(sum);
  }, [cart]);

  const [orderedProducts, setOrderedProducts] = useState([]);

  return (
    <div className=' w-full h-full'>
      {checkout ? (
        <CheckoutPage
          products={orderedProducts}
          total={total}
          setShow={setCheckout}
        />
      ) : null}
      <NavBar />
      <div className=' w-full flex justify-start flex-col'>
        <div className='text-3xl text-font1 font-clash600 mt-8'>
          <h1>Cart Items </h1>
        </div>
        <p className=' self-end my-2 text-2xl'>Price</p>
        <div className=' h-[1px] w-full bg-font5 mb-4' />
        <div className='w-full gap-10 flex flex-col p-[10px] py-4 text-[20px]'>
          {cart.length === 0 ? (
            <p className=' text-center my-[2rem]'>No items in cart</p>
          ) : (
            cart?.map((item, index) => {
              return (
                <div
                  key={index}
                  className='w-full flex items-center gap-6 relative'
                >
                  <p>{index + 1} .</p>
                  <div className='flex w-[150px] h-[auto]'>
                    <img src={headphone} />
                  </div>
                  <div className=' ml-4 flex flex-col gap-2 '>
                    <h1>{item.name}</h1>
                    <p className=' max-w-[600px]'>{item.description}</p>
                    <p>In Stock : {item.stock} </p>
                    <div className=' flex gap-4'>
                      <Quantity
                        product_id={item._id}
                        orderedProducts={orderedProducts}
                        setOrderedProducts={setOrderedProducts}
                        total={total}
                        setTotal={setTotal}
                        price={item.price}
                      />
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className=' ml-4'
                      >
                        <TrashIcon height={24} color='red' />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className=' h-[1px] w-full bg-font5 mb-4' />
        <div className=' flex justify-between mt-[.8rem]'>
          <button
            onClick={() => setCheckout(true)}
            className=' bg-green2 text-[2.4rem] px-[1.6rem] py-[1rem] '
          >
            CheckOut
          </button>
          <p className=' text-[2.4rem]'>Total : {total} $</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

const Quantity = ({
  total,
  setTotal,
  price,
  product_id,
  setOrderedProducts,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setTotal((prev) => prev + price);
    setOrderedProducts((prevOrderedProducts) => {
      const updatedProd = prevOrderedProducts.filter(
        (prod) => prod.product !== product_id
      );
      return [...updatedProd, { product: product_id, quantity: quantity }];
    });
  }, [quantity]);

  return (
    <div className=' flex gap-2 items-center'>
      <button
        onClick={() => {
          if (quantity > 1) {
            setQuantity((quantity) => quantity - 1);
            // setTotal((total) => total - price);
          }
        }}
        className='flex justify-center items-center text-font1 bg-font5 px-2'
      >
        -
      </button>
      Quantity : {quantity}
      <button
        onClick={() => {
          setQuantity((quantity) => quantity + 1);
          // setTotal((total) => total + price);
        }}
        className='flex justify-center items-center text-font1 bg-font5 px-2'
      >
        +
      </button>
      <div className='absolute right-0 top-4 '>
        {quantity * Number(price)} $
      </div>
    </div>
  );
};
