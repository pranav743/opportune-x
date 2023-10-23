import React, {useState} from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    useToast
  } from '@chakra-ui/react';
  import { useTheme } from '../../Global/ThemeContext';
  import axios from 'axios';
  import showToast from "../../Global/Toast";
  import { url } from '../../Global/URL';
  import { setAuthToken } from '../../Global/authUtils';

function LoginModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {theme: colors} = useTheme();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show);
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = (email) => {
      // Add your email validation logic here
      // You can use regular expressions or any other method
      return /\S+@\S+\.\S+/.test(email);
    };
    const handleEmailChange = (e) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
    };
    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
    }

    const logIn = async () => {

      if (!isValidEmail(email)) {
        showToast(toast, "Error", 'error', "Invalid Email address");
        return
      }
      try {
        var data = await axios.post(url + '/login', {email, password});
        if (!data.data.token){
          showToast(toast, "Error", 'error', data.data.message);
        }
        else{
          data = data.data;
          setAuthToken(data.token);
          showToast(toast, "Success", 'success', "Logged In !");
          window.location = "/";
        }
      } catch (error) {

        if (error.response.status === 404){
          showToast(toast, "Error", 'error', error.response.data.message);
        } else if (error.response.status === 401){
          showToast(toast, "Error", 'error', error.response.data.message);
        } 
        else{
          showToast(toast, "Error", 'error', error.message);
        }
      }

    }

    return (
      <>
        <button onClick={onOpen} style={{
            height: '37px',
            width: '70px',
            marginRight: '10px',
            backgroundColor: colors.secondary,
            border: 'none',
            color: colors.font,
            fontSize: '17px',
            cursor: 'pointer',
            fontFamily: 'Titillium Web, sans-serif'
        }}>Login</button>
        
        {/* <Button onClick={onOpen}>Open Modal</Button> */}
  
        <Modal isOpen={isOpen} onClose={onClose}>
            
          <ModalOverlay/>
          <ModalContent boxShadow={`0 0px 15px ${colors.primary}`} bg={colors.secondary} style={{borderRadius: '5px', overflow: 'hidden'}}>
            <ModalHeader bg={colors.secondary} color={colors.font}>Login to your Account</ModalHeader>
            <ModalCloseButton color={colors.font}/>
            <ModalBody bg={colors.secondary} color={colors.font}>
            <Stack spacing={8}>
            <Input variant={'outline'} placeholder='Email' color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired type='email'
                  _focus={{
                     rounded:'md', bg:colors.font, color: colors.secondary
                  }}
                  value={email}
                  onChange={handleEmailChange}
                  />
            <InputGroup size='md'>
                
                <Input variant={'outline'} color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired 
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    _focus={{
                      rounded:'md', bg: colors.font, color: colors.secondary
                   }}
                   value={password}
                    onChange={handlePasswordChange}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick} bg={colors.secondary2} color={colors.font}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                </Stack>
            </ModalBody>

            <p style={{textAlign: 'right', color: colors.primary, margin: '10px 40px 0 40px', cursor: 'pointer'}}>Forgot your Password ?</p>
  
            <ModalFooter bg={colors.secondary} mt={1}>
              
              <Button variant={'outline'} borderColor={colors.primary} bg={colors.secondary} color={colors.font} _hover={
                  {
                    bg: colors.primary,
                    color: colors.secondary
                  }
                }
                mr={3}
                onClick={() => {
                  logIn();
                  return onclose;
                } }
                >Sign In</Button>
             
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default LoginModal;