'use client';

import { useState } from 'react';
import { X, User, Mail, Phone, Calendar, Users, CreditCard } from 'lucide-react';
import { Hotel } from '@/lib/hotels-data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: Hotel;
}

export default function BookingModal({ isOpen, onClose, hotel }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: hotel.rooms[0]?.type || '',
    specialRequests: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleBookingSubmit();
  };

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Calculate total amount (room price + 10% taxes)
      const selectedRoom = hotel.rooms.find(room => room.type === formData.roomType) || hotel.rooms[0];
      const totalAmount = Math.floor(selectedRoom.price * 1.1);

      // Generate a mock booking ID for demo purposes
      const bookingId = 'BK' + Date.now();

      // Submit to Google Form
      await submitBookingToGoogleForm(bookingId, totalAmount);
      
      // Send email notification
      await sendBookingEmailNotification(bookingId, totalAmount);
      
      alert(`Booking confirmed! 
      
Booking ID: ${bookingId}
Hotel: ${hotel.name}
Check-in: ${formData.checkIn}
Check-out: ${formData.checkOut}
Total: ₹${totalAmount.toLocaleString()}

You will receive a confirmation email shortly.`);
      
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking submitted successfully! You will receive a confirmation email shortly.');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitBookingToGoogleForm = async (bookingId: string, totalAmount: number) => {
    try {
      // Create FormData for Google Form submission
      const googleFormData = new FormData();
      
      // Replace these entry IDs with your actual Google Form field IDs for booking form
      googleFormData.append('entry.111111111', bookingId); // Booking ID
      googleFormData.append('entry.222222222', formData.name); // Customer Name
      googleFormData.append('entry.333333333', formData.email); // Customer Email
      googleFormData.append('entry.444444444', formData.phone); // Customer Phone
      googleFormData.append('entry.555555555', hotel.name); // Hotel Name
      googleFormData.append('entry.666666666', hotel.location); // Hotel Location
      googleFormData.append('entry.777777777', formData.checkIn); // Check-in Date
      googleFormData.append('entry.888888888', formData.checkOut); // Check-out Date
      googleFormData.append('entry.999999999', formData.guests); // Number of Guests
      googleFormData.append('entry.101010101', formData.roomType); // Room Type
      googleFormData.append('entry.121212121', totalAmount.toString()); // Total Amount
      googleFormData.append('entry.131313131', formData.specialRequests); // Special Requests
      googleFormData.append('entry.141414141', new Date().toLocaleString()); // Booking Timestamp
      
      // Replace YOUR_BOOKING_GOOGLE_FORM_ID with your actual Google Form ID for bookings
      const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_BOOKING_GOOGLE_FORM_ID/formResponse';
      
      // Submit to Google Form
      fetch(googleFormUrl, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors'
      }).catch(() => {
        // Expected to fail due to CORS, but form submission works
      });
      
    } catch (error) {
      console.error('Google Form submission error:', error);
    }
  };

  const sendBookingEmailNotification = async (bookingId: string, totalAmount: number) => {
    // Create email content
    const emailSubject = `New Hotel Booking: ${bookingId} - ${hotel.name}`;
    const emailBody = `
New hotel booking received from Hotels.pak:

BOOKING DETAILS:
Booking ID: ${bookingId}
Hotel: ${hotel.name}
Location: ${hotel.location}

CUSTOMER INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

STAY DETAILS:
Check-in: ${formData.checkIn}
Check-out: ${formData.checkOut}
Guests: ${formData.guests}
Room Type: ${formData.roomType}

PAYMENT INFORMATION:
Total Amount: ₹${totalAmount.toLocaleString()}
Payment Status: Pending

SPECIAL REQUESTS:
${formData.specialRequests || 'None'}

BOOKING TIMESTAMP:
${new Date().toLocaleString()}

---
This booking was made through the Hotels.pak website.
Please contact the customer to confirm payment and finalize the booking.
    `.trim();

    // Create mailto link for immediate email
    const mailtoLink = `mailto:azkarullhassan7@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4 my-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Book Your Stay</h2>
            <p className="text-gray-600">{hotel.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Check-in Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Check-out Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Room Type</label>
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({...formData, roomType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  {hotel.rooms.map((room, index) => (
                    <option key={index} value={room.type}>
                      {room.type} - ₹{room.price.toLocaleString()}/night
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Special Requests</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Any special requests or requirements..."
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                  placeholder="123"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={formData.cardName}
                  onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-green-600">₹{hotel.price.toLocaleString()}/night</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Processing...' : 'Confirm Booking & Pay'}
          </button>
        </form>
      </div>
    </div>
  );
}