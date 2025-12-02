import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * ミドルウェアで保存されたアクセストークンを取得
 */
export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('sb-access-token');
  return tokenCookie?.value;
}

/**
 * ミドルウェアで保存されたユーザーIDを取得
 */
export async function getUserId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const userIdCookie = cookieStore.get('sb-user-id');
  return userIdCookie?.value;
}

// サーバーコンポーネント用のfetchユーティリティ
export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  // ミドルウェアで保存されたアクセストークンを取得
  const accessToken = await getAccessToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  // アクセストークンがある場合はAuthorizationヘッダーに追加
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      cache: options?.cache || 'no-store', // デフォルトでキャッシュしない
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

// GETリクエスト
export async function getAPI<T>(endpoint: string, cache?: RequestCache): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: 'GET',
    cache,
  });
}

// POSTリクエスト
export async function postAPI<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUTリクエスト
export async function putAPI<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// PATCHリクエスト
export async function patchAPI<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// DELETEリクエスト
export async function deleteAPI<T>(endpoint: string): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: 'DELETE',
  });
}

