import React, {useState} from 'react'
import styles from "./SignUp.module.css"
import { Input, Button, Text, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { colors } from '../../Global/colors'
import { useTheme } from "../../Global/ThemeContext"
import showToast from "../../Global/Toast"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { url } from '../../Global/URL'



const SignUp = () => {
  const { theme: colors} = useTheme();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');

  // const {isError, isLoading, data} = useQuery({
  //   queryKey: ['/route1'],
  //   queryFn: ()=> {
  //     let temp = axios.post(url + '/register', {email, password}).then(response=>response.data);
  //     if (temp.success){
  //       showToast(toast, "Success", 'success', temp.message);
  //     }
  //     else{
  //       showToast(toast, "Error", 'error', temp.message);
  //     }
  //     return temp;
  //   }
  // })

  const handleSignUp = async () => {
    // showToast(toast, "Success", 'success', "Signed Up");
    console.log(name, email, contactNo, dob, password);
    try {
      let temp = await axios.post(url + '/register', {email, password, name, contact_no: contactNo, dob}).then(response=>response.data);
      console.log(temp);
        if (temp.success){
          showToast(toast, "Success", 'success', temp.message);
          window.location = '/'
        }
        else{
          showToast(toast, "Error", 'error', temp.message);
        }
        return temp;
    } catch (error) {
      console.log(error.response.data.message)
      showToast(toast, "Error", 'error', error.response.data.message);
    }
  }

  return (
    <>
    <div style={{ width: '100%', minHeight: 'calc(100vh - 90px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className={styles.container}>
            <p className={styles.signUpHeading}>Sign Up</p>
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
                
              </div>
              <div className={styles.buttons}>
                <Button variant={'outline'} borderColor={colors.primary} bg={colors.secondary} color={colors.font} _hover={
                  {
                    bg: colors.primary,
                    color: colors.secondary
                  }
                }
                onClick={handleSignUp}
                >Sign Up</Button>
              </div>
              
            </div>
          </div>
        
    </div>

    </>
  )
}

export default SignUp;
