import React from 'react';
import { useFeatureContext } from '../contexts/feature/FeatureContext';

const Alert = () => {
  const { alertText, alertType } = useFeatureContext();
  return (
    <div
      className={` sm:w-[80%] z-[999] __center_position_fixed  flex ${
        alertType ? 'text-green1' : 'text-fontRed'
      } text-[2.4rem] sm:text-[1.6rem] px-[2.4rem] sm:px-[1.6rem] py-[1.6rem] sm:py-[1rem] rounded bg-inherit bg-font4 `}
    >
      {alertText}
    </div>
  );
};

export default Alert;
