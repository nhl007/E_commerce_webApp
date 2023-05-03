import { useState } from 'react';
import { useProductContext } from '../contexts/product/productContext';

const DropdownMenu = ({ selectedCategory, setSelectedCategory }) => {
  const { categories } = useProductContext();

  return (
    <div className='relative w-[70%]'>
      <select
        className='block appearance-none w-full bg-white border border-font1 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-font5 font-clash600'
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value.trim())}
      >
        <option value=''>Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
        <svg
          className='fill-current h-4 w-4'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M14.707 7.293a1 1 0 00-1.414-1.414L10 9.586 6.707 6.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4z' />
        </svg>
      </div>
    </div>
  );
};

export default DropdownMenu;
