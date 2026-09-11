import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials.");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function setupBucket() {
  const BUCKET_NAME = 'portfolio-assets';
  console.log(`Checking if bucket '${BUCKET_NAME}' exists...`);
  
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  if (listError) {
    console.error("Failed to list buckets:", listError);
    return;
  }

  const exists = buckets.some(b => b.name === BUCKET_NAME);
  
  if (!exists) {
    console.log(`Creating bucket '${BUCKET_NAME}'...`);
    const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
      fileSizeLimit: 5242880 // 5MB
    });
    
    if (createError) {
      console.error("Failed to create bucket:", createError);
    } else {
      console.log(`Bucket '${BUCKET_NAME}' created successfully and set to public.`);
    }
  } else {
    console.log(`Bucket '${BUCKET_NAME}' already exists.`);
    
    // Optionally update it to ensure it's public
    const { error: updateError } = await supabaseAdmin.storage.updateBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
      fileSizeLimit: 5242880 // 5MB
    });
    if (updateError) {
      console.error("Failed to update bucket privacy:", updateError);
    } else {
      console.log(`Bucket '${BUCKET_NAME}' updated to ensure public access.`);
    }
  }
}

setupBucket();
