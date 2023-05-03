import React from 'react';
import { useFeatureContext } from '../contexts/feature/FeatureContext';

const Alert = () => {
  const { alertText, alertType } = useFeatureContext();
  return (
    <div
      className={`z-[999] __center_position_fixed  flex ${
        alertType ? 'text-green1' : 'text-fontRed'
      } text-[2.4rem] px-[2.4rem] py-[1.6rem] rounded-sm bg-inherit bg-font4 `}
    >
      {alertText}
    </div>
  );
};

export default Alert;
