'use server';

import { postAPI } from '@/lib/api/server';

interface FlowExecutionResult {
  Success: boolean;
  FlowCode: string;
  FlowName: string;
  Error: string;
  Duration: number;
  StepsRun: number;
  Timestamp: string;
}

interface ExecuteFlowsResponse {
  success: boolean;
  results?: FlowExecutionResult[];
  message?: string;
  total?: number;
  error?: string;
}

/**
 * 登録済みの全サイトのフローを実行（ヘッドレスなし）
 */
export async function executeRegisteredFlows(): Promise<ExecuteFlowsResponse> {
  try {
    const data = await postAPI<ExecuteFlowsResponse>('/api/automation/execute-flows', {});
    return data;
  } catch (error) {
    console.error('Failed to execute flows:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
