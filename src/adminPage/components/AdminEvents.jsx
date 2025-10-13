import { useState, useEffect } from 'react';
import { Plus, Calendar, Trash2, Edit, Eye } from 'lucide-react';
import UploadAdminEvents from '../components/UploadAdminEvents';
import { eventService } from '../../services/eventService';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const result = await eventService.getAllEvents();
      
      if (result.success) {
        setEvents(result.data);
      } else {
        console.error('Error fetching events:', result.error);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventAdded = (newEvent) => {
    setEvents([newEvent, ...events]);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      // Find the event to get the image path
      const event = events.find(e => e.id === eventId);
      const imagePath = event?.image_path;

      const result = await eventService.deleteEvent(eventId, imagePath);
      
      if (result.success) {
        setEvents(events.filter(event => event.id !== eventId));
        alert('Event deleted successfully!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert(`Failed to delete event: ${error.message}`);
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Event Management</h1>
          <p className="text-gray-400 mt-2">Manage all restaurant events</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
        >
          <Plus className="w-5 h-5" />
          Upload New Event
        </button>
      </div>

      {/* Events Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">{events.length}</h3>
          </div>
          <p className="text-gray-400">Total Events</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-green-400" />
            <h3 className="text-2xl font-bold text-white">
              {events.filter(e => new Date(e.date) >= new Date()).length}
            </h3>
          </div>
          <p className="text-gray-400">Upcoming Events</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-gray-400" />
            <h3 className="text-2xl font-bold text-white">
              {events.filter(e => new Date(e.date) < new Date()).length}
            </h3>
          </div>
          <p className="text-gray-400">Past Events</p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6">
        {events.length === 0 ? (
          <div className="bg-gray-800/50 rounded-xl p-12 text-center">
            <Calendar className="w-20 h-20 mx-auto mb-4 text-gray-600" />
            <h3 className="text-2xl font-bold text-white mb-2">No Events Yet</h3>
            <p className="text-gray-400 mb-6">Start by uploading your first event</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Upload Event
            </button>
          </div>
        ) : (
          events.map((event) => {
            const eventDate = new Date(event.date);
            const isUpcoming = eventDate >= new Date();
            
            return (
              <div
                key={event.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-[#cccbd0]/20 hover:border-[#cccbd0]/50 transition-all overflow-hidden"
              >
                <div className="md:flex">
                  {/* Event Image */}
                  <div className="md:w-1/3">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>

                  {/* Event Details */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{eventDate.toLocaleDateString('en-US', { 
                            weekday: 'long',
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                      <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        isUpcoming 
                          ? 'bg-green-400/20 text-green-400'
                          : 'bg-gray-400/20 text-gray-400'
                      }`}>
                        {isUpcoming ? 'Upcoming' : 'Past'}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-6 line-clamp-3">{event.details}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewDetails(event)}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadAdminEvents
          onClose={() => setShowUploadModal(false)}
          onEventAdded={handleEventAdded}
        />
      )}

      {/* View Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-[#cccbd0]/20 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedEvent.image_url}
                alt={selectedEvent.title}
                className="w-full h-80 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">{selectedEvent.title}</h2>
              
              <div className="flex items-center gap-2 text-gray-400 mb-6">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">
                  {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {selectedEvent.details}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;