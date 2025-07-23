import React, { useEffect, useState } from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import axios from '../AxiosInstance/axiosInstance';

export default function Introduction({ profiledetail, baseurl }) {

    let [links, setlinks] = useState([])


    useEffect(() => {
        axios.post('api/website/social-links')
            .then((response) => {
                if (response.data.status == true) {
                    setlinks(response.data.data)


                } else {
                    toast.error(response.data.message)
                }


            }).catch((error) => {
                toast.error(error.message)
            })


    }, [])

    const getIconComponent = (iconName) => {
        const prefix = iconName.slice(0, 2);
        let IconComponent;

        switch (prefix) {
            case 'Fa':
                IconComponent = FaIcons[iconName];
                break;
            case 'Ai':
                IconComponent = AiIcons[iconName];
                break;
            case 'Io':
                IconComponent = IoIcons[iconName];
                break;
            case 'Bs':
                IconComponent = BsIcons[iconName];
                break;
            case 'Md':
                IconComponent = MdIcons[iconName];
                break;
            case 'Ri':
                IconComponent = RiIcons[iconName];
                break;
            case 'Gi':
                IconComponent = GiIcons[iconName];
                break;
            default:
                IconComponent = null;
        }

        return IconComponent ? <IconComponent size={16} /> : <span className="text-red-500">Invalid Icon</span>;
    };

    let handleResumeDownload = () => {
        try {
          const response =  axios.get(`/download/${profiledetail.resume}`, {
                responseType: 'blob', // ⚠️ Important
            })
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Adnan_Resume.pdf'); // ✅ File name set
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Resume download failed:', error);
        }
    }

    return (
        <div className='   mx-auto   max-w-[1274px]'>
            <div className=' md:flex md:flex-wrap md:gap-20 pt-11   md:rounded-r-3xl rounded-br-3xl md:rounded-br-none rounded-tl-3xl bg-[#1D1D1D] sm:px-11 px-3 w-full mx-auto '>
                <div className='md:basis-[28.4%] basis-full'>
                    <div className=' py-10 w-full px-[15px] rounded-xl md:block flex flex-col items-center border-[#232323] border-[2px]' >
                        <div className=' w-full   flex items-center justify-center'>
                            <img src={baseurl + '/' + profiledetail.image} className='' alt="" />
                        </div>
                        <div className='flex pt-3 w-full flex-col items-center justify-center'>
                            <h3 className='text-[25px] capitalize bold text-white'>
                                {profiledetail.name}
                            </h3>

                            <p className='text-[#ddd]  font-[300] uppercase text-[13px]'>
                                {profiledetail.position}
                            </p>
                            <div className='w-full flex gap-4 pt-3   justify-center items-center'>
                                {
                                    links.map((v, i) => {
                                        return (

                                            <a href={v.url} key={i} className=' basis-[45px]  flex items-center justify-center h-11 hover:bg-white hover:text-black text-white rounded-lg border border-[#4A4A4A]'>

                                                {getIconComponent(v.icon)}

                                            </a>

                                        )
                                    })
                                }



                            </div>
                        </div>
                    </div>
                </div>
                <div className=' text-left lg:py-4 xl:py-0 md:py-0  py-10 flex flex-col md:gap-5 lg:gap-10 gap-8  flex-wrap flex- md:basis-[50%]'>
                    <h1 className='text-[30px] sm:text-[42px] md:text-[46px] lg:text-[50px] font-semibold leading-tight text-white'>
                        Hello, I am <span className='text-[#C8F31D]'>Adnan,</span><br />
                        Full Stack Developer Based in India
                    </h1>
                    <p className="text-[14px] sm:text-[15px] md:text-[16px] text-white font-light leading-relaxed">
                        {profiledetail.bio}
                    </p>

                    <div className="mt-[25px] w-[170px] md:mt-0">
                        <div className="butn-presv [perspective:500px]">
                            <button
                                onClick={handleResumeDownload}
                                className="bg-transparent w-full h-full py-[14px]  cursor-pointer px-[35px] border border-[#fff] hover:text-black text-[13px] hover:bg-[#fff] rounded-md hover:text-dark text-white transition-all duration-[.5s] ease-in-out [transform:rotateX(20deg)] hover:[transform:rotateX(0deg)]"
                            >
                                <span className="inline-block">Download C.V</span>
                            </button>

                        </div>
                    </div>








                </div>


            </div>

            <div className='md:flex hidden rounded-bl-3xl w-[41.5%]'>
                <div className='basis-[80%] rounded-bl-3xl bg-[#1D1D1D] p-10'></div>
                <div className='basis-[15.5%] bg-[#1D1D1D] slope'></div>
            </div>
        </div>
    )
}
