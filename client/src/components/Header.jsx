import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


export default function Header() {
  return (
    <header className='sticky top-0 bg-slate-50 shadow-md z-50'>
        <div className='flex justify-between items-center max-w-8xl mx-auto p-4'>
        <Link to="/">
        <img src={logo} alt="" className='h-15 w-auto object-contain'/>
        </Link>
        
        <ul className='flex gap-4'>

            <li className='relative group'>
              <button className='text-gray-600 group-hover:text-red-600 group-hover:rounded-4xl p-2 transition-all duration-300'>
                All Products
              </button>
              <ul className='absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>T-Shirts</li>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Mugs</li>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Posters</li>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Banners</li>
              </ul>
            </li>

            
            
            <li className='relative group'>
              <button className='text-gray-600 group-hover:text-red-600 group-hover:rounded-4xl p-2 transition-all duration-300'>
                Stationary
              </button>
              <ul className='absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Business Cards</li>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Letterheads</li>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Envelopes</li>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Brochures</li>
              </ul>
            </li>

            <li className='relative group'>
              <button className='text-gray-600 group-hover:text-red-600 group-hover:rounded-4xl p-2 transition-all duration-300'>
                Packaging
              </button>
              <ul className='absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Corporate Box</li>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Cake Box</li>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Rigid Box</li>
                <li className='px-4 py-2 cursor-pointer transition-all duration-200 hover:text-red-600 hover:border-l-10 hover:border-red-600'>Tissue Box</li>
              </ul>
            </li>

            <Link to='/about'>
            <li className='text-gray-600 hover:text-red-600 hover:rounded-4xl p-2 transition-all duration-300'>About</li>
            </Link>

            

        </ul>
        <form className='bg-slate-200 p-3 rounded-3xl flex items-center w-24 sm:w-64'>
            <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none'/>
            <FaSearch className='text-slate-600'/>

        </form>
        </div>
    </header>
  )
}
