import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader';
import { colors } from '../../Global/colors';
import { useTheme } from '../../Global/ThemeContext';


const ExplorePage = () => {
  const { theme: colors } = useTheme();
    const [isLoading, setLoading] = useState(false);


    return (
        isLoading ?
        <div style={{ minHeight: 'calc(100vh - 90px)', display: 'flex', alignItems: 'center' }}>
          <Loader />
        </div> :

        <div style={{ width: '100%', minHeight: 'calc(100vh - 90px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <h1 style={{color: colors.font}}>
          
          

          </h1>
        </div>
      );
      
}

export default ExplorePage;
