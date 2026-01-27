// assets/js/supabase-client.js

// Your Supabase credentials
const SUPABASE_URL = 'https://pzsahntqxegszahysnkg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_p1zYZGh3lilAdFe8-HOhQg_vPN5ssWc';

// Initialize the Supabase client
// The CDN script exposes 'supabase' as a global object with createClient method
const _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Re-assign to 'supabase' for convenience in other scripts
window.supabase = _supabase;

console.log("Supabase Client Initialized");
