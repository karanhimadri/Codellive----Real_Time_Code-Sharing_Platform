import React from 'react'
import { assets } from '../assets/assets'
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center my-14'>
      <div className="flex items-center gap-96">
        <img className="w-32" src={assets.codelive_logo} alt="Codelive Logo" />
        <ul className='flex items-center text-[#343a40] gap-4'>
          <li>Home</li>
          <li>Features</li>
          <li>Pricing</li>
          <li>FAQs</li>
          <li>About</li>
        </ul>
        <ul className="flex items-center gap-4 cursor-pointer">
          <li className='text-[#3772ff]'><FaFacebook /></li>
          <li className='text-[#e63946]'><FaYoutube /></li>
          <li className='text-[#fb6f92]'><FaInstagram /></li>
          <li className='text-[#00bbf9]'><FaTwitter /></li>
        </ul>
      </div>
      <p>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
      <p className='flex items-center gap-1 my-3'><span><FaRegCopyright size={13} /></span>2025 All Copyrights are Reserved. ( Design by <span className='font-semibold'>Himadri Karan</span> TECB )</p>
    </div>
  )
}

export default Footer