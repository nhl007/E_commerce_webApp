import React, { useEffect } from 'react';
import Card from './Card';
import { adPhone, headphone } from '../../../assets';
import { useProductContext } from '../../../contexts/product/productContext';

const AllProducts = () => {
  const { products } = useProductContext();

  return (
    <section>
      <h1 className='font-clash600 text-[32px] leading-[39px] mb-[48px]'>
        Recommended For You
      </h1>
      <div className=' grid grid-flow-row grid-cols-4 grid-rows-3 gap-x-[30px] gap-y-[50px]'>
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
