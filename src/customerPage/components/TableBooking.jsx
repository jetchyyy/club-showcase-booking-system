import { useState } from 'react';
import { X, Calendar, Clock, Users, DollarSign } from 'lucide-react';

const TableBooking = ({ onClose }) => {
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

  const tables = [
    { id: 'standard', name: 'Standard Table', price: '₱5,000', capacity: '4-6 people' },
    { id: 'vip', name: 'VIP Table', price: '₱10,000', capacity: '6-8 people' },
    { id: 'premium', name: 'Premium VIP', price: '₱15,000', capacity: '8-10 people' }
  ];

  // Club layout with tables
  const clubTables = [
    // Dance Floor Area (Standard Tables)
    { id: 1, type: 'standard', x: 15, y: 60, booked: false },
    { id: 2, type: 'standard', x: 85, y: 60, booked: false },
    { id: 3, type: 'standard', x: 15, y: 80, booked: true },
    { id: 4, type: 'standard', x: 85, y: 80, booked: false },
    
    // Side VIP Tables
    { id: 5, type: 'vip', x: 10, y: 30, booked: false },
    { id: 6, type: 'vip', x: 90, y: 30, booked: false },
    { id: 7, type: 'vip', x: 10, y: 45, booked: true },
    { id: 8, type: 'vip', x: 90, y: 45, booked: false },
    
    // Premium VIP Tables (Top area)
    { id: 9, type: 'premium', x: 35, y: 15, booked: false },
    { id: 10, type: 'premium', x: 65, y: 15, booked: false },
  ];

  const handleTableClick = (table) => {
    if (!table.booked) {
      setFormData({ ...formData, tableType: table.type, tableNumber: table.id });
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
      <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-purple-900 to-pink-900 p-6 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-3xl font-bold text-white">Book Your Table</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-pink-300 transition-colors"
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
                className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
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
                className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
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
              className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
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
                className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
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
                className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
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
                className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="4"
              />
            </div>
          </div>

          {/* Table Selection Blueprint */}
          <div>
            <label className="block text-gray-300 mb-4 font-semibold flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Select Your Table
            </label>
            
            {/* Club Blueprint */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 mb-4 border-2 border-purple-500/30">
              <div className="relative w-full aspect-[4/3] bg-gray-900 rounded-lg border-2 border-dashed border-purple-500/50 overflow-hidden">
                {/* DJ Booth */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded text-xs font-bold">
                  DJ BOOTH
                </div>
                
                {/* Dance Floor */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-32 border-4 border-pink-500/40 rounded-lg flex items-center justify-center">
                  <span className="text-pink-400 font-bold text-sm">DANCE FLOOR</span>
                </div>
                
                {/* Bar */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white px-6 py-2 rounded text-xs font-bold">
                  BAR
                </div>
                
                {/* Tables */}
                {clubTables.map((table) => {
                  const tableInfo = tables.find(t => t.id === table.type);
                  const isSelected = formData.tableNumber === table.id;
                  
                  return (
                    <div
                      key={table.id}
                      onClick={() => handleTableClick(table)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                        table.booked 
                          ? 'opacity-40 cursor-not-allowed' 
                          : 'hover:scale-110'
                      }`}
                      style={{ left: `${table.x}%`, top: `${table.y}%` }}
                    >
                      <div className={`relative ${
                        table.type === 'standard' ? 'w-12 h-12' : 
                        table.type === 'vip' ? 'w-14 h-14' : 
                        'w-16 h-16'
                      }`}>
                        {/* Table Circle */}
                        <div className={`w-full h-full rounded-full border-4 flex items-center justify-center font-bold text-white transition-all ${
                          table.booked 
                            ? 'bg-gray-600 border-gray-500' 
                            : isSelected
                            ? 'bg-pink-600 border-pink-400 shadow-lg shadow-pink-500/50'
                            : table.type === 'standard'
                            ? 'bg-blue-600 border-blue-400 hover:shadow-lg hover:shadow-blue-500/50'
                            : table.type === 'vip'
                            ? 'bg-purple-600 border-purple-400 hover:shadow-lg hover:shadow-purple-500/50'
                            : 'bg-gradient-to-br from-yellow-500 to-orange-600 border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/50'
                        }`}>
                          <span className={`text-xs ${table.type === 'premium' ? 'text-sm' : ''}`}>
                            {table.id}
                          </span>
                        </div>
                        
                        {/* Booked Label */}
                        {table.booked && (
                          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-0.5 rounded text-xs whitespace-nowrap">
                            Booked
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-400"></div>
                  <span className="text-sm text-gray-300">Standard ₱5K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-600 border-2 border-purple-400"></div>
                  <span className="text-sm text-gray-300">VIP ₱10K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 border-2 border-yellow-400"></div>
                  <span className="text-sm text-gray-300">Premium ₱15K</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-gray-500"></div>
                  <span className="text-sm text-gray-300">Booked</span>
                </div>
              </div>
            </div>
            
            {/* Selected Table Info */}
            {formData.tableNumber && (
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-2 border-pink-500 rounded-lg p-4 mb-4">
                <p className="text-white font-bold mb-1">
                  Selected: Table #{formData.tableNumber}
                </p>
                <p className="text-pink-400 text-lg font-bold">
                  {tables.find(t => t.id === formData.tableType)?.name} - {tables.find(t => t.id === formData.tableType)?.price}
                </p>
                <p className="text-gray-300 text-sm">
                  Capacity: {tables.find(t => t.id === formData.tableType)?.capacity}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 rounded-lg font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
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