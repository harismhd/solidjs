import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pktzbofaejisceevwzjn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrdHpib2ZhZWppc2NlZXZ3empuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDczMTExMTcsImV4cCI6MjAyMjg4NzExN30.1YxBdot9a50Ul-mMpMLnplDpjEfctOb88qFHkJ-M-WM";

export const supabase = createClient(supabaseUrl, supabaseKey);
