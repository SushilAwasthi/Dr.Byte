import React, { useState } from 'react';
import { useAuth } from '../../context/context';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing the icons from react-icons


const Header: React.FC = () => {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const NavLink = ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: any }) => {
    if (isHomePage) {
      return (
        <ScrollLink 
          to={to} 
          smooth={true} 
          duration={500} 
          className="cursor-pointer text-white hover:text-[#00ffff] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300"
          {...props}
        >
          {children}
        </ScrollLink>
      );
    }
    return (
      <RouterLink 
        to="/" 
        className="cursor-pointer text-white hover:text-[#00ffff] px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300"
        {...props}
      >
        {children}
      </RouterLink>
    );
  };

  return (
    <nav className="bg-[#05101c] fixed w-full z-30 shadow-lg">
      <div className='flex flex-row justify-between items-center max-w-7xl mx-auto h-[8vh] px-4 md:px-8'>
        {/* logo */}
        <RouterLink to="/">
          <h1 className='text-3xl font-bold text-white'>Dr.BYTE</h1>
        </RouterLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {auth?.isLoggedIn ? (
            <RouterLink 
              to="/" 
              onClick={auth.logout} 
              className="hover:bg-[#006d77] px-4 py-2 rounded-md text-lg font-medium bg-[#006d77] text-white transition-colors duration-300"
            >
              Logout
            </RouterLink>
          ) : (
            <>
              <NavLink to="home">Home</NavLink>
              <NavLink to="services">Services</NavLink>
              <NavLink to="testimonials">Reviews</NavLink>
              <NavLink to="about">About</NavLink>
              <RouterLink 
                to="/login" 
                className="hover:bg-[#006d77] px-4 py-2 rounded-md text-lg font-medium bg-[#006d77] text-white transition-colors duration-300"
              >
                Log In
              </RouterLink>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleMenu} 
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#00ffff] hover:bg-[#006d77] focus:outline-none focus:bg-[#006d77] focus:text-white transition-colors duration-300"
          >
            {menuOpen ? (
              <FaTimes className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <FaBars className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#05101c]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="home" onClick={closeMenu}>Home</NavLink>
            <NavLink to="services" onClick={closeMenu}>Services</NavLink>
            <NavLink to="reviews" onClick={closeMenu}>Reviews</NavLink>
            <NavLink to="about" onClick={closeMenu}>About</NavLink>
            {auth?.isLoggedIn ? (
              <RouterLink 
                to="/" 
                onClick={() => {auth.logout(); closeMenu();}} 
                className="hover:bg-[#006d77] px-4 py-2 rounded-md text-lg font-medium bg-[#006d77] text-white transition-colors duration-300"
              >
                Logout
              </RouterLink>
            ) : (
              <RouterLink 
                to="/login" 
                onClick={closeMenu} 
                className="text-white hover:bg-[#006d77] block px-3 py-2 rounded-md text-base font-medium bg-[#006d77] w-20 transition-colors duration-300"
              >
                Log In
              </RouterLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

