import { useState } from 'react';
import { Play, Headphones, Star, Calendar, MapPin } from 'lucide-react';

const DJLineup = () => {
  const [selectedDJ, setSelectedDJ] = useState(null);

  const djLineup = [
    {
      id: 1,
      name: 'DJ Yoxi',
      genre: 'Techno',
      image: '/images/AGWADJ4.jpg',
      description: 'Master of dark techno beats with 10+ years of underground experience',
      specialty: 'Progressive Techno',
      nationality: 'German',
      rating: 4.9,
      performances: 250,
      social: '@djyoxi',
      gradient: 'from-orange-400 to-red-500',
      schedule: 'Friday 10PM - 2AM'
    },
    {
      id: 2,
      name: 'DJ Lux',
      genre: 'EDM & House',
      image: '/images/AGWADJ.jpg', 
      description: 'International sensation bringing euphoric drops and infectious energy',
      specialty: 'Future House',
      nationality: 'Dutch',
      rating: 4.8,
      performances: 180,
      social: '@djluxofficial',
      gradient: 'from-pink-400 to-purple-500',
      schedule: 'Saturday 11PM - 3AM'
    },
    {
      id: 3,
      name: 'DJ Novi',
      genre: 'Techno & EDM',
      image: '/images/AGWADJ3.jpg',
      description: 'Rising star mixing cutting-edge techno with melodic EDM elements',
      specialty: 'Melodic Techno',
      nationality: 'Swedish',
      rating: 4.7,
      performances: 120,
      social: '@djnovimusic',
      gradient: 'from-blue-400 to-cyan-500',
      schedule: 'Sunday 9PM - 1AM'
    },
    {
      id: 4,
      name: 'DJ Zara',
      genre: 'Deep House',
      image: '/images/AGWADJ2.jpg',
      description: 'Ethereal deep house vibes with mesmerizing atmospheric soundscapes',
      specialty: 'Ambient House',
      nationality: 'French',
      rating: 4.8,
      performances: 195,
      social: '@djzaraofficial',
      gradient: 'from-emerald-400 to-teal-500',
      schedule: 'Thursday 9PM - 1AM'
    }
  ];
  return (
    <section id='djs' className='py-24 px-4 bg-gradient-to-b from-[#1a0f2e] to-[#0a0a12] relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/8 via-transparent to-pink-900/8 pointer-events-none'></div>
      <div className='max-w-7xl mx-auto relative z-10'>
        <div className='text-center mb-16'>
          <h2 className='text-5xl md:text-7xl font-bold mb-6 text-white'>
            The next generation <span className='bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent'>of DJS</span>
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {djLineup.map((dj) => (
            <article key={dj.id} className='group relative bg-black/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-[#cccbd0]/10 hover:border-[#cccbd0]/30 transition-all duration-500 cursor-pointer h-[600px]'>
              <div className='relative h-80 overflow-hidden'>
                <img src={dj.image} alt={dj.name} className='absolute inset-0 w-full h-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20'></div>
              </div>
              <div className='p-6'>
                <h3 className='text-2xl font-bold text-white mb-1'>{dj.name}</h3>
                <p className='text-[#cccbd0] font-medium'>{dj.genre}</p>
                <p className='text-white/70 text-sm mt-4'>{dj.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className='text-center'>
          <div className='inline-flex gap-4'>
            <button className='bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform'>Book VIP Table</button>
            <button className='border-2 border-[#cccbd0] text-[#cccbd0] px-8 py-4 rounded-full font-bold hover:bg-[#cccbd0] hover:text-[#140f2d] transition-all'>View Full Schedule</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DJLineup;
