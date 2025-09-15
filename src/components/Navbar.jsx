import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      if (!navbarRef.current) return;
      
      if (window.scrollY > 50) {
        gsap.to(navbarRef.current, {
          height: '70px',
          background: 'rgba(10, 10, 10, 0.98)',
          backdropFilter: 'blur(10px)',
          duration: 0.3
        });
        navbarRef.current.classList.add('navbar--scrolled');
      } else {
        gsap.to(navbarRef.current, {
          height: '80px',
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(5px)',
          duration: 0.3
        });
        navbarRef.current.classList.remove('navbar--scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate logo and nav items on load
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );
    }

    if (navItemsRef.current.length > 0) {
      gsap.fromTo(navItemsRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.4 }
      );
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Open mobile menu
      gsap.to(mobileMenuRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
      // Add backdrop
      document.body.style.overflow = 'hidden';
    } else {
      // Close mobile menu
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          document.body.style.overflow = 'auto';
        }
      });
    }
  };

  const handleNavItemHover = (index) => {
    const item = navItemsRef.current[index];
    if (!item) return;
    
    gsap.to(item, {
      color: '#3498db',
      duration: 0.3
    });
    
    const underline = item.querySelector('.navbar__underline');
    if (underline) {
      gsap.to(underline, {
        width: '100%',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleNavItemHoverOut = (index) => {
    const item = navItemsRef.current[index];
    if (!item) return;
    
    gsap.to(item, {
      color: '#f2f2f2',
      duration: 0.3
    });
    
    const underline = item.querySelector('.navbar__underline');
    if (underline) {
      gsap.to(underline, {
        width: '0%',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMobileNavClick = (id) => {
    toggleMenu();
    // Scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo" ref={logoRef}>
          <span className="navbar__logo-text">CARRIO MOTORS</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar__links">
          <li className="navbar__item">
            <a
              href="#home"
              className="navbar__link"
              ref={el => navItemsRef.current[0] = el}
              onMouseEnter={() => handleNavItemHover(0)}
              onMouseLeave={() => handleNavItemHoverOut(0)}
            >
              Home
              <span className="navbar__underline"></span>
            </a>
          </li>
    
          <li className="navbar__item">
            <NavLink
              to="/about"
              className="navbar__link"
              ref={el => navItemsRef.current[2] = el}
              onMouseEnter={() => handleNavItemHover(2)}
              onMouseLeave={() => handleNavItemHoverOut(2)}
            >
              About
              <span className="navbar__underline"></span>
            </NavLink>
          </li>
                <li className="navbar__item">
            <a
              href="#finance"
              className="navbar__link"
              ref={el => navItemsRef.current[1] = el}
              onMouseEnter={() => handleNavItemHover(1)}
              onMouseLeave={() => handleNavItemHoverOut(1)}
            >
              Finance
              <span className="navbar__underline"></span>
            </a>
          </li>
          <li className="navbar__item">
            <a
              href="#warranty"
              className="navbar__link"
              ref={el => navItemsRef.current[3] = el}
              onMouseEnter={() => handleNavItemHover(3)}
              onMouseLeave={() => handleNavItemHoverOut(3)}
            >
              Warranty
              <span className="navbar__underline"></span>
            </a>
          </li>
          <li className="navbar__item">
            <a
              href="#contact"
              className="navbar__link"
              ref={el => navItemsRef.current[4] = el}
              onMouseEnter={() => handleNavItemHover(4)}
              onMouseLeave={() => handleNavItemHoverOut(4)}
            >
              Contact
              <span className="navbar__underline"></span>
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          ref={toggleRef}
        >
          <span className="navbar__toggle-line"></span>
          <span className="navbar__toggle-line"></span>
          <span className="navbar__toggle-line"></span>
          {/* <Menu className='navbar__toggle-line'/> */}
        </button>

        {/* Mobile Navigation */}
        <div className="navbar__mobile-menu" ref={mobileMenuRef}>
          <div className="navbar__mobile-links">
            <a 
              href="#home" 
              className="navbar__mobile-link"
              onClick={() => handleMobileNavClick('home')}
            >
              Home
            </a>
            <a 
              href="#inventory" 
              className="navbar__mobile-link"
              onClick={() => handleMobileNavClick('inventory')}
            >
              Inventory
            </a>
            <a 
              href="#about" 
              className="navbar__mobile-link"
              onClick={() => handleMobileNavClick('about')}
            >
              About
            </a>
            <a 
              href="#finance" 
              className="navbar__mobile-link"
              onClick={() => handleMobileNavClick('finance')}
            >
              Finance
            </a>
            <a 
              href="#contact" 
              className="navbar__mobile-link"
              onClick={() => handleMobileNavClick('contact')}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
      
      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div className="navbar__backdrop" onClick={toggleMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;