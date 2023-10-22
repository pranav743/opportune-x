import React from 'react';
import { useTheme } from '../../../Global/ThemeContext';
import styles from "./Card.module.css";

const Card = (props) => {
    var {courseTitle, category, description, rating, image, fee, durationInWeeks, subject} = props;
    const { theme: colors} = useTheme();

    const viewDetails = () => {

        // window.location = `internships/browse/${_id}`;
        console.log("CLICKED")

    }


  return (


    <div className='appear' style={{width: '350px', height: 'auto', padding: '15px', backgroundColor: colors.secondary, boxShadow: `2.5px 5px 7.5px ${colors.hover}` , margin: '15px', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer'}}>

       <div style={{height: '150px', width: '100%', borderRadius: '15px', overflow: 'hidden'}}>
        <img src={image} alt="Not FOund" style={{height: '100%', width: '100%'}}/>
       </div>
       <div style={{padding: '10px', display: 'flex', width: '100%'}}>
        <h1 style={{color: colors.font, fontWeight: 'bold', fontSize: '20px', textAlign: 'left', width: '100%'}}>{courseTitle}</h1>
       </div>
       <div style={{width: '100%', display: 'flex'}}>
       <p style={{color: colors.hover, width: '60%', textAlign: 'left', fontWeight: 'bold', paddingLeft: '10px'}}>{subject}</p>

        <p style={{color: colors.accent, width: '40%', textAlign: 'right', fontStyle: 'italic', fontWeight: 'bold'}}>{durationInWeeks} Weeks</p>
       </div>

      
    </div>
  )
}

export default Card;
