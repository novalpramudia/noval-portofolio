"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use inside Client Components.
 * Safe to call multiple times; the underlying client is memoized per
 * module instance by the browser bundler.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Copy .env.example to .env.local and fill in your Supabase project values."
    );
  }

  return createBrowserClient(url, anonKey);
}
