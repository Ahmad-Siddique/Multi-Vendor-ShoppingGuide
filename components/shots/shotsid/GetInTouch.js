import React from "react";

const GetInTouch = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-12 flex flex-col items-center gap-10">
      {/* Profile image with horizontal lines */}
      <div className="w-full flex items-center gap-6">
        <div className="flex-1 h-px bg-gray-200" />
        <div className="w-14 h-14 bg-zinc-100 rounded-[43px] flex justify-center items-start overflow-hidden">
          <img
            className="w-16 h-24 p-2.5 rounded-3xl"
            src="https://placehold.co/70x91"
            alt="Profile"
          />
        </div>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {/* Profile info and button */}
      <div className="w-full flex flex-col items-center gap-2.5">
        <div className="flex flex-col items-center gap-1">
          <div className="text-gray-900 text-xl sm:text-2xl font-bold font-['Inter']">
            Team Agency
          </div>
          <div className="text-gray-900/50 text-base sm:text-lg font-medium font-['Inter']">
            Team Agency
          </div>
        </div>
        <div className="text-center text-gray-700 text-sm sm:text-base font-normal font-['Inter']">
          Translating your personality through digital experiences
        </div>
        <div className="flex flex-col items-center gap-2.5 w-full">
          <button className="w-full p-3 sm:p-4 bg-gray-900 rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-900 text-white text-base sm:text-lg font-bold font-['Arial'] transition hover:bg-gray-800">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
