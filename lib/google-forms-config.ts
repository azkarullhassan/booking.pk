// Google Forms Configuration for Hotels.pak
// Updated with your actual Google Form IDs and entry field IDs

export const GOOGLE_FORMS_CONFIG = {
  // Contact Form Configuration
  // NOTE: You still need to create and configure your Contact Form separately
  CONTACT_FORM: {
    FORM_ID: 'YOUR_CONTACT_FORM_ID', // Replace with your Google Form ID for contact form
    FIELDS: {
      NAME: 'entry.123456789',        // Replace with actual entry ID for name field
      EMAIL: 'entry.987654321',       // Replace with actual entry ID for email field
      SUBJECT: 'entry.456789123',     // Replace with actual entry ID for subject field
      MESSAGE: 'entry.789123456',     // Replace with actual entry ID for message field
      TIMESTAMP: 'entry.111222333'    // Replace with actual entry ID for timestamp field
    }
  },
  
  // Booking Form Configuration - UPDATED WITH YOUR ACTUAL IDs
  BOOKING_FORM: {
    FORM_ID: '1FAIpQLScOBCmXfV0mqV7Q7giMZuSeREI_K1qwc8Qrebm8wc7N4yLgeA', // Your actual Booking Form ID
    FIELDS: {
      BOOKING_ID: 'entry.1313691475',      // From your form
      CUSTOMER_NAME: 'entry.1919301237',   // From your form
      CUSTOMER_EMAIL: 'entry.2128578827',  // From your form
      CUSTOMER_PHONE: 'entry.1300870056',  // From your form
      HOTEL_NAME: 'entry.549264116',       // From your form
      HOTEL_LOCATION: 'entry.1821107657',  // From your form
      CHECK_IN: 'entry.1076374369',        // From your form
      CHECK_OUT: 'entry.467092757',        // From your form
      GUESTS: 'entry.932819148',           // From your form
      ROOM_TYPE: 'entry.438396345',        // From your form
      TOTAL_AMOUNT: 'entry.2112839082',    // From your form
      SPECIAL_REQUESTS: 'entry.106089517', // From your form
      TIMESTAMP: 'entry.106089517'         // Note: This appears to be the same as SPECIAL_REQUESTS in your test - please verify
    }
  }
};

// Email Configuration
export const EMAIL_CONFIG = {
  ADMIN_EMAIL: 'azkarullhassan7@gmail.com',
  REPLY_TO_EMAIL: 'noreply@hotels.pak'
};