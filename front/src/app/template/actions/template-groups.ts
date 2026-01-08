'use server';

import { postAPI, getAPI } from '@/lib/api/server';

interface TemplateGroup {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface CreateTemplateGroupRequest {
  name: string;
  description?: string;
  template_ids: string[];
}

interface CreateTemplateGroupResponse {
  success: boolean;
  group?: TemplateGroup;
  message?: string;
  error?: string;
}

interface GetTemplateGroupsResponse {
  success: boolean;
  groups?: TemplateGroup[];
  message?: string;
  error?: string;
}

/**
 * テンプレートグループを作成
 */
export async function createTemplateGroup(
  name: string,
  templateIds: string[],
  description?: string
): Promise<CreateTemplateGroupResponse> {
  try {
    const requestData: CreateTemplateGroupRequest = {
      name,
      template_ids: templateIds,
      description: description || '',
    };

    const data = await postAPI<TemplateGroup>('/api/template-groups/create', requestData);

    return {
      success: true,
      group: data,
    };
  } catch (error) {
    console.error('Failed to create template group:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'グループの作成に失敗しました',
    };
  }
}

/**
 * テンプレートグループ一覧を取得
 */
export async function getTemplateGroups(): Promise<GetTemplateGroupsResponse> {
  try {
    const data = await getAPI<TemplateGroup[]>('/api/template-groups');

    return {
      success: true,
      groups: data,
    };
  } catch (error) {
    console.error('Failed to get template groups:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'グループの取得に失敗しました',
    };
  }
}

interface UpdateTemplateGroupResponse {
  success: boolean;
  group?: TemplateGroup;
  message?: string;
  error?: string;
}

/**
 * テンプレートグループを更新
 */
export async function updateTemplateGroup(
  groupId: string,
  name: string,
  templateIds: string[],
  description?: string
): Promise<UpdateTemplateGroupResponse> {
  try {
    const requestData: CreateTemplateGroupRequest = {
      name,
      template_ids: templateIds,
      description: description || '',
    };

    const data = await postAPI<TemplateGroup>(`/api/template-groups/update?group_id=${groupId}`, requestData);

    return {
      success: true,
      group: data,
    };
  } catch (error) {
    console.error('Failed to update template group:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'グループの更新に失敗しました',
    };
  }
}

interface TemplateGroupItem {
  id: string;
  template_group_id: string;
  template_id: string;
  template_name: string;
  label: string;
  sort_order: number;
  created_at: string;
}

interface GetTemplateGroupItemsResponse {
  success: boolean;
  items?: TemplateGroupItem[];
  message?: string;
  error?: string;
}

/**
 * グループに属するテンプレートアイテム一覧を取得
 */
export async function getTemplateGroupItems(groupId: string): Promise<GetTemplateGroupItemsResponse> {
  try {
    const data = await getAPI<TemplateGroupItem[]>(`/api/template-groups/items?group_id=${groupId}`);

    return {
      success: true,
      items: data,
    };
  } catch (error) {
    console.error('Failed to get template group items:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'グループアイテムの取得に失敗しました',
    };
  }
}
