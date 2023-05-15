import React, { useEffect, useState } from 'react';
import { NavBar, Footer, Alert } from '../components';
import { useProductContext } from '../contexts/product/productContext';
import { headphone } from '../assets';
import { TrashIcon } from '@heroicons/react/24/outline';
import CheckoutPage from './CheckoutPage';
import Card from './Homepage/components/Card';
import { useFeatureContext } from '../contexts/feature/FeatureContext';

const Cart = () => {
  const { cart, removeFromCart } = useProductContext();
  const { showAlert } = useFeatureContext();
  const [total, setTotal] = useState(0);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    let sum = cart?.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    setTotal(sum);
  }, [cart]);

  const [orderedProducts, setOrderedProducts] = useState([]);

  const removeItem = async (id) => {
    await removeFromCart(id);
    const deleteProd = orderedProducts.find((p) => p.product === id);
    const newTotal = total - deleteProd.quantity * deleteProd.price;
    setTotal(newTotal);
    const newItems = orderedProducts.filter((p) => p.product !== id);
    // console.log(newItems);
    setOrderedProducts([...newItems]);
  };

  return (
    <div className=' w-full h-full'>
      {checkout ? (
        <CheckoutPage
          products={orderedProducts}
          total={total}
          setShow={setCheckout}
        />
      ) : null}
      {showAlert && <Alert />}
      <NavBar />
      <div className=' w-full flex justify-start sm:justify-center sm:items-center flex-col'>
        <div className='text-3xl text-font1 font-clash600 mt-[3.2rem]'>
          <h1>Cart Items </h1>
        </div>
        <p className=' self-end my-2 text-2xl sm:hidden'>Sub Total</p>
        <div className=' h-[1px] w-full bg-font5 mb-4' />
        <div className='w-full gap-10 flex flex-col p-[10px] py-4 text-[20px]'>
          {cart.length === 0 ? (
            <p className=' text-center my-[2rem]'>No items in cart</p>
          ) : (
            cart?.map((item, index) => {
              return (
                <div
                  key={index}
                  className='w-full flex items-center gap-6 relative sm:flex-wrap'
                >
                  <p className='w-[2.4rem]'>{index + 1} .</p>
                  {/* <div className='flex w-[150px] h-[auto]'>
                    <img src={headphone} />
                  </div> */}
                  <Card
                    key={index}
                    id={item._id}
                    image={headphone}
                    heading={item.name}
                    description={item.description}
                    price={item.price}
                    cartBtn={false}
                  />

                  <div className=' ml-4 flex flex-col gap-2 '>
                    {/* <h1>{item.name}</h1>
                    <p className=' max-w-[600px]'>{item.description}</p>
                    <p>In Stock : {item.stock} </p> */}
                    <div className=' flex gap-4'>
                      <Quantity
                        product={item}
                        orderedProducts={orderedProducts}
                        setOrderedProducts={setOrderedProducts}
                        setTotal={setTotal}
                        price={item.price}
                      />
                      <button
                        onClick={() => removeItem(item._id)}
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
        <div className=' h-[1px] w-full bg-font5 mt-4' />
        <div className=' flex sm:flex-col sm:gap-[1.6rem] justify-between mt-[1.8rem]'>
          <button
            onClick={() => setCheckout(true)}
            className=' sm:order-2 bg-green2 text-[2.4rem] px-[1.6rem] py-[1rem] rounded-[.5rem]'
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

const Quantity = ({ setTotal, price, product, setOrderedProducts }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // setTotal((prev) => prev + price * quantity);
    setOrderedProducts((prevOrderedProducts) => {
      const updatedProd = prevOrderedProducts.filter(
        (prod) => prod.product !== product._id
      );
      return [
        ...updatedProd,
        {
          name: product.name,
          price: product.price,
          product: product._id,
          quantity: quantity,
        },
      ];
    });
  }, [quantity]);

  return (
    <div className=' flex gap-[2rem] items-center'>
      <button
        onClick={() => {
          if (quantity > 1) {
            setQuantity((prev) => Number(prev) - 1);
            setTotal((prev) => prev - price);
          }
        }}
        className='flex justify-center items-center text-font1 bg-font5 px-2'
      >
        -
      </button>
      <p>
        Quantity :<span> {quantity}</span>
      </p>
      <button
        onClick={() => {
          setQuantity((prev) => Number(prev) + 1);

          setTotal((prev) => prev + price);
        }}
        className='flex justify-center items-center text-font1 bg-font5 px-2'
      >
        +
      </button>
      <div className='absolute sm:static right-0 top-[50%] '>
        {quantity * Number(price)} $
      </div>
    </div>
  );
};
