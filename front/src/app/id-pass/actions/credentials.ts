'use server';

import { postAPI, deleteAPI, getAPI } from '@/lib/api/server';

// 型定義
export interface CredentialData {
  id: string;
  site_id: string;
  site_name: string;
  site_automation_id?: string;
  login_id: string;
  login_password?: string;
  is_registered: boolean;
  status: string;
  flow_codes?: string[];
}

export interface SaveCredentialResult {
  success: boolean;
  message: string;
  siteId?: string;
}

export interface DeleteCredentialResult {
  success: boolean;
  message: string;
  siteId?: string;
}

export interface GetCredentialsResult {
  success: boolean;
  data?: CredentialData[];
  message?: string;
}

interface APIResponse {
  success: boolean;
  message: string;
  site_id?: string;
}

/**
 * 認証情報を保存する
 */
export async function saveCredential(
  siteId: string,
  loginId: string,
  password: string,
  flowCodes: string[] = []
): Promise<SaveCredentialResult> {
  try {
    const data = await postAPI<APIResponse>('/api/credentials/save', {
      site_id: siteId,
      login_id: loginId,
      password: password,
      flow_codes: flowCodes,
    });

    return {
      success: true,
      message: data.message || '認証情報を保存しました',
      siteId: data.site_id,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'サーバーとの通信に失敗しました',
    };
  }
}

/**
 * 認証情報を削除（登録解除）する
 */
export async function deleteCredential(siteId: string): Promise<DeleteCredentialResult> {
  try {
    const data = await deleteAPI<APIResponse>(`/api/credentials/delete?site_id=${siteId}`);

    return {
      success: true,
      message: data.message || '登録を解除しました',
      siteId: data.site_id,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'サーバーとの通信に失敗しました',
    };
  }
}

/**
 * 登録済み認証情報一覧を取得する
 */
export async function getCredentials(): Promise<GetCredentialsResult> {
  try {
    const data = await getAPI<CredentialData[]>('/api/credentials');

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'サーバーとの通信に失敗しました',
    };
  }
}
