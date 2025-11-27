import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pkwmunpariyhiqltkmsg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrd211bnBhcml5aGlxbHRrbXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNzc0MTQsImV4cCI6MjA3OTc1MzQxNH0.0udULuB5jWNvLqRxLopAXftccwYo5-jiMff4v03xIRs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
