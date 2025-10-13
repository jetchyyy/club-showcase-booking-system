import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Calendar, FileText } from 'lucide-react';
import { eventService } from '../../services/eventService';

const UploadAdminEvents = ({ onClose, onEventAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    date: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      
      setFormData({ ...formData, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.details || !formData.date || !formData.image) {
      alert('Please fill in all fields and upload an image');
      return;
    }

    setUploading(true);

    try {
      // First, upload the image to Supabase Storage
      const imageUpload = await eventService.uploadEventImage(formData.image);
      
      if (!imageUpload.success) {
        throw new Error(imageUpload.error || 'Failed to upload image');
      }

      // Then create the event record with the image URL
      const eventData = {
        title: formData.title,
        details: formData.details,
        date: formData.date,
        image_url: imageUpload.publicUrl,
        image_path: imageUpload.filePath
      };

      const result = await eventService.createEvent(eventData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create event');
      }

      alert('Event uploaded successfully!');
      
      // Call parent callback to refresh events list
      if (onEventAdded) {
        onEventAdded(result.data);
      }
      
      // Reset form
      setFormData({ title: '', details: '', date: '', image: null });
      setImagePreview(null);
      
      // Close modal
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error uploading event:', error);
      alert(`Failed to upload event: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-[#cccbd0]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-950 border-b border-[#cccbd0]/20 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Upload New Event</h2>
            <p className="text-gray-400 text-sm mt-1">Add event details and upload image</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-gray-300 font-semibold mb-3">
              Event Image *
            </label>
            
            {!imagePreview ? (
              <label className="block">
                <div className="border-2 border-dashed border-[#cccbd0]/30 rounded-xl p-8 text-center cursor-pointer hover:border-[#cccbd0]/60 transition-colors">
                  <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 mb-2">Click to upload event image</p>
                  <p className="text-gray-600 text-sm">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-[#cccbd0]/20">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-300 font-semibold mb-3">
              Event Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event title"
              className="w-full bg-gray-800/50 border border-[#cccbd0]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#cccbd0] transition-colors"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-300 font-semibold mb-3">
              Event Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-gray-800/50 border border-[#cccbd0]/30 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#cccbd0] transition-colors"
                required
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-gray-300 font-semibold mb-3">
              Event Details *
            </label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Enter event description, schedule, and other details..."
              rows="6"
              className="w-full bg-gray-800/50 border border-[#cccbd0]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#cccbd0] transition-colors resize-none"
              required
            />
            <p className="text-gray-500 text-sm mt-2">
              {formData.details.length} characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadAdminEvents;