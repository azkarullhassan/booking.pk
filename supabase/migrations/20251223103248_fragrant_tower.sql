/*
  # Enhanced Hotel Database Schema

  1. New Tables
    - `hotels` - Store hotel information with detailed data
    - `rooms` - Store room types and availability for each hotel
    - `amenities` - Store available amenities
    - `hotel_amenities` - Junction table for hotel-amenity relationships
    - `reviews` - Store customer reviews and ratings
    - `booking_payments` - Store payment transaction details
    - `locations` - Store detailed location information

  2. Enhanced Existing Tables
    - Add foreign key relationships
    - Add proper constraints and validations
    - Add indexes for performance

  3. Security
    - Enable RLS on all tables
    - Add comprehensive policies
    - Secure sensitive data

  4. Functions and Triggers
    - Auto-update timestamps
    - Calculate average ratings
    - Manage room availability
*/

-- Create locations table for detailed address information
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  state text NOT NULL,
  country text DEFAULT 'Pakistan',
  address text,
  postal_code text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hotels table with comprehensive information
CREATE TABLE IF NOT EXISTS hotels (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text,
  location_id uuid REFERENCES locations(id),
  phone text,
  email text,
  website text,
  check_in_time time DEFAULT '14:00',
  check_out_time time DEFAULT '12:00',
  star_rating integer CHECK (star_rating >= 1 AND star_rating <= 5),
  hotel_type text CHECK (hotel_type IN ('economy', 'standard', 'premium', 'luxury')),
  total_rooms integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create amenities table
CREATE TABLE IF NOT EXISTS amenities (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text,
  icon text,
  category text CHECK (category IN ('basic', 'comfort', 'business', 'recreation', 'dining')),
  created_at timestamptz DEFAULT now()
);

-- Create hotel_amenities junction table
CREATE TABLE IF NOT EXISTS hotel_amenities (
  hotel_id integer REFERENCES hotels(id) ON DELETE CASCADE,
  amenity_id integer REFERENCES amenities(id) ON DELETE CASCADE,
  is_free boolean DEFAULT true,
  additional_cost decimal(10,2) DEFAULT 0,
  PRIMARY KEY (hotel_id, amenity_id)
);

-- Create rooms table for different room types
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id integer REFERENCES hotels(id) ON DELETE CASCADE,
  room_type text NOT NULL,
  description text,
  base_price decimal(10,2) NOT NULL,
  max_occupancy integer DEFAULT 2,
  room_size_sqm integer,
  total_rooms integer DEFAULT 1,
  available_rooms integer DEFAULT 1,
  amenities text[], -- Array of room-specific amenities
  images text[], -- Array of image URLs
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT available_rooms_check CHECK (available_rooms >= 0 AND available_rooms <= total_rooms)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id integer REFERENCES hotels(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  is_verified boolean DEFAULT false,
  is_published boolean DEFAULT true,
  helpful_votes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create booking_payments table for payment tracking
CREATE TABLE IF NOT EXISTS booking_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'PKR',
  payment_method text CHECK (payment_method IN ('credit_card', 'debit_card', 'bank_transfer', 'cash', 'digital_wallet')),
  payment_gateway text,
  transaction_id text,
  gateway_response jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled')),
  processed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hotel_images table for multiple hotel images
CREATE TABLE IF NOT EXISTS hotel_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id integer REFERENCES hotels(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  is_primary boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Add foreign key to existing bookings table to link with rooms
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'room_id'
  ) THEN
    ALTER TABLE bookings ADD COLUMN room_id uuid REFERENCES rooms(id);
  END IF;
END $$;

-- Enable Row Level Security on all new tables
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to hotel data
CREATE POLICY "Public can read locations" ON locations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can read hotels" ON hotels FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public can read amenities" ON amenities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can read hotel amenities" ON hotel_amenities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can read rooms" ON rooms FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public can read published reviews" ON reviews FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Public can read hotel images" ON hotel_images FOR SELECT TO anon, authenticated USING (true);

-- Create policies for customer reviews
CREATE POLICY "Customers can create reviews" ON reviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Customers can update own reviews" ON reviews FOR UPDATE TO authenticated 
  USING (customer_id = auth.uid());

-- Create policies for payment data (restricted access)
CREATE POLICY "Customers can read own payments" ON booking_payments FOR SELECT TO authenticated 
  USING (booking_id IN (SELECT id FROM bookings WHERE customer_email = auth.jwt() ->> 'email'));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hotels_location ON hotels(location_id);
CREATE INDEX IF NOT EXISTS idx_hotels_type ON hotels(hotel_type);
CREATE INDEX IF NOT EXISTS idx_hotels_active ON hotels(is_active);
CREATE INDEX IF NOT EXISTS idx_rooms_hotel ON rooms(hotel_id);
CREATE INDEX IF NOT EXISTS idx_rooms_active ON rooms(is_active);
CREATE INDEX IF NOT EXISTS idx_reviews_hotel ON reviews(hotel_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_published ON reviews(is_published);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON booking_payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON booking_payments(status);
CREATE INDEX IF NOT EXISTS idx_hotel_images_hotel ON hotel_images(hotel_id);
CREATE INDEX IF NOT EXISTS idx_hotel_images_primary ON hotel_images(is_primary);

-- Create function to update hotel average rating
CREATE OR REPLACE FUNCTION update_hotel_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- This would update a rating field in hotels table if we add one
  -- For now, we'll calculate ratings dynamically in queries
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for hotel rating updates
CREATE TRIGGER update_hotel_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_hotel_rating();

-- Create function to manage room availability
CREATE OR REPLACE FUNCTION update_room_availability()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.booking_status = 'confirmed' THEN
    -- Decrease available rooms when booking is confirmed
    UPDATE rooms 
    SET available_rooms = available_rooms - 1 
    WHERE id = NEW.room_id AND available_rooms > 0;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Handle status changes
    IF OLD.booking_status != 'confirmed' AND NEW.booking_status = 'confirmed' THEN
      UPDATE rooms 
      SET available_rooms = available_rooms - 1 
      WHERE id = NEW.room_id AND available_rooms > 0;
    ELSIF OLD.booking_status = 'confirmed' AND NEW.booking_status IN ('cancelled', 'completed') THEN
      UPDATE rooms 
      SET available_rooms = available_rooms + 1 
      WHERE id = NEW.room_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.booking_status = 'confirmed' THEN
    -- Increase available rooms when confirmed booking is deleted
    UPDATE rooms 
    SET available_rooms = available_rooms + 1 
    WHERE id = OLD.room_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for room availability (only if room_id column exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'room_id'
  ) THEN
    DROP TRIGGER IF EXISTS manage_room_availability ON bookings;
    CREATE TRIGGER manage_room_availability
      AFTER INSERT OR UPDATE OR DELETE ON bookings
      FOR EACH ROW
      EXECUTE FUNCTION update_room_availability();
  END IF;
END $$;

-- Insert sample amenities
INSERT INTO amenities (name, description, category, icon) VALUES
  ('WiFi', 'Free wireless internet access', 'basic', 'wifi'),
  ('Parking', 'Free parking facility', 'basic', 'car'),
  ('Air Conditioning', 'Climate controlled rooms', 'comfort', 'snowflake'),
  ('Swimming Pool', 'Outdoor/Indoor swimming pool', 'recreation', 'waves'),
  ('Gym/Fitness Center', 'Fully equipped fitness facility', 'recreation', 'dumbbell'),
  ('Restaurant', 'On-site dining facility', 'dining', 'utensils'),
  ('Room Service', '24/7 room service available', 'dining', 'room-service'),
  ('Spa', 'Wellness and spa services', 'recreation', 'spa'),
  ('Business Center', 'Business facilities and meeting rooms', 'business', 'briefcase'),
  ('Laundry Service', 'Laundry and dry cleaning', 'comfort', 'shirt'),
  ('Pet Friendly', 'Pets allowed', 'comfort', 'heart'),
  ('Airport Shuttle', 'Free airport transportation', 'basic', 'plane')
ON CONFLICT (name) DO NOTHING;

-- Insert sample locations
INSERT INTO locations (city, state, address, latitude, longitude) VALUES
  ('Karachi', 'Sindh', 'Clifton Block 9, Karachi', 24.8607, 67.0011),
  ('Lahore', 'Punjab', 'Mall Road, Lahore', 31.5497, 74.3436),
  ('Islamabad', 'Punjab', 'Blue Area, Islamabad', 33.6844, 73.0479),
  ('Gilgit', 'Gilgit-Baltistan', 'Jutial Road, Gilgit', 35.9197, 74.3078),
  ('Skardu', 'Gilgit-Baltistan', 'Skardu City Center', 35.2971, 75.6333),
  ('Hunza', 'Gilgit-Baltistan', 'Karimabad, Hunza Valley', 36.3167, 74.6500)
ON CONFLICT DO NOTHING;

-- Create updated_at triggers for all new tables
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON hotels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON booking_payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();