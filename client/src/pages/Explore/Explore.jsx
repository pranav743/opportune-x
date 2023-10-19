import React, { useRef, useState } from 'react';
import axios from 'axios';

const ExplorePage = () => {
  const [myImage, setMyImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [data, setData] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const getPrediction = async () => {
    try {
      const formData = new FormData();
      formData.append('image', myImage);

      const options = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const url = 'http://localhost:5001/predict';
      const res = await axios.post(url, formData, options);
      console.log(res);
      setData(res.data);

      // Handle response data here
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setMyImage(file);

    // Display image preview for image files
    if (file && file.type.startsWith('image/')) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview('');
    }
  };


  return (
    <div>
      <p style={{ textAlign: 'center', margin: '10px 0', height: 'auto', color: 'darkgreen', fontWeight: 'bold' }}>Upload image of the correct Plant to get Prediction</p>
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <img src={imagePreview} alt="UPLOAD IMAGE" style={{ minHeight: '200px', minWidth: '200px',maxHeight: '200px', maxWidth: '200px', boxShadow: '0 0 15px #555', borderRadius: '10px', margin: '10px' }} />
      <button onClick={handleButtonClick} style={{backgroundColor: "white", padding: '5px 20px', letterSpacing: '1px', boxShadow: '0 0 5px #000', margin: '10px 15px 0px 15px', width: '80%', fontWeight: 'bold', border: 'solid 0.5px black'}}>
        Click Here to upload Image
      </button>
      <input
        type="file"
        // accept="image/*"
        id="fileInput"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*;capture=camera"
      />
      </div>
      
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <button onClick={getPrediction} style={{ backgroundColor: "black", padding: '5px 20px', letterSpacing: '1px', boxShadow: '0 0 5px #000', margin: '10px 15px 20px 15px', width: '80%', color: 'white', fontWeight: 'bold' }}>Predict</button>
      </div>

      { (data && !data.error) &&

      <div style={{width: '80vw', marginLeft: '10vw', padding: '15px 10px 15px 15px', display: 'flex', flexDirection: 'column', backgroundColor: 'lightblue', borderRadius: '15px', boxShadow: '0 0 20px black', marginBottom: '5px'}}>

        <div style={{height: 'auto', padding: '5px 2px', color: 'darkred', fontSize: '17px', fontWeight: 'bold'}}>{data.disease_name}</div>
        <div style={{height: 'auto', padding: '5px 2px', color: 'black', fontSize: '15px'}}>{data.description}</div>

        <div style={{height: 'auto', padding: '5px 2px', color: 'darkred', fontSize: '16px'}}>Pesticides :</div>
        <div style={{height: 'auto', padding: '5px 2px', color: 'black', fontSize: '15px'}}>
          <ul style={{marginLeft: '15px'}}>
          {data.pesticides.map((pesticide, index)=>(
                <li key={index}>{pesticide}</li>
            ))}
          </ul>
        </div>

        <div style={{height: 'auto', padding: '5px 2px', color: 'darkred', fontSize: '16px'}}>Preventive Measures :</div>
        <div style={{height: 'auto', padding: '5px 2px', color: 'black', fontSize: '15px'}}>
          <ul style={{marginLeft: '15px'}}>
            {data.prevention.map((prevention, index)=>(
                <li key={index}>{prevention}</li>
            ))}
          
          </ul>
        </div>
          
      </div>

      }
      <div><p style={{textAlign: 'center', color: 'red', margin: '15px 10px'}}>These Predictions are not 100% accurate</p></div>
    </div>
  );
};

export default ExplorePage;
