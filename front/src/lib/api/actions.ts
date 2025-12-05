'use server';

import { getAPI } from './server';
import { UserResponse } from './types';

/**
 * ユーザー情報を取得
 */
export async function getUserProfile(): Promise<{
  success: boolean;
  data?: UserResponse;
  error?: string;
}> {
  try {
    const data = await getAPI<UserResponse>('/api/user/me');
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'ユーザー情報の取得に失敗しました',
    };
  }
}
