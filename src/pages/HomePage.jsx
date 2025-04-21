import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gradient-to-r from-[#caf0f8] via-[#ffffff] to-[#caf0f8] shadow-[#caf0f8] shadow-md">

      <div className="flex flex-col items-center">
        <h6 className="text-5xl mt-8 font-semibold">Share Code in Real-time with Developers</h6>
        <p className="text-2xl font-normal mt-4 text-[#1b263b]">
          An online code editor for interviews, troubleshooting, teaching &
          more…
        </p>
      </div>

      <div className="flex flex-col items-center">
        <button
          className="text-blue-500 border-2 border-blue-500 px-3 py-3 rounded font-medium mt-8 transition-all hover:bg-blue-500 hover:text-white duration-500"
          onClick={() => { navigate("/code-space"); window.scrollTo(0, 0) }}>
          Share Code now
        </button>
        <p className="text-sm mt-2 mb-5">Share code for free.</p>
      </div>

      <div className="flex justify-center items-center gap-4 p-4">
        {/* Main Video */}
        <div className="w-[600px] h-[350px]">
          <video className="w-full h-full object-cover rounded-lg shadow-lg" autoPlay muted loop preload="auto">
            <source src={assets.coding_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Side Videos */}
        <div className="flex flex-col gap-4">
          <video className="w-[350px] h-[170px] object-cover rounded-lg shadow-lg" autoPlay muted loop preload="auto">
            <source src={assets.coding_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video className="w-[350px] h-[170px] object-cover rounded-lg shadow-lg" autoPlay muted loop preload="auto">
            <source src={assets.coding_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <p className="text-xl font-normal text-[#343a40] m-6 italic">
        "" Used by software engineers at companies and universities we respect
        and admire ""
      </p>

      {/* Testimonials */}
      <div className="flex flex-col justify-center items-center my-8 mb-8 lg:flex-row gap-10">
        <div className="flex flex-col items-center justify-center border-2 border-[#adb5bd] text-wrap max-w-[350px] p-8 transition-all  hover:bg-blue-400 hover:text-white hover:border-white duration-500">
          <h6 className="text-center font-semibold text-xl mb-5">Code with your team</h6>
          <p className="text-center">
            Open a Codeshare editor, write or copy code, then share it with
            friends and colleagues. Pair program and troubleshoot together.
          </p>
          <button className="border-2 p-2 mt-4 border-white rounded hover:bg-white hover:text-blue-500" onClick={() => { navigate("/code-space"); window.scrollTo(0, 0) }}>
            Hack Together
          </button>
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-[#adb5bd] text-wrap max-w-[350px] p-8 transition-all  hover:bg-blue-400 hover:text-white hover:border-white duration-500">
          <h6 className="text-center font-semibold text-xl mb-5">Interview developers</h6>
          <p className="text-center">
            Set coding tasks and observe in real-time when interviewing
            remotely or in person. Nobody likes writing code efficiently.
          </p>
          <button className="border-2 p-2 mt-4 border-white rounded hover:bg-white hover:text-blue-500" onClick={() => { navigate("/code-space"); window.scrollTo(0, 0) }}>
            Start an Interview
          </button>
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-[#adb5bd] text-wrap max-w-[350px] p-8 transition-all  hover:bg-blue-400 hover:text-white hover:border-white duration-500">
          <h6 className="text-center font-semibold text-xl mb-5">Teach people to program</h6>
          <p className="text-center">
            Share your code with students and peers then educate them.
            Universities and colleges around the world use Codeshare for better teaching.
          </p>
          <button className="border-2 p-2 mt-4 border-white rounded hover:bg-white hover:text-blue-500" onClick={() => { navigate("/code-space"); window.scrollTo(0, 0) }}>
            Teach Code
          </button>
        </div>
      </div>

    </div>
  );
};

export default HomePage;