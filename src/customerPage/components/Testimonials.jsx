import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Users, Heart } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Maria Santos",
      role: "VIP Guest",
      image: "/images/AGWA9.jpg",
      rating: 5,
      text: "The best nightclub experience in Cebu! The atmosphere is electric, the DJs are world-class, and the VIP service is absolutely top-notch. Can't wait to come back!",
      event: "Saturday Night Glow Party",
      date: "October 2024"
    },
    {
      id: 2,
      name: "James Rodriguez",
      role: "Regular Patron",
      image: "/images/AGWA8.jpg",
      rating: 5,
      text: "From the moment you step in, you know you're in for an unforgettable night. The sound system is incredible, the crowd is amazing, and the drinks are perfectly crafted.",
      event: "Friday EDM Night",
      date: "September 2024"
    },
    {
      id: 3,
      name: "Sarah Chen",
      role: "Birthday Celebrant",
      image: "/images/AGWA6.jpg",
      rating: 5,
      text: "Celebrated my birthday here and it was phenomenal! The staff went above and beyond to make it special. The energy, the music, the vibes - everything was perfect!",
      event: "Birthday VIP Package",
      date: "August 2024"
    },
    {
      id: 4,
      name: "Miguel Fernandez",
      role: "Music Enthusiast",
      image: "/images/AGWA11.jpg",
      rating: 5,
      text: "The DJ lineup here is unmatched. Every weekend brings something new and exciting. The production quality and light shows are absolutely mind-blowing!",
      event: "Techno Thursday",
      date: "October 2024"
    },
    {
      id: 5,
      name: "Isabella Garcia",
      role: "VIP Member",
      image: "/images/AGWA10.jpg",
      rating: 5,
      text: "This club sets the standard for nightlife in Cebu. Premium service, incredible atmosphere, and always the best crowd. It's my go-to spot every weekend!",
      event: "VIP Members Night",
      date: "September 2024"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .testimonial-card {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .shimmer-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.1), transparent);
          animation: shimmer 3s infinite;
        }
      `}</style>
    <section 
      id="reviews"
      className="py-24 px-4 bg-gradient-to-b from-[#0a0a12] to-[#1a0f2e] relative overflow-hidden" 
      aria-labelledby="testimonials-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/5 via-transparent to-purple-900/5 pointer-events-none"></div>
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-pink-500/20">
            <Users className="w-5 h-5 text-pink-400" />
            <span className="text-pink-400 font-semibold text-sm uppercase tracking-wider">What Our Guests Say</span>
          </div>
          
          <h2 id="testimonials-heading" className="text-5xl md:text-6xl font-bold mb-6">
            <span 
              style={{
                background: 'linear-gradient(90deg, #ec4899, #a855f7, #ef4444, #a855f7, #ec4899)',
                backgroundSize: '200% 100%',
                animation: 'flowingGradient 3s ease infinite',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Real Experiences
            </span>
            {' '}
            <span className="text-white">Real Vibes</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our amazing guests who've experienced the ultimate nightlife
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-5xl mx-auto mb-12">
          <div key={activeTestimonial.id} className="testimonial-card relative bg-gradient-to-br from-[#1a1333] to-[#140f2d] rounded-3xl overflow-hidden border border-pink-500/20 shadow-2xl">
            <div className="shimmer-effect absolute inset-0 pointer-events-none"></div>
            
            <div className="relative p-8 md:p-12">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-32 h-32 text-pink-400" />
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-pink-500/30">
                      <img 
                        src={activeTestimonial.image} 
                        alt={activeTestimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-6 italic">
                    "{activeTestimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-xl">{activeTestimonial.name}</h3>
                      <p className="text-pink-400 text-sm">{activeTestimonial.role}</p>
                    </div>
                    <div className="h-8 w-px bg-gradient-to-b from-transparent via-pink-500/50 to-transparent"></div>
                    <div className="text-sm">
                      <p className="text-gray-400">{activeTestimonial.event}</p>
                      <p className="text-gray-500 text-xs">{activeTestimonial.date}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center md:justify-end gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="group p-3 bg-white/5 hover:bg-pink-500/20 border border-pink-500/30 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-pink-400 group-hover:text-pink-300" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="group p-3 bg-white/5 hover:bg-pink-500/20 border border-pink-500/30 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-pink-400 group-hover:text-pink-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-12 h-3 bg-gradient-to-r from-pink-500 to-purple-600'
                    : 'w-3 h-3 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl border border-pink-500/20">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
              10K+
            </div>
            <p className="text-gray-400 text-sm">Happy Guests</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-4xl font-bold text-white">4.9</span>
            </div>
            <p className="text-gray-400 text-sm">Average Rating</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl border border-pink-500/20">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
              500+
            </div>
            <p className="text-gray-400 text-sm">Events Hosted</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-6 h-6 fill-pink-400 text-pink-400" />
              <span className="text-4xl font-bold text-white">98%</span>
            </div>
            <p className="text-gray-400 text-sm">Return Rate</p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Testimonials;
