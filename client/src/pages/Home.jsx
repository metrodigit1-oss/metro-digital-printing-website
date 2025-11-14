import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Banners from '../assets/Banners.png'
import PhotoFrames from '../assets/Photo Frame.png'
import BookCovers from '../assets/Book Cover.png'
import Stickers from '../assets/Stickers.png'
import VisitingCards from '../assets/Visiting Card.png'
import Posters from '../assets/Posters.png'
import Calender from '../assets/Calender.png'
import Brochures from '../assets/Brochures.png'


// 🚀 IMPORTS for React Icons (Ionicons V5)
import { IoPrint, IoTimeOutline, IoShieldCheckmarkOutline, IoGridOutline } from 'react-icons/io5';


export default function Home() {
  const slides = [
    { image: PhotoFrames, title: 'Photo Frames', description: 'Personalized photo frames to preserve and display your cherished memories' },
  { image: BookCovers, title: 'Book Covers', title: 'Book Covers', description: 'Custom professional book covers designed to attract your ideal readers' },
  { image: Stickers, title: 'Stickers', description: 'Durable, high-quality custom stickers perfect for branding or fun' },
  { image: VisitingCards, title: 'Visiting Cards', description: 'Premium quality visiting cards with professional designs and finishes' }
  ]

  // Data for the new "Why Choose Us?" section, matching the image content
  const features = [
    { 
      
      title: 'PrintSmart', 
      subtitle: 'Hassle Free Printing',
      IconComponent: IoPrint 
    },
    { 
      
      title: 'Fast Turnaround', 
      subtitle: '24 hr Delivery Option',
      IconComponent: IoTimeOutline 
    },
    { 
      
      title: 'Best Prices', 
      subtitle: 'Offering Great Deals',
      IconComponent: IoShieldCheckmarkOutline 
    },
    { 
      
      title: 'Wide Range', 
      subtitle: 'Products for All Needs',
      IconComponent: IoGridOutline 
    }
  ]

const categories = [
    { id: 1, name: 'Photo Frame', image: PhotoFrames },
    { id: 2, name: 'Visiting Card', image: VisitingCards },
    { id: 3, name: 'Posters', image: Posters },
    { id: 4, name: 'Banners', image: Banners },
    { id: 5, name: 'Calender', image: Calender },
    { id: 6, name: 'Book Cover', image: BookCovers },
    { id: 7, name: 'Stickers', image: Stickers },
    { id: 8, name: 'Brochures', image: Brochures }
  ]

  return (
    <div className="w-full mt-10">
      {/* 1. Swiper Section */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        speed={1}
        className="w-full overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* ... Swiper Slide Content*/}
            <div className="w-full h-100 flex">
              {/* Left side - Text with background */}
              <div className="w-1/2 bg-linear-to-r from-blue-300 to-blue-500 text-white flex flex-col justify-center items-start p-8 lg:p-16">
                <div className="slide-down">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg lg:text-xl mb-8">{slide.description}</p>
                  <button className="bg-white text-red-600 font-semibold py-3 px-8 rounded-lg hover:bg-red-100 transition-all duration-300 shadow-md hover:shadow-lg">
                      Explore Products
                  </button>
                </div>
              </div>

              {/* Right side - Image with vertical slide from top */}
              <div className="w-1/2 overflow-hidden text-content">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      


      {/* 3. Popular Categories Section (Unchanged) */}
      <section className="w-full px-4 lg:px-16 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Popular Categories</h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Explore our wide range of custom printing products designed for your personal and business needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
              >
                {/* Image Container */}
                <div className="overflow-hidden h-64">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title Section */}
                <div className="p-5 bg-white">
                  <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-red-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <div className="w-0 group-hover:w-full h-1 bg-red-600 mx-auto transition-all duration-300 mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Key Features / Why Choose Us? Section */}
      <section className="w-full py-8 md:py-12 bg-white border-b border-gray-100 mt-10 mb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-4 justify-center md:justify-start" // Centered on mobile, left-aligned on desktop
              >
                {/* 🎨 React Icon Component Rendering */}
                <feature.IconComponent className="text-red-600 text-4xl" />
                
                {/* Text Content */}
                <div className="flex flex-col items-start min-w-max"> 
                  <p className="text-lg font-bold text-gray-800">{feature.title}</p>
                  <p className="text-base text-gray-600 font-medium whitespace-nowrap">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* END Key Features Section */}
    </div>
  )
}