import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from '../AxiosInstance/axiosInstance';
import { toast } from 'react-toastify';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const cardsRef = useRef([]);
    let [skills, setskills] = useState([])
    let [baseurl, setbaseurl] = useState('')




    useEffect(() => {
        axios.post('api/website/skills',{type:'skill'}
        ).then((response) => {
                if (response.data.status == true) {
                    setbaseurl(response.data.base_url)
                    setskills(response.data.data)

                } else {
                    toast.error('something went wrong pease reach us later or connect me with mail')
                }


            }).catch((error) => {
                toast.error(error.message)
            })


    }, [])

    useEffect(() => {
        if (skills.length === 0) return;

        // Wait for DOM paint
        setTimeout(() => {
            gsap.fromTo(
                cardsRef.current.map(card => card?.querySelector('.underrow')),
                { scaleX: 0.1, transformOrigin: 'left' },
                {
                    scaleX: 1,
                    duration: 1,
                    ease: 'power2.out',
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: cardsRef.current[0],
                        start: 'top 85%',
                    },
                }
            );
        }, 100); // slight delay to ensure elements are mounted
    }, [skills]);


    return (
        <div className='max-w-[1274px] mx-auto md:py-16 sm:py-14 py-7 md:px-17 sm:px-12 px-3 border-b-[1px] border-[#4A4A4A] font-sora'>
            <h2 className='text-center text-[24px] sm:text-[28px] md:text-[31px] lg:text-[43px] font-semibold text-white'>
                My Skills
            </h2>
            <div className='flex justify-between flex-wrap'>
                {
                    skills.map((v, i) => (
                        <Skillcard key={i} innerRef={(el) => (cardsRef.current[i] = el)} v={v} baseurl={baseurl} />
                    ))
                }
            </div>
        </div>
    )
}

function Skillcard({ innerRef, v, baseurl }) {

    return (
        <>
           <div ref={innerRef} className='px-7 relative sm:basis-[48%] m:basis-[30%] w-full rounded-3xl mt-8 border border-[#4A4A4A]'>
            <div className='flex py-5 items-center gap-9'>
                <div className='basis-[20%]'>
                    <img src={baseurl + '/' + v.image} className='w-full' alt="" />
                </div>
                <div className='text-white font-semibold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px]'>
                    {v.name}
                </div>
                <span className='absolute px-7 left-0 bottom-0 w-full h-[2px]'>
                    <div className='underrow scale-x-[0.1] bg-white w-full px-7 h-[2px]'></div>
                </span>
            </div>
        </div>
        </>
    )
}