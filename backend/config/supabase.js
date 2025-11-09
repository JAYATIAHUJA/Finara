const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Warning: Supabase environment variables not configured');
  console.warn('   Please update SUPABASE_URL and SUPABASE_ANON_KEY in .env file');
  console.warn('   Server will run in demo mode without database connection');
  
  // Return a mock client for development
  module.exports = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
      single: () => Promise.resolve({ data: null, error: null }),
      eq: function() { return this; },
      order: function() { return this; }
    })
  };
} else {
  const supabase = createClient(supabaseUrl, supabaseKey);
  module.exports = supabase;
}

