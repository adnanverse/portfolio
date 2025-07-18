import React, { useEffect } from "react";
// import "./loader.css";

export default function LoaderComp({ isVisible }) {
  useEffect(() => {
    if (isVisible) {
      const wave = document.getElementById("svg");
      const loaderText = document.querySelector(".load-text");

      setTimeout(() => {
        wave?.classList.add("wave-up");
        loaderText?.classList.add("text-up");
        document.body.classList.add("loaded");
      }, 200);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="loader-wrap fixed inset-0 flex items-center z-[60] justify-center  overflow-hidden bg-[#1D1D1D]">
      <svg
        className="absolute w-screen h-screen fill-current text-[#131313]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          id="svg"
          d="M0 622.7703S175 445.5923 500 445.5923s500 175.9775 500 175.9775V0H0Z"
        ></path>
      </svg>

      <div className="loader-wrap-heading relative z-20 text-xl font-thin tracking-widest uppercase">
        <div className="load-text text-white text-center">
          {"Loading".split("").map((char, i) => (
            <span
              key={i}
              className="inline-block animate-letter mx-[20px]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
