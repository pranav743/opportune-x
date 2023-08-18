import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader';
import { colors } from '../../Global/colors';
import { useTheme } from '../../Global/ThemeContext';
import axios from 'axios'


const ExplorePage = () => {
  const { theme: colors } = useTheme();
    const [isLoading, setLoading] = useState(false);

    const getinfo = async () => {
        try {
          var res = await axios.get("http://localhost:8000")
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(()=> {
        getinfo();
    }, [])


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
