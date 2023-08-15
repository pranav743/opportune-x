import React from 'react'

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
    Stack
  } from '@chakra-ui/react';
  import { useTheme } from '../../Global/ThemeContext';

function LoginModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {theme: colors} = useTheme();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
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
                  }}/>
            <InputGroup size='md'>
                
                <Input variant={'outline'} color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired 
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    _focus={{
                      rounded:'md', bg: colors.font, color: colors.secondary
                   }}
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
                onClick={onClose}
                >Sign In</Button>
             
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default LoginModal;