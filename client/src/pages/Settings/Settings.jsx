import React, { useState, useMemo, useRef, useEffect } from 'react'
import styles from "./Settings.module.css"
import { Input, Button, Text, useToast } from '@chakra-ui/react'
import { useTheme } from "../../Global/ThemeContext"
import showToast from "../../Global/Toast"
import axios from 'axios'
import { url } from '../../Global/URL'
import { useDropzone } from 'react-dropzone'
import { isAuthenticated, getUserDetails } from '../../Global/authUtils';
import Loader from '../../components/loader/Loader';
// import ProgressBar from 'axios-progress-bar';

// ProgressBar.axios(axios);



const Settings = (props) => {


  const { theme: colors } = useTheme();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast();
  const buttonRef = useRef();
  const [progress, setProgress] = useState(false);
  const [saving, setSaving] = useState(false);

  const [_id, setId] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);


  const initialSetup = async () => {
    buttonRef.current.disabled = true;
    try {
      if (isAuthenticated()) {
        var userDetails;
        try {
          userDetails = await getUserDetails();
          console.log(userDetails);
          setName(userDetails.name);
          setDob(userDetails.dob);
          setContactNo(userDetails.contact_no);
          setEmail(userDetails.email);
          setId(userDetails._id);
          buttonRef.current.disabled = false;

        } catch (error) {
          showToast(toast, "Error", 'error', "User not Authenticated");
        }

      }
      else {
        showToast(toast, "Error", 'error', "You Should Login to Apply !");
        buttonRef.current.disabled = false;
        return;
      }
    } catch (error) {
      console.log(error)
      showToast(toast, "Error", 'error', JSON.stringify(error.response));
      await initialSetup();
      buttonRef.current.disabled = false;
    }
  }


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
    accept: { 'pdf': ['application/pdf'] },
    reject: { 'image': ['.png', '.jpeg', '.txt', '.html'] },
    maxFiles: 1
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


  const submit = async () => {

    const formData = new FormData();

    const cloudinaryURL = "https://api.cloudinary.com/v1_1/dutetj1yh/auto/upload?upload_preset=pfab3xyd";

    try {
      setFile(acceptedFiles[0]);
      console.log(acceptedFiles[0]);
      formData.append('file', acceptedFiles[0]);
      var response = false;
      try {
        // response = await axios.post(cloudinaryURL, formData, 
        //   {
        //   onUploadProgress: (progressEvent) => {
        //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //     setProgress(percentCompleted);
        //   },
        // }
        // );
        // response = await axios.post(cloudinaryURL, formData);
        response = await fetch(cloudinaryURL, {
          method: 'POST',
          body: formData,
        });

      } catch (error) {
        console.log(error);
      }


      if (response.ok) {
        const result = await response.json();
        const imageUrl = result.secure_url;
        console.log("162: ", imageUrl);
        return JSON.stringify(imageUrl);
      } else {
        console.error('Upload failed:', response);
        return false;
      }
    } catch (error) {
      console.error('Upload failed:', error);
      return false;
    }
  }

  const handleSubmit = async () => {
    setSaving(true);
    setFile(acceptedFiles[0]);

    const fileURL = await submit();
    console.log("INSIDE Handlesubmit =  ", fileURL);

    if (fileURL || !fileURL) {
      console.log(fileURL);
      try {
        let data;
        if (!file) {
          data = { _id: _id.$oid, name, email, contact_no: contactNo, dob, resume: fileURL };
        } else {
          data = { _id: _id.$oid, name, email, contact_no: contactNo, dob }
        }
        console.log(data);

        console.log("Data = ", data);
        const response = await axios.post(url + '/user/update/profile', data);
        console.log(response)
        if (response.data.success) {
          showToast(toast, "Success", 'success', response.data.message);
        } else {
          showToast(toast, "Error", 'error', response.data.message);
        }
      } catch (error) {
        console.log(error)
        // showToast(toast, "Error", 'error', error.response.data.message);
      }
    } else {
      console.log("NO FILE URL")
    }
    setSaving(false);
  }

  useEffect(() => {
    initialSetup();
  }, []);

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
                    rounded: 'md', bg: colors.font, color: colors.secondary
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className={styles.field}>
                <Input variant={'outline'} placeholder='Email' color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired type='email'
                  _focus={{
                    rounded: 'md', bg: colors.font, color: colors.secondary
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className={styles.field}>
                <Input variant={'outline'} placeholder='Contact no.' color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired type='tel'
                  _focus={{
                    rounded: 'md', bg: colors.font, color: colors.secondary
                  }}
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)} />
              </div>
              <div className={styles.field}>
                <Text mr={'10px'} ml={'10px'} color={colors.font}>DOB: </Text>
                <Input variant={'outline'} placeholder='DOB' color={colors.font} border={colors.primary} focusBorderColor={colors.primary} pl={'10px'} isRequired type='datetime-local'
                  _focus={{
                    rounded: 'md', bg: colors.font, color: colors.secondary
                  }}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)} />
              </div>

              <div className={styles.field} style={{ flexDirection: 'column' }}>
                {
                  (progress === 100) && <p style={{ color: 'yellowgreen' }}>Uploaded</p>
                }
                {progress &&
                  <span style={{ borderRadius: '10px', display: 'block', width: '100%', minHeight: '10px', backgroundColor: colors.primary }}></span>
                }
              </div>

              <div className={styles.field}>
                <section className="container">
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    {isDragAccept && (<p style={{ color: 'green' }}>Drop to Add File</p>)}
                    {isDragReject && (<div><p className='text-red-500'>Only .pdf file accepted</p></div>)}
                    {!isDragActive && (<p style={{ color: colors.primary }}>Drop some files here ...</p>)}
                  </div>
                  <aside>
                    <ul style={{ color: colors.primary, marginTop: 3 }}>{acceptedFileItems}</ul>

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
                ref={buttonRef}
              >SAVE</Button>
            </div>

          </div>
        </div>

      </div>

      { saving ? <Loader />
      :
      <p>Saved</p>
    }
    </>
  )
}

export default Settings;
