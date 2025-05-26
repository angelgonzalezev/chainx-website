import { createClient } from "@supabase/supabase-js";
import { env } from "../constants/env";

const supabaseUrl = env.SUPABASE_PROJECT_URL;
const supabaseApiKey = env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseApiKey);

export default supabase;
