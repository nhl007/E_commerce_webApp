import { memo } from 'react';
import Card from './Card';

const Recommended = ({ products }) => {
  return (
    <section className=' mt-[8rem] sm:mt-[4.8rem] flex flex-col '>
      <h1 className='font-clash600 text-[3.2rem] leading-[3.9rem]'>
        Recommended For You
      </h1>
      <div className=' flex mt-[4.8rem] sm:mt-[2.4rem] gap-[3rem] sm:gap-[1.6rem] min-h-full sm:overflow-x-scroll'>
        {products?.map((prod, index) => {
          return (
            <Card
              key={index}
              id={prod._id}
              image={prod.images[0]?.url}
              heading={prod.name}
              description={prod.description}
              price={prod.price}
            />
          );
        })}
      </div>
    </section>
  );
};

export default memo(Recommended);
