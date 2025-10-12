import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = ({ onBookNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = ['home', 'events', 'gallery', 'djs', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
  ];

  const rightNavItems = [
    { name: 'DJs', href: '#djs' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
    { name: 'Reservation', action: onBookNow },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80; // Height of fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes neonPulse {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(168, 85, 247, 0.8),
              0 0 20px rgba(168, 85, 247, 0.6),
              0 0 30px rgba(168, 85, 247, 0.4),
              0 0 40px rgba(168, 85, 247, 0.2);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(168, 85, 247, 1),
              0 0 30px rgba(168, 85, 247, 0.8),
              0 0 40px rgba(168, 85, 247, 0.6),
              0 0 60px rgba(168, 85, 247, 0.4);
          }
        }

        @keyframes logoGlow {
          0%, 100% {
            box-shadow: 
              0 0 20px rgba(168, 85, 247, 0.5),
              0 0 40px rgba(168, 85, 247, 0.3),
              0 0 60px rgba(168, 85, 247, 0.1),
              inset 0 0 20px rgba(168, 85, 247, 0.2);
          }
          50% {
            box-shadow: 
              0 0 30px rgba(168, 85, 247, 0.8),
              0 0 60px rgba(168, 85, 247, 0.5),
              0 0 90px rgba(168, 85, 247, 0.3),
              inset 0 0 30px rgba(168, 85, 247, 0.4);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

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

        .logo-glow {
          animation: logoGlow 3s ease-in-out infinite;
        }

        .neon-text {
          animation: neonPulse 2s ease-in-out infinite;
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .glass-header {
          background: rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(25px) !important;
          -webkit-backdrop-filter: blur(25px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.4),
            0 0 80px rgba(168, 85, 247, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header-transparent {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom: none !important;
          box-shadow: none !important;
        }

        .glass-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.15) 0%,
            rgba(147, 51, 234, 0.08) 25%,
            transparent 50%,
            rgba(236, 72, 153, 0.08) 75%,
            rgba(236, 72, 153, 0.15) 100%
          );
          z-index: -1;
          opacity: 0;
          animation: glassShimmer 4s ease-in-out infinite;
        }

        @keyframes glassShimmer {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(-10px);
          }
          50% {
            opacity: 0.6;
            transform: translateX(10px);
          }
        }
      `}</style>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'glass-header' 
            : 'header-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-20">
            
            {/* Left Navigation */}
            <div className="hidden lg:flex items-center justify-start space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative transition-all duration-300 font-semibold text-sm tracking-wider uppercase group ${
                      isActive ? 'text-white' : 'text-[#cccbd0] hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className={`absolute inset-0 h-[2px] bottom-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                    <span className={`absolute inset-0 blur-md bg-gradient-to-r from-purple-500/50 to-pink-500/50 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></span>
                  </button>
                );
              })}
            </div>

            {/* Center Logo */}
            <div className="flex justify-center">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex items-center justify-center relative"
              >
                <div className="relative">
                  {/* Outer glow rings */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500 scale-150"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-xl animate-pulse"></div>
                  
                  {/* Logo container with glow animation */}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#140f2d] via-purple-900 to-[#140f2d] border-2 border-purple-500/50 flex items-center justify-center group-hover:scale-110 transition-all duration-500 logo-glow overflow-hidden">
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Sparkle icon */}
                    <Sparkles className="absolute top-1 right-1 w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-180" />
                    <Sparkles className="absolute bottom-1 left-1 w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-rotate-180" />
                    
                    {/* Logo text with neon effect */}
                    <div className="text-center relative z-10">
                      <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 font-black text-2xl leading-none tracking-tight neon-text">
                        Your
                      </div>
                      <div className="text-white font-bold text-[10px] leading-none tracking-[0.2em] mt-0.5 opacity-90">
                        NIGHTCLUB
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center justify-end space-x-8">
              {rightNavItems.map((item) => {
                const isActive = item.href && activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.name}
                    onClick={() => item.action ? item.action() : scrollToSection(item.href)}
                    className={`font-semibold text-sm tracking-wider uppercase transition-all duration-300 ${
                      item.name === 'Reservation' 
                        ? 'relative bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-purple-500 hover:via-pink-400 hover:to-purple-500 transform hover:scale-105 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 overflow-hidden group'
                        : `relative group ${isActive ? 'text-white' : 'text-[#cccbd0] hover:text-white'}`
                    }`}
                  >
                    {item.name === 'Reservation' && (
                      <>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></span>
                        <Sparkles className="inline-block w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                      </>
                    )}
                    <span className="relative z-10">{item.name}</span>
                    {item.name !== 'Reservation' && (
                      <>
                        <span className={`absolute inset-0 h-[2px] bottom-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                        <span className={`absolute inset-0 blur-md bg-gradient-to-r from-purple-500/50 to-pink-500/50 transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}></span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative text-[#cccbd0] hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-purple-500/20 group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></span>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 relative z-10" />
                ) : (
                  <Menu className="h-6 w-6 relative z-10" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop with gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 animate-pulse"></div>
        </div>
        
        {/* Menu Content */}
        <div className={`relative flex flex-col items-center justify-center h-full space-y-6 transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-y-0' : 'translate-y-10'
        }`}>
          {/* Logo in mobile menu */}
          <div className="mb-4">
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#140f2d] via-purple-900 to-[#140f2d] border-2 border-purple-500/50 flex items-center justify-center logo-glow">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-xl animate-pulse"></div>
              <div className="text-center relative z-10">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 font-black text-3xl leading-none tracking-tight neon-text">
                  AGWA
                </div>
                <div className="text-white font-bold text-xs leading-none tracking-[0.2em] mt-1 opacity-90">
                  NIGHTCLUB
                </div>
              </div>
            </div>
          </div>

          {/* All nav items in mobile */}
          {[...navItems, ...rightNavItems].map((item, index) => {
            const isActive = item.href && activeSection === item.href.replace('#', '');
            return (
              <button
                key={item.name}
                onClick={() => item.action ? item.action() : scrollToSection(item.href)}
                className={`font-semibold text-lg tracking-wider uppercase transition-all duration-300 transform hover:scale-105 ${
                  item.name === 'Reservation' 
                    ? 'relative bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white px-10 py-4 rounded-full shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 group overflow-hidden'
                    : `relative group ${isActive ? 'text-white' : 'text-[#cccbd0] hover:text-white'}`
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMobileMenuOpen ? 'fadeIn 0.5s ease-out forwards' : 'none'
                }}
              >
                {item.name === 'Reservation' && (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></span>
                    <Sparkles className="inline-block w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  </>
                )}
                <span className="relative z-10">{item.name}</span>
                {item.name !== 'Reservation' && (
                  <span className={`absolute bottom-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 h-[2px] ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Header;