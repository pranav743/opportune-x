import React, {useEffect, useState} from 'react';
import { useTheme } from '../../Global/ThemeContext';
import { background } from '@chakra-ui/react';

const Wrapper = ({ children }) => {
  const {theme: colors} = useTheme();
  const [smallNav, setSmallNav] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setSmallNav(window.innerWidth < 900)
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div style={{ width: '100%', minHeight: smallNav ? 'calc(100vh - 90px)' : 'calc(100vh - 60px)', overflowY: 'auto', backgroundColor: colors.secondary2}}>
      {children}
    </div>
  );
};

export default Wrapper;
