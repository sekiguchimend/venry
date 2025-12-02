import { supabase } from '@/lib/supabase/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// クライアントコンポーネント用のfetchユーティリティ
export async function fetchAPIClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  // Supabaseセッションからアクセストークンを取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  // アクセストークンがある場合はAuthorizationヘッダーに追加
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
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
export async function getAPIClient<T>(endpoint: string): Promise<T> {
  return fetchAPIClient<T>(endpoint, {
    method: 'GET',
  });
}

// POSTリクエスト
export async function postAPIClient<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPIClient<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUTリクエスト
export async function putAPIClient<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPIClient<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// PATCHリクエスト
export async function patchAPIClient<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPIClient<T>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// DELETEリクエスト
export async function deleteAPIClient<T>(endpoint: string): Promise<T> {
  return fetchAPIClient<T>(endpoint, {
    method: 'DELETE',
  });
}

