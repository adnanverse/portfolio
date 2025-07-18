import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'react-toastify';
import axios from '../AxiosInstance/axiosInstance';

export default function AboutUs() {

    const containerRef = useRef(null);
    let [paras, setparas] = useState([])

    useEffect(() => {
        axios.post('api/website/about-me')
            .then((response) => {
                if (response.data.status == true) {
                    setparas(response.data.data)
                    
                } else {
                    toast.error(response.data.message)
                }


            }).catch((error) => {
                toast.error(error.message)
            })


    }, [])

     useEffect(() => {
        if (paras.length === 0) return;

        // Delay to ensure DOM is rendered
        setTimeout(() => {
            const elements = containerRef.current.querySelectorAll('.para');
            elements.forEach((el) => {
                gsap.from(el, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        end: 'top 50%',
                        toggleActions: 'play none none none',
                        markers: false,
                    },
                });
            });
        }, 100); // slight delay to allow rendering
    }, [paras]);


    return (
         <div
            ref={containerRef}
            className='md:pb-15 md:pt-3 sm:py-14 py-7 md:px-17 sm:px-12 px-3 border-b-[1px] border-[#4A4A4A] rounded-tl-3xl font-sora'
        >
            <h3 className='text-[24px] sm:text-[28px] md:text-[31px] lg:text-[43px] font-semibold para text-center text-white'>
                About ME
            </h3>

            {paras.map((v, i) => (
                <p key={i} className='text-[11px] sm:text-[13px] para text-white py-4 leading-relaxed'>
                    {v.para}
                </p>
            ))}
        </div>
    )
}
