import { useState, useEffect, useRef } from 'react';

const AnimatedText = ({ text, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {text.split('').map((char, idx) => (
        <span
          key={idx}
          className={`inline-block transition-all duration-700 ease-out bg-gradient-to-r from-pink-300 via-purple-300 to-orange-300 bg-clip-text text-transparent ${
            isVisible 
              ? 'opacity-100 translate-y-0 scale-100 rotate-0' 
              : 'opacity-0 translate-y-12 scale-50 -rotate-12'
          }`}
          style={{ 
            transitionDelay: `${idx * 50}ms`,
            transformOrigin: 'center bottom'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;