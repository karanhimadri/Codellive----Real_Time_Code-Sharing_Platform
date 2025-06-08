import React from 'react';
import { Code2 } from "lucide-react";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {

  const navLinks = ['Home', 'Features', 'Pricing', 'FAQs', 'About'];

  const socialLinks = [
    { icon: FaFacebook, color: 'hover:text-blue-600', bgColor: 'hover:bg-blue-50' },
    { icon: FaYoutube, color: 'hover:text-red-600', bgColor: 'hover:bg-red-50' },
    { icon: FaInstagram, color: 'hover:text-pink-600', bgColor: 'hover:bg-pink-50' },
    { icon: FaTwitter, color: 'hover:text-sky-600', bgColor: 'hover:bg-sky-50' },
  ];

  return (
    <footer className='bg-gradient-to-br from-slate-50 to-gray-100 border-t border-gray-200'>
      <div className='max-w-7xl mx-auto px-6 py-12'>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeLive
                </span>
                <span className="text-xs text-gray-500 -mt-1">Real-time coding</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex justify-center">
            <ul className='flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-gray-700 font-medium'>
              {navLinks.map((item) => (
                <li key={item} className='hover:text-blue-600 transition-colors duration-200 cursor-pointer relative group'>
                  {item}
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media Icons */}
          <div className="flex justify-center lg:justify-end">
            <ul className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <li key={index} className={`p-3 rounded-full bg-white shadow-sm border border-gray-200 ${social.color} ${social.bgColor} transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-110 text-gray-600`}>
                    <IconComponent size={18} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8'></div>

        {/* Copyright */}
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600'>
          <p className='flex items-center gap-2'>
            <span className='text-gray-500'>©</span>
            <span>2025 All rights reserved.</span>
          </p>
          <p className='text-center sm:text-right'>
            Design by <span className='font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200'>Himadri Karan</span>
            <span className='ml-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium'>TECB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
