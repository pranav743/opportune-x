import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useTheme } from '../../Global/ThemeContext';
import axios from 'axios';
import showToast from "../../Global/Toast";
import { url } from '../../Global/URL';
import img1 from './image1.png';
import './Myinternship.css'
import { getUserDetails } from '../../Global/authUtils';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const Internshipdetails = () => {

  const navigate = useNavigate();
  const { theme: colors } = useTheme();
  const toast = useToast();

  const [selectedTab, setSelectedTab] = useState(2);
  const [user, setUser] = useState(false);

  const [currentShowing, setCurrentShowing] = useState(false);
  const [appliedInternships, setAppliedInternships] = useState(false);
  const [completedInternships, setCompletedInternships] = useState(false);


  const [data, setData] = useState([
    {
      image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Backend Developer Intern',
      companyName: 'Google',
      location: { state: 'Karnataka', city: 'Mumbai' },
      duration: '5 Months',
      stipend: '50,000',
    },
  ])

  const getInternships = async (ids) => {
    console.log(ids)
    try {
      let temp = await axios.post(url + '/internships/view/ids', { internship_ids: ids }).then(response => response.data);
      if (temp.success) {
        console.log(temp.message);
        setAppliedInternships(temp.message);
        setCurrentShowing(temp.message);
      }
      else {
        showToast(toast, "Error", 'error', temp.message);
      }
      return temp;
    } catch (error) {
      console.log(error.response.data.message)
      showToast(toast, "Error", 'error', error.response.data.message);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      const details = await getUserDetails();
      setUser(details);
      console.log(details);
      getInternships(details.myInternshipApplications);
    };

    fetchData();

  }, []);



  return (
    <div className='mx-auto' style={{ width: '100%', height: 'auto', padding: '15px', backgroundColor: colors.secondary, boxShadow: `2.5px 5px 7.5px ${colors.hover}`, marginTop: '0px', borderRadius: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className=''>
        <img src={img1} className='w-[98%]' class="img-fluid rounded-top" alt="Not found" style={{ borderRadius: '20px' }} />
      </div>

      <div className='flex flex-col w-full mx-auto mt-6 p-1 justify-between'>

        <div className='h-fit w-[100%] rounded-lg p-2 ' style={{ backgroundColor: colors.secondary2, color: colors.font }}>
          <div className='flex p-2 justify-between'>
            <div className={`tab ${selectedTab === 0 ? 'selected' : ''}`} onClick={() => setSelectedTab(0)}>Completed</div>
            <div className={`tab ${selectedTab === 1 ? 'selected' : ''}`} onClick={() => setSelectedTab(1)}>OnGoing</div>
            <div className={`tab ${selectedTab === 2 ? 'selected' : ''}`} onClick={() => setSelectedTab(2)}>Applied</div>
          </div>
        </div>



        {(selectedTab == 2) &&
          <div className='h-fit w-[100%] rounded-lg p-2 mt-5 mx-auto' style={{ backgroundColor: colors.secondary2, color: colors.font }}>
            {
              currentShowing ? currentShowing.map((item, index) => {

                return (

                  <div className='flex justify-between p-2 rounded items-center mb-2 mt-2 h-fit' style={{ backgroundColor: colors.secondary, color: colors.font }} key={index}>
                    <div className='flex w-fit items-center'>
                      <div className='hidden w-0 mr-5 lg:w-[10%] lg:flex'><img src={item.image} class="img-fluid rounded-top" alt="Not found" style={{ borderRadius: '8px', maxHeight: '90px', maxWidth: '60px' }} /></div>
                      <div className='p-2 rounded-sm w-fit'>

                        <p className='text-sm font-semibold sm:text-lg md:text-xl '>{item.title}</p>
                        <p className='text-sm sm:text-lg'>{item.companyName}</p>
                      </div>

                      <div className='relative md:h-16 bg-gray-400 p-[0.25px] mx-3 rounded-full hidden sm:block h-12'></div>

                      <div className='rounded-sm ml-5 hidden sm:block'>
                        <p className='text-lg font-bold sm:text-xl'>Duration</p>
                        <p className='text-lg sm:text'>{item.duration}</p>
                      </div>
                      <div className='relative md:h-16 bg-gray-400 p-[0.25px] mx-3 rounded-full hidden lg:block h-12'></div>

                      <div className='rounded-sm ml-5 hidden lg:block'>
                        <p className='text-xl font-semibold '>Location</p>
                        <p className='text-lg'>{item.location.city},{item.location.state}</p>
                      </div>

                      <div className='relative md:h-16 bg-gray-400 p-[0.25px] mx-3 rounded-full hidden lg:block h-12'></div>

                      <div className='p-2 rounded-sm hidden lg:block'>
                        <p className='text-xl font-bold'>Stipend</p>
                        <p className='text-lg '>{item.stipend}</p>
                      </div>
                    </div>


                    <buttom className='p-2 mr-2  rounded-[6px] text-base sm:text-sm lg:text-lg font-bold   !important hover:text-white hover:cursor-pointer' style={{ backgroundColor: 'green', whiteSpace: 'nowrap', boxShadow: `2.5px 5px 7.5px ${colors.hover}` }}
                      onClick={() => navigate(`/internships/view/${item._id.$oid}`)}
                    >View Details</buttom>
                  </div>)

              })
                : <Loader />

            }


          </div>
        }

      </div>
    </div>
  )
}

export default Internshipdetails;