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
  //   root.style.setProperty('--font-color', colors.font);
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
          </Routes>
          </Wrapper>
        </div>
      </div>
      </ThemeProvider>
    </Router>

  );
}

export default App;
