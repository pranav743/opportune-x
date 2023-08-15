import React, { useState, useEffect } from 'react';
import styles from "./Navbar.module.css";
import {Link} from 'react-router-dom';
import sidebarStyles from "../sidebar/SideBar.module.css";
import { FaHome, FaRocket, FaSignOutAlt, FaThLarge, FaTimes, FaSun, FaStream } from 'react-icons/fa';
import { setAuthToken, isAuthenticated, getUserDetails } from '../../Global/authUtils';
import { useTheme } from '../../Global/ThemeContext';
import LoginModal from '../../pages/Login/LoginModal';


const Navbar = () => {
  const isLoggedIn = isAuthenticated();
  const [menu, setMenu] = useState(window.innerWidth < 700);
  const [showMenu, setShowMenu] = useState(false) ;
  const { theme: colors, toggleTheme } = useTheme();
  const [smallNav, setSmallNav] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setMenu(window.innerWidth < 700);
      setShowMenu(window.innerWidth > 700)
      setSmallNav(window.innerWidth < 900)
    
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const options = [
    {
      name: "Internships",
      link: false
    },
    {
      name: "Contact us",
      link: false
    },
    {
      name: "Subscribe",
      link: false
    }
  ]

  const sideBarOptions = [
    {
        icon: <FaHome/>,
        name: "Home",
        link: "/"
    },
    {
        icon: <FaRocket/>,
        name: "Explore",
        link: "/explore"
    },
    {
        icon: <FaThLarge/>,
        name: "Application",
        link: "/application"
    },
   
    
  ]
  return (
    <>
    {
      (showMenu && menu && isLoggedIn)  &&
      <div className={styles.blurDiv} style={{position: 'fixed', height: 'calc(100vh - 90px)', width: '100vw', zIndex: 6}} onClick = {()=>{setShowMenu(false)}}>

        <div style={{width: '250px', backgroundColor: colors.secondary, height: '100%', boxShadow: '0 0 1px #eee', display: 'flex', justifyContent: 'center', padding: '10px'}}>

        <div className={sidebarStyles.subContainer} style={{marginTop: '0px', padding: '0px'}}>
                {
                    sideBarOptions.map((element, index) => (
                        <Link to={element.link} key={index} style={{textDecoration: 'none'}}>
                            <div className={sidebarStyles.listItem}>
                                <span className={sidebarStyles.iconContainer}>{element.icon}</span>
                                {element.name}
                            </div>
                        </Link>
                        
                    ))
                    
                }
                <div className={sidebarStyles.listItem} onClick={toggleTheme}>
                    <span className={sidebarStyles.iconContainer}><FaSun/></span>
                    Change Theme
                </div>
                <div className={sidebarStyles.listItem}>
                    <span className={sidebarStyles.iconContainer}><FaSignOutAlt/></span>
                    Logout
                </div>
            </div>
          
        </div>
      
      </div>
    }
    <div style={{maxHeight: smallNav ? '90px' : '60px',height: '60px', width: '100%', backgroundColor: colors.secondary, position: 'fixed', top: '0px', zIndex: 4, boxShadow: `0 0 1px ${colors.font}`}}>
      
      <div style={{height: '60px'}}>

        <div className={styles.titleContainer}>
          <p>Opportune X</p>
        </div>

        { isLoggedIn && 
        
        <div className={styles.loginContainer} >

          <LoginModal/>
          <button className={styles.signUp} onClick={()=> (window.location = "/signup")}>SignUp</button>

        </div>}

      </div>

      <div style={{maxHeight: smallNav ? '30px' : '0px', height: smallNav ? '30px' : '0px', backgroundColor: colors.secondary, display: 'flex', justifyContent: 'center', position: 'relative'}}>
      {(menu && isLoggedIn) &&
       (showMenu ? <FaTimes style={{color: colors.font, position: 'absolute', left: '15px', top: '5px'}} onClick={()=> {setShowMenu(!showMenu)}}/> : < FaStream style={{color: colors.font, position: 'absolute', left: '15px', top: '5px'}} onClick={()=> {setShowMenu(!showMenu)}}/>)}

          <div className={styles.linksContainer} style={{transform: smallNav ? "translateY(0px)": "translateY(-30px)", fontSize: smallNav ? "15px": "18px"}}>
            
            {
              options.map((option, index) => (
                <Link to={option.link} style={{textDecoration: 'none'}}>
                <div className={styles.linkContainer}>{option.name}</div>
                </Link>

              ))
            }
          </div>
      </div>
      
    </div>
    </>
  )
}

export default Navbar
