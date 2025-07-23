import { useEffect, useRef, useState } from 'react'
import * as IoIcons from "react-icons/io"
import gsap from 'gsap'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdCancel } from "react-icons/md";
import Slider from 'react-slick'
import axios from '../AxiosInstance/axiosInstance';
import * as FaIcons from "react-icons/fa"; // For GitHub icon

export default function Projects({ showLoader }) {

    let [projects, setprojects] = useState([]);
    let [baseurl, setbaseurl] = useState('')

    useEffect(() => {
        axios.post('api/website/projects')
            .then((response) => {
                if (response.data.status == true) {
                    setbaseurl(response.data.base_url)
                    setprojects(response.data.data)
                    
                } else {
                    toast.error('something went wrong please reach us later or connect me with mail')
                }


            }).catch((error) => {
                toast.error(error.message)
            })


    }, [])


    return (
        <div className='mx-auto md:px-17 sm:px-12 px-3 md:py-16 py-3 sm:py-14 border-b-[1px] border-[#4A4A4A] '>
            <h2 className="text-white pb-7 text-center text-[19px] sm:text-[25px] md:text-[31px] lg:text-[43px] font-semibold">
                My Projects
            </h2>
            <h3 className="text-[13px] sm:text-[15px] md:text-[19px] font-semibold text-gray-300 tracking-wide mb-6 text-center">
                Featured Frontend Projects
            </h3>
            {
                projects.map((v, i) => {
                    if (v.project_type == 'frontend') {
                        return (
                            <ProductCard key={i} showLoader={showLoader} baseurl={baseurl} v={v} i={i} />
                        )
                    }
                })
            }
            <h3 className="text-[13px] sm:text-[15px] md:text-[19px] font-semibold text-gray-300 tracking-wide mb-6 text-center">
                Featured MERN Stack Projects
            </h3>

            <div className='py-12'>
                {
                    projects.map((v, i) => {
                        if (v.project_type == 'backend') {
                            return (
                                <ProductCard key={i} baseurl={baseurl} v={v} i={i} />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}





function ProductCard({ i, v, baseurl, showLoader }) {
    let [OpenViewMore, SetOpenViewMore] = useState(false)
    const mainSlider = useRef(null);
    const navSlider = useRef(null);


    gsap.registerPlugin(ScrollTrigger);

    const projectRefs = useRef([]);

    useEffect(() => {
        if (!showLoader) {
            projectRefs.current.forEach((el, index) => {
                gsap.from(el, {
                    x: index % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none none',
                        markers: false
                    }
                });
            });
        }
    }, [showLoader]);

    let settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const bigSliderSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: navSlider.current,
        ref: mainSlider
    };

    const navSliderSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: mainSlider.current,
        autoplay: true,
        dots: true,
        speed: 500,
        centerMode: true,
        focusOnSelect: true,
        ref: navSlider
    };

    return (
        <>
            <div ref={(el) => projectRefs.current[i] = el} className='border-[2px] mb-7 rounded-3xl border-[#4A4A4A] overflow-hidden'>
                <div className={`transition-transform duration-500 ease-in-out origin-top ${OpenViewMore ? 'scale-y-0 h-0' : 'scale-y-100'}`}>
                    <div className={`${i % 2 === 0 ? '' : 'flex-row-reverse'} md:flex gap-5 rounded-3xl p-5`}>
                        <div className='rounded-3xl border-white border basis-[50%] overflow-hidden'>
                            <Slider {...settings1}>
                                {v.images?.slice().sort((a, b) => (a.order || 0) - (b.order || 0)).map((img, idx) => (
                                    <div key={idx}>
                                        <img src={`${baseurl}/${img.image}`} className="w-full" alt={`Project Image ${idx + 1}`} />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        <div className='basis-[55%] md:py-0 py-3 text-white space-y-3'>
                            <h3 className="text-[13px] md:text-[15px] lg:text-[19px] font-bold text-white">{v.name}</h3>
                            <a href={v.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-[9px] underline hover:text-blue-500">🔗 Live Demo</a>
                            <p className="text-[9px] sm:text-[12px] text-gray-300 leading-relaxed">{v.short_description}</p>

                            <ul className="list-disc list-inside text-[9px] sm:text-[12px] text-gray-300 space-y-1">
                                {v.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
                            </ul>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-400">Technologies:</h4>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {v.tech_stack.map((tech, idx) => (
                                        <span key={idx} className="bg-gray-700 text-white text-[8px] rounded px-2 py-1">{tech.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center py-4 justify-center gap-2'>
                        <div onClick={() => SetOpenViewMore(true)} className='flex cursor-pointer items-center justify-center gap-2 group'>
                            <h4 className='text-center text-white font-semibold'>View More</h4>
                            <IoIcons.IoIosArrowDropdownCircle className='text-white text-3xl border border-transparent rounded-full p-1 animate-bounce transition-all duration-300 group-hover:animate-none group-hover:bg-white group-hover:border-white group-hover:text-black' />
                        </div>
                    </div>
                </div>

                <div className={`transform transition-all duration-500 ease-in-out origin-bottom overflow-hidden ${OpenViewMore ? 'scale-y-100 max-h-[2000px] opacity-100' : 'scale-y-0 max-h-0 opacity-0'} rounded-3xl bg-[#101010]`}>
                    <div className="px-5 py-6 space-y-6">
                        <div className='flex justify-between items-center border-b border-gray-700 pb-3'>
                            <h3 className="uppercase text-[19px] md:text-[25px] lg:text-[31px] text-white font-bold">{v.name}</h3>
                            <div onClick={() => SetOpenViewMore(false)} className='text-white text-3xl cursor-pointer hover:text-red-400'>
                                <MdCancel />
                            </div>
                        </div>

                        <div className="hidden sm:block rounded-3xl overflow-hidden shadow-lg border border-gray-600">
                            <Slider {...bigSliderSettings} ref={mainSlider}>
                                {v.images.map((img, idx) => (
                                    <div key={idx}><img src={baseurl + '/' + img.image} className='w-full rounded-3xl' alt="Slide" /></div>
                                ))}
                            </Slider>
                        </div>
                        <div className='rounded-3xl sm:hidden border-white border  overflow-hidden'>
                            <Slider {...settings1}>
                                {v.images?.slice().sort((a, b) => (a.order || 0) - (b.order || 0)).map((img, idx) => (
                                    <div key={idx}>
                                        <img src={`${baseurl}/${img.image}`} className="w-full" alt={`Project Image ${idx + 1}`} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className="hidden sm:block mt-4 px-2 rounded-2xl overflow-hidden">
                            <Slider {...navSliderSettings} ref={navSlider}>
                                {v.images.map((img, idx) => (
                                    <div key={idx} className='px-2'><img src={baseurl + '/' + img.image} className='rounded-lg border w-full' alt="Thumb" /></div>
                                ))}
                            </Slider>
                        </div>

                        <p className="text-[9px] sm:text-[12px] text-gray-300 leading-relaxed">{v.long_description}</p>

                        <div className='text-gray-300'>
                            <h4 className='text-white text-[13px] font-semibold mb-2'>Key Features:</h4>
                            <ul className="list-disc list-outside pl-5 text-[9px] sm:text-[12px] text-gray-300 space-y-1">
                                {v.paragraphs.map((para, idx) => <li key={idx}>{para}</li>)}
                            </ul>

                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-400">Technologies Used:</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {v.tech_stack.map((tech, idx) => (
                                    <span key={idx} className="bg-gray-700 text-white text-[8px] rounded px-2 py-1">{tech.name}</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-1 flex-wrap items-center">
                            {/* 🔗 Live Demo Link */}
                            {v.link && (
                                <a
                                    href={v.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white text-[10px] sm:text-[13px] font-medium border border-blue-400 px-3 py-1.5 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300"
                                >
                                    <IoIcons.IoMdGlobe className="text-lg sm:text-xl" />
                                    Live Demo
                                </a>
                            )}

                            {/* 🐙 GitHub Repo Link */}
                            {v.github_link && (
                                <a
                                    href={v.github_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white text-[10px] sm:text-[13px] font-medium border border-gray-400 px-3 py-1.5 rounded-md hover:bg-gray-200 hover:text-black transition-all duration-300"
                                >
                                    <FaIcons.FaGithub className="text-lg sm:text-xl" />
                                    GitHub Repo
                                </a>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}