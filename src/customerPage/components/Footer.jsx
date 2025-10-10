import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-purple-900/20 border-t border-purple-500/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            PARE RANGERS
            </h3>
            <p className="text-gray-400">
              Experience the ultimate nightlife in the heart of Cebu City.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-pink-400 flex-shrink-0 mt-1" />
                <span>IT Park, Lahug, Cebu City, Philippines</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-pink-400" />
                <span>+63 912 345 6789</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-pink-400" />
                <span>info@pulsecebu.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Hours</h4>
            <div className="space-y-2 text-gray-400">
              <p>Friday - Saturday</p>
              <p className="text-pink-400 font-semibold">10:00 PM - 6:00 AM</p>
              <p className="mt-4">Sunday - Thursday</p>
              <p className="text-gray-500">Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 PARE RANGERS. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
