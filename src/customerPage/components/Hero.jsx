import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import AnimatedText from './AnimatedText';
import FloatingParticles from './FloatingParticles';
import MagneticButton from './MagneticButton';

const Hero = ({ onBookNow }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes flowingGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .flowing-gradient-text {
          background: linear-gradient(90deg, #c084fc, #ec4899, #ef4444, #ec4899, #c084fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: flowingGradient 3s ease infinite;
        }
        
        .flowing-gradient-glow {
          background: linear-gradient(90deg, #c084fc, #ec4899, #ef4444, #ec4899, #c084fc);
          background-size: 200% auto;
          animation: flowingGradient 3s ease infinite;
        }
      `}</style>
      <style jsx>{`
        .typing-caret::after {
          content: '';
          display: inline-block;
          width: 1px;
          height: 1em;
          margin-left: 6px;
          background: linear-gradient(90deg, #ec4899, #a855f7);
          animation: blink 1s steps(2, start) infinite;
          vertical-align: bottom;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      {/* TypedDescription component defined below */}
      
    <header 
      id="home"
      className="relative h-screen overflow-hidden"
    >
      {/* Real nightclub photo background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/AGWA2.jpg')",
          transform: `translateY(${scrollY * 0.5}px)` // Parallax effect
        }}
      />
      {/* Dark overlay - fades to dark purple at bottom to blend with Events */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-[#1a0f2e]" />
      
      <FloatingParticles />

      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl">
          <div className="flex justify-center mb-6" aria-hidden="true">
            <Sparkles className="w-16 h-16 text-pink-400" />
          </div>

          <div className="relative inline-block mb-6">
            <span 
              className="text-6xl md:text-8xl font-bold"
              style={{
                background: 'linear-gradient(90deg, #a855f7, #ec4899, #ef4444, #ec4899, #a855f7)',
                backgroundSize: '200% 100%',
                animation: 'flowingGradient 3s ease infinite',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(236, 72, 153, 0.4), 0 0 120px rgba(239, 68, 68, 0.3)',
                filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5)) drop-shadow(0 0 40px rgba(236, 72, 153, 0.3))'
              }}
            >
              YOUR CLUB
            </span>
          </div>
          <h1 className="sr-only">Your club - Cebu's Premier Nightlife Destination</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Cebu's Premier Nightlife Destination
          </p>
          {/* Typed description with blinking caret */}
          <TypedDescription className="text-lg mb-10 text-gray-300 max-w-2xl mx-auto" />

          <div className="relative inline-block">
            <MagneticButton
              onClick={onBookNow}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
              aria-label="Book your VIP table now"
            >
              Book Your Table Now
            </MagneticButton>
            {/* Button glow effects with flowing gradient */}
            <span className="absolute inset-0 flowing-gradient-glow rounded-full blur-xl opacity-50 -z-10"></span>
            <span className="absolute inset-0 flowing-gradient-glow rounded-full blur-2xl opacity-30 -z-10"></span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>
    </header>
    </>
  );
};


// TypedDescription - small inline component that types the hero description
function TypedDescription({ className = '' }) {
  const fullText = 'Experience the ultimate night out with world-class DJs, VIP table service, and an electric atmosphere.';
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((t) => t + fullText[index]);
        setIndex((i) => i + 1);
      }, 24 + Math.random() * 35); // humanized typing speed
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return <p className={`${className} typing-caret`}>{text}</p>;
}

export default Hero;
