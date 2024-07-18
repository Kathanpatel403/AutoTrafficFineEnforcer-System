
import { useState } from 'react';
import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import logo from '../assets/images/ATFE (1).png'
import bg from '../assets/images/bg8.jpg'
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div style={{
      backgroundImage:`url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize:1550
    }}>
    <nav className="fixed left-0 right-0 top-0 z-10 mx-auto max-w-full overflow-hidden border-[1px] border-blue-300 bg-[#cee1ee] backdrop-filter backdrop-blur-lg backdrop-saturate-150  md:rounded-b-xl">
      <div className="flex items-center justify-between px-5 py-5">
        <div className="hidden items-center gap-4 md:flex">
          <Link to='/vs'>
          <a
            href="#"
            className="group relative overflow-hidden rounded-lg px-4 py-3 transition-all hover:shadow-lg active:scale-95 text-gray-700 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
          >
            <span className="relative z-10 transition-colors group-hover:text-gray-900">Traffic Services</span>
          </a>
          </Link>
          <Link to='/es'>
          <a
           
            className="group relative overflow-hidden rounded-lg px-4 py-3 transition-all hover:shadow-lg active:scale-95 text-gray-700 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
          >
            <span className="relative z-10 transition-colors group-hover:text-gray-900">Electricity Services</span>
          </a>
          </Link>
          
        </div>
        <span className="pointer-events-none relative left-0 top-[50%] z-10 text-4xl font-black text-blue-900 md:absolute md:left-[50%] md:-translate-x-[50%] md:-translate-y-[50%]">  <img
            src={logo}
           
            className=" items-center text-center ml-[50px]"
            style={{ width: '50px', height: '50px' }}
          /></span>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
          <Link to='/dashboard'>
            <button
              className="group relative overflow-hidden rounded-lg px-4 py-2 transition-all hover:shadow-lg active:scale-95 text-gray-700  bg-opacity-20 backdrop-filter "
            >
              <span className="relative z-10 transition-colors group-hover:text-gray-900"><Avatar sx={{ bgcolor: deepPurple[500] }}>TV</Avatar></span>
            </button>
            </Link>
          </div>
       
          <button
            onClick={toggleMenu}
            className="ml-2 block text-3xl text-gray-700 transition-all hover:shadow-lg active:scale-95 md:hidden"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden md:hidden"
      >
        <div className="flex flex-col items-center px-4 pb-4">
          <Link to='/vs'>
          <a
            href="#"
            className="text-gray-700 transition-all hover:shadow-lg active:scale-95 bg-white- bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg px-4 py-2 mb-2"
          >
            Traffic Services
          </a>
          </Link>

<Link to='/es'>          <a
            href="#"
            className="text-gray-700 transition-all hover:shadow-lg active:scale-95 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg px-4 py-2 mb-2"
          >
            Electricity Services
          </a>
          </Link>
          <Link to='/dashboard'>
          <button
            className="group relative overflow-hidden rounded-lg px-4 py-2 transition-all hover:shadow-lg active:scale-95 text-gray-700 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
          >
            <span className="relative z-10 transition-colors group-hover:text-gray-900"><Avatar sx={{ bgcolor: deepPurple[500] }}>TV</Avatar></span>
          </button>
          </Link>
        </div>
      </motion.div>
    </nav>
    </div>
    </>
  );
};

export default Home;