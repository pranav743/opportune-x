import React from 'react';
import {  useToast } from '@chakra-ui/react';
import { useTheme } from '../../Global/ThemeContext';
import img4 from './Img4.webp'
import Card from '../Internship/Browse/Card';
import Cards from '../Courses/Browse/Card';
import { useQuery } from '@tanstack/react-query';


const Explore = () => {
    
    const {theme: colors} = useTheme();
    const toast = useToast();

    const { data:data1 } = useQuery({
        queryKey: ['/courses/all'],
        retry: true
    })

    const { isError, isLoading, data } = useQuery({
        queryKey: ['/route1'],
    })


  return (
       <div  className='mx-auto sm:w-[100%] w-[100%]' style={{height: 'fit', padding: '15px', backgroundColor: colors.secondary2, boxShadow: `2.5px 5px 7.5px ${colors.hover}` , marginTop: '0', borderRadius: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center',flexWrap:'wrap'}}>
         <div className='w-full p-2 flex items-center mt-6  rounded-lg mb-4' style={{ backgroundColor: colors.secondary, color: colors.font }}>
            <div className='my-2 pl-8 '>
                <p className='text-xl font-bold  sm:text-7xl'>Connecting Talent, Colleges, & Recruiters</p>
                <hr className='border-yellow-500 border-[1px] rounded-full' ></hr>
                <p className='text-sm font-semibold mt-2 sm:text-xl'>Explore opportunities from across the globe to learn, showcase skills, gain CV points, & get hired by your dream company.</p>
            </div>
            <div className='flex'>
              <img src={img4} className='hidden sm:w-[80%] sm:block ml-20'/>

            </div>
         </div>
         <div className=' h-50 w-full rounded-lg' style={{ backgroundColor: colors.secondar, color: colors.font }}>
            <div className='flex-col items-center justify-center'>
                <p className='text-center font-extrabold text-3xl mt-2 p-2 sm:text-3xl'>TOP OPPORTUNITIES</p>
                <div className='flex flex-wrap justify-center'>                

                {
                        data && data.slice(0, 6).map((internship, index) => (
                            <Card title={internship.title} description={internship.description} _id={internship._id} key={index} />
                        ))
}
                </div>
            </div>

            <div className='flex-col items-center justify-center'>
                <p className='text-center font-extrabold text-3xl mt-2 p-2 '>TOP COURSES</p>
                <div className='flex flex-wrap justify-center'>                
                {
                        data1 && data1.map((course, index) => (
                            <Cards courseTitle={course.courseTitle} category={course.category} description={course.description} rating={course.rating} image={course.image} fee={course.fee} durationInWeeks={course.durationInWeeks} subject={course.subject} _id={course._id.$oid} />
                        ))
                    }
                </div>
            </div>
         </div>
       </div>
  )
}

export default Explore;