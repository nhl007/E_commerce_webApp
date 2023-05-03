import React from 'react';
import { useProductContext } from '../../../contexts/product/productContext';
import { Link } from 'react-router-dom';
import { TagIcon } from '@heroicons/react/24/outline';

const Category = () => {
  const { categories } = useProductContext();
  return (
    <div className=' w-[277px] h-[auto] rounded-[10px] __shadow bg-whiteBg pb-[4.8rem]'>
      <div className='flex bg-green1 rounded-t-[10px] justify-center items-center py-[6px]'>
        <h1 className=' text-[1.6rem] font-clash600 text-font2 '>Category</h1>
      </div>
      <div className='flex flex-col pt-[1.6rem] gap-[1rem] pl-[2.4rem] text-font3'>
        {categories?.map((category, index) => {
          return (
            <Link key={index} className=' flex gap-[.8rem]' to='/'>
              <TagIcon className=' text-green1' width={16} />
              {category}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
