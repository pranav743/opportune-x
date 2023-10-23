import React, { useState ,useEffect} from 'react';
import {  useToast } from '@chakra-ui/react';
import { useTheme } from '../../Global/ThemeContext';
import axios from 'axios';
import showToast from "../../Global/Toast";
import { url } from '../../Global/URL';  
import img1 from './image1.png';
import './Myinternship.css'

const Internshipdetails = () => {
    
    const {theme: colors} = useTheme();
    const toast = useToast();

    const [selectedTab, setSelectedTab] = useState(0);

    const [data,setData]=useState([
        {
          image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D',
          title: 'Backend Developer Intern',
          companyName: 'Google',
          location: { state: 'Karnataka', city: 'Mumbai' },
          duration: '5 Months',
          stipend: '50,000',
        },
      ]) 
      
      async function fetchDataForTab(selectedTab) {
        try {
          if (selectedTab === 0) {
            const response1 = await axios.get('/internships/completed');
            const data1 = response1.data;
            return data1;
          } else if (selectedTab === 1) {
            const response2 = await axios.get('/internships/ongoing');
            const data2 = response2.data;
            return data2;
          } else if (selectedTab === 2) {
            const response3 = await axios.get('/internships/applied');
            const data3 = response3.data;
            return data3;
          } else {
            return [];
          }
        } catch (error) {
          showToast(toast, "Error", 'error', data.data.message);
        }
      }

      useEffect(() => {
        const fetchData = async () => {
        //   const data = await fetchDataForTab(selectedTab);
        //   setData(data);
        console.log(selectedTab);
        };
        fetchData();
      }, [selectedTab]);


  return (
       <div  className='mx-auto' style={{width: '80%', height: 'auto', padding: '15px', backgroundColor: colors.secondary, boxShadow: `2.5px 5px 7.5px ${colors.hover}` , marginTop: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
         <div className=''>
            <img src={img1} className='w-[98%]' class="img-fluid rounded-top" alt="Not found" style={{borderRadius: '20px'}} />
         </div>

         <div className='flex flex-col w-full mx-auto mt-6 p-1 justify-between'>
            
            <div className='h-fit w-[100%] rounded-lg p-2 ' style={{backgroundColor:colors.secondary2,color: colors.font}}>
                <div className='flex p-2 justify-between'>
                        <div className={`tab ${selectedTab === 0 ? 'selected' : ''}`} onClick={() => setSelectedTab(0)}>Completed</div>
                        <div className={`tab ${selectedTab === 1 ? 'selected' : ''}`} onClick={() => setSelectedTab(1)}>OnGoing</div>
                        <div className={`tab ${selectedTab === 2 ? 'selected' : ''}`} onClick={() => setSelectedTab(2)}>Applied</div>
                </div>
            </div>

            <div className='h-fit w-[80%] rounded-lg p-2 mt-2 mx-auto' style={{backgroundColor:colors.secondary2,color: colors.font}}>
                {data.map((item,index)=>{
                
                return(<div className='flex justify-between p-2 rounded items-center mb-2 mt-2' style={{backgroundColor:colors.secondary,color: colors.font}} key={index}>
                 <div className='flex  w-[80%] items-center'>
                 <div className='mr-5 w-[12%]'><img src={item.image} class="img-fluid rounded-top" className='bg-yellow-500' alt="Not found" style={{borderRadius: '8px'}} /></div>
                  <div className='p-2 rounded-sm'>

                    <p className='text-xl font-semibold'>{item.title}</p>
                    <p className='text-lg'>{item.companyName}</p>
                  </div>

                  <div className='relative h-16 bg-gray-400 p-[0.25px] mx-3 rounded-full'></div>

                  <div className='rounded-sm ml-5'>
                    <p className='text-xl font-bold'>Duration</p>
                    <p className='text-lg'>{item.duration}</p>
                  </div>
                  <div className='relative h-16 bg-gray-400 p-[0.25px] mx-3 rounded-full'></div>

                  <div className='rounded-sm ml-5'>
                    <p className='text-xl font-semibold'>Location</p>
                    <p className='text-lg'>{item.location.city},{item.location.state}</p>
                  </div>
                  
                  <div className='relative h-16 bg-gray-400 p-[0.25px] mx-3 rounded-full'></div>

                  <div className='p-2 rounded-sm '>
                    <p className='text-xl font-bold'>Stipend</p>
                    <p className='text-lg'>{item.stipend}</p>
                  </div>
                 </div>
               

                  <buttom className='p-2 mr-2 rounded-[6px] text-xl font-bold text-green-500 hover:bg-green-500 !important hover:text-white hover:cursor-pointer' style={{backgroundColor:colors.secondary2}}>View Details</buttom>
                </div>)
                    
                })}


            </div>

         </div>
       </div>
  )
}

export default Internshipdetails;