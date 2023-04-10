import React from 'react';
import { searchIcon } from '../assets';

const Search = () => {
  return (
    <div className=' flex'>
      <input
        className=' h-[36px] w-[536px] rounded-l-[5px] border-[1px] border-green2 text-base font-clash500 placeholder:text-font2 pl-4 focus-within:text-font1 focus:outline-none'
        type='text'
        placeholder='Search'
      />
      <button className=' flex justify-center items-center h-[36px] bg-green2 p-[8px] rounded-r-[5px]'>
        <img
          className=''
          src={searchIcon}
          height={20}
          width={20}
          alt='search'
        />
      </button>
    </div>
  );
};

export default Search;
