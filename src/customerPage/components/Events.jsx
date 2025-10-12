import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';

const Events = ({ onBookNow }) => {
  const events = [
    {
      id: 1,
      title: "GAMBIT'S GIRLS NIGHT PARTY",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagit libero dignissim erat ultricies ut non-rhoque ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagit libero dignissim erat ultricies ut non-rhoque ullamcorper.",
      dj: "DJ BUTTERFLY & DJ OEBUS-ISUB",
      date: "TUESDAY 30 MAR 2021",
      bookingDate: "2024-12-30", // ISO format for date input
  image: "/images/AGWA3.jpg",
      featured: true
    },
    {
      id: 2,
      title: "CRAZY CITYLIGHT PARTY",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagit libero dignissim erat ultricies ut non-rhoque ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      dj: "DJ MEEK & DJ AIJAL",
      date: "WEDNESDAY 31 MAR 2021",
      bookingDate: "2024-12-31", // ISO format for date input
  image: "/images/AGWA4.jpg",
      featured: false
    },
    {
      id: 3,
      title: "APRIL VIP PARTY",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagit libero dignissim erat ultricies ut non-rhoque ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      dj: "DJ RHOMA & DJ DADANG",
      date: "THURSDAY 1 APRIL 2021",
      bookingDate: "2025-04-01", // ISO format for date input
  image: "/images/AGWA5.jpg",
      featured: false
    }
  ];

  const handleBookTicket = (event) => {
    if (onBookNow) {
      onBookNow(event.bookingDate);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes flowingGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        .event-card {
          position: relative;
          overflow: hidden;
        }
        
        .event-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.1), transparent);
          animation: shimmerMove 3s infinite;
          pointer-events: none;
        }
        
        .gradient-border {
          position: relative;
        }
        
        .gradient-border::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, #ec4899, #a855f7, #ef4444);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .event-card:hover .gradient-border::after {
          opacity: 1;
        }
      `}</style>
      
    <section className="py-24 px-4 bg-gradient-to-b from-[#1a0f2e] via-[#0a0a12] to-[#0a0a12] relative" aria-labelledby="events-heading">
      {/* Ambient background glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/8 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h2 id="events-heading" className="text-5xl md:text-6xl font-bold mb-3">
              <span 
                className="inline-block"
                style={{
                  background: 'linear-gradient(90deg, #ec4899, #a855f7, #ef4444, #a855f7, #ec4899)',
                  backgroundSize: '200% 100%',
                  animation: 'flowingGradient 3s ease infinite',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(236, 72, 153, 0.4), 0 0 80px rgba(168, 85, 247, 0.3)',
                  filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))'
                }}
              >
                UPCOMING
              </span>
              {' '}
              <span className="text-[#cccbd0]">EVENTS</span>
            </h2>
            <p className="text-gray-400 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              Don't miss out on the hottest nights
            </p>
          </div>
          
          <button className="group relative bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105">
            View All Events
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 rounded-full blur-xl opacity-50 bg-gradient-to-r from-pink-500 to-purple-600 -z-10"></span>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Event - Large Card */}
          <article className="event-card gradient-border bg-gradient-to-br from-[#1a1333] to-[#140f2d] rounded-3xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500 border border-pink-500/20 shadow-2xl group">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={events[0].image} 
                alt={`${events[0].title} event photo`}
                className="w-full h-full object-cover object-[center_20%] opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140f2d] via-[#140f2d]/60 to-transparent" />
              
              {/* Featured badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <Sparkles className="w-4 h-4" />
                FEATURED
              </div>
              
              {/* Floating date badge */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-pink-500/30 rounded-xl px-4 py-3 group-hover:scale-105 transition-transform">
                <p className="text-pink-400 text-xs font-semibold mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  EVENT DATE
                </p>
                <p className="text-white font-bold">{events[0].date}</p>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
                {events[0].title}
              </h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">{events[0].description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Performing Live</p>
                    <p className="text-pink-400 font-bold">{events[0].dj}</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleBookTicket(events[0])}
                className="group/btn relative w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-500/50 overflow-hidden"
              >
                <span className="relative z-10">Book Ticket Now</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
              </button>
            </div>
          </article>

          {/* Other Events - Compact Cards */}
          <div className="space-y-6">
            {events.slice(1).map((event, index) => (
              <article key={event.id} className="event-card gradient-border bg-gradient-to-br from-[#1a1333] to-[#140f2d] rounded-2xl overflow-hidden flex hover:transform hover:scale-[1.02] transition-all duration-500 border border-purple-500/20 shadow-xl group">
                <div className="w-48 aspect-square relative overflow-hidden flex-shrink-0">
                  <img 
                    src={event.image} 
                    alt={`${event.title} event photo`}
                    className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#140f2d]/40 to-[#140f2d]" />
                  
                  {/* Accent corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-transparent" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">{event.description}</p>
                  </div>
                  
                  <div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <p className="text-purple-400 font-semibold text-sm">{event.dj}</p>
                      </div>
                      <p className="text-gray-400 text-xs flex items-center gap-2 ml-6">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleBookTicket(event)}
                      className="group/btn relative bg-transparent border-2 border-pink-500/50 text-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent px-5 py-2.5 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-pink-500/30"
                    >
                      Book Ticket
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Events;
