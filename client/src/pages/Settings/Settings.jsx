import React, {useState,useMemo} from 'react'
import styles from "./Settings.module.css"
import { Input, Button, Text, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { colors } from '../../Global/colors'
import { useTheme } from "../../Global/ThemeContext"
import showToast from "../../Global/Toast"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { url } from '../../Global/URL'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { progress } from 'framer-motion'
import {Cloudinary} from "@cloudinary/url-gen";




const Settings = (props) => {

  const { theme: colors} = useTheme();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [file,setFile]=useState(null);
  
  
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: colors.primary,
  borderStyle: 'dashed',
  backgroundColor: colors.secondaryColor,
  color: colors.primary,
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {'pdf':['.pdf']},
    reject:{'image':['.png','.jpeg','.txt','.html']},
    maxFiles:1
  });


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);


  const acceptedFileItems = acceptedFiles.map(file => {
    return (
      <li className='text-blue-400' key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });


  const submit = async ()=>{

    const formData= new FormData();
    formData.append('file',file);

    const cloudinaryURL = "https://api.cloudinary.com/v1_1/dutetj1yh/auto/upload?upload_preset=pfab3xyd";

        try {
            setFile(acceptedFiles[0]);
            console.log(file)
            const response = await fetch(cloudinaryURL, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            const imageUrl = result.secure_url;
            console.log('Image URL:', imageUrl);
        } else {
            console.error('Upload failed:', response.status);
        }
        } catch (error) {
          console.error('Upload failed:', error);
        }
  }

  const handleSubmit = async () => {

    setFile(acceptedFiles[0]);
    console.log(file)

    if(!file){
       console.log("NO FILE SELECTED");
       return;
    }else{
        submit();
    }
}

  return (
    <>
    <div style={{ width: '100%', minHeight: 'calc(100vh - 90px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className={styles.container}>
            <p className={styles.signUpHeading}>Edit Profile</p>
            <div className={styles.form}>
              <div className={styles.fields}>
                <div className={styles.field}>
                  <Input variant={'outline'} placeholder='Name' color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired 
                  _focus={{
                     rounded:'md', bg:colors.font, color: colors.secondary
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={styles.field}>
                  <Input variant={'outline'} placeholder='Email' color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired type='email'
                  _focus={{
                     rounded:'md', bg:colors.font, color: colors.secondary
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.field}>
                  <Input variant={'outline'} placeholder='Contact no.' color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired type='tel' 
                  _focus={{
                     rounded:'md', bg: colors.font, color: colors.secondary
                  }}
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}/>
                </div>
                <div className={styles.field}>
                  <Text mr={'10px'} ml={'10px'} color={colors.font}>DOB: </Text>
                  <Input variant={'outline'} placeholder='DOB' color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired type='datetime-local' 
                  _focus={{
                     rounded:'md', bg: colors.font, color: colors.secondary
                  }}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}/>
                </div>

                <div className={styles.field}>
                <InputGroup size='md'>
                <Input variant={'outline'} color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired 
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    _focus={{
                      rounded:'md', bg: colors.font, color: colors.secondary
                   }}
                   value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick} bg={colors.secondary2} color={colors.font}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                </div>

                {/* Resume Upload */}

                <div className={styles.field}>
                    <section className="container">
                      <div {...getRootProps({style})}>
                          <input {...getInputProps()} />
                          {isDragAccept && (<p style={{color:'green'}}>Drop to Add File</p>)}
                          {isDragReject && (<div><p className='text-red-500'>Only .pdf file accepted</p></div>)}
                          {!isDragActive && (<p style={{color:colors.primary}}>Drop some files here ...</p>)}
                    </div>
                    <aside>
                         <ul style={{color:colors.primary,marginTop:3}}>{acceptedFileItems}</ul>

                    </aside>
                    </section>

                </div>

                
              </div>

              <div className={styles.buttons}>
                <Button variant={'outline'} borderColor={colors.primary} bg={colors.secondary} color={colors.font} _hover={
                  {
                    bg: colors.primary,
                    color: colors.secondary
                  }
                }

                onClick={handleSubmit}
                >SAVE</Button>
              </div>
              
            </div>
          </div>
        
    </div>

    </>
  )
}

export default Settings;
