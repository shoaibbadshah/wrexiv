import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../schema";

const supabaseUrl = "https://hexfhrcihfizyqwhrxlt.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || "";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
