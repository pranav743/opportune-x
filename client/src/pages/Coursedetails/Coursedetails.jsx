import React from 'react';
import { useToast } from '@chakra-ui/react';
import { useTheme } from '../../Global/ThemeContext';

import {
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'

import { Icon } from '@chakra-ui/react'
import { MdCheckCircle, MdOutlineAssignmentTurnedIn } from 'react-icons/md'
import {AiOutlineMobile, AiOutlineTrophy } from 'react-icons/ai'
import { IoIosAlarm } from 'react-icons/io'
import { HiDownload, HiOutlineNewspaper } from 'react-icons/hi'
import { BiVideo } from 'react-icons/bi'
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars'
import meta from './meta.png';
import microsoft from './microsoft.png'
import apple from './apple-logo.png'
import search from './search.png'
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/loader/Loader';


const Coursedetails = () => {

    const { id } = useParams();

    const { theme: colors } = useTheme();
    const toast = useToast();

    const { isError, isLoading, data } = useQuery({
        queryKey: [`/courses/${id}`],
    });

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
        <div className='mx-auto sm:w-[100%] w-[100%]' style={{ height: 'fit', padding: '15px', backgroundColor: colors.secondary2, boxShadow: `2.5px 5px 7.5px ${colors.hover}`, marginTop: '0', borderRadius: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className='flex w-[100%]'>
                <div className='flex-col w-[70%]'>
                    <div className='w-[100%] h-fit p-8 rounded-md leading-8 mt-3 ' style={{ backgroundColor: colors.secondary, color: colors.font }}>
                        <div className='font-extrabold text-5xl'>{data.message.courseTitle}</div>
                        <div className='font-bold'>{data.message.description}</div>
                        <div className='flex items-center'><div className='font-semibold text-md mr-5'>Highest Rated</div><ReactStars count={5} value={data.message.rating} half={true} size={20} edit={false} /><div className='font-semibold text-md ml-5'>({(data.message.maxStudents)*10})</div></div>
                        <div className='font-semibold text-md mr-5'>Created by TIA Education,{data.message.instructor}</div>
                        <div className='font-semibold text-md mr-5'><span>Last updated :10/2023</span><span className='ml-5'>English</span><span className='ml-5'>English [Auto]</span></div>
                    </div>

                    <div className='h-fit w-[100%] rounded-lg p-5 mt-4' style={{ backgroundColor: colors.secondary, color: colors.font }}>

                        <div className='rounded-md flex-col p-5' style={{ backgroundColor: colors.secondary2, color: colors.font }}>
                            <p className='text-center font-extrabold text-3xl p-2 mb-2'>What You Will Learn</p>
                            <div className='flex justify-around font-bold'>
                                <List spacing={3} className=''>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        Build GUIs and Desktop applications with Python
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        You will learn automation, game, app and web development, and machine learning.
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        You will learn Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib.
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        Be able to build fully fledged websites and web apps with Python
                                    </ListItem>
                                </List>

                                <List spacing={3} className=''>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        You will master the Python programming by building 100 unique projects over 100 days.
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        You will be able to program in Python professionally
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        Create a portfolio of 100 Python projects to apply for developer jobs
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        Be able to use Python for data science and machine learning
                                    </ListItem>
                                </List>

                            </div>
                        </div>

                        <div className='rounded-lg flex-col mt-5 p-5' style={{ backgroundColor: colors.secondary2, color: colors.font }}>
                            <p className='text-center font-extrabold text-3xl p-2 ' style={{ color: colors.font2 }}>Perks</p>
                            <div className='flex justify-around text-xl font-bold' >
                                <List spacing={3}>
                                    <ListItem>
                                        <ListIcon as={BiVideo} color='green.500' />
                                        54 hours on-demand video
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdOutlineAssignmentTurnedIn} color='green.500' />
                                        Assignments
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={HiOutlineNewspaper} color='green.500' />
                                        221 articles
                                    </ListItem>

                                </List>

                                <List spacing={3}>
                                    <ListItem>
                                        <ListIcon as={HiDownload} color='green.500' />
                                        154 downloadable resources
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={AiOutlineMobile} color='green.500' />
                                        Access on mobile and TV
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={AiOutlineTrophy} color='green.500' />
                                        Certificate of completion
                                    </ListItem>

                                </List>

                            </div>
                        </div>

                        <div className='rounded-md flex-col mt-5 p-2' style={{ backgroundColor: colors.secondary2, color: colors.font }}>
                            <p className='text-center font-bold text-3xl mb-8 mt-3'>Top Companies Offer This Course To Their Employees</p>
                            <div className='flex justify-around p-2'>
                                <img src={meta} className='w-[55px] rounded-lg' />
                                <img src={search} className='w-[55px] rounded-lg' />
                                <img src={microsoft} className='w-[55px] rounded-lg' />
                                <img src={apple} className='w-[55px] rounded-lg' />
                            </div>
                        </div>


                        <div className='rounded-md flex-col mt-5 p-3' style={{ backgroundColor: colors.secondary2, color: colors.font }}>
                            <p className=' p-2 text-center font-bold text-3xl'>Course Details</p>
                            <div className='flex-col justify-around p-2 ' >
                                <div className='px-2 py-3 font-bold text-center text-2xl rounded-lg  my-2' style={{ backgroundColor: colors.secondary, color: colors.font }}> WEEK 1 : {data.message.syllabus[0]}</div>
                                <div className='px-2 py-3 font-bold text-center text-2xl rounded-lg  my-2' style={{ backgroundColor: colors.secondary, color: colors.font }}> WEEk 2 : {data.message.syllabus[1]}</div>
                                <div className='px-2 py-3 font-bold text-center text-2xl rounded-lg my-2' style={{ backgroundColor: colors.secondary, color: colors.font }}>  WEEk 3 : {data.message.syllabus[2]}</div>
                                <div className='px-2 py-3 font-bold text-center text-2xl rounded-lg  my-2' style={{ backgroundColor: colors.secondary, color: colors.font }}> WEEK 4 : {data.message.syllabus[3]}</div>
                                <div className='px-2 py-3 font-bold text-center text-2xl rounded-lg  my-2' style={{ backgroundColor: colors.secondary, color: colors.font }}> WEEK 5 : {data.message.syllabus[4]}</div>

                            </div>
                        </div>

                        <div className='rounded-md flex-col mt-5 p-3' style={{ backgroundColor: colors.secondary2, color: colors.font }}>
                            <p className=' text-center font-bold text-3xl'>Requirements</p>
                            <div className='flex-col  justify-around p-2'>
                                <List spacing={3} className='font-semibold text-xl'>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        No programming experience needed - I'll teach you everything you need to know
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        A Mac or PC computer with access to the internet
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        No paid software required - I'll teach you how to use PyCharm, Jupyter Notebooks and Google Colab
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        I'll walk you through, step-by-step how to get all the software installed and set up
                                    </ListItem>

                                </List>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='w-[30%]'>
                    <div className='h-max p-3 z-0 w-fit fixed flex flex-col items-end '>
                        <div className='w-fit h-fit rounded-lg p-2 justify-center items-center'>
                            <img src={data.message.image} className='w-[100%] rounded-lg h-[250px] mr-9' />
                        </div>

                        <div className='w-[100%] h-fit rounded-lg mt-1 ' style={{ backgroundColor: colors.secondary, color: colors.font }}>
                            <div className='text-xl p-2 font-bold flex-col justify-center items-center'>
                                <span className='mr-5 text-4xl ml-8'>$13.66</span><s>${data.message.fee}</s><span className='text-green-400 ml-5'>86% off</span>
                                <div className='flex ml-6 mt-1 px-2 text-red-600 text-lg items-center font-thin'><Icon as={IoIosAlarm} w={5} h={5} color='red.400' /><span className='font-bold mx-2'>2 days</span> at this price!!</div>
                                <div className='bg-green-400 w-[80%] ml-8 p-3 text-center rounded-lg text-white mt-4 hover:cursor-pointer hover:bg-green-700'>BUY</div>
                                <div className='text-base mt-4  w-full text-center'>30-Day Money-Back Guarantee</div>
                                <div className='text-base mt-1  w-full text-center'>Full Lifetime Access</div>
                                <div className='text-lg mt-1  w-full text-center flex flex-row items-center px-5 font-bold' > <hr className='w-full' style={{ border: `1px solid ${colors.font}` }} /><span className='font-bold text-lg mx-1'>OR</span><hr className='w-full' style={{ border: `1px solid ${colors.font}` }} /></div>
                                <div className='text-2xl mt-1 w-full text-center font-bold'>Subscribe to Oppotune’s top courses</div>
                                <div className='text-base mt-1  text-gray-500 w-full text-center'>Get this course, plus 10,500+ of our top-rated courses, with Personal Plan.</div>
                                <div className='bg-blue-400 w-[80%] ml-8 p-3 text-center rounded-lg text-white mt-4 mb-2 hover:cursor-pointer hover:bg-blue-700'>Subscribe</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Coursedetails;