'use server';

import { postAPI } from '@/lib/api/server';

interface ExecuteFlowResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * 特定のサイト・フローを実行
 */
export async function executeFlow(siteId: string, flowCode: string, flowName: string): Promise<ExecuteFlowResponse> {
  try {
    // automation_id（hime_channel等）をそのまま送信
    // バックエンドでautomation_id→UUIDの変換を行う
    const data = await postAPI<ExecuteFlowResponse>('/api/automation/execute-flow', {
      site_id: siteId,
      flow_code: flowCode,
      flow_name: flowName,
    });
    return data;
  } catch (error) {
    console.error('Failed to execute flow:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
