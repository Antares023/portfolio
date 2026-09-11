import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: projects, error: err1 } = await supabase.from('Project').select('*');
  const { data: toolbox, error: err2 } = await supabase.from('ToolboxItem').select('*');
  console.log('Projects:', projects?.length, 'Error:', err1);
  console.log('Toolbox Items:', toolbox?.length, 'Error:', err2);
}

main();
