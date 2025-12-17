'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_BASE_URL } from './config';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user?: {
    id: string;
    email: string;
  };
}

interface AuthResult {
  success: boolean;
  error?: string;
}

/**
 * ログイン
 */
export async function login(email: string, password: string): Promise<AuthResult> {
  let step = 'init';
  try {
    // ステップ1: fetch開始
    step = `fetch to ${API_BASE_URL}/api/auth/login`;
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // ステップ2: レスポンス確認
    step = `response status: ${response.status}`;
    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `[${step}] ${errorText}` };
    }

    // ステップ3: JSONパース
    step = 'json parse';
    const text = await response.text();
    let data: AuthResponse;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      return { success: false, error: `[${step}] JSONパース失敗: ${text.substring(0, 200)}` };
    }

    // ステップ4: データ検証
    step = `data check: access_token=${!!data.access_token}, refresh_token=${!!data.refresh_token}`;
    if (!data.access_token || !data.refresh_token) {
      return { success: false, error: `[${step}] トークンが不足` };
    }

    // ステップ5: Cookie設定
    step = 'setAuthCookies';
    await setAuthCookies(data);

    // ステップ6: 完了
    return { success: true };
  } catch (e) {
    return { success: false, error: `[${step}] 例外: ${e instanceof Error ? e.message : String(e)}` };
  }
}

/**
 * サインアップ
 */
export async function signup(email: string, password: string): Promise<AuthResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || 'サインアップに失敗しました' };
    }

    const data: AuthResponse = await response.json();

    // トークンがある場合は保存（メール確認不要の場合）
    if (data.access_token) {
      await setAuthCookies(data);
    }

    return { success: true };
  } catch {
    return { success: false, error: 'サーバーとの通信に失敗しました' };
  }
}

/**
 * ログアウト
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (accessToken) {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
    } catch {
      // ログアウトAPIが失敗してもクッキーは削除する
    }
  }

  // クッキー削除
  await clearAuthCookies();

  redirect('/login');
}

/**
 * トークンリフレッシュ
 */
export async function refreshToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const refreshTokenValue = cookieStore.get('refresh_token')?.value;

  if (!refreshTokenValue) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshTokenValue }),
    });

    if (!response.ok) {
      return false;
    }

    const data: AuthResponse = await response.json();
    await setAuthCookies(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * セッション確認
 */
export async function getSession(): Promise<{ accessToken: string; userId: string } | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const userId = cookieStore.get('user_id')?.value;

  if (!accessToken || !userId) {
    return null;
  }

  return { accessToken, userId };
}

/**
 * アクセストークン取得
 */
export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('access_token')?.value || null;
}

// ヘルパー関数
async function setAuthCookies(data: AuthResponse) {
  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };

  cookieStore.set('access_token', data.access_token, {
    ...cookieOptions,
    maxAge: data.expires_in,
  });

  cookieStore.set('refresh_token', data.refresh_token, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30, // 30日
  });

  if (data.user?.id) {
    cookieStore.set('user_id', data.user.id, {
      ...cookieOptions,
      maxAge: data.expires_in,
    });
  }
}

async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('user_id');
}
