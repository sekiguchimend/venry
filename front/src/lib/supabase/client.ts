import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rqzzpdmawtbrvmuddckz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxenpwZG1hd3RicnZtdWRkY2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2Mzk4MjIsImV4cCI6MjA4MDIxNTgyMn0.hmjAnvWSJ5UZfMlvXm2-RAhCVioDXsSeuZoaY864Voc';

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
