import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline';

const Pagination = ({
  currentPage,
  totalPage,
  totalProducts,
  getAllProducts,
}) => {
  return (
    <div className='flex flex-col items-end mt-4'>
      <span className='text-lg'>
        Showing{' '}
        <span className='font-semibold'> {(currentPage - 1) * 10} </span> to{' '}
        <span className='font-semibold'>
          {currentPage * 10 > totalProducts ? totalProducts : currentPage * 10}
        </span>{' '}
        of <span className='font-semibold '>{totalProducts}</span> Products
      </span>
      <div className='inline-flex mt-4 xs:mt-0 gap-4'>
        <button
          onClick={() => {
            getAllProducts(currentPage - 1);
          }}
          disabled={currentPage <= 1}
          className='px-6 py-4 text-lg font-medium text-green2 bg-font3 rounded-l hover:bg-green1 hover:text-font2 disabled:bg-font5 disabled:text-fontRed'
        >
          <ArrowLongLeftIcon width={30} />
        </button>
        <button
          onClick={() => {
            getAllProducts(currentPage + 1);
          }}
          disabled={currentPage >= totalPage}
          className='px-6 py-4 text-lg font-medium text-green2 bg-font3 rounded-l hover:bg-green1 hover:text-font2 disabled:bg-font5 disabled:text-fontRed'
        >
          <ArrowLongRightIcon width={30} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
