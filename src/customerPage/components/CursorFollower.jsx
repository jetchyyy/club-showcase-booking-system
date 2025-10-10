import { useState, useEffect } from 'react';

const CursorFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) =>
      setIsHovering(e.target.tagName === 'BUTTON' || e.target.tagName === 'A');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
      style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        className={`bg-pink-500/30 rounded-full transition-all duration-300 ${
          isHovering ? 'w-16 h-16' : 'w-8 h-8'
        }`}
        style={{ filter: 'blur(8px)' }}
      />
    </div>
  );
};

export default CursorFollower;
