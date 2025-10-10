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
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
      <FloatingParticles />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 128, 171, 0.3), transparent 50%)',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-pink-400 animate-pulse" />
          </div>

    <AnimatedText
  text="PARE RANGERS"
  className="text-6xl md:text-8xl font-bold mb-6"
/>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Cebu's Premier Nightlife Destination
          </p>
          <p className="text-lg mb-10 text-gray-300 max-w-2xl mx-auto">
            Experience the ultimate night out with world-class DJs, VIP table service, and an electric atmosphere.
          </p>

          <MagneticButton
            onClick={onBookNow}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
          >
            Book Your Table Now
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
