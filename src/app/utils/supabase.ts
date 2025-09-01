import {createClient} from '@supabase/supabase-js'
import {environment} from '../environments/environment';

console.log(environment.supabase_url, environment.supabase_anon_key);

const supabase = createClient(environment.supabase_url!, environment.supabase_anon_key!,
);


export default supabase;
