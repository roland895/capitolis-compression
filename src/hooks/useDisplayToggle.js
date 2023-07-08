// useModal.js
import { useState } from 'react';

const useDisplayToggle = (defaultState) => {
  const [isVisable, setIsVisible] = useState(defaultState);

  const turnOnVisibility = () => {
    setIsVisible(true);
  };

  const turnOffVisibility = () => {
    setIsVisible(false);
  };

  return { isVisable, turnOnVisibility, turnOffVisibility };
};

export default useDisplayToggle;