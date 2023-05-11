import React, { useEffect, useState } from 'react';
import { searchIcon } from '../assets';
import { useProductContext } from '../contexts/product/productContext';
import { Link } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState(null);
  const [totalProd, setTotalProd] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { onSearch } = useProductContext();

  const searchChange = async (e) => {
    setKeyword(e.target.value);
    if (e.target.value) {
      const { total, data } = await onSearch(e.target.value);
      setProducts(() => data);
      setTotalProd(() => total);
      setShowResults(() => true);
    } else {
      setTotalProd(() => 0);
      setProducts(() => []);
      setShowResults(() => false);
    }
  };
  const searchSubmit = async (e) => {
    e.preventDefault();
    if (keyword) {
      setShowResults(() => true);
      const { total, data } = await onSearch(keyword);
      setProducts(() => data);
      setTotalProd(() => total);
    }
  };

  return (
    <>
      <form onSubmit={searchSubmit} className=' flex'>
        <input
          onFocus={() =>
            totalProd ? setShowResults(true) : setShowResults(false)
          }
          onChange={searchChange}
          className=' h-[3.2rem] sm:h-[2.4rem] w-[536px] sm:w-[13rem] rounded-l-[5px] border-[1px] border-green2 text-[2rem] sm:text-[1.2rem] font-clash500 placeholder:text-green1 text-green1 pl-4 sm:pl-1 focus:outline-none'
          type='text'
          placeholder='Search'
        />
        <button className=' flex justify-center items-center h-[3.2rem] sm:h-[2.4rem] sm:w-[2.4rem] bg-green2 p-[8px] sm:p-2 rounded-r-[5px]'>
          <img src={searchIcon} height={20} width={20} alt='search' />
        </button>
      </form>
      {showResults ? (
        <div className=' z-[999] min-h-[2.4rem] sm:w-[20rem] px-[3.2rem] sm:px-[1rem] py-[.1rem] flex flex-col __center_position_absolute w-[54rem] rounded-[5px] border-[1px] bg-green3 sm:pt-2'>
          <p className='absolute right-[.5rem] sm:top-[-.5rem] text-[.8rem]'>
            Total {totalProd} products found
          </p>
          {products?.map((product, index) => {
            return (
              <Link
                onClick={() => setShowResults(false)}
                className=' my-[1rem] sm:my-0'
                to={`/products/${product._id}`}
                key={index}
              >
                <h1 className=' text-[3.2rem] sm:text-[1rem]'>
                  {product.name}
                </h1>
              </Link>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default Search;
