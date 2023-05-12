import { useProductContext } from '../../../contexts/product/productContext';
import { Link } from 'react-router-dom';
import { TagIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo } from 'react';

const Category = ({ current }) => {
  const { categories } = useProductContext();

  const Categories = useMemo(() => {
    return categories?.map((category, index) => {
      return (
        <Link
          to={`/category/${category.toLowerCase()}`}
          key={index}
          className={`flex gap-[1.8rem] sm:gap-[.5rem] ${
            category.toLowerCase() === current ? 'text-fontRed' : ''
          }`}
        >
          <TagIcon className=' text-green1' width={16} />
          {category}
        </Link>
      );
    });
  }, [categories]);

  return (
    <div className=' max-w-[27.7rem] sm:max-w-[100%] h-[47rem] sm:h-auto rounded-[10px] __shadow bg-whiteBg pb-[4.8rem]'>
      <h1 className=' text-center bg-green1 rounded-t-[10px] py-[6px] text-[1.6rem] font-clash600 text-font2 '>
        Category
      </h1>
      <div className='w-full flex flex-col sm:flex-row flex-wrap pt-[1.6rem] gap-[1rem] sm:gap-[1.6rem] px-[4rem] sm:px-[2.4rem] text-font3'>
        {Categories}
      </div>
    </div>
  );
};

export default Category;
