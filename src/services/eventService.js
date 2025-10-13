import { supabase } from '../lib/supabase';

export const eventService = {
  // Upload image to Supabase Storage
  uploadEventImage: async (file) => {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `event-images/${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('events') // Make sure this bucket exists in Supabase
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(filePath);

      return {
        success: true,
        filePath: filePath,
        publicUrl: publicUrl
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Create new event
  createEvent: async (eventData) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            title: eventData.title,
            details: eventData.details,
            date: eventData.date,
            image_url: eventData.image_url,
            image_path: eventData.image_path,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      return {
        success: true,
        data: data[0]
      };
    } catch (error) {
      console.error('Error creating event:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get all events
  getAllEvents: async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        throw error;
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  },

  // Delete event and its image
  deleteEvent: async (eventId, imagePath) => {
    try {
      // Delete image from storage if exists
      if (imagePath) {
        const { error: storageError } = await supabase.storage
          .from('events')
          .remove([imagePath]);

        if (storageError) {
          console.error('Error deleting image:', storageError);
        }
      }

      // Delete event from database
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) {
        throw error;
      }

      return {
        success: true
      };
    } catch (error) {
      console.error('Error deleting event:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', eventId)
        .select();

      if (error) {
        throw error;
      }

      return {
        success: true,
        data: data[0]
      };
    } catch (error) {
      console.error('Error updating event:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};