import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * JWTのペイロードをデコード（期限チェック専用）
 *
 * セキュリティ注意:
 * - この関数は署名検証を行いません
 * - 署名検証はバックエンドAPI（middleware/auth.go）で行われます
 * - フロントエンドではトークンの期限切れを事前チェックするためだけに使用
 * - 改ざん検知はバックエンドに依存します
 */
function decodeJWT(token: string): { exp?: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    // Base64デコードのみ（署名検証なし）
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

// トークンが期限切れかどうかチェック（5分前に期限切れとみなす）
function isTokenExpiringSoon(token: string, bufferSeconds = 300): boolean {
  const payload = decodeJWT(token);
  if (!payload?.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp - now < bufferSeconds;
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';

  // 認証済みユーザーがログイン/サインアップページにアクセスした場合
  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL('/notices', request.url));
  }

  // 未認証ユーザーが保護されたページにアクセスした場合
  if (!accessToken && !isAuthPage) {
    // リフレッシュトークンがあればリフレッシュを試行
    if (refreshToken) {
      const refreshResult = await tryRefreshToken(refreshToken);
      if (refreshResult) {
        const response = NextResponse.next();
        setTokenCookies(response, refreshResult);
        return response;
      }
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ルート（/）にアクセスした場合は/noticesにリダイレクト
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/notices', request.url));
  }

  // アクセストークンが期限切れ間近の場合、リフレッシュ
  if (accessToken && refreshToken && isTokenExpiringSoon(accessToken)) {
    const refreshResult = await tryRefreshToken(refreshToken);
    if (refreshResult) {
      const response = NextResponse.next();
      setTokenCookies(response, refreshResult);
      return response;
    }
    // リフレッシュ失敗時はログインページへ
    if (!isAuthPage) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      clearTokenCookies(response);
      return response;
    }
  }

  return NextResponse.next();
}

interface RefreshResult {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user?: { id: string };
}

async function tryRefreshToken(refreshToken: string): Promise<RefreshResult | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

function setTokenCookies(response: NextResponse, data: RefreshResult) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };

  response.cookies.set('access_token', data.access_token, {
    ...cookieOptions,
    maxAge: data.expires_in,
  });

  response.cookies.set('refresh_token', data.refresh_token, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30, // 30日
  });

  if (data.user?.id) {
    response.cookies.set('user_id', data.user.id, {
      ...cookieOptions,
      maxAge: data.expires_in,
    });
  }
}

function clearTokenCookies(response: NextResponse) {
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  response.cookies.delete('user_id');
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico).*)',
  ],
};
