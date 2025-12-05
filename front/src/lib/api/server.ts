import { getAccessToken, refreshToken } from './auth';
import { API_BASE_URL } from './config';

/**
 * サーバーコンポーネント用のfetchユーティリティ
 */
export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
  retryOnUnauthorized = true
): Promise<T> {
  const accessToken = await getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  // options.headersがあればマージ
  if (options?.headers) {
    const optHeaders = options.headers as Record<string, string>;
    Object.assign(headers, optHeaders);
  }

  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
    cache: options?.cache || 'no-store',
  });

  // 401エラーの場合、トークンリフレッシュを試行
  if (response.status === 401 && retryOnUnauthorized) {
    const refreshSuccess = await refreshToken();
    if (refreshSuccess) {
      // 新しいトークンで再試行
      return fetchAPI<T>(endpoint, options, false);
    }
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

export async function getAPI<T>(endpoint: string, cache?: RequestCache): Promise<T> {
  return fetchAPI<T>(endpoint, { method: 'GET', cache });
}

export async function postAPI<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, { method: 'POST', body: JSON.stringify(data) });
}

export async function putAPI<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) });
}

export async function patchAPI<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, { method: 'PATCH', body: JSON.stringify(data) });
}

export async function deleteAPI<T>(endpoint: string): Promise<T> {
  return fetchAPI<T>(endpoint, { method: 'DELETE' });
}
