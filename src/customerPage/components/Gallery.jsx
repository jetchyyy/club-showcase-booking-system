import { useState } from 'react';
import { Play, Volume2, Sparkles, Camera, Music, HatGlasses } from 'lucide-react';

const Gallery = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const galleryItems = [
    // Large featured items
    { 
      id: 1, 
      type: 'hero', 
      size: 'large', 
      image: 'src/assets/AGWA1.jpg',
      label: 'Main Dance Floor', 
      subtitle: 'Where the magic happens',
      icon: Music,
      description: 'State-of-the-art sound system with LED visuals',
      gridClass: 'col-span-2 row-span-2'
    },
    
    // Medium items
    { 
      id: 2, 
      type: 'vip', 
      size: 'medium', 
      image: 'src/assets/AGWA9.jpg',
      label: 'VIP Lounge', 
      subtitle: 'Exclusive experience',
      icon: Sparkles,
      description: 'Premium bottle service & private seating',
      gridClass: 'col-span-1 row-span-2'
    },
    
    // Small items
    { 
      id: 3, 
      type: 'dj', 
      size: 'small', 
      image: 'src/assets/AGWA6.jpg',
      label: 'DJ Booth', 
      subtitle: 'Professional setup',
      icon: Volume2,
      description: 'World-class DJ equipment',
      gridClass: 'col-span-1 row-span-1'
    },
    { 
      id: 4, 
      type: 'events', 
      size: 'small', 
      image: 'src/assets/AGWA11.jpg',
      label: 'Events and themes', 
      subtitle: 'Themed nights & special events',
      icon: HatGlasses,
      description: 'Signature drinks & premium spirits', 
      gridClass: 'col-span-1 row-span-1'
    },
    
    // Wide items
    { 
      id: 5, 
      type: 'crowd', 
      size: 'wide', 
      image: 'src/assets/AGWA8.jpg',
      label: 'Crowd', 
      subtitle: 'Exciting atmosphere',
      icon: Camera,
      description: 'Perfect for photos & fresh air',
      gridClass: 'col-span-2 row-span-1'
    },
    
    // Additional small items
    { 
      id: 6, 
      type: 'backdrop', 
      size: 'wide', 
      image: 'src/assets/AGWA10.jpg',
      label: 'Backdrop', 
      subtitle: 'Iconic AGWA Backdrop',
      icon: Play,
      description: 'Dynamic backdrop experience',
      gridClass: 'col-span-1 row-span-1'
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#0a0a12] relative overflow-hidden" aria-labelledby="gallery-heading">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-pink-900/5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/8 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 id="gallery-heading" className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Experience{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                The Vibe
              </span>
              {/* Neon glow effects */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse">
                The Vibe
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent blur-2xl opacity-30">
                The Vibe
              </span>
            </span>
          </h2>
          <p className="text-[#cccbd0] text-lg max-w-2xl mx-auto">
            Immerse yourself in an unforgettable nightlife experience with world-class amenities
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 h-[800px] md:h-[600px]">
          {galleryItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <article
                key={item.id}
                className={`relative ${item.gridClass} rounded-2xl overflow-hidden group cursor-pointer border border-[#cccbd0]/10`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                role="img"
                aria-label={`${item.label} - ${item.description}`}
              >
                {/* Image background */}
                <img
                  src={item.image}
                  alt={item.label}
                  className={`absolute inset-0 w-full h-full object-cover ${item.id === 6 ? 'object-[top_90%]' : ''} opacity-70 group-hover:opacity-90 transition-all duration-500`}
                />

                {/* Animated overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500" />

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br blur-xl" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6">
                  {/* Top section with icon */}
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 ${hoveredItem === item.id ? 'scale-110 rotate-6' : ''}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {item.size === 'large' && (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom content */}
                  <div className={`transition-all duration-300 ${hoveredItem === item.id ? 'transform translate-y-0' : ''}`}>
                    <div className="mb-2">
                      <h3 className="text-white font-bold text-lg md:text-xl leading-tight">
                        {item.label}
                      </h3>
                      <p className="text-white/80 text-sm font-medium">
                        {item.subtitle}
                      </p>
                    </div>
                    
                    {/* Description appears on hover */}
                    <div className={`transition-all duration-300 overflow-hidden ${hoveredItem === item.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-white/70 text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Hover border effect */}
                <div className={`absolute inset-0 border-2 border-[#cccbd0]/0 group-hover:border-[#cccbd0]/30 rounded-2xl transition-all duration-300`}></div>
              </article>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-[#cccbd0] to-white text-[#140f2d] px-8 py-4 rounded-full font-bold text-lg hover:from-white hover:to-[#cccbd0] transform hover:scale-105 transition-all duration-300 shadow-2xl">
            View Full Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;