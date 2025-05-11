import React from 'react'


import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="px-4 py-10 text-white bg-gray-900">
    
      <div className="container flex flex-col items-center justify-between gap-8 mx-auto md:flex-row">
       
        <div className="w-full md:w-1/2">
          <img src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png" alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col gap-4 md:flex-row">
            <li><a href="#home" className="hover:text-primary">Home</a></li>
            <li><a href="#services" className="hover:text-primary">Services</a></li>
            <li><a href="#about" className="hover:text-primary">About Us</a></li>
            <li><a href="#contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        
        
      </div>

      
      <div className="container flex flex-col items-center justify-between pt-6 mx-auto mt-10 border-t border-gray-700 md:flex-row">
      
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
        </ul>

      
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer