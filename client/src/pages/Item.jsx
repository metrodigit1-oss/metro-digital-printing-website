import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  IoCheckmarkCircle, 
  IoLayersOutline,
  IoResizeOutline,
  IoDocumentTextOutline,
} from 'react-icons/io5';

import { AiOutlineColumnWidth } from "react-icons/ai";
import { GoVerified } from "react-icons/go";
import { TbLayersSelected } from "react-icons/tb";

export default function Item() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/item/get/${id}`);
        const data = await res.json();
        if (data.message) {
          setError(data.message);
          setItem(null);
        } else {
          setItem(data);
        }
      } catch (err) {
        setError(err.message);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const formatList = (text) => {
    if (!text) return null;
    return text.split(',').map((part, index) => (
      <span key={index} className='inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-700 mr-2 mb-2 hover:bg-red-50 hover:text-red-600 transition-colors duration-300'>
        <IoCheckmarkCircle className='text-red-600' />
        {part.trim()}
      </span>
    ));
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-50'>
        <div className='text-center'>
          <div className='inline-block w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4'></div>
          <p className='text-xl text-gray-700 font-medium'>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-50'>
        <div className='bg-white p-8 rounded-lg shadow-lg text-center max-w-md'>
          <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-3xl text-red-600'>⚠</span>
          </div>
          <p className='text-xl text-red-700 font-semibold'>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-50'>
        <div className='bg-white p-8 rounded-lg shadow-lg text-center max-w-md'>
          <p className='text-xl text-gray-700 font-medium'>Item not found.</p>
        </div>
      </div>
    );
  }

  const images = item.imageUrls && item.imageUrls.length > 0 
    ? item.imageUrls 
    : ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEbmNxhl6aFUDwBtyelBzun4EnBJLblVb56w&s'];

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>

        <div className='bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn'>
          <div className='flex flex-col lg:flex-row gap-8 p-6 md:p-10'>
            {/* Left Section: Image Gallery */}
            <div className='flex-1'>
              <div className='sticky top-8'>
                {/* Main Image */}
                <div className='relative overflow-hidden rounded-xl shadow-lg mb-4 group'>
                  <img
                    src={images[selectedImage]}
                    alt={item.name}
                    className='w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className='flex gap-3 overflow-x-auto pb-2'>
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === index
                            ? 'border-red-600 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-red-400'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${item.name} ${index + 1}`}
                          className='w-full h-full object-cover'
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Categories */}
                {item.category && (
                  <div className='mt-6 mb-6 pt-6 border-t border-gray-200'>
                    <p className='text-gray-600 text-sm flex flex-wrap items-center gap-2'>
                      <span className='font-semibold text-gray-800'>Categories:</span>
                      {item.category.split(',').map((cat, index) => (
                        <span
                          key={index}
                          className='inline-block bg-gray-100 px-3 py-1 rounded-full text-xs hover:bg-red-50 hover:text-red-600 transition-colors duration-300 cursor-pointer'
                        >
                          {cat.trim()}
                        </span>
                      ))}
                    </p>
                  </div>
                )}

                
              </div>
            </div>

            {/* Right Section: Details */}
            <div className='flex-1 flex flex-col'>
              {/* Product Title */}
              <div className='mb-6'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-3 leading-tight'>
                  {item.name}
                </h1>
                <div className='w-24 h-1.5 bg-linear-to-r from-red-600 to-red-400 rounded-full'></div>
              </div>

              {/* Product Specifications */}
              <div className='space-y-6 mb-8 grid grid-cols-2 md:grid md:gap-x-6 md:gap-y-6'>
                {/* Size */}
                {item.size && (
                  <div className='transform transition-all duration-300 hover:translate-x-2'>
                    <div className='flex items-center gap-3 mb-3'>
                      <IoResizeOutline className='text-2xl text-red-600' />
                      <h3 className='text-lg font-bold text-gray-800'>Available Sizes</h3>
                    </div>
                    <div className='flex flex-wrap pl-9'>
                      {formatList(item.size)}
                    </div>
                  </div>
                )}

                {/* Print Side */}
                {item.side && (
                  <div className='transform transition-all duration-300 hover:translate-x-2'>
                    <div className='flex items-center gap-3 mb-3'>
                      <IoDocumentTextOutline className='text-2xl text-red-600' />
                      <h3 className='text-lg font-bold text-gray-800'>Print Side</h3>
                    </div>
                    <div className='flex flex-wrap pl-9'>
                      {formatList(item.side)}
                    </div>
                  </div>
                )}

                {/* Lamination */}
                {item.lamination && (
                  <div className='transform transition-all duration-300 hover:translate-x-2'>
                    <div className='flex items-center gap-3 mb-3'>
                      <TbLayersSelected className='text-2xl text-red-600' />
                      <h3 className='text-lg font-bold text-gray-800'>Lamination</h3>
                    </div>
                    <div className='flex flex-wrap pl-9'>
                      {formatList(item.lamination)}
                    </div>
                  </div>
                )}

                {/* Thickness */}
                {item.thickness && (
                  <div className='transform transition-all duration-300 hover:translate-x-2'>
                    <div className='flex items-center gap-3 mb-3'>
                      <AiOutlineColumnWidth className='text-2xl text-red-600' />
                      <h3 className='text-lg font-bold text-gray-800'>Thickness</h3>
                    </div>
                    <div className='flex flex-wrap pl-9'>
                      {item.thickness.split(',').map((part, index) => (
                        <span key={index} className='inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-700 mr-2 mb-2 hover:bg-red-50 hover:text-red-600 transition-colors duration-300'>
                          <IoCheckmarkCircle className='text-red-600' />
                          {part.trim()} GSM
                        </span>
                      ))}
                    </div>
                  </div>
                )}
  
              </div>
              {/* Description */}
                {item.description && (
                  <div className='bg-gray-50 p-1 rounded-xl border border-gray-200'>
                    <p className='text-gray-700 text-base leading-relaxed'>{item.description}</p>
                  </div>
                )}

              {/* Call to Action */}
              <div className='mt-10'>
                <button className='w-full bg-linear-to-r from-red-600 to-red-500 text-white text-lg font-semibold py-4 px-8 rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3 group'>
                  <span>Contact Us for Price</span>
                  <svg className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </button>

                
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'>
            <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4'>
              <GoVerified className='text-2xl text-red-600' />
            </div>
            <h3 className='text-lg font-bold text-gray-800 mb-2'>Quality Guaranteed</h3>
            <p className='text-gray-600 text-sm'>Premium materials and professional printing quality</p>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'>
            <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4'>
              <IoResizeOutline className='text-2xl text-red-600' />
            </div>
            <h3 className='text-lg font-bold text-gray-800 mb-2'>Custom Sizes</h3>
            <p className='text-gray-600 text-sm'>Flexible sizing options to meet your needs</p>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'>
            <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4'>
              <IoLayersOutline className='text-2xl text-red-600' />
            </div>
            <h3 className='text-lg font-bold text-gray-800 mb-2'>Fast Turnaround</h3>
            <p className='text-gray-600 text-sm'>Quick delivery without compromising quality</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}