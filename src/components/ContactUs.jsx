import React, { useRef, useEffect, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { SiGmail } from "react-icons/si";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from '../AxiosInstance/axiosInstance';
import { toast } from 'react-toastify';

gsap.registerPlugin(ScrollTrigger);


export default function ContactUs({ email, showLoader }) {
  const sectionRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef();
 

  useEffect(() => {
    if (!showLoader) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [showLoader]);


  let formhandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Trim all fields
    Object.keys(data).forEach(key => {
      data[key] = data[key].trim();
    });

    // Validation logic
    if (!data.name) {
      toast.error("Name is required");
      form.name.focus();
      return;
    }
    if (data.name.length < 2) {
      toast.error("Name must be at least 2 characters");
      form.name.focus();
      return;
    }

    if (!data.email) {
      toast.error("Email is required");
      form.email.focus();
      return;
    }
    // Basic email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      toast.error("Please enter a valid email address");
      form.email.focus();
      return;
    }

    if (!data.subject) {
      toast.error("Subject is required");
      form.subject.focus();
      return;
    }
    if (data.subject.length < 3) {
      toast.error("Subject must be at least 3 characters");
      form.subject.focus();
      return;
    }

    if (!data.message) {
      toast.error("Message is required");
      form.message.focus();
      return;
    }
    if (data.message.length < 10) {
      toast.error("Message must be at least 10 characters");
      form.message.focus();
      return;
    }
    // ✅ reCAPTCHA check
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA");
      return;
    }

    // ✅ Add token to data sent to backend
    data.recaptchaToken = captchaToken;

    // All validations passed
    axios.post('api/website/contact-me', data)
      .then((response) => {
        console.log('from contact', response);
        toast.success('Message sent successfully');
        form.reset();
      }).catch((error) => {
        toast.error(error.message || "Something went wrong");
      });
  };

  return (
    <div className="font-[\'Sora\'],sans-serif">
      <div ref={sectionRef} className='md:flex md:py-24 sm:py-20 py-15 px-3 justify-between sm:px-12'>
        <div className='basis-[42.1%] flex flex-col justify-between '>
          <h6 className="mb-[15px] opacity-[70%] uppercase text-[#BCBCBC] tracking-widest font-[300] text-[14px] sm:text-[10px] md:text-[11px] lg:text-[12px]">Get In Touch</h6>
          <h2 className="text-white text-[29px] sm:text-2xl md:text-3xl lg:text-[45px] font-semibold leading-snug md:leading-tight">
            Let’s Build Something Great Together
          </h2>

          <p className="text-[15px] sm:text-[11px] md:text-[12px] lg:text-[13px] opacity-[70%] text-[#BCBCBC] font-[300] mt-[10px]">
            Got a project in mind or just want to chat? I’m always open to new ideas and opportunities.
          </p>

          <div>
            <a
              href={`mailto:${email}`}
              className="text-[23px] sm:text-base md:text-lg lg:text-[25px] font-semibold text-[#C8F31D] underline break-words hover:text-[#A1D80C] transition-colors duration-300"
            >
              {email}
            </a>
          </div>
        </div>

        <div className='basis-[58%] md:mt-0 mt-8 md:px-3.5'>
          <form onSubmit={formhandler} className='flex flex-col gap-7' noValidate>
            <div className='flex gap-7 justify-between'>
              <div className='basis-[50%]'>
                <input
                  className="w-full p-[15px] bg-transparent border border-[#444343] text-[#fff] focus:border-[#fff] rounded-[5px] transition-all duration-500 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  minLength={2}
                  onInvalid={e => e.target.setCustomValidity("Please enter your name (min 2 characters)")}
                  onInput={e => e.target.setCustomValidity("")}
                />
              </div>
              <div className='basis-[50%]'>
                <input
                  className="w-full p-[15px] bg-transparent border border-[#444343] text-[#fff] focus:border-[#fff] rounded-[5px] transition-all duration-500 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onInvalid={e => e.target.setCustomValidity("Please enter a valid email address")}
                  onInput={e => e.target.setCustomValidity("")}
                />
              </div>
            </div>

            <div>
              <input
                className="w-full p-[15px] bg-transparent border border-[#444343] text-[#fff] focus:border-[#fff] rounded-[5px] transition-all duration-500 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]"
                id="form_subject"
                type="text"
                name="subject"
                placeholder="Subject"
                required
                minLength={3}
                onInvalid={e => e.target.setCustomValidity("Please enter a subject (min 3 characters)")}
                onInput={e => e.target.setCustomValidity("")}
              />
            </div>

            <div>
              <textarea
                className="w-full p-[15px] bg-transparent border border-[#444343] text-[#fff] focus:border-[#fff] rounded-[5px] transition-all duration-500 text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]"
                id="form_message"
                name="message"
                placeholder="Message"
                rows="4"
                required
                minLength={10}
                onInvalid={e => e.target.setCustomValidity("Please enter a message (min 10 characters)")}
                onInput={e => e.target.setCustomValidity("")}
              />
            </div>
            {/* 🛡️ reCAPTCHA Widget */}
            <div className="flex justify-start">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                ref={recaptchaRef}
                onChange={(token) => setCaptchaToken(token)}
                theme="dark"
                 size="normal"
              />
            </div>

            <div>
              <button
                type="submit"
                className="relative cursor-pointer   w-full px-[35px] py-[15px] border border-[#444343] rounded-[5px] bg-transparent text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] tracking-widest uppercase text-white overflow-hidden transition-all duration-500 group"
              >
                <span className="relative z-10 bg-transparent group-hover:text-black transition-all duration-500">
                  Send A Message
                </span>
                <span className="absolute bg-[#C8F31D] top-0 left-0 h-full w-[5px] transition-all duration-500 group-hover:w-full z-0"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
