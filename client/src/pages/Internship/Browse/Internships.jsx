import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Internships.module.css"
import { Input, Spinner } from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useTheme } from '../../../Global/ThemeContext';
import { SearchIcon } from '@chakra-ui/icons';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/loader/Loader';
import { Helmet } from 'react-helmet';


const Internships = () => {
    const { theme: colors } = useTheme();
    const { isError, isLoading, data } = useQuery({
        queryKey: ['/route1'],
    })

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
                <Helmet>
                    <title>Opportune-x | Explore and Apply for Internships</title>
                    <meta name="description" content="Explore available internships on Opportune-x and apply for the best opportunities for your career." />
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://opportune-x-frontend.vercel.app/internships/browse" hreflang="en"/>
                </Helmet>


                <h1 style={{ color: colors.font, fontSize: '25px', opacity: '0.9', fontFamily: 'Belanosima', marginBottom: '20px', textAlign: 'center' }}>Find Internships</h1>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '4vw' }}>

                    <span style={{ display: 'flex', height: '40px', width: '40px', border: `solid 1px ${colors.font}`, margin: '0 10px', borderRadius: '7px', alignItems: 'center', justifyContent: 'center' }}>
                        <SearchIcon w={5} h={5} color={colors.font} />
                    </span>

                    <Input variant={'outline'} placeholder='Search...' color={colors.font} border={colors.primary} width={250} focusBorderColor={colors.primary} pl={'10px'} isRequired
                        _focus={{
                            rounded: 'md', bg: colors.font, color: colors.secondary
                        }}
                        sx={{ border: `solid 1px ${colors.font}` }}
                    />
                </div>
                <div style={{ height: '25px' }}></div>

                <div style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                    {
                        data && data.map((internship, index) => (
                            <Card title={internship.title} description={internship.description} _id={internship._id} key={index} image={internship.image} />
                        ))
                    }

                </div>

            </div>
        )
    };
}

export default Internships;
