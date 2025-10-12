import { useState, useEffect } from 'react';
import { X, Calendar, Users, DollarSign, Loader2 } from 'lucide-react';
const floorPlanImage = '/images/AGWATable.png';
import { bookingService } from '../../services/bookingService';
import { validateBookingData } from '../../utils/validation';

const TableBooking = ({ onClose, prefilledDate = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    tableType: 'standard',
    tableNumber: null
  });

  const [bookedTables, setBookedTables] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Update date when prefilledDate prop changes
  useEffect(() => {
    if (prefilledDate) {
      setFormData(prev => ({
        ...prev,
        date: prefilledDate
      }));
    }
  }, [prefilledDate]);

  // Fetch booked tables when date changes
  useEffect(() => {
    if (formData.date) {
      fetchBookedTables(formData.date);
    }
  }, [formData.date]);

  const fetchBookedTables = async (date) => {
    const result = await bookingService.getBookedTables(date);
    if (result.success) {
      setBookedTables(result.data || []);
    }
  };

  const tables = [
    { id: 'ct', name: 'Cocktail Table', price: '₱1,500', capacity: '2-4 people' },
    { id: 'sc', name: 'Standard Circle', price: '₱2,500', capacity: '4-6 people' },
    { id: 'vip', name: 'VIP Table', price: '₱4,500', capacity: '6-8 people' },
    { id: 'vvip', name: 'VVIP Table', price: '₱6,000', capacity: '8-10 people' }
  ];

  const areas = [
    { id: "VIP1", top: "12%", left: "26%", type: "vip" },
    { id: "VVIP2", top: "12%", left: "8%", type: "vvip" },
    { id: "VIP2", top: "25%", left: "26%", type: "vip" },
    { id: "VIP3", top: "42%", left: "26%", type: "vip" },
    { id: "VIP4", top: "59%", left: "26%", type: "vip" },
    { id: "VVIP1", top: "60%", left: "7%", type: "vvip" },
    { id: "VIP9", top: "12%", left: "75%", type: "vvip" },
    { id: "VIP10", top: "43%", left: "92%", type: "vip" },
    { id: "SC1", top: "25%", left: "72%", type: "sc" },
    { id: "SC2", top: "25%", left: "83%", type: "sc" },
    { id: "SC3", top: "43%", left: "83%", type: "sc" },
    { id: "SC4", top: "43%", left: "72%", type: "sc" },
    { id: "VVIP3", top: "12%", left: "92%", type: "vvip" },
    { id: "VIPS1", top: "85%", left: "35%", type: "vvip" },
    { id: "VIPS2", top: "92%", left: "50%", type: "vvip" },
    { id: "VIPS3", top: "85%", left: "65%", type: "vvip" },
    { id: "SC5", top: "78%", left: "50%", type: "sc" },
    { id: "SC6", top: "73%", left: "26%", type: "sc" },
  ];

  // Check if table is booked for selected date (only confirmed/pending bookings block the table)
  const isTableBooked = (tableId) => {
    if (!formData.date) return false;
    return bookedTables.some(
      booking => 
        booking.table_number === tableId &&
        (booking.status === 'confirmed' || booking.status === 'pending')
    );
  };

  // Check booking status for a specific table
  const getTableBookingStatus = (tableId) => {
    if (!formData.date) return null;
    const booking = bookedTables.find(
      b => b.table_number === tableId
    );
    return booking?.status || null;
  };

  const handleAreaClick = (area) => {
    const booked = isTableBooked(area.id);
    if (!booked) {
      setFormData({ ...formData, tableType: area.type, tableNumber: area.id });
      setErrors({ ...errors, tableNumber: null });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateBookingData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Check availability one more time before submitting
      const availability = await bookingService.checkTableAvailability(
        formData.tableNumber,
        formData.date
      );

      if (!availability.available) {
        alert('Sorry, this table has just been booked by another user for this date. Please select a different table.');
        fetchBookedTables(formData.date);
        setFormData(prev => ({ ...prev, tableNumber: null }));
        setIsSubmitting(false);
        return;
      }

      // Create booking
      const result = await bookingService.createBooking(formData);

      if (result.success) {
        alert(`Booking request submitted successfully for Table #${formData.tableNumber}! We will contact you shortly at ${formData.email}.`);
        onClose();
      } else {
        alert(`Booking failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#140f2d] to-black border border-[#cccbd0]/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-[#140f2d] to-purple-900 p-6 flex justify-between items-center rounded-t-3xl z-10">
          <h2 className="text-3xl font-bold text-white">Book Your Table</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-[#cccbd0] transition-colors"
            disabled={isSubmitting}
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
                className={`w-full bg-gray-800/50 border ${errors.name ? 'border-red-500' : 'border-[#cccbd0]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors`}
                placeholder="Juan Dela Cruz"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-[#cccbd0]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors`}
                placeholder="juan@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
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
              className={`w-full bg-gray-800/50 border ${errors.phone ? 'border-red-500' : 'border-[#cccbd0]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors`}
              placeholder="+63 912 345 6789"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Date and Guests */}
          <div className="grid md:grid-cols-2 gap-4">
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
                min={new Date().toISOString().split('T')[0]}
                className={`w-full bg-gray-800/50 border ${errors.date ? 'border-red-500' : 'border-[#cccbd0]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors`}
              />
              {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
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
                className={`w-full bg-gray-800/50 border ${errors.guests ? 'border-red-500' : 'border-[#cccbd0]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors`}
                placeholder="4"
              />
              {errors.guests && <p className="text-red-400 text-sm mt-1">{errors.guests}</p>}
            </div>
          </div>

          {/* Table Selection Blueprint */}
          <div>
            <label className="block text-gray-300 mb-4 font-semibold flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Select Your Table
            </label>
            
            {!formData.date && (
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 mb-4">
                <p className="text-yellow-200 text-sm">Please select a date first to view available tables</p>
              </div>
            )}

            {/* Club Floor Map */}
            <div className="bg-gradient-to-br from-[#140f2d] to-gray-900 rounded-xl p-6 mb-4 border-2 border-[#cccbd0]/30">
              <div className="relative w-full max-w-4xl mx-auto">
                <img
                  src={floorPlanImage}
                  alt="Club Floor Map"
                  className="w-full rounded-lg shadow-lg opacity-90"
                />

                {/* Hotspots */}
                {areas.map((area) => {
                  const isSelected = formData.tableNumber === area.id;
                  const booked = isTableBooked(area.id);
                  const bookingStatus = getTableBookingStatus(area.id);
                  
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => handleAreaClick(area)}
                      className={`absolute w-10 h-10 text-xs font-bold text-white rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        booked 
                          ? bookingStatus === 'confirmed'
                            ? 'bg-red-600 border-red-500 cursor-not-allowed opacity-70'
                            : 'bg-orange-500 border-orange-400 cursor-not-allowed opacity-70'
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
                      disabled={booked || !formData.date}
                      title={booked ? `Booked (${bookingStatus})` : area.id}
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
                  <div className="w-5 h-5 rounded-full bg-orange-500 border-2 border-orange-400"></div>
                  <span className="text-[#cccbd0]">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-red-600 border-2 border-red-500"></div>
                  <span className="text-[#cccbd0]">Confirmed</span>
                </div>
              </div>
              
              {/* Consumable Notice */}
              <div className="mt-4 text-center">
                <p className="text-[#cccbd0] text-sm bg-[#140f2d]/50 px-4 py-2 rounded-lg border border-[#cccbd0]/30">
                  💡 All table fees are <span className="font-semibold text-white">consumable</span> - use towards food & drinks!
                </p>
              </div>
            </div>
            
            {errors.tableNumber && (
              <p className="text-red-400 text-sm mb-2">{errors.tableNumber}</p>
            )}
            
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
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#cccbd0] to-white text-[#140f2d] hover:from-white hover:to-[#cccbd0] py-4 rounded-lg font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TableBooking;