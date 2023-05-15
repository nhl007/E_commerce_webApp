import { useState } from 'react';
import { DropdownMenu } from '../../components';
import { useProductContext } from '../../contexts/product/productContext';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import { useFeatureContext } from '../../contexts/feature/FeatureContext';
import { Alert } from '../../components';

const ModalNewProduct = ({ show, setShow }) => {
  const { createNewProduct } = useProductContext();
  const { userType } = useAuthContext();
  const { displayAlert, showAlert } = useFeatureContext();
  const [category, setCategory] = useState('');

  const initial = {
    name: '',
    description: '',
    seller: '',
    price: '',
    category: '',
    stock: '',
  };

  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');

  const [values, setValues] = useState(initial);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (userType === 'admin') {
      values.category = category;
      const images = [
        {
          url: imageUrl1,
        },
        imageUrl2 !== ''
          ? {
              url: imageUrl2,
            }
          : null,
        imageUrl3 !== ''
          ? {
              url: imageUrl3,
            }
          : null,
      ];

      values.images = images.filter((val) => val !== null);
      createNewProduct(values);
      setShow(false);
    } else {
      displayAlert('only admin can create product', false);
    }
  };

  return (
    <section className='fixed top-0 w-full h-full flex justify-center items-center gap-[3.2rem] bg-[transparent]'>
      {showAlert ? <Alert /> : null}
      <form
        onSubmit={onSubmit}
        className='p-[1.6rem] relative w-[60%] h-[100%] flex flex-col bg-font4 text-font5'
      >
        <h1 className=' mb-[3.2rem] text-[2.4rem] font-clash600 self-center'>
          Add New Product
        </h1>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShow(false);
          }}
          className=' absolute top-0 right-0 bg-fontRed px-[1.6rem] text-[2.4rem] py-[.8rem]'
        >
          X
        </button>
        <div className='flex flex-col gap-[2.4rem] w-[80%]  '>
          <div className='flex gap-[1rem] items-center justify-between'>
            <p className='font-clash600'>Category : </p>
            <DropdownMenu
              selectedCategory={category}
              setSelectedCategory={setCategory}
            />
          </div>
          <div className=' flex gap-[1rem] items-center justify-between '>
            <label className='w-[40%] font-clash600'> Image Url :</label>
            <div className='flex flex-col gap-4 w-full items-end'>
              <input
                name='image1'
                placeholder='Image URL'
                onChange={(e) => setImageUrl1(e.target.value)}
                className=' w-[100%] text-[1.6rem] py-2 px-4 rounded-sm'
              />
              <input
                name='image2'
                placeholder='Image URL'
                onChange={(e) => setImageUrl2(e.target.value)}
                className=' w-[100%] text-[1.6rem] py-2 px-4 rounded-sm'
              />
              <input
                name='image3'
                placeholder='Image URL'
                onChange={(e) => setImageUrl3(e.target.value)}
                className=' w-[100%] text-[1.6rem] py-2 px-4 rounded-sm'
              />
            </div>
          </div>
          <div className=' flex gap-[1rem] items-center justify-between'>
            <label className=' font-clash600'> Name :</label>
            <input
              name='name'
              placeholder='Product Name'
              onChange={handleChange}
              className=' w-[70%] text-[1.6rem] py-2 px-4 rounded-sm'
            />
          </div>
          <div className=' flex gap-[1rem] items-center justify-between'>
            <label className=' font-clash600'>Description :</label>
            <input
              placeholder='Product Description'
              name='description'
              onChange={handleChange}
              className=' w-[70%] text-[1.6rem] py-2 px-4 rounded-sm'
            />
          </div>
          <div className=' flex gap-[1rem] items-center justify-between'>
            <label className=' font-clash600'> Seller :</label>
            <input
              placeholder='Company/Individual'
              name='seller'
              onChange={handleChange}
              className=' w-[70%] text-[1.6rem] py-2 px-4 rounded-sm'
            />
          </div>
          <div className=' flex gap-[1rem] items-center justify-between'>
            <label className=' font-clash600'> Stock :</label>
            <input
              name='stock'
              type='number'
              placeholder='Stock information'
              onChange={handleChange}
              className=' w-[70%] text-[1.6rem] py-2 px-4 rounded-sm'
            />
          </div>
          <div className=' flex gap-[1rem] items-center justify-between'>
            <label className=' font-clash600'> Price :</label>
            <input
              name='price'
              placeholder='Product Price'
              onChange={handleChange}
              className=' w-[70%] text-[1.6rem] py-2 px-4 rounded-sm'
            />
          </div>
        </div>
        <button
          type='submit'
          className={`rounded-[8px] bg-green2 px-[8px] py-[4px] text-font2 font-clash700 text-[16px] leading-[21px] w-[150px] mt-[2.4rem]`}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ModalNewProduct;
