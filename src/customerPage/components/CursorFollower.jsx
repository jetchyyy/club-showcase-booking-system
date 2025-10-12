import { useState, useEffect, useRef } from 'react';

const CursorFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let isScheduled = false;

    const handleMouseMove = (e) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      
      // Use RAF to throttle updates to 60fps max
      if (!isScheduled) {
        isScheduled = true;
        rafRef.current = requestAnimationFrame(() => {
          setMousePos(lastPosRef.current);
          isScheduled = false;
        });
      }
    };

    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest('button, a, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    // Passive event listeners for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${mousePos.x - (isHovering ? 32 : 16)}px, ${mousePos.y - (isHovering ? 32 : 16)}px, 0)`,
        willChange: 'transform'
      }}
      aria-hidden="true"
    >
      <div
        className={`bg-pink-500/20 rounded-full transition-all duration-200 ease-out`}
        style={{
          width: isHovering ? '64px' : '32px',
          height: isHovering ? '64px' : '32px',
          filter: 'blur(12px)',
          willChange: 'width, height'
        }}
      />
    </div>
  );
};

export default CursorFollower;
