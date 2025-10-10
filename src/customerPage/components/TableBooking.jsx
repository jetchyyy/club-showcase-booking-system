import { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, DollarSign } from 'lucide-react';
import floorPlanImage from '../../assets/AGWATable.png';

const TableBooking = ({ onClose, prefilledDate = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    tableType: 'standard',
    tableNumber: null
  });

  // Update date when prefilledDate prop changes
  useEffect(() => {
    if (prefilledDate) {
      setFormData(prev => ({
        ...prev,
        date: prefilledDate
      }));
    }
  }, [prefilledDate]);

  const tables = [
    { id: 'ct', name: 'Cocktail Table', price: '₱1,500', capacity: '2-4 people' },
    { id: 'sc', name: 'Standard Circle', price: '₱2,500', capacity: '4-6 people' },
    { id: 'vip', name: 'VIP Table', price: '₱4,500', capacity: '6-8 people' },
    { id: 'vvip', name: 'VVIP Table', price: '₱6,000', capacity: '8-10 people' }
  ];

  // Define coordinates and labels (based on actual floor plan)
  const areas = [
    // LEFT SIDE VIP BOOTHS (VIP1-VIP5)
    { id: "VIP1", top: "12%", left: "26%", type: "vip", booked: false },
    { id: "VVIP2", top: "12%", left: "8%", type: "vvip", booked: false },
    { id: "VIP2", top: "25%", left: "26%", type: "vip", booked: false },
    { id: "VIP3", top: "42%", left: "26%", type: "vip", booked: true },
    { id: "VIP4", top: "59%", left: "26%", type: "vip", booked: false },
    { id: "VVIP1", top: "60%", left: "7%", type: "vvip", booked: false },
    
    // RIGHT SIDE ELEMENTS
    { id: "VIP9", top: "12%", left: "75%", type: "vvip", booked: false },
    { id: "VIP10", top: "43%", left: "92%", type: "vip", booked: true },
    { id: "SC1", top: "25%", left: "72%", type: "sc", booked: false },
    { id: "SC2", top: "25%", left: "83%", type: "sc", booked: false },
    { id: "SC3", top: "43%", left: "83%", type: "sc", booked: false },
    { id: "SC4", top: "43%", left: "72%", type: "sc", booked: true },
    { id: "VVIP3", top: "12%", left: "92%", type: "vvip", booked: true },

    // BOTTOM CENTER (VIPS + SC)
    { id: "VIPS1", top: "85%", left: "35%", type: "vvip", booked: false },
    { id: "VIPS2", top: "92%", left: "50%", type: "vvip", booked: false },
    { id: "VIPS3", top: "85%", left: "65%", type: "vvip", booked: false },
    { id: "SC5", top: "78%", left: "50%", type: "sc", booked: false },
    { id: "SC6", top: "73%", left: "26%", type: "sc", booked: false },
  ];

  const handleAreaClick = (area) => {
    if (!area.booked) {
      setFormData({ ...formData, tableType: area.type, tableNumber: area.id });
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tableNumber) {
      alert('Please select a table from the blueprint');
      return;
    }
    console.log('Booking submitted:', formData);
    alert(`Booking request submitted for Table #${formData.tableNumber}! We will contact you shortly.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#140f2d] to-black border border-[#cccbd0]/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-[#140f2d] to-purple-900 p-6 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-3xl font-bold text-white">Book Your Table</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-[#cccbd0] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name and Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/50 border border-[#cccbd0]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors"
                placeholder="Juan Dela Cruz"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/50 border border-[#cccbd0]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors"
                placeholder="juan@example.com"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-300 mb-2 font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-gray-800/50 border border-[#cccbd0]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors"
              placeholder="+63 912 345 6789"
            />
          </div>

          {/* Date / Time / Guests */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/50 border border-[#cccbd0]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4" /> Time
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full bg-gray-800/50 border border-[#cccbd0]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors"
              >
                <option value="">Select</option>
                <option value="22:00">10:00 PM</option>
                <option value="23:00">11:00 PM</option>
                <option value="00:00">12:00 AM</option>
                <option value="01:00">1:00 AM</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" /> Guests
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                min="1"
                max="20"
                className="w-full bg-gray-800/50 border border-[#cccbd0]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors"
                placeholder="4"
              />
            </div>
          </div>

          {/* Table Selection Blueprint */}
          <div>
            <label className="block text-gray-300 mb-4 font-semibold flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Select Your Table
            </label>
            
            {/* Club Floor Map */}
            <div className="bg-gradient-to-br from-[#140f2d] to-gray-900 rounded-xl p-6 mb-4 border-2 border-[#cccbd0]/30">
              <div className="relative w-full max-w-4xl mx-auto">
                {/* Background Image */}
                <img
                  src={floorPlanImage}
                  alt="Club Floor Map"
                  className="w-full rounded-lg shadow-lg opacity-90"
                  onError={(e) => {
                    // Fallback to gradient background if image fails to load
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
                    e.target.parentElement.style.minHeight = '400px';
                  }}
                />

                {/* Hotspots */}
                {areas.map((area) => {
                  const isSelected = formData.tableNumber === area.id;
                  
                  return (
                    <button
                      key={area.id}
                      onClick={() => handleAreaClick(area)}
                      className={`absolute w-10 h-10 text-xs font-bold text-white rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        area.booked 
                          ? 'bg-red-500 border-red-400 cursor-not-allowed opacity-60'
                          : isSelected
                          ? 'bg-[#cccbd0] border-white text-[#140f2d] shadow-lg shadow-[#cccbd0]/50'
                          : area.type === 'vip'
                          ? 'bg-purple-500 border-purple-400 hover:bg-purple-400'
                          : area.type === 'vvip'
                          ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-purple-400 hover:from-purple-500 hover:to-pink-500'
                          : area.type === 'sc'
                          ? 'bg-blue-500 border-blue-400 hover:bg-blue-400'
                          : 'bg-[#140f2d] border-[#cccbd0] hover:bg-[#140f2d]/80'
                      }`}
                      style={{
                        top: area.top,
                        left: area.left,
                        transform: "translate(-50%, -50%)",
                      }}
                      disabled={area.booked}
                    >
                      {area.id}
                    </button>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#140f2d] border-2 border-[#cccbd0]"></div>
                  <span className="text-[#cccbd0]">CT ₱1.5K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-blue-400"></div>
                  <span className="text-[#cccbd0]">SC ₱2.5K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-500 border-2 border-purple-400"></div>
                  <span className="text-[#cccbd0]">VIP ₱4.5K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-purple-400"></div>
                  <span className="text-[#cccbd0]">VVIP ₱6K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#cccbd0] border-2 border-white"></div>
                  <span className="text-[#cccbd0]">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-red-400"></div>
                  <span className="text-[#cccbd0]">Booked</span>
                </div>
              </div>
              
              {/* Consumable Notice */}
              <div className="mt-4 text-center">
                <p className="text-[#cccbd0] text-sm bg-[#140f2d]/50 px-4 py-2 rounded-lg border border-[#cccbd0]/30">
                  💡 All table fees are <span className="font-semibold text-white">consumable</span> - use towards food & drinks!
                </p>
              </div>
            </div>
            
            {/* Selected Table Info */}
            {formData.tableNumber && (
              <div className="bg-gradient-to-r from-[#140f2d]/90 to-purple-600/20 border-2 border-[#cccbd0] rounded-lg p-4 mb-4">
                <p className="text-white font-bold mb-2">
                  Selected: Table {formData.tableNumber}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#cccbd0] text-lg font-bold">
                      {tables.find(t => t.id === formData.tableType)?.name} - {tables.find(t => t.id === formData.tableType)?.price}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Capacity: {tables.find(t => t.id === formData.tableType)?.capacity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 text-xs font-semibold">✓ CONSUMABLE</p>
                    <p className="text-gray-400 text-xs">Use for F&B</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#cccbd0] to-white text-[#140f2d] hover:from-white hover:to-[#cccbd0] py-4 rounded-lg font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

// Demo wrapper to show the component
export default function App() {
  const [showBooking, setShowBooking] = useState(true);
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {showBooking ? (
        <TableBooking onClose={() => setShowBooking(false)} />
      ) : (
        <button
          onClick={() => setShowBooking(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-all"
        >
          Open Table Booking
        </button>
      )}
    </div>
  );
}