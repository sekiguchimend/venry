'use server';

import { postAPI, getAPI, fetchAPI } from '@/lib/api/server';

interface ContentGroup {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface CreateContentGroupRequest {
  name: string;
  description?: string;
  content_ids: string[];
}

interface CreateContentGroupResponse {
  success: boolean;
  group?: ContentGroup;
  message?: string;
  error?: string;
}

interface GetContentGroupsResponse {
  success: boolean;
  groups?: ContentGroup[];
  message?: string;
  error?: string;
}

/**
 * コンテンツグループを作成
 */
export async function createContentGroup(
  name: string,
  contentIds: string[],
  description?: string
): Promise<CreateContentGroupResponse> {
  try {
    const requestData: CreateContentGroupRequest = {
      name,
      content_ids: contentIds,
      description: description || '',
    };

    const data = await postAPI<ContentGroup>('/api/content-groups/create', requestData);
    
    return {
      success: true,
      group: data,
    };
  } catch (error) {
    console.error('Failed to create content group:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'グループの作成に失敗しました',
    };
  }
}

/**
 * コンテンツグループ一覧を取得
 */
export async function getContentGroups(): Promise<GetContentGroupsResponse> {
  try {
    const data = await getAPI<ContentGroup[]>('/api/content-groups');

    return {
      success: true,
      groups: data,
    };
  } catch (error) {
    console.error('Failed to get content groups:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'グループの取得に失敗しました',
    };
  }
}

interface ContentGroupItem {
  id: string;
  content_group_id: string;
  content_id: string;
  content_name: string;
  site_id: string;
  site_name: string;
  automation_id: string;
  sort_order: number;
  created_at: string;
}

interface GetContentGroupItemsResponse {
  success: boolean;
  items?: ContentGroupItem[];
  message?: string;
  error?: string;
}

/**
 * グループに属するコンテンツアイテム一覧を取得
 */
export async function getContentGroupItems(groupId: string): Promise<GetContentGroupItemsResponse> {
  try {
    const data = await getAPI<ContentGroupItem[]>(`/api/content-groups/items?group_id=${groupId}`);
    
    return {
      success: true,
      items: data,
    };
  } catch (error) {
    console.error('Failed to get content group items:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'グループアイテムの取得に失敗しました',
    };
  }
}

interface UpdateContentGroupRequest {
  name: string;
  description?: string;
  content_ids: string[];
}

interface UpdateContentGroupResponse {
  success: boolean;
  group?: ContentGroup;
  message?: string;
  error?: string;
}

/**
 * コンテンツグループを更新
 */
export async function updateContentGroup(
  groupId: string,
  name: string,
  contentIds: string[],
  description?: string
): Promise<UpdateContentGroupResponse> {
  try {
    const requestData: UpdateContentGroupRequest = {
      name,
      content_ids: contentIds,
      description: description || '',
    };

    const data = await postAPI<ContentGroup>(`/api/content-groups/update?group_id=${groupId}`, requestData);

    return {
      success: true,
      group: data,
    };
  } catch (error) {
    console.error('Failed to update content group:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'グループの更新に失敗しました',
    };
  }
}

interface GetContentIdResponse {
  id: string;
  name?: string;
  error?: string;
}

/**
 * siteIdとflowCodeからコンテンツIDを取得（存在しない場合は作成）
 */
export async function getContentId(
  siteId: string,
  flowCode: string,
  flowName: string
): Promise<GetContentIdResponse> {
  try {
    const params = new URLSearchParams({
      siteId,
      flowCode,
      flowName,
    });

    const data = await getAPI<GetContentIdResponse>(`/api/content/id?${params.toString()}`);

    return data;
  } catch (error) {
    console.error('Failed to get content ID:', error);
    return {
      id: '',
      error: error instanceof Error ? error.message : 'コンテンツIDの取得に失敗しました',
    };
  }
}

