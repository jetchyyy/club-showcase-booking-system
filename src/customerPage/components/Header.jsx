import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ onBookNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Events', href: '#events' },
  ];

  const rightNavItems = [
    { name: 'News', href: '#news' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reservation', action: onBookNow },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-md border-b border-[#cccbd0]/20' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-20">
            
            {/* Left Navigation */}
            <div className="hidden lg:flex items-center justify-start space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-[#cccbd0] hover:text-white transition-colors duration-300 font-medium text-sm tracking-wide uppercase"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Center Logo */}
            <div className="flex justify-center">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex items-center justify-center"
              >
                <div className="relative">
                  {/* Glowing ring effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  
                  {/* Logo container */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#140f2d] to-purple-900 border-2 border-[#cccbd0]/30 flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-2xl">
                    {/* Logo text */}
                    <div className="text-center">
                      <div className="text-[#cccbd0] font-bold text-xl leading-none">YOUR</div>
                      <div className="text-white font-bold text-xs leading-none tracking-wider">CLUB</div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center justify-end space-x-8">
              {rightNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => item.action ? item.action() : scrollToSection(item.href)}
                  className={`font-medium text-sm tracking-wide uppercase transition-all duration-300 ${
                    item.name === 'Reservation' 
                      ? 'bg-gradient-to-r from-[#cccbd0] to-white text-[#140f2d] px-6 py-2 rounded-full hover:from-white hover:to-[#cccbd0] transform hover:scale-105 shadow-lg'
                      : 'text-[#cccbd0] hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#cccbd0] hover:text-white transition-colors duration-300 p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Menu Content */}
        <div className="relative flex flex-col items-center justify-center h-full space-y-8">
          {/* All nav items in mobile */}
          {[...navItems, ...rightNavItems].map((item) => (
            <button
              key={item.name}
              onClick={() => item.action ? item.action() : scrollToSection(item.href)}
              className={`font-medium text-lg tracking-wide uppercase transition-all duration-300 ${
                item.name === 'Reservation' 
                  ? 'bg-gradient-to-r from-[#cccbd0] to-white text-[#140f2d] px-8 py-3 rounded-full transform hover:scale-105 shadow-lg'
                  : 'text-[#cccbd0] hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;