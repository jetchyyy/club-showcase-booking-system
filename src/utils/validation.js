export const validateBookingData = (formData) => {
  const errors = {};

  // Validate name
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate phone
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  if (!formData.phone || !phoneRegex.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Validate date (must be today or future)
  if (!formData.date) {
    errors.date = 'Date is required';
  } else {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.date = 'Date cannot be in the past';
    }
  }

  // Validate guests
  const guests = parseInt(formData.guests);
  if (!formData.guests || isNaN(guests) || guests < 1 || guests > 20) {
    errors.guests = 'Number of guests must be between 1 and 20';
  }

  // Validate table selection
  if (!formData.tableNumber) {
    errors.tableNumber = 'Please select a table from the floor plan';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +63 XXX XXX XXXX for Philippine numbers
  if (cleaned.startsWith('63')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+63${cleaned.slice(1)}`;
  }
  
  return phone;
};