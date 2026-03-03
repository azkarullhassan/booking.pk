'use client';

import { useState } from 'react';
import { Star, MapPin, Wifi, Car, Dumbbell, UtensilsCrossed, Waves } from 'lucide-react';
import Link from 'next/link';
import { getHotelById } from '@/lib/hotels-data';
import BookingModal from '@/components/BookingModal';
import HotelMap from '@/components/HotelMap';
import { hotels } from '@/lib/hotels-data';
import GoBackButton from '@/components/GoBackButton';

const amenityIcons = {
  WiFi: Wifi,
  Pool: Waves,
  Gym: Dumbbell,
  Restaurant: UtensilsCrossed,
  Parking: Car,
  'Room Service': UtensilsCrossed,
  Spa: Waves,
  AC: Wifi
};

export default function HotelDetails({ params }: { params: { id: string } }) {
  const hotel = getHotelById(Number(params.id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [bookingModal, setBookingModal] = useState(false);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hotel not found</h1>
          <Link href="/hotels" className="text-blue-600 hover:underline">
            Back to Hotels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GoBackButton />
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/hotels" className="hover:text-blue-600">Hotels</Link>
          <span className="mx-2">›</span>
          <span>{hotel.name}</span>
        </div>

        {/* Hotel Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{hotel.rating}</span>
                <span className="ml-1 text-gray-600">({Math.floor(hotel.rating * 100)} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                ₹{hotel.price.toLocaleString()}
              </div>
              <div className="text-gray-600">per night</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Images and Info */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <img
                src={hotel.images[selectedImage]}
                alt={hotel.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {hotel.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${hotel.name} ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer ${
                        selectedImage === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">About this hotel</h2>
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi;
                  return (
                    <div key={index} className="flex items-center">
                      <IconComponent className="h-5 w-5 text-green-600 mr-2" />
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>
              
              {/* Room Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Room Type</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {hotel.rooms.map((room, index) => (
                    <option key={index} value={index}>
                      {room.type} - ₹{room.price.toLocaleString()}/night
                    </option>
                  ))}
                </select>
              </div>

              {/* Check-in/Check-out */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check-out</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Guests</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>Room Price</span>
                  <span>₹{hotel.rooms[selectedRoom].price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes & Fees</span>
                  <span>₹{Math.floor(hotel.rooms[selectedRoom].price * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₹{Math.floor(hotel.rooms[selectedRoom].price * 1.1).toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {bookingModal && (
        <BookingModal
          isOpen={bookingModal}
          onClose={() => setBookingModal(false)}
          hotel={hotel}
        />
      )}
    </div>
  );
}