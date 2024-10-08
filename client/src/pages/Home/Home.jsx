import React, { useEffect, useRef, useState } from 'react';
import Loader from '../../components/loader/Loader';
import { useTheme } from '../../Global/ThemeContext';
import styles from './Home.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Helmet } from 'react-helmet';

import 'swiper/css';
import 'swiper/css/effect-coverflow';



const HomePage = () => {
    const { theme: colors } = useTheme();
    const [isLoading, setLoading] = useState(true);
    const elementRef = useRef(null);
    const scrollManager = useRef(null);


    const companycards = [
        {
            title: "Google",
            img: "https://upload.wikimedia.org/wikipedia/commons/3/32/Googleplex_HQ_%28cropped%29.jpg",
            description: "Leading in Search Engine. Since 2005."
        },
        {
            title: "Apple",
            img: "https://media.cnn.com/api/v1/images/stellar/prod/230406003026-01-apple-store-mumbai.jpg?c=original",
            description: "Innovating technology solutions for a better future."
        },
        {
            title: "Goldman Sachs",
            img: "https://static.foxbusiness.com/foxbusiness.com/content/uploads/2021/03/Goldman-Sachs-workers.jpg",
            description: "Global financial services provider with a legacy of excellence."
        },
        {
            title: "Amazon",
            img: "https://www.cnet.com/a/img/resize/427872cd8ef47725715d9babacd64310c749c00e/hub/2013/10/24/71ecea6b-3d27-11e3-b83c-14feb5ca9861/am1.png?auto=webp&width=1200",
            description: "Pioneering sustainable energy solutions since 2005."
        },
        {
            title: "Adobe",
            img: "https://thumbs.dreamstime.com/b/bucharest-romania-adobe-inc-offices-logo-american-multinational-computer-software-company-building-212028349.jpg",
            description: "Transforming retail experiences through cutting-edge strategies."
        },
        {
            title: "Microsoft",
            img: "https://image.architonic.com/prj2-3/5104765/microsoft-deutschland-zentrale-projects-01-titel-arcit18.jpg",
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

            <Helmet>
                <title>Opportune-x | Your Platform for Internships & Jobs</title>
                <meta name="description" content="Welcome to Opportune-x, where you can find the best internships and job opportunities aligned with your goals to advance your career." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://opportune-x-frontend.vercel.app/" hreflang="en" />
            </Helmet>



            <div className={styles.bubbleContainer}>
                <div className={styles.bubble}>
                    {[...Array((window.innerWidth > 650) ? 65 : 30)].map((_, index) => (
                        <span key={index} className={styles.bubbleSpan} style={{ '--i': getRandomInt(10, 30) }}></span>
                    ))}
                </div>
            </div>

            <div className={`${styles.headingContainer} appear`} ref={elementRef}>
                <h1 ref={elementRef}>OPPORTUNE</h1>
                <p>Get The Opportunity you Always Wanted</p>
            </div>

            <div className={`${styles.titleContainer}`} style={{ background: `linear-gradient(0deg, ${colors.secondary}, rgba(0,0,0,0))`, height: '220px' }}>
                <h2>COMPANIES</h2>
            </div>

            <div className={`${styles.swiperContainer}`}>
                {/* { (window.innerWidth > 400) ?
                
            <>
            <div className={styles.swiperMaskLeft}></div>
            <div className={styles.swiperMaskRight}></div>
            </>
            : null} */}

                <Swiper style={{ maxWidth: '640px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', position: 'relative' }}
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
                        companycards.map((company, index) => (
                            <SwiperSlide key={index}>
                                <span className={`${styles.card} appear`}>
                                    <h3 style={{ color: colors.font, fontSize: '18px', marginTop: '15px', fontWeight: 'bold', letterSpacing: '1px' }}>{company.title}</h3>
                                    <img src={company.img} alt={`${company.title} Image`} loading="lazy" style={{ maxHeight: '140px', maxWidth: '190px', borderRadius: '10px', marginTop: "15px" }} />
                                    <p style={{ color: colors.font, marginTop: '20px', padding: '10px', textAlign: 'center' }}>{company.description}</p>
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
