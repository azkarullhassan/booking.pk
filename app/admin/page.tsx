'use client';

import { useState, useEffect } from 'react';
import { 
  Hotel, 
  Users, 
  Calendar, 
  DollarSign, 
  Star, 
  TrendingUp,
  MapPin,
  Building,
  CreditCard,
  MessageSquare
} from 'lucide-react';
import { getHotels, getCustomerBookings, getHotelAnalytics } from '@/lib/database-functions';
import type { HotelWithDetails, BookingWithDetails } from '@/lib/database-types';

export default function AdminDashboard() {
  const [hotels, setHotels] = useState<HotelWithDetails[]>([]);
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [analytics, setAnalytics] = useState({
    totalHotels: 0,
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    occupancyRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load hotels
      const hotelsResult = await getHotels();
      setHotels(hotelsResult.hotels);

      // Calculate analytics
      const totalHotels = hotelsResult.hotels.length;
      const totalRevenue = hotelsResult.hotels.reduce((sum, hotel) => {
        return sum + (hotel.rooms?.reduce((roomSum, room) => roomSum + room.base_price, 0) || 0);
      }, 0);
      
      const averageRating = hotelsResult.hotels.reduce((sum, hotel) => sum + hotel.average_rating, 0) / totalHotels;

      setAnalytics({
        totalHotels,
        totalBookings: 0, // Will be updated when we have booking data
        totalRevenue,
        averageRating,
        occupancyRate: 75 // Mock data
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hotels.pak Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your hotel booking platform</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Hotels</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalHotels}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{analytics.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.averageRating.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hotels List */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Hotels Overview</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Hotel className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{hotel.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {hotel.location?.city}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-3 w-3 mr-1 text-yellow-400" />
                          {hotel.average_rating.toFixed(1)} ({hotel.review_count} reviews)
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{hotel.total_rooms} rooms</p>
                      <p className="text-sm text-gray-600 capitalize">{hotel.hotel_type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Quick Statistics</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Hotel Types Distribution */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Hotel Types</h3>
                  <div className="space-y-2">
                    {['luxury', 'premium', 'standard', 'economy'].map((type) => {
                      const count = hotels.filter(h => h.hotel_type === type).length;
                      const percentage = hotels.length > 0 ? (count / hotels.length) * 100 : 0;
                      return (
                        <div key={type} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 capitalize">{type}</span>
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cities Distribution */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Cities</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(hotels.map(h => h.location?.city).filter(Boolean))).map((city) => {
                      const count = hotels.filter(h => h.location?.city === city).length;
                      return (
                        <div key={city} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{city}</span>
                          <span className="text-sm font-medium text-gray-900">{count} hotels</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-green-600" />
                      New customer registration
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      Booking confirmed
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MessageSquare className="h-4 w-4 mr-2 text-purple-600" />
                      New review posted
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCard className="h-4 w-4 mr-2 text-yellow-600" />
                      Payment processed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Database Schema Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Database Schema</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Core Tables</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• hotels - Hotel information</li>
                  <li>• rooms - Room types & availability</li>
                  <li>• locations - Geographic data</li>
                  <li>• customers - Customer profiles</li>
                  <li>• bookings - Reservation data</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Relationship Tables</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• hotel_amenities - Hotel features</li>
                  <li>• reviews - Customer feedback</li>
                  <li>• booking_payments - Payment tracking</li>
                  <li>• hotel_images - Media gallery</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Row Level Security (RLS)</li>
                  <li>• Automated timestamps</li>
                  <li>• Foreign key constraints</li>
                  <li>• Performance indexes</li>
                  <li>• Real-time availability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}