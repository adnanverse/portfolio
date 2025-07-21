import React, { useState } from 'react'
import { TbMenuDeep } from "react-icons/tb";
import { Link, Element, Events, scroller } from 'react-scroll';
import { RxCross2 } from "react-icons/rx";
import logo from '../../public/images/logo.png'
export default function Header({ email }) {
  let [menu,setmenu]=useState(false)
  return (
    
    <header className="sticky top-0 z-50 bg-[#232323] py-4 font-[\'Sora\'],sans-serif">
      <Menu menu={menu} setmenu={setmenu} />
      <div className="w-full max-w-[1278px] mx-auto flex items-center justify-between ">
        <figure>
          <img src="/images/logo.png" className='sm:w-[200px] w-[160px]' alt="Logo" />
        </figure>

        <nav className="hidden md:block">
          <ul className="flex text-white font-light capitalize gap-5 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <li
                key={section}
                className="cursor-pointer text-white font-medium hover:text-[#C8F31D]"
              >
                <Link
                  to={section}
                  spy={true}
                  smooth={true}
                  offset={-96}
                  duration={500}
                  activeClass="active-link"
                  className="cursor-pointer"
                >
                  {section}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-white font-light hidden md:block text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] uppercase">
          <a href={`mailto:${email}`}>{email}</a>
        </div>

        <div className="md:hidden sm:text-4xl text-[30px] text-[#E9E9E9]">
          <TbMenuDeep onClick={()=>setmenu(true)} />
        </div>
      </div>
    </header>

  )
}

function Menu({menu,setmenu}) {
    let close = () => {
    setmenu(false)
    // console.log(menu)
  }
  return (
    <>
      <div className={`h-[100%] text-white  w-[100%]  transition-all z-50 fixed ${(menu == true) ? 'top-0 left-0' : ' top-0 left-[-100%] '} bg-[#232323] text-[30px] `}>

        <div className='flex justify-between py-4 px-3'>
          <div>
            <RxCross2 className='text-white' onClick={close} />
          </div>
          <div className='h-7'>
            <img src={logo} className='h-[100%]' alt="" />
          </div>
        </div>
        <div className='px-6  py-7'>
          <ul className='flex text-white flex-col text-[19px] tracking-[1px] font-light gap-10'>
           {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <li
                key={section}
                className="cursor-pointer px-7 text-center text-white font-medium hover:text-[#C8F31D]"
              >
                <div className=' pb-2 border-b-[1px] border-white '>
               <Link
               onClick={close}
                  to={section}
                  spy={true}
                  smooth={true}
                  offset={-96}
                  duration={500}
                  activeClass="active-link"
                  className="cursor-pointer"
                >
                  {section}
                </Link>
                </div>
               
              </li>
            ))}
          </ul>

        </div>


      </div>
    </>
  )
}