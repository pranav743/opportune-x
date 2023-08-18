import React, { useEffect, useRef, useState } from 'react';
import Loader from '../../components/loader/Loader';
import { useTheme } from '../../Global/ThemeContext';
import styles from './Home.module.css';
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';



const HomePage = () => {
    const { theme: colors } = useTheme();
    const [isLoading, setLoading] = useState(true);
    const elementRef = useRef(null);
    const scrollManager = useRef(null);


    const companycards = [
        {
            title: "Company 1",
            img: "imgs/earth.webp",
            description: "Leading in HealthCare sector. Since 1999."
        },
        {
            title: "Company 2",
            img: "imgs/sky.jpg",
            description: "Innovating technology solutions for a better future."
        },
        {
            title: "Company 3",
            img: "imgs/earth.webp",
            description: "Global financial services provider with a legacy of excellence."
        },
        {
            title: "Company 4",
            img: "imgs/sky.jpg",
            description: "Pioneering sustainable energy solutions since 2005."
        },
        {
            title: "Company 5",
            img: "imgs/earth.webp",
            description: "Transforming retail experiences through cutting-edge strategies."
        },
        {
            title: "Company 6",
            img: "imgs/sky.jpg",
            description: "Empowering minds through innovative educational platforms."
        }
    ];
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    

    return (
        // isLoading ?
        // <div style={{ minHeight: 'calc(100vh - 90px)', display: 'flex', alignItems: 'center' }}>
        //   <Loader className="appear" />
        // </div> :

        // <div style={{ minHeight: '600px', width: '100%', backgroundColor: 'blue', overflowY: 'hidden' }}>

        //     <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '2000px', backgroundColor: 'purple'}}>
        //         <div className='appear' style={{height: '200px', width: '300px', backgroundColor: colors.font}}></div>
        //     </div>

        //     <div className='appear' style={{height: '200px', width: '300px', backgroundColor: colors.font}}></div>

        //     <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '2000px', backgroundColor: 'purple'}}>
        //         <div className='appear' style={{height: '200px', width: '300px', backgroundColor: colors.font}}></div>
        //     </div>
        
        // </div>

        
        <div style={{ height: '100%', width: '100%', minHeight: '100%', maxWidth: '100%', maxHeight: '100%', overflowY: 'hidden' }}>
            <div className={styles.bubbleContainer}>
                <div className={styles.bubble}>
                    {[...Array((window.innerWidth > 650) ? 65: 30)].map((_, index) => (
                        <span key={index} className={styles.bubbleSpan} style={{ '--i': getRandomInt(10, 30) }}></span>
                    ))}
                </div>
            </div>
            
            <div className={`${styles.headingContainer} appear`} ref={elementRef}>
              <h1 ref={elementRef}>OPPORTUNE</h1>
              <p>Get The Opportunity you Always Wanted</p>
            </div>
            
            <div className={`${styles.titleContainer}`} style={{background: `linear-gradient(0deg, ${colors.secondary}, rgba(0,0,0,0))`, height: '220px'}}>
                <h1>COMPANIES</h1>
            </div>
            
            <div className={`${styles.swiperContainer}`}>
            {/* { (window.innerWidth > 400) ?
                
            <>
            <div className={styles.swiperMaskLeft}></div>
            <div className={styles.swiperMaskRight}></div>
            </>
            : null} */}
                
            <Swiper style={{maxWidth: '640px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', position: 'relative'}}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                      slideShadows: false,
                    }}
                    pagination={true}
                    loop={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className={"swiper_container"}
                    autoplay={{ 
                        delay: 3000, 
                        disableOnInteraction: false, // Allow user interaction to stop autoplay
                      }}
                >
                    <div className={styles.swiperMaskLeft}></div>
            <div className={styles.swiperMaskRight}></div>

                {
                    companycards.map((company, index)=> (
                        <SwiperSlide>
                            <span className={`${styles.card} appear`}>
                                <h2 style={{color: colors.font, fontSize: '18px', marginTop: '15px', fontWeight: 'bold', letterSpacing: '1px'}}>{company.title}</h2>
                                <img src={company.img} alt="Not Found" style={{maxHeight: '140px', maxWidth: '190px', borderRadius: '10px', marginTop: "15px"}} />
                                <p style={{color: colors.font, marginTop: '20px', padding: '10px', textAlign: 'center'}}>{company.description}</p>
                            </span>
                        </SwiperSlide>
                    ))
                }

          
              
            </Swiper>
                
            </div>
           
        </div>
    );
};

export default HomePage;
