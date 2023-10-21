import React, { useRef, useState } from 'react';
import axios from 'axios';
import styles from "./Internships.module.css"
import { Input, Button, Text, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { useTheme } from '../../../Global/ThemeContext';


const Internships = () => {
const { theme: colors} = useTheme();
 return (
    <div className={styles.container}>
        <h1 style={{color: colors.primary}}>Hello, this is internships page</h1>
    </div>
 )
};

export default Internships;
