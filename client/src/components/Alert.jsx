import React from 'react';
import { useFeatureContext } from '../contexts/features/featureContext';

const Alert = () => {
  const { alertText, alertType } = useFeatureContext();
  return (
    <>
      <div className=' flex justify-center align-middle items-center'>
        <div className=' fixed flex top-5 left-[30%]'>
          <div className=' flex justify-center items-center gap-4 bg-gray-300 rounded-lg p-4'>
            {!alertType ? (
              <div className=' flex justify-center'>
                <lottie-player
                  src='https://assets3.lottiefiles.com/private_files/lf30_ltbsyn9h.json'
                  background='transparent'
                  speed='1'
                  style={{ width: '50px', height: '50px' }}
                  loop
                  autoplay
                ></lottie-player>
              </div>
            ) : (
              ''
            )}
            {alertType ? (
              <div>
                <lottie-player
                  src='https://assets2.lottiefiles.com/packages/lf20_pqnfmone.json'
                  background='transparent'
                  speed='1'
                  style={{ width: '50px', height: '50px' }}
                  loop
                  autoplay
                ></lottie-player>
              </div>
            ) : (
              ''
            )}
            <p
              className={`${
                !alertType ? ' text-red-500' : 'text-green-700'
              } text-2xl text-center w-full font-semibold `}
            >
              {alertText}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
