/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // Add more env vars here if you have them, e.g.:
  // readonly VITE_OTHER_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
