//Importing Modules
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importing Components
import Navbar from "./components/navbar/Navbar";
import Loader from "./components/loader/Loader";
import SideBar from "./components/sidebar/SideBar";
import Wrapper from './components/Wrapper/Wrapper';

//Importing Pages
import HomePage from './pages/Home/Home';
import ExplorePage from './pages/Explore/Explore';
import SignUp from './pages/Login/SignUp';
import Internships from './pages/Internship/Browse/Internships';
import Internshipdetails from './pages/Internshipdetails/Internshipdetails';
import Myinternship from './pages/MyInternship/Myinternship';
import Courses from './pages/Courses/Browse/Courses';
import Mycourses from './pages/Mycourses/Mycourses';
import Coursedetails from './pages/Coursedetails/Coursedetails'
import Settings from './pages/Settings/Settings';

//importing Functions 
import { setAuthToken, isAuthenticated, getUserDetails } from './Global/authUtils';
import { colors } from './Global/colors';
import { ThemeProvider, useTheme } from './Global/ThemeContext';





function App() {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 700); 
  const isLoggedIn = isAuthenticated();
  const [smallNav, setSmallNav] = useState(window.innerWidth < 900);
  


  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 700);
      setSmallNav(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // useEffect(() => {
//   const root = document.documentElement;
//   root.style.setProperty('--primary-color', colors.primary);
//   root.style.setProperty('--secondary-color', colors.secondary);
//   root.style.setProperty('--secondary2-color', colors.secondary2);
//  root.style.setProperty('--font-color', colors.font);
//   root.style.setProperty('--hover-color', colors.hover); 
// }, []);


  return (
    <Router>
      <ThemeProvider>
      <Navbar />
      <div style={{ marginTop: smallNav ? '90px' : '60px' }}>
        {(showSidebar && isLoggedIn) && <SideBar />}
        <div
          style={{
            width: 'auto',
            minHeight: smallNav ? 'calc(100vh - 90px)' : 'calc(100vh - 60px)',
            maxHeight: smallNav ? 'calc(100vh - 90px)' : 'calc(100vh - 60px)',
            overflowY: 'hidden',
          }}
        >
         
          <Wrapper>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/internships/browse" element={<Internships />} />
            <Route path='/internships/view/:id' element={<Internshipdetails/>}/>
            <Route path='/Myinternship' element={<Myinternship/>}/>
            <Route path="/courses/browse/all" element={<Courses />} />
            <Route path='/Mycourses' element={<Mycourses/>}/>
            <Route path='/courses/view/:id' element={<Coursedetails/>}/>
            <Route path='/my-internships' element={<Myinternship/>}/>
            <Route path='/my-profile-settings' element={<Settings/>}/>

          </Routes>
          </Wrapper>
        </div>
      </div>
      </ThemeProvider>
    </Router>

  );
}

export default App;

