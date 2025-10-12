import { useState } from 'react';
import { Play, Headphones, Star, Calendar, MapPin } from 'lucide-react';

const DJLineup = () => {
  const [selectedDJ, setSelectedDJ] = useState(null);

  const djLineup = [
    {
      id: 1,
      name: "DJ Yoxi",
      genre: "Techno",
  image: "/images/AGWADJ4.jpg",
      description: "Master of dark techno beats with 10+ years of underground experience",
      specialty: "Progressive Techno",
      nationality: "German",
      rating: 4.9,
      performances: 250,
      social: "@djyoxi",
      gradient: "from-orange-400 to-red-500",
      schedule: "Friday 10PM - 2AM"
    },
    {
      id: 2,
      name: "DJ Lux",
      genre: "EDM & House",
  image: "/images/AGWADJ.jpg", 
      description: "International sensation bringing euphoric drops and infectious energy",
      specialty: "Future House",
      nationality: "Dutch",
      rating: 4.8,
      performances: 180,
      social: "@djluxofficial",
      gradient: "from-pink-400 to-purple-500",
      schedule: "Saturday 11PM - 3AM"
    },
    {
      id: 3,
      name: "DJ Novi",
      genre: "Techno & EDM",
  image: "/images/AGWADJ3.jpg",
      description: "Rising star mixing cutting-edge techno with melodic EDM elements",
      specialty: "Melodic Techno",
      nationality: "Swedish",
      rating: 4.7,
      performances: 120,
      social: "@djnovimusic",
      gradient: "from-blue-400 to-cyan-500",
      schedule: "Sunday 9PM - 1AM"
    },
    {
      id: 4,
      name: "DJ Zara",
      genre: "Deep House",
  image: "/images/AGWADJ2.jpg",
      description: "Ethereal deep house vibes with mesmerizing atmospheric soundscapes",
      specialty: "Ambient House",
      nationality: "French",
      rating: 4.8,
      performances: 195,
      social: "@djzaraofficial",
      gradient: "from-emerald-400 to-teal-500",
      schedule: "Thursday 9PM - 1AM"
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }
        
        .animate-slideInFromBottom {
          animation: slideInFromBottom 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
      
      <section className="py-24 px-4 bg-gradient-to-b from-[#1a0f2e] to-[#0a0a12] relative" aria-labelledby="dj-lineup-heading">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/8 via-transparent to-pink-900/8 pointer-events-none"></div>
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-pink-500/8 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-[#cccbd0]/20">
              <Headphones className="w-5 h-5 text-pink-400" />
              <span className="text-[#cccbd0] text-sm font-medium tracking-wider uppercase">Featured Artists</span>
            </div>
            
            <h2 id="dj-lineup-heading" className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              The next generation <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">of DJS </span>
            </h2>
            
            <p className="text-[#cccbd0] text-lg max-w-3xl mx-auto leading-relaxed">
              Experience the finest electronic music curated by world-class DJs who will take you on an unforgettable sonic journey
            </p>
          </div>

          {/* DJ Cards Grid - Show all 4 at once */}
          <div className="relative mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {djLineup.map((dj, index) => (
                <article
                  key={dj.id}
                  className="group relative bg-black/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-[#cccbd0]/10 hover:border-[#cccbd0]/30 transition-all duration-500 cursor-pointer h-[600px] animate-slideInFromBottom"
                  onMouseEnter={() => setSelectedDJ(dj.id)}
                  onMouseLeave={() => setSelectedDJ(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${dj.name} profile`}
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {/* DJ Image */}
                  <div className="relative h-80 overflow-hidden">
                    {/* Actual DJ image */}
                    <img
                      src={dj.image}
                      alt={`${dj.name} - ${dj.genre} DJ`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${dj.gradient} opacity-40 mix-blend-multiply`}></div>
                    
                    {/* Animated gradient overlay */}
                    <div 
                      className="absolute inset-0 opacity-20 animate-pulse"
                      style={{
                        background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
                        backgroundSize: '200% 200%',
                        animation: 'shimmer 3s infinite linear'
                      }}
                    />
                    
                    {/* Noise texture overlay */}
                    <div className="absolute inset-0 opacity-30" 
                         style={{
                           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                           backgroundSize: '150px 150px'
                         }}
                    />
                    
                    {/* Play button overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all duration-300 ${selectedDJ === dj.id ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 animate-bounce">
                        <Play className="w-6 h-6 text-white ml-1" fill="white" />
                      </div>
                    </div>
                    
                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 animate-fadeIn">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-white text-sm font-semibold">{dj.rating}</span>
                    </div>

                    {/* Live indicator */}
                    {dj.id === 1 && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-500/80 backdrop-blur-sm rounded-full border border-red-400/50">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-xs font-semibold uppercase tracking-wider">Live</span>
                      </div>
                    ) }

                    {/* Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* DJ Information */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-pink-300 transition-colors duration-300 animate-slideInLeft">
                          {dj.name}
                        </h3>
                        <p className="text-[#cccbd0] font-medium animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
                          {dj.genre}
                        </p>
                      </div>
                      
                      <div className="text-right animate-slideInRight">
                        <div className="text-white/60 text-sm mb-1">{dj.performances}+ shows</div>
                        <div className="text-[#cccbd0] text-xs">{dj.nationality}</div>
                      </div>
                    </div>

                    <p className="text-white/70 text-sm leading-relaxed mb-4 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
                      {dj.description}
                    </p>

                    {/* Schedule */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-white/5 rounded-xl border border-[#cccbd0]/10 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
                      <Calendar className="w-4 h-4 text-pink-400" />
                      <span className="text-[#cccbd0] text-sm font-medium">{dj.schedule}</span>
                    </div>

                    {/* Social & Stats */}
                    <div className="flex items-center justify-between animate-slideInUp" style={{ animationDelay: '0.4s' }}>
                      <div className="text-pink-400 text-sm font-medium hover:text-pink-300 transition-colors cursor-pointer">
                        {dj.social}
                      </div>
                      <div className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full border border-pink-500/30">
                        <span className="text-pink-300 text-xs font-semibold uppercase tracking-wider">
                          {dj.specialty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dj.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                </article>
              ))}
            </div>

            {/* Visual indicators for all DJs */}
            <div className="text-center mt-8">
              <div className="flex justify-center gap-3">
                {djLineup.map((_, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50 animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-pink-500/25">
                Book VIP Table
              </button>
              <button className="bg-transparent border-2 border-[#cccbd0] text-[#cccbd0] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#cccbd0] hover:text-[#140f2d] transform hover:scale-105 transition-all duration-300">
                View Full Schedule
              </button>
            </div>
            
            <p className="text-[#cccbd0]/60 text-sm mt-6 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              Live performances every weekend • Premium sound system • VIP access available
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DJLineup;