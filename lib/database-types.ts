// Enhanced database types for Hotels.pak

export interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
  address?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

export interface Hotel {
  id: number;
  name: string;
  description?: string;
  location_id?: string;
  phone?: string;
  email?: string;
  website?: string;
  check_in_time?: string;
  check_out_time?: string;
  star_rating?: number;
  hotel_type?: 'economy' | 'standard' | 'premium' | 'luxury';
  total_rooms?: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  
  // Joined data
  location?: Location;
  amenities?: Amenity[];
  rooms?: Room[];
  images?: HotelImage[];
  average_rating?: number;
  review_count?: number;
}

export interface Amenity {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  category?: 'basic' | 'comfort' | 'business' | 'recreation' | 'dining';
  created_at: string;
}

export interface HotelAmenity {
  hotel_id: number;
  amenity_id: number;
  is_free: boolean;
  additional_cost?: number;
  amenity?: Amenity;
}

export interface Room {
  id: string;
  hotel_id: number;
  room_type: string;
  description?: string;
  base_price: number;
  max_occupancy?: number;
  room_size_sqm?: number;
  total_rooms?: number;
  available_rooms?: number;
  amenities?: string[];
  images?: string[];
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  hotel_id: number;
  customer_id?: string;
  booking_id?: string;
  rating: number;
  title?: string;
  comment?: string;
  is_verified?: boolean;
  is_published?: boolean;
  helpful_votes?: number;
  created_at: string;
  updated_at: string;
  
  // Joined data
  customer?: Customer;
}

export interface BookingPayment {
  id: string;
  booking_id: string;
  amount: number;
  currency?: string;
  payment_method?: 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash' | 'digital_wallet';
  payment_gateway?: string;
  transaction_id?: string;
  gateway_response?: any;
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface HotelImage {
  id: string;
  hotel_id: number;
  image_url: string;
  alt_text?: string;
  is_primary?: boolean;
  display_order?: number;
  created_at: string;
}

// Enhanced existing types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  hotel_id: number;
  hotel_name: string;
  hotel_location: string;
  customer_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  room_type: string;
  room_id?: string;
  room_price: number;
  total_amount: number;
  special_requests?: string;
  booking_status: 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
  
  // Joined data
  hotel?: Hotel;
  room?: Room;
  customer?: Customer;
  payments?: BookingPayment[];
}

// Query result types
export interface HotelWithDetails extends Hotel {
  location: Location;
  amenities: (HotelAmenity & { amenity: Amenity })[];
  rooms: Room[];
  images: HotelImage[];
  reviews: Review[];
  average_rating: number;
  review_count: number;
}

export interface BookingWithDetails extends Booking {
  hotel: Hotel & { location: Location };
  room: Room;
  payments: BookingPayment[];
}

// Search and filter types
export interface HotelSearchFilters {
  city?: string;
  check_in?: string;
  check_out?: string;
  guests?: number;
  min_price?: number;
  max_price?: number;
  hotel_type?: string[];
  amenities?: number[];
  min_rating?: number;
}

export interface HotelSearchResult {
  hotels: HotelWithDetails[];
  total_count: number;
  filters_applied: HotelSearchFilters;
}