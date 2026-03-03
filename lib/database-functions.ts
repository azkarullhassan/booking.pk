import { supabase } from './supabase';
import type { 
  Hotel, 
  HotelWithDetails, 
  Room, 
  Review, 
  Booking, 
  BookingWithDetails,
  HotelSearchFilters,
  HotelSearchResult,
  BookingPayment,
  Location
} from './database-types';

// Hotel Functions
export const getHotels = async (filters?: HotelSearchFilters): Promise<HotelSearchResult> => {
  let query = supabase
    .from('hotels')
    .select(`
      *,
      location:locations(*),
      amenities:hotel_amenities(
        is_free,
        additional_cost,
        amenity:amenities(*)
      ),
      rooms(*),
      images:hotel_images(*),
      reviews(rating)
    `)
    .eq('is_active', true);

  // Apply filters
  if (filters?.city) {
    query = query.eq('location.city', filters.city);
  }
  
  if (filters?.hotel_type && filters.hotel_type.length > 0) {
    query = query.in('hotel_type', filters.hotel_type);
  }

  const { data: hotels, error, count } = await query;
  
  if (error) throw error;

  // Calculate average ratings and filter by price/rating
  const processedHotels = (hotels || []).map((hotel: any) => {
    const ratings = hotel.reviews?.map((r: any) => r.rating) || [];
    const average_rating = ratings.length > 0 
      ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length 
      : 0;
    
    const review_count = ratings.length;
    
    return {
      ...hotel,
      average_rating,
      review_count
    };
  }).filter((hotel: any) => {
    // Apply client-side filters
    if (filters?.min_rating && hotel.average_rating < filters.min_rating) return false;
    if (filters?.min_price && !hotel.rooms?.some((r: any) => r.base_price >= filters.min_price)) return false;
    if (filters?.max_price && hotel.rooms?.every((r: any) => r.base_price > filters.max_price)) return false;
    return true;
  });

  return {
    hotels: processedHotels as HotelWithDetails[],
    total_count: count || 0,
    filters_applied: filters || {}
  };
};

export const getHotelById = async (id: number): Promise<HotelWithDetails | null> => {
  const { data: hotel, error } = await supabase
    .from('hotels')
    .select(`
      *,
      location:locations(*),
      amenities:hotel_amenities(
        is_free,
        additional_cost,
        amenity:amenities(*)
      ),
      rooms(*),
      images:hotel_images(*),
      reviews(
        *,
        customer:customers(name)
      )
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows returned
    throw error;
  }
  if (!hotel) return null;

  // Calculate average rating
  const ratings = hotel.reviews?.map((r: any) => r.rating) || [];
  const average_rating = ratings.length > 0 
    ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length 
    : 0;

  return {
    ...hotel,
    average_rating,
    review_count: ratings.length
  } as HotelWithDetails;
};

export const getHotelsByCity = async (city: string): Promise<HotelWithDetails[]> => {
  const result = await getHotels({ city });
  return result.hotels;
};

// Room Functions
export const getRoomsByHotel = async (hotelId: number): Promise<Room[]> => {
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('hotel_id', hotelId)
    .eq('is_active', true)
    .order('base_price', { ascending: true });

  if (error) throw error;
  return rooms || [];
};

export const checkRoomAvailability = async (
  roomId: string, 
  checkIn: string, 
  checkOut: string
): Promise<boolean> => {
  // Check if room is available for the given dates
  const { data: conflictingBookings, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('room_id', roomId)
    .eq('booking_status', 'confirmed')
    .or(`check_in_date.lte.${checkOut},check_out_date.gte.${checkIn}`);

  if (error) throw error;
  return (conflictingBookings?.length || 0) === 0;
};

// Review Functions
export const getHotelReviews = async (hotelId: number, limit = 10): Promise<Review[]> => {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select(`
      *,
      customer:customers(name)
    `)
    .eq('hotel_id', hotelId)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return reviews || [];
};

export const createReview = async (reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<Review> => {
  const { data: review, error } = await supabase
    .from('reviews')
    .insert([reviewData])
    .select()
    .single();

  if (error) throw error;
  if (!review) throw new Error('Review creation failed');
  return review;
};

// Enhanced Booking Functions
export const createBookingWithRoom = async (
  bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>,
  paymentData?: Omit<BookingPayment, 'id' | 'booking_id' | 'created_at' | 'updated_at'>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => { // Return type should be adjusted based on your BookingWithDetails type
  // Start a transaction
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select(`
      *,
      hotel:hotels(
        *,
        location:locations(*)
      ),
      room:rooms(*)
    `)
    .single();

  if (bookingError) throw bookingError;
  if (!booking) throw new Error('Booking creation failed');

  // Create payment record if provided
  if (paymentData && booking) {
    const { error: paymentError } = await supabase
      .from('booking_payments')
      .insert([{
        ...paymentData,
        booking_id: booking.id
      }]);

    if (paymentError) {
      console.error('Payment creation failed:', paymentError);
      // Don't throw here, booking is still valid
    }
  }

  return booking;
};

export const getBookingWithDetails = async (bookingId: string): Promise<BookingWithDetails | null> => {
  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      *,
      hotel:hotels(
        *,
        location:locations(*)
      ),
      room:rooms(*),
      payments:booking_payments(*)
    `)
    .eq('id', bookingId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return booking as BookingWithDetails;
};

export const getCustomerBookings = async (customerEmail: string): Promise<BookingWithDetails[]> => {
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      *,
      hotel:hotels(
        *,
        location:locations(*)
      ),
      room:rooms(*),
      payments:booking_payments(*)
    `)
    .eq('customer_email', customerEmail)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (bookings || []) as BookingWithDetails[];
};

// Payment Functions
export const createPayment = async (
  paymentData: Omit<BookingPayment, 'id' | 'created_at' | 'updated_at'>
): Promise<BookingPayment> => {
  const { data: payment, error } = await supabase
    .from('booking_payments')
    .insert([paymentData])
    .select()
    .single();

  if (error) throw error;
  if (!payment) throw new Error('Payment creation failed');
  return payment;
};

export const updatePaymentStatus = async (
  paymentId: string, 
  status: BookingPayment['status'],
  transactionId?: string
): Promise<BookingPayment> => {
  const updateData: any = { 
    status,
    processed_at: new Date().toISOString()
  };
  
  if (transactionId) {
    updateData.transaction_id = transactionId;
  }

  const { data: payment, error } = await supabase
    .from('booking_payments')
    .update(updateData)
    .eq('id', paymentId)
    .select()
    .single();

  if (error) throw error;
  if (!payment) throw new Error('Payment not found');
  return payment;
};

// Location Functions
export const getLocations = async (): Promise<Location[]> => {
  const { data: locations, error } = await supabase
    .from('locations')
    .select('*')
    .order('city', { ascending: true });

  if (error) throw error;
  return locations || [];
};

export const getCities = async (): Promise<string[]> => {
  const { data: locations, error } = await supabase
    .from('locations')
    .select('city')
    .order('city', { ascending: true });

  if (error) throw error;
  return locations?.map(l => l.city) || [];
};

// Analytics Functions
export const getHotelAnalytics = async (hotelId: number) => {
  const [bookingsResult, reviewsResult, revenueResult] = await Promise.all([
    // Total bookings
    supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('hotel_id', hotelId),
    
    // Average rating
    supabase
      .from('reviews')
      .select('rating')
      .eq('hotel_id', hotelId),
    
    // Total revenue
    supabase
      .from('bookings')
      .select('total_amount')
      .eq('hotel_id', hotelId)
      .eq('booking_status', 'completed')
  ]);

  const totalBookings = bookingsResult.count || 0;
  const ratings = reviewsResult.data?.map(r => r.rating) || [];
  const averageRating = ratings.length > 0 
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
    : 0;
  const totalRevenue = revenueResult.data?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0;

  return {
    totalBookings,
    averageRating,
    totalReviews: ratings.length,
    totalRevenue
  };
};