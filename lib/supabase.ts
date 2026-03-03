import { createClient } from '@supabase/supabase-js';

// Supabase configuration with fallback values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Re-export types and functions from separate files
export * from './database-types';
export * from './database-functions';

// Legacy functions for backward compatibility
export const createCustomer = async (customerData: any) => {
  const { data, error } = await supabase
    .from('customers')
    .insert([customerData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createBooking = async (bookingData: any) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getBookingsByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('customer_email', email)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getBookingById = async (id: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const updateBookingStatus = async (id: string, status: any) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ booking_status: status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePaymentStatus = async (id: string, status: any) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ payment_status: status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};