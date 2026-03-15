'use client';

import { useState } from 'react';
import { Search, MapPin, Users, Star, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cities, hotelTypesByCategory } from '@/lib/hotels-data';

export default function Home() {
  const [searchData, setSearchData] = useState({
    destination: '',
    guests: '2'
  });
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const [showAllHotelTypes, setShowAllHotelTypes] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAllHotels, setShowAllHotels] = useState({
    economy: false,
    standard: false,
    premium: false,
    luxury: false
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to hotels page with search params
    window.location.href = `/hotels?city=${searchData.destination}&guests=${searchData.guests}`;
  };

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchData.destination.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg")'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            "Find Your Perfect Stay"
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-950">
            amazing hotels across gilgit baltistan discover more
          </p>
          
          {/* Search Form in Hero */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6 text-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchData.destination}
                    onChange={(e) => {
                      setSearchData({...searchData, destination: e.target.value});
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowSuggestions(searchData.destination.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Where are you going?"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {showSuggestions && filteredCities.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredCities.slice(0, 5).map((city, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSearchData({...searchData, destination: city});
                            setShowSuggestions(false);
                          }}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={searchData.guests}
                    onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                   Hotels Search 
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>




      {/* Hotel Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Hotel Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(hotelTypesByCategory).map(([category, hotels]) => (
              <div 
                key={category} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 transform ${
                  !showAllHotelTypes && ['premium', 'luxury'].includes(category) ? 'hidden' : ''
                }`}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={
                      category === 'economy' ? 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg' :
                      category === 'standard' ? 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg' :
                      category === 'premium' ? 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg' :
                      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'
                    }
                    alt={`${category} hotels`}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4 animate-bounce">
                      {category === 'economy' && '🏠'}
                      {category === 'standard' && '🏕️'}
                      {category === 'premium' && '⛰️'}
                      {category === 'luxury' && '🏔️'}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold capitalize text-gray-800">{category}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {category === 'economy' && 'Budget-friendly stays'}
                        {category === 'standard' && 'Comfortable accommodations'}
                        {category === 'premium' && 'Luxury mountain resorts'}
                        {category === 'luxury' && 'Ultimate luxury experience'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {hotels.slice(0, showAllHotels[category as keyof typeof showAllHotels] ? hotels.length : 3).map((hotel, index) => (
                      <Link
                        key={index}
                        href={`/hotels/${hotel.id}`}
                        className="block p-2 rounded-lg text-sm text-green-600 hover:text-white hover:bg-green-600 transition-all duration-200 transform hover:translate-x-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{hotel.name}</span>
                          <span className="text-xs opacity-75">₹{hotel.price.toLocaleString()}</span>
                        </div>
                      </Link>
                    ))}
                    {hotels.length > 3 && (
                      <button
                        onClick={() => setShowAllHotels(prev => ({
                          ...prev,
                          [category]: !prev[category as keyof typeof prev]
                        }))}
                        className="text-sm text-gray-500 hover:text-green-600 flex items-center justify-center w-full mt-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                      >
                        {showAllHotels[category as keyof typeof showAllHotels] ? 'Show Less' : `Show ${hotels.length - 3} More`}
                        <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${
                          showAllHotels[category as keyof typeof showAllHotels] ? 'rotate-180' : ''
                        }`} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!showAllHotelTypes && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllHotelTypes(true)}
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 hover:scale-105 transition-all duration-300 transform shadow-lg hover:shadow-xl"
              >
                Show More types of hotel
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.slice(0, showAllDestinations ? cities.length : 8).map((city, index) => (
              <Link
                key={index}
                href={`/hotels?city=${city}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 transform group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      city === 'Karachi' ? 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg' :
                      city === 'Lahore' ? 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' :
                      city === 'Islamabad' ? 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg' :
                      city === 'Gilgit' ? 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg' :
                      city === 'Skardu' ? 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg' :
                      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg'
                    }
                    alt={city}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center">
                    <div className="text-center text-white">
                      <MapPin className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                      <span className="text-xl font-bold drop-shadow-lg">{city}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {cities.length > 8 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllDestinations(!showAllDestinations)}
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 hover:scale-105 transition-all duration-300 transform shadow-lg hover:shadow-xl"
              >
                {showAllDestinations ? 'Show Less' : `Show All ${cities.length} Cities`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Hotels.pak */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Why Choose Hotels.pak?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300 animate-bounce">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">Find the perfect hotel with our advanced search filters and real-time availability.</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300 animate-bounce" style={{animationDelay: '0.2s'}}>
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, eaque.</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300 animate-bounce" style={{animationDelay: '0.4s'}}>
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hotels.pak</h3>
              <p className="text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, perferendis?</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/hotels" className="text-gray-300 hover:text-white">All Hotels</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Popular Cities</h4>
              <ul className="space-y-2">
                {cities.slice(0, 4).map((city, index) => (
                  <li key={index}>
                    <Link href={`/hotels?city=${city}`} className="text-gray-300 hover:text-white">
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <p className="text-gray-300">Email: info@hotels.pak</p>
              <p className="text-gray-300">Phone: +92-XXX-XXXXXXX</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">&copy; 2024 Hotels.pak. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}