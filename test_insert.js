const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[key] = value.trim();
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'];

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    const testData = {
      name: 'Test Client',
      email: 'test@goyocafe.com',
      phone: '1234567890',
      date: '2026-06-10',
      time: '07:00 PM',
      guests: 4,
      special_requests: 'Test request'
    };

    console.log('Inserting test row into reservations...');
    const { data, error } = await supabase.from('reservations').insert([testData]).select();

    if (error) {
      console.error('Error inserting reservation:', error);
    } else {
      console.log('Success! Inserted row:', data);
      
      // Clean up the test row
      if (data && data[0] && data[0].id) {
        console.log('Cleaning up test row with ID:', data[0].id);
        const { error: delError } = await supabase.from('reservations').delete().eq('id', data[0].id);
        if (delError) {
          console.error('Error cleaning up:', delError);
        } else {
          console.log('Cleanup successful.');
        }
      }
    }
  } catch (err) {
    console.error('Exception:', err);
  }
}

run();
