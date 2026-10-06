import { supabase } from "@/integrations/supabase/client";

/** Reuse the platform's public-key client; private membership stays in the DB. */
export function getNotesClient() {
  return supabase;
}
