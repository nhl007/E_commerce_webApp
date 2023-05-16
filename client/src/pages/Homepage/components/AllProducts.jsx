import React, { useMemo } from 'react';
import Card from './Card';
import { headphone } from '../../../assets';
import { useProductContext } from '../../../contexts/product/productContext';

const AllProducts = () => {
  const { products } = useProductContext();

  const Products = useMemo(() => {
    return products?.map((p, index) => {
      return (
        <Card
          key={index}
          id={p._id}
          image={p?.images[0]?.url || headphone}
          heading={p.name}
          description={p.description}
          price={p.price}
        />
      );
    });
  }, [products]);

  return (
    <section>
      <h1 className='font-clash600 text-[3.2rem] leading-[3.9rem] mb-[4.8rem] sm:mb-[2.4rem]'>
        More Products
      </h1>

      <div className=' grid sm:flex grid-flow-row grid-cols-4 grid-rows-3 gap-x-[3rem] gap-y-[5rem] sm:gap-[1.6rem] sm:overflow-x-scroll'>
        {Products}
      </div>
    </section>
  );
};

export default AllProducts;
