import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import AboutUs from './components/AboutUs';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ContactUs from './components/ContactUs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Element } from 'react-scroll';
import { toast, ToastContainer } from 'react-toastify';
import axios from './AxiosInstance/axiosInstance';
import LoaderComp from './components/LoaderComp';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const homeRef = useRef(null);
    const animatedDivRef = useRef(null);
    const [showLoader, setShowLoader] = useState(true);
    let   [profiledetail, setprofiledetail] = useState('');
    let   [baseurl, setbaseurl] = useState('')
    useEffect(() => {
        axios.post('/api/website/profile')
            .then((response) => {
                if (response.data.status == true) {
                    setbaseurl(response.data.base_url)
                    setprofiledetail(response.data.data)
                    setTimeout(() => setShowLoader(false), 1000); 
                } else {
                    toast.error('something went wrong pease reach us later or connect me with mail')
                }


            }).catch((error) => {
                toast.error(error.message)
            })


    }, [])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                animatedDivRef.current,
                { marginTop: '0.25rem' }, // mt-1
                {
                    marginTop: '3rem', // mt-12
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: homeRef.current,
                        start: 'top center',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (  
        <div className="w-full lg:px-16 sm:px-16 px-3  pb-5 bg-[#232323]">
            <LoaderComp isVisible={showLoader} />
            <Header email={profiledetail.email} />
            <ToastContainer />

            <Element name="home" className="scroll-mt-24">
                <Introduction ref={homeRef} profiledetail={profiledetail} baseurl={baseurl} />
            </Element>

            <div
                ref={animatedDivRef}
                className="mx-auto bg-[#1D1D1D] mt-1 rounded-tl-3xl max-w-[1274px] relative transition-all duration-500"
            >
                <div className="md:flex hidden justify-end  absolute right-[0px] top-[-79px] rounded-bl-3xl w-[75%]">
                    <div className="basis-[15.5%] bg-[#1D1D1D] slope-2"></div>
                    <div className="basis-[80%]   rounded-tr-3xl bg-[#1D1D1D] p-10">

                    </div>
                </div>

                <Element name="about" className="scroll-mt-24">
                    <AboutUs />
                </Element>
                <Element name="skills" className="scroll-mt-24">
                    <Skills />
                </Element>
                <Element name="projects" className="scroll-mt-24">
                    <Projects />
                </Element>
                <Element name="contact" className="scroll-mt-24">
                    <ContactUs email={profiledetail.email} />
                    <footer className="bg-[#232323] py-5 text-center text-white text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-['Sora'],sans-serif">
                        <p>© {new Date().getFullYear()} Adnan Dev. All rights reserved.</p>
                    </footer>
                </Element>
            </div>
        </div>
    );
}
