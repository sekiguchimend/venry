import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rqzzpdmawtbrvmuddckz.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxenpwZG1hd3RicnZtdWRkY2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2Mzk4MjIsImV4cCI6MjA4MDIxNTgyMn0.hmjAnvWSJ5UZfMlvXm2-RAhCVioDXsSeuZoaY864Voc',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component内での呼び出し時は無視
          }
        },
      },
    }
  );
}

// アクセストークンを取得するヘルパー関数
export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('sb-access-token')?.value || null;
}

// ユーザーIDを取得するヘルパー関数
export async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('sb-user-id')?.value || null;
}
