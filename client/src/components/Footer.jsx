import { useEffect, useRef, useState } from 'react';
import { IoLocationOutline, IoCallOutline, IoMailOutline } from 'react-icons/io5';
import { FaInstagram } from "react-icons/fa";
import logo from '../assets/logo.png';

const contactInfo = [
  { icon: IoLocationOutline, text: ' Keezhillam - Kurichilacode Rd, Keezhillam, Kerala 683541' },
  { icon: IoCallOutline, text: '7025361333' },
  { icon: IoMailOutline, text: 'metrodigital362@gmail.com' }
];

export default function Footer({ productCategories = [] }) {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Reset visibility when footer leaves viewport
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
        rootMargin: '0px'
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-800 text-gray-300 py-10">
      <div 
        className={`max-w-6xl mx-auto px-4 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 transition-all duration-1500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        
        {/* Column 1: Logo and About */}
        <div className="space-y-4">
          <img src={logo} alt="" />
          <p className="text-sm">
            Your one-stop shop for hassle-free custom printing. We deliver quality, speed, and great value across a wide range of products.
          </p>
        </div>
        
        {/* Column 2: Quick Links */}
        <div className='ml-5'>
          <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-red-500 inline-block">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-red-500 transition-colors duration-200">Home</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors duration-200">About Us</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors duration-200">FAQs</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors duration-200">Contact</a></li>
          </ul>
        </div>
        
        {/* Column 3: Top Categories (Dynamic from existing data) */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-red-500 inline-block">Top Products</h4>
          <ul className="space-y-2">
            {productCategories.slice(0, 5).map((productCategories) => (
              <li key={`footer-${productCategories.id}`}>
                <a href="#" className="hover:text-red-500 transition-colors duration-200">
                  {productCategories.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Column 4: Contact Information */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 border-b-2 border-red-500 inline-block">Get In Touch</h4>
          <ul className="space-y-3">
            {contactInfo.map((item, index) => (
              <li key={index} className="flex items-start">
                <item.icon className="text-red-500 text-xl mr-3 mt-1 shrink-0" />
                <p className="text-sm">{item.text}</p>
              </li>
            ))}
          </ul>
          <ul>
            <li className="mt-4">
              <a href="https://www.instagram.com/metro_digital_printing/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition-colors duration-200 flex items-center">
                <FaInstagram className="text-2xl mr-2" /> Follow us
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div 
        className={`max-w-7xl mx-auto px-4 lg:px-16 pt-6 text-center text-sm text-gray-500 transition-all duration-700 delay-200 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        &copy; {new Date().getFullYear()} Metro Digital Printing. All Rights Reserved.
      </div>
    </footer>
  );
}