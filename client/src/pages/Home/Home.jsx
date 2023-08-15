import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader';
import { useTheme } from '../../Global/ThemeContext';

const HomePage = () => {
    const {theme : colors } = useTheme();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }, []);


    return (
        isLoading ?
        <div style={{ minHeight: 'calc(100vh - 90px)', display: 'flex', alignItems: 'center' }}>
          <Loader />
        </div> :
        
        <>
        <h1 style={{color: colors.font}}>Home page</h1>
        </>
      );
      
}

export default HomePage;
