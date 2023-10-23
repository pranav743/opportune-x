import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useTheme } from '../../Global/ThemeContext';
import axios from 'axios';
import showToast from "../../Global/Toast";
import { url } from '../../Global/URL';
import { CalendarIcon, CheckCircleIcon, ViewIcon, InfoIcon, LinkIcon } from '@chakra-ui/icons'
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'

import { Icon } from '@chakra-ui/react'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import { MdLocationPin } from 'react-icons/md'
import { AiFillClockCircle } from 'react-icons/ai'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { BsFillBuildingsFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/loader/Loader';
import { isAuthenticated, getUserDetails } from '../../Global/authUtils';




const Internshipdetails = () => {

    const { id } = useParams();
    const [userDetails, setUserDetails] = useState();

    const { isError, isLoading, data } = useQuery({
        queryKey: [`/internship/${id}`],
    })

    const { theme: colors } = useTheme();
    const toast = useToast();

    const applyToInternship = async () => {
        try {
            if (isAuthenticated()){
                try {
                    const userDetails = await getUserDetails();
                    setUserDetails(userDetails);
                    console.log("User = ",userDetails)
                } catch (error) {
                    showToast(toast, "Error", 'error', "User not Authenticated");
                }
                console.log({user_id: userDetails._id, internship_id: id});
                let data = await axios.post(url+'/apply/internship', {user_id: userDetails._id, internship_id: id});
                // console.log(data);
                if (data.data.success){
                    showToast(toast, "Success", 'success', "Applied to the Internship !");
                    return;
                } else {
                    showToast(toast, "Error", 'error', data.data.message);
                    return;
                }
                
            }
            else{
                showToast(toast, "Error", 'error', "You Should Login to Apply !");
                return;
            }
        } catch (error) {
            console.log(error)
            showToast(toast, "Error", 'error', JSON.stringify(error.response));
        }
    }

    if (isLoading) {
        return (
            <div style={{ height: '80vh', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                <Loader />
            </div>
        );
    }

    else if (isError) {
        return (
            <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: colors.font, fontSize: '22px', fontWeight: 'bold', letterSpacing: '1px' }}>Something went Wrong :(</h1>
            </div>
        );
    }
    return (
        <div className='mx-auto sm:w-[90%] w-[100%]' style={{ height: 'auto', padding: '15px', backgroundColor: colors.secondary, boxShadow: `2.5px 5px 7.5px ${colors.hover}`, marginTop: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', minWidth: '95%' }}>
            <div style={{width: '100%', position: 'relative'}}>
                <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D" class="img-fluid rounded-top " alt="Not found" style={{ borderRadius: '20px', transform: 'translateX(15px)', width: '97%', maxHeight: '90vh' }} />
                <div style={{position: 'absolute', top: '0', left: '0', background: `linear-gradient(180deg, rgba(0,0,0,0), ${colors.secondary})` ,height: '100%', width: '100%'}}></div>
            </div>

            <div className='flex flex-col sm:flex-row w-full mx-auto mt-6 p-1 justify-between flex-wrap'>
                <div className='h-fit w-[100%] sm:w-[74%] rounded-lg p-1 ' style={{ backgroundColor: colors.secondary2, color: colors.font }}>
                    <div className='w-full px-3 py-2 flex-col'>
                        <p className='text-3xl' style={{ color: colors.font, fontWeight: 'bold', fontFamily: 'Titillium Web' }}>{data.message && JSON.stringify(data.message.title)}</p>
                        <div className='flex mt-3 items-center ml-5'><Icon as={BsFillBuildingsFill} w={5} h={5} color='blue.500' /><p className='text-lg ml-2'>{data.message.companyName}</p></div>
                        <div className='flex  items-center ml-5'><LinkIcon w={5} h={4} color="blue.500" /><p className='text-lg ml-2'>{`www.${data.message.companyName}.com`}</p></div>
                    </div>
                    <div className='hidden sm:flex sm:w-full p-2 w-0'>
                        <p className='bg-gray-500 rounded-lg p-1 text-lg mr-3'>#MBA</p>
                        <p className='bg-gray-500 rounded-xl p-1 text-lg mr-3'>#Content</p>
                        <p className='bg-gray-500 rounded-xl p-1 text-lg mr-3'>#Human Resource</p>
                        <p className='bg-gray-500 rounded-xl p-1 text-lg mr-3'>#Marketing</p>
                    </div>

                    <div className='w-full p-2 mt-2 rounded-lg'>

                        {/* //company description */}
                        <div className='mb-8'>
                            <p className='font-bold text-xl'>Company Description</p>

                            <p className='mt-2'>{data.message.description}</p>
                        </div>

                        {/* //Job description */}

                        <div className='mb-8'>
                            <p className='font-bold text-xl'>Job Summary</p>
                            <p className='mt-2'>{`As an ${data.message.title} at ${data.message.companyName}, you will be instrumental in building and nurturing valuable relationships with our community of experts. Your role will involve reaching out to experts, understanding their needs, and ensuring their satisfaction with our platform.`}</p>
                        </div>

                        {/* //Key Responsibility */}
                        

                        <div className='mb-8'>
                            <p className='font-bold text-xl mb-1'>Key Responsibility</p>
                            <List spacing={2}>
                                <ListItem>
                                    <ListIcon as={VscDebugBreakpointLog} color='green.500' />
                                    Managing and coordinating project timelines and deliverables.
                                </ListItem>

                                <ListItem>
                                    <ListIcon as={VscDebugBreakpointLog} color='green.500' />
                                    Conducting market research to identify growth opportunities.
                                </ListItem>
                                <ListItem>

                                    <ListIcon as={VscDebugBreakpointLog} color='green.500' />
                                    Collaborating with cross-functional teams to achieve project goals.
                                </ListItem>
                                <ListItem>

                                    <ListIcon as={VscDebugBreakpointLog} color='green.500' />
                                    Analyzing data and generating reports for informed decision-making.
                                </ListItem>
                            </List>
                        </div>

                        {/* Qualifications and Requirements: */}
                        <div className='mb-8'>
                            <p className='font-bold text-xl mb-1'>Qualifications and Requirements:</p>
                            
                        </div>

                        {/* Perks: */}

                        <div className='mb-8'>
                            <p className='font-bold text-xl mb-1'>Perks:</p>
                            <List spacing={2}>
                                <ListItem>
                                    <ListIcon as={VscDebugBreakpointLog} color='green.500' />
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                </ListItem>

                                <ListItem>
                                    <ListIcon as={VscDebugBreakpointLog} color='green.500' />
                                    Assumenda, quia temporibus eveniet a libero incidunt suscipit
                                </ListItem>
                                <ListItem>

                                    <ListIcon as={VscDebugBreakpointLog} color='green.500' />
                                    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                                </ListItem>
                                <ListItem>

                                    <ListIcon as={VscDebugBreakpointLog} color='green.500' />
                                    Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                                </ListItem>
                            </List>
                        </div>

                    </div>
                </div>



                {/* //Side Panel */}

                <div className='w-[100%] sm:w-[25%] h-fit p-1 mt-5 sm:mt-0' style={{ backgroundColor: colors.secondary }}>
                    <div className='h-fit  rounded-lg '>
                        <button className='p-2 rounded-lg w-full text-xl font-bold bg-blue-500 hover:bg-green-500 text-white' onClick={applyToInternship}>APPLY</button>
                    </div>

                    <div className='h-fit p-1 mt-2 rounded-lg w-full mx-auto py-2' style={{ backgroundColor: colors.secondary2, color: colors.font, height: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <div className='flex px-2 py-1 w-full item-center md:ml-10 ml-0' style={{maxWidth: '60%'}}>
                            <CheckCircleIcon w={7} h={7} color="blue.500" />
                            <div className='flex-col ml-5' style={{ color: colors.font }}>
                                <p className='text-xl font-bold' style={{height: 'auto'}}>Registered</p>
                                <p>{(data.message.numberOfOpenings)*500}</p>
                            </div>
                        </div>

                        <div className='flex px-2 py-1 w-full item-center md:ml-10 ml-0'>
                            <ViewIcon w={8} h={8} color="blue.500" />
                            <div className='flex-col ml-5' style={{ color: colors.font }}>
                                <p className='text-xl font-bold'>Impression</p>
                                <p>{(data.message.numberOfOpenings)*1000}</p>
                            </div>
                        </div>

                        <div className='flex px-2 py-1 w-full item-center md:ml-10 ml-0'>
                            <CalendarIcon w={8} h={8} color="blue.500" />
                            <div className='flex-col ml-5' style={{ color: colors.font }}>
                                <p className='text-xl font-bold'>Dedline</p>
                                <p>{data.message.applicationDeadline}</p>
                            </div>
                        </div>
                    </div>

                    <div className='h-fit p-1 mt-2 rounded-lg w-full mx-auto py-2' style={{ backgroundColor: colors.secondary2, color: colors.font }}>
                        <div className='flex px-2 py-1 w-full item-center md:ml-10 ml-0' >
                            <Icon as={MdLocationPin} w={8} h={8} color='blue.500' />
                            <div className='flex-col ml-5' style={{ color: colors.font }}>
                                <p className='text-xl font-bold'>Location</p>
                                <p>{data.message.location.city},{data.message.location.state}</p>
                            </div>
                        </div>

                        <div className='flex px-2 py-1 w-full item-center md:ml-10 ml-0'>
                            <Icon as={AiFillClockCircle} w={8} h={8} color='blue.500' />
                            <div className='flex-col ml-5' style={{ color: colors.font }}>
                                <p className='text-xl font-bold'>Duration</p>
                                <p>{data.message.duration}</p>
                            </div>
                        </div>

                        <div className='flex px-2 py-1 w-full item-center md:ml-10 ml-0'>
                            <Icon as={RiMoneyDollarCircleFill} w={8} h={8} color='blue.500' />
                            <div className='flex-col ml-5' style={{ color: colors.font }}>
                                <p className='text-xl font-bold'>Stipend</p>
                                <p>{`${data.message.stipend}/Month`}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex-col h-fit p-1 mt-2 rounded-lg w-full mx-auto py-2' style={{ backgroundColor: colors.secondary2, color: colors.font }}>
                        <p className='font-bold text-xl text-center w-full'>Eligibility</p>
                        <div className='w-[100%] h-0.5 justify-center items-center mt-0.5' style={{ backgroundColor: colors.font }}></div>
                        <div className='flex flex-wrap mt-2 text-lg px-3 py-1' style={{ color: colors.font }}>
                            <p>Engineering</p>
                            <p className='ml-1 font-extrabold mr-1'>|</p>
                            <p>MBA Students</p>
                            <p className='ml-1 font-extrabold mr-1'>|</p>
                            <p>Undergraduate</p>
                            <p className='ml-1 font-extrabold mr-1'>|</p>
                            <p>Postgraduate</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Internshipdetails;