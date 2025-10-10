import { useState } from 'react';
import CursorFollower from './components/CursorFollower';
import Hero from './components/Hero';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import TableBooking from './components/TableBooking';

const CustomerLandingPage = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <CursorFollower />
      <Hero onBookNow={() => setShowBooking(true)} />
      <Features />
      <Gallery />
      <Footer />
      {showBooking && <TableBooking onClose={() => setShowBooking(false)} />}
    </div>
  );
};

export default CustomerLandingPage;
