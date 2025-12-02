import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';

/**
 * サーバーコンポーネント用のSupabaseクライアントを作成
 */
export async function createServerSupabaseClient() {
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
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}

/**
 * 現在のセッションを取得（サーバーコンポーネント用）
 */
export async function getSession() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/**
 * 現在のユーザーを取得（サーバーコンポーネント用）
 */
export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * 認証が必要なページで使用するヘルパー関数
 * 未認証の場合はログインページにリダイレクト
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

/**
 * ミドルウェアで保存されたアクセストークンを取得
 */
export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('sb-access-token');
  return tokenCookie?.value || null;
}

/**
 * ミドルウェアで保存されたユーザーIDを取得
 */
export async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const userIdCookie = cookieStore.get('sb-user-id');
  return userIdCookie?.value || null;
}

