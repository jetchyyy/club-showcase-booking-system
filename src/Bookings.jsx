import { useState, useEffect } from 'react';
import { Calendar, Users, CheckCircle, XCircle, Filter, X as XIcon } from 'lucide-react';
import { bookingService } from './services/bookingService';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const result = await bookingService.getAllBookings();
    if (result.success) {
      setBookings(result.data);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    const result = await bookingService.updateBookingStatus(bookingId, newStatus);
    if (result.success) {
      fetchBookings();
      alert(`Booking ${newStatus} successfully!`);
    } else {
      alert('Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const statusMatch = filter === 'all' || booking.status === filter;
    const dateMatch = !dateFilter || booking.date === dateFilter;
    return statusMatch && dateMatch;
  });

  const uniqueDates = [...new Set(bookings.map(b => b.date))].sort().reverse();

  const clearDateFilter = () => {
    setDateFilter('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white text-xl">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Booking Management</h1>
        <p className="text-gray-400 mt-2">Manage all table reservations</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6">
        {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-lg font-semibold capitalize transition-all ${
              filter === status
                ? 'bg-[#cccbd0] text-[#140f2d]'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {status} ({bookings.filter(b => status === 'all' || b.status === status).length})
          </button>
        ))}
      </div>

      {/* Date Filter Section */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 mb-6 border border-[#cccbd0]/20">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-[#cccbd0]" />
          <h3 className="text-lg font-semibold text-white">Filter by Date</h3>
          {dateFilter && (
            <button
              onClick={clearDateFilter}
              className="ml-auto text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <XIcon className="w-4 h-4" />
              Clear Filter
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Select Custom Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-gray-800/50 border border-[#cccbd0]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#cccbd0] transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Quick Select (Existing Bookings)</label>
            <div className="flex flex-wrap gap-2">
              {uniqueDates.length > 0 ? (
                uniqueDates.slice(0, 5).map((date) => (
                  <button
                    key={date}
                    onClick={() => setDateFilter(date)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      dateFilter === date
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {new Date(date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No bookings yet</p>
              )}
            </div>
          </div>
        </div>

        {dateFilter && (
          <div className="mt-4 flex items-center gap-2">
            <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg px-4 py-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">
                Showing bookings for {new Date(dateFilter).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bookings Grid */}
      <div className="grid gap-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-gray-800/50 rounded-xl p-8 text-center text-gray-400">
            {dateFilter ? (
              <div>
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-lg">No bookings found for {new Date(dateFilter).toLocaleDateString()}</p>
                <button
                  onClick={clearDateFilter}
                  className="mt-4 text-purple-400 hover:text-purple-300 text-sm underline"
                >
                  View all bookings
                </button>
              </div>
            ) : (
              <p>No bookings found</p>
            )}
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 mb-2">
              <p className="text-white text-sm">
                📊 Showing <span className="font-bold">{filteredBookings.length}</span> booking{filteredBookings.length !== 1 ? 's' : ''}
                {dateFilter && <span> for {new Date(dateFilter).toLocaleDateString()}</span>}
                {filter !== 'all' && <span> with status: <span className="font-bold capitalize">{filter}</span></span>}
              </p>
            </div>

            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-[#cccbd0]/20 hover:border-[#cccbd0]/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{booking.name}</h3>
                    <p className="text-gray-400 text-sm">{booking.email}</p>
                    <p className="text-gray-400 text-sm">{booking.phone}</p>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-[#cccbd0]" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4 text-[#cccbd0]" />
                    <span>{booking.guests} guests</span>
                  </div>
                  <div className="text-gray-300">
                    <span className="font-bold text-[#cccbd0]">Table {booking.table_number}</span>
                    <span className="text-sm text-gray-400"> ({booking.table_type})</span>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;