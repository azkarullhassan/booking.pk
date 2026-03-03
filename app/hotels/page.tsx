'use client';

import { useState, useEffect } from 'react';
import { Star, MapPin, Filter, Map, List } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { hotels, getHotelsByCity, cities, Hotel } from '@/lib/hotels-data';
import HotelMap from '@/components/HotelMap';
import BookingModal from '@/components/BookingModal';
import GoBackButton from '@/components/GoBackButton';

export default function Hotels() {
  const searchParams = useSearchParams();
  const cityParam = searchParams.get('city');
  
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingModal, setBookingModal] = useState<{isOpen: boolean, hotel: Hotel | null}>({
    isOpen: false,
    hotel: null
  });
  const [filters, setFilters] = useState({
    priceRange: 'all',
    rating: 'all',
    location: cityParam || 'all'
  });

  useEffect(() => {
    let filtered = cityParam ? getHotelsByCity(cityParam) : hotels;

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(hotel => hotel.price >= min && hotel.price <= max);
    }

    if (filters.rating !== 'all') {
      filtered = filtered.filter(hotel => hotel.rating >= Number(filters.rating));
    }

    if (filters.location !== 'all' && !cityParam) {
      filtered = filtered.filter(hotel => hotel.city === filters.location);
    }

    setFilteredHotels(filtered);
  }, [filters, cityParam]);

  const handleViewDetails = (hotel: Hotel) => {
    setBookingModal({isOpen: true, hotel});
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <GoBackButton />
          
          {/* Header with View Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {cityParam ? `Hotels in ${cityParam}` : 'Available Hotels'}
              </h1>
              <p className="text-gray-600">{filteredHotels.length} hotels found</p>
            </div>
            
            <div className="flex bg-white rounded-lg shadow-md">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-l-lg flex items-center ${
                  viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-r-lg flex items-center ${
                  viewMode === 'map' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Map className="h-4 w-4 mr-2" />
                Map
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">All Prices</option>
                      <option value="0-8000">Under ₹8,000</option>
                      <option value="8000-15000">₹8,000 - ₹15,000</option>
                      <option value="15000-99999">Above ₹15,000</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => setFilters({...filters, rating: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">All Ratings</option>
                      <option value="4">4+ Stars</option>
                      <option value="4.5">4.5+ Stars</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <select
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      disabled={!!cityParam}
                    >
                      <option value="all">All Locations</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4">
              {viewMode === 'list' ? (
                /* Hotels List */
                <div className="space-y-6">
                  {filteredHotels.map((hotel) => (
                    <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full md:w-80 h-48 object-cover"
                        />
                        
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">{hotel.name}</h3>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm">{hotel.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{hotel.location}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {hotel.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-2xl font-bold text-green-600">
                                ₹{hotel.price.toLocaleString()}
                              </span>
                              <span className="text-gray-600 text-sm">/night</span>
                            </div>
                            
                            <button 
                              onClick={() => handleViewDetails(hotel)}
                              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Map View */
                <div className="bg-white rounded-lg shadow-md p-6">
                  <HotelMap 
                    hotels={filteredHotels} 
                    onHotelSelect={setSelectedHotel}
                    selectedHotel={selectedHotel || undefined}
                    onClose={() => setViewMode('list')}
                  />
                  
                  {selectedHotel && (
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-start space-x-4">
                        <img
                          src={selectedHotel.image}
                          alt={selectedHotel.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{selectedHotel.name}</h3>
                          <p className="text-gray-600 text-sm">{selectedHotel.location}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm">{selectedHotel.rating}</span>
                          </div>
                          <p className="text-lg font-bold text-green-600 mt-2">
                            ₹{selectedHotel.price.toLocaleString()}/night
                          </p>
                        </div>
                        <button 
                          onClick={() => handleViewDetails(selectedHotel)}
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {bookingModal.isOpen && bookingModal.hotel && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={() => setBookingModal({isOpen: false, hotel: null})}
          hotel={bookingModal.hotel}
        />
      )}
    </>
  );
}