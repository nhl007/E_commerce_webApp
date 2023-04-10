import React from 'react';
import { useFeatureContext } from '../contexts/feature/FeatureContext';

const Alert = () => {
  const { alertText, alertType } = useFeatureContext();
  return (
    <div
      className={`z-[999] __center_position_fixed  flex ${
        alertType ? 'text-green1' : 'text-fontRed'
      } text-3xl px-8 py-2 rounded-sm bg-font3 `}
    >
      {alertText}
    </div>
  );
};

export default Alert;
