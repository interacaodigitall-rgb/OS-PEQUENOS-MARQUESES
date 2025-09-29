import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase com as suas credenciais.
const supabaseUrl = 'https://sgyjkzsqggdvrrpxdizu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNneWprenNxZ2dkdnJycHhkaXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTA3NTEsImV4cCI6MjA3NDcyNjc1MX0.ey_Gr5fc_EOcnqzqRt5pzEL3hmfyndvg22x76TtWEhY';

let supabase: SupabaseClient | null = null;

// A inicialização "lazy" garante que o cliente só é criado quando é necessário,
// tornando a aplicação mais robusta contra falhas de rede no arranque.
export const getSupabase = (): SupabaseClient => {
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
};
