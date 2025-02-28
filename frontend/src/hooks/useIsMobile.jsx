import { useState, useEffect } from 'react';

const IS_MOBILE_WIDTH = 750;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < IS_MOBILE_WIDTH);
  };
  useEffect(() => {

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;