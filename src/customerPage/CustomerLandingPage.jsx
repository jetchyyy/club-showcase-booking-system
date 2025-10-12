import { useState } from 'react';
import CursorFollower from './components/CursorFollower';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Events';
import Gallery from './components/Gallery';
import DJLineup from './components/DJLineup';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import TableBooking from './components/TableBooking';

const CustomerLandingPage = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [prefilledDate, setPrefilledDate] = useState('');

  const handleBookNow = (eventDate = '') => {
    setPrefilledDate(eventDate);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <CursorFollower />
      <Header onBookNow={() => handleBookNow()} />
      <Hero onBookNow={() => handleBookNow()} />
      <main>
        <Features onBookNow={handleBookNow} />
        <Gallery />
        <DJLineup />
        <Testimonials />
      </main>
      <Footer />
      {showBooking && (
        <TableBooking 
          onClose={() => setShowBooking(false)} 
          prefilledDate={prefilledDate}
        />
      )}
    </div>
  );
};

export default CustomerLandingPage;
