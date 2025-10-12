import { supabase } from '../lib/supabase';

export const bookingService = {
  // Create a new booking
  async createBooking(bookingData) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
            date: bookingData.date,
            guests: parseInt(bookingData.guests),
            table_type: bookingData.tableType,
            table_number: bookingData.tableNumber,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating booking:', error);
      return { success: false, error: error.message };
    }
  },

  // Check if a table is available for a specific date (no time needed)
  async checkTableAvailability(tableNumber, date) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('table_number', tableNumber)
        .eq('date', date)
        .in('status', ['confirmed', 'pending']);

      if (error) throw error;
      return { available: data.length === 0, bookings: data };
    } catch (error) {
      console.error('Error checking availability:', error);
      return { available: false, error: error.message };
    }
  },

  // Get all booked tables for a specific date (only confirmed and pending)
  async getBookedTables(date) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('table_number, status')
        .eq('date', date)
        .in('status', ['confirmed', 'pending']);

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching booked tables:', error);
      return { success: false, error: error.message };
    }
  },

  // Get booking by ID
  async getBookingById(bookingId) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching booking:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all bookings (admin function)
  async getAllBookings() {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return { success: false, error: error.message };
    }
  },

  // Update booking status
  async updateBookingStatus(bookingId, status) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating booking:', error);
      return { success: false, error: error.message };
    }
  },

  // Cancel booking
  async cancelBooking(bookingId) {
    return this.updateBookingStatus(bookingId, 'cancelled');
  },

  // Confirm booking
  async confirmBooking(bookingId) {
    return this.updateBookingStatus(bookingId, 'confirmed');
  }
};