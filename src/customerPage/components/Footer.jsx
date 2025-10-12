import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer 
      id="contact"
      className="bg-gradient-to-b from-[#1a0f2e] to-[#0a0a12] border-t border-purple-500/5 py-16 px-4 relative"
    >
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
                <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                YOUR CLUB
                </h3>
            <p className="text-gray-400">
              Experience the ultimate nightlife in the heart of Cebu City.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="https://maps.google.com/?q=IT+Park+Lahug+Cebu+City+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-400 hover:text-pink-400 transition-colors duration-300 group"
              >
                <MapPin className="w-5 h-5 text-pink-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">IT Park, Lahug, Cebu City, Philippines</span>
              </a>
              <a 
                href="tel:+639123456789"
                className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors duration-300 group"
              >
                <Phone className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">+63 912 345 6789</span>
              </a>
              <a 
                href="mailto:info@pulsecebu.com"
                className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors duration-300 group"
              >
                <Mail className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">info@pulsecebu.com</span>
              </a>
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
              © 2025 YOUR CLUB. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://facebook.com/yourclub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/yourclub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
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
