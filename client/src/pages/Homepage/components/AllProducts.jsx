import React, { useEffect } from 'react';
import Card from './Card';
import { adPhone, headphone } from '../../../assets';
import { useProductContext } from '../../../contexts/product/productContext';

const AllProducts = () => {
  const { products } = useProductContext();

  return (
    <section>
      <h1 className='font-clash600 text-[3.2rem] leading-[3.9rem] mb-[4.8rem] sm:mb-[2.4rem]'>
        More Products
      </h1>
      <div className=' grid sm:flex grid-flow-row grid-cols-4 grid-rows-3 gap-x-[3rem] gap-y-[5rem] sm:gap-[1.6rem] sm:overflow-x-scroll'>
        {products?.map((p) => {
          return (
            <div className='flex w-full h-full' key={p._id}>
              <Card
                id={p._id}
                image={headphone}
                heading={p.name}
                description={p.description}
                price={p.price}
              />
            </div>
          );
        })}

        {/* <div className=' row-span-4 relative'>
          <img className=' object-cover absolute bottom-0' src={adPhone} />
        </div> */}
      </div>
    </section>
  );
};

export default AllProducts;
