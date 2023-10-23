import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Courses.module.css"
import { Input, Spinner } from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useTheme } from '../../../Global/ThemeContext';
import { SearchIcon } from '@chakra-ui/icons';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/loader/Loader';
import { url } from '../../../Global/URL';



const Courses = () => {
    const { theme: colors } = useTheme();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef();



    const { isError, isLoading, data } = useQuery({
        queryKey: ['/courses/all'],
        retry: true
    })

    const getSearchResults = async (val) => {
        try {
            const data = await axios.get(url + '/courses/search/' + val);
            let results = data.data.message;
            if (Array.isArray(results)) {
                setSearchResults(results);
            } else {
                setSearchResults([])
            }
        } catch (error) {
            setSearchResults([])
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (search === '') {
                setSearchResults([]);
            }
            console.log(searchResults);
        }, 1500);

        return () => {
            clearInterval(intervalId);
        };
    }, [search]);


    if (isError) {
        return (
            <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: colors.font, fontSize: '22px', fontWeight: 'bold', letterSpacing: '1px' }}>Something went Wrong :(</h1>
            </div>
        );
    } else if (isLoading) {
        return (
            <div style={{ height: '80vh', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                <Loader />
            </div>
        );
    }
    else {
        return (

            <div className={styles.container}>

                <h1 style={{ color: colors.font, fontSize: '25px', opacity: '0.9', fontFamily: 'Belanosima', marginBottom: '20px', textAlign: 'center' }}>Courses</h1>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '4vw', position: 'relative' }}>

                    <span style={{ display: 'flex', height: '40px', width: '40px', border: `solid 1px ${colors.font}`, margin: '0 10px', borderRadius: '7px', alignItems: 'center', justifyContent: 'center' }}>
                        <SearchIcon w={5} h={5} color={colors.font} />
                    </span>

                    <Input variant={'outline'} placeholder='Search...' color={colors.font} border={colors.primary} width={250} focusBorderColor={colors.primary} pl={'10px'} isRequired
                        _focus={{
                            rounded: 'md', bg: colors.font, color: colors.secondary
                        }}
                        sx={{ border: `solid 1px ${colors.font}` }} ref={searchRef}
                        value={search} onInput={(e) => { getSearchResults(e.target.value); return setSearch(e.target.value); }}
                    />



                    <span style={{ display: 'flex', backgroundColor: colors.font, width: '250px', height: 'auto', flexDirection: 'column', position: 'absolute', top: '42px', zIndex: 1, borderRadius: '5px', maxHeight: '300px', overflowY: 'auto' }}>
                        {
                            searchResults && searchResults.map((result, index) => (
                                <div style={{ height: '40px', width: '250px', display: 'flex', alignItems: 'center' }}>
                                    <p className={styles.searchResult} key={index}>
                                        {result.length > 28 ? result.substring(0, 28) + '...' : result}
                                    </p>
                                </div>
                            ))
                        }
                    </span>


                </div>
                <div style={{ height: '25px' }}></div>

                <div style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                    {
                        data && data.map((course, index) => (
                            <Card courseTitle={course.courseTitle} category={course.category} description={course.description} rating={course.rating} image={course.image} fee={course.fee} durationInWeeks={course.durationInWeeks} subject={course.subject} _id={course._id.$oid} />
                        ))
                    }

                </div>

            </div>
        )
    };
}

export default Courses;
