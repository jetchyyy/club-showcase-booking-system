import { useState } from 'react';
import { X, Calendar, Clock, Users, DollarSign } from 'lucide-react';
import MagneticButton from './MagneticButton';

const TableBooking = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    tableType: 'standard'
  });

  const tables = [
    { id: 'standard', name: 'Standard Table', price: '₱5,000', capacity: '4-6 people' },
    { id: 'vip', name: 'VIP Table', price: '₱10,000', capacity: '6-8 people' },
    { id: 'premium', name: 'Premium VIP', price: '₱15,000', capacity: '8-10 people' }
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    alert('Booking request submitted! We will contact you shortly.');
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

          {/* Table Type */}
          <div>
            <label className="block text-gray-300 mb-4 font-semibold flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Select Table Type
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {tables.map((table) => (
                <label
                  key={table.id}
                  className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                    formData.tableType === table.id
                      ? 'border-pink-500 bg-pink-500/10'
                      : 'border-purple-500/30 hover:border-purple-500/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="tableType"
                    value={table.id}
                    checked={formData.tableType === table.id}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className="text-center">
                    <p className="text-white font-bold mb-1">{table.name}</p>
                    <p className="text-pink-400 text-xl font-bold mb-1">{table.price}</p>
                    <p className="text-gray-400 text-sm">{table.capacity}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <MagneticButton
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 rounded-lg font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Confirm Booking
          </MagneticButton>
        </form>
      </div>
    </div>
  );
};

export default TableBooking;
