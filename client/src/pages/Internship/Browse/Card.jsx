import React from 'react';
import { useTheme } from '../../../Global/ThemeContext';
import styles from "./Card.module.css";

const Card = (props) => {
    var {title, description, _id} = props;
    const { theme: colors} = useTheme();

    const viewDetails = () => {

        window.locaion = `internships/browse/${_id}`;

    }


  return (


    <div className='appear' style={{width: '350px', height: 'auto', padding: '15px', backgroundColor: colors.secondary, boxShadow: `2.5px 5px 7.5px ${colors.hover}` , margin: '15px', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <div style={{ width: '100%', fontSize: '20px', fontWeight: 'bold', position: 'relative', display: 'flex' }}>
          <p style={{color: colors.font, width: '60%', fontWeight: 'bold'}}>{title}</p>
          <div style={{width: '40%', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 15px'}}>

            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D" class="img-fluid rounded-top" alt="Not found" style={{borderRadius: '20px', transform: 'translateX(15px)'}} />

          </div>
        </div>
        
        <div style={{marginTop: '10px', display: 'flex'}}>
            <p style={{color: colors.font}}>{description}</p>
        </div>

        <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '15px'}}>
            <button className={styles.applyBtn}> View Details</button>
        </div>

      
    </div>
  )
}

export default Card;
