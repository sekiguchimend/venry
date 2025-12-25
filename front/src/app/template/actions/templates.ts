'use server';

import { getAPI, postAPI } from '@/lib/api/server';

export type TemplateFolderType = 'normal' | 'regular' | 'disabled';

export interface TemplateFolder {
  id: string;
  company_id: string;
  name: string;
  folder_type: TemplateFolderType;
  flow_type?: string | null;
  is_custom: boolean;
  sort_order: number;
  created_at: string;
}

export interface Template {
  id: string;
  company_id: string;
  folder_id: string | null;
  name: string;
  content: string | null;
  image_url: string | null;
  girl_id: string | null;
  label: string | null;
  memo: string | null;
  is_usage_disabled: boolean;
  requires_confirmation: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GetTemplatesParams {
  id?: string;
  folder_type?: TemplateFolderType;
  folder_id?: string;
  q?: string;
}

export async function getTemplateFolders(folderType?: TemplateFolderType): Promise<TemplateFolder[]> {
  const qs = folderType ? `?folder_type=${encodeURIComponent(folderType)}` : '';
  return getAPI<TemplateFolder[]>(`/api/template-folders${qs}`);
}

export async function getTemplates(params?: GetTemplatesParams): Promise<Template[]> {
  const query = new URLSearchParams();
  if (params?.id) query.set('id', params.id);
  if (params?.folder_type) query.set('folder_type', params.folder_type);
  if (params?.folder_id) query.set('folder_id', params.folder_id);
  if (params?.q) query.set('q', params.q);
  const qs = query.toString();
  return getAPI<Template[]>(`/api/templates${qs ? `?${qs}` : ''}`);
}

export interface SaveTemplateRequest {
  id?: string;
  folder_id?: string;
  folder_type?: TemplateFolderType;
  flow_type?: string;
  name: string;
  content?: string | null;
  image_url?: string | null;
  girl_id?: string | null;
  label?: string | null;
  memo?: string | null;
  is_usage_disabled?: boolean;
  requires_confirmation?: boolean;
  sort_order?: number;
}

export async function saveTemplate(req: SaveTemplateRequest): Promise<Template> {
  return postAPI<Template>('/api/templates/save', {
    id: req.id || '',
    folder_id: req.folder_id ?? null,
    folder_type: req.folder_type ?? 'normal',
    flow_type: req.flow_type ?? '',
    name: req.name,
    content: req.content ?? null,
    image_url: req.image_url ?? null,
    girl_id: req.girl_id ?? null,
    label: req.label ?? null,
    memo: req.memo ?? null,
    is_usage_disabled: req.is_usage_disabled ?? false,
    requires_confirmation: req.requires_confirmation ?? false,
    sort_order: req.sort_order ?? 0,
  });
}

export interface TemplateFlowMapping {
  id: string;
  template_id: string;
  site_automation_id: string;
  flow_code: string;
  flow_name: string | null;
  is_enabled: boolean;
  category_path: unknown;
  created_at: string;
  updated_at: string;
}

export async function getTemplateFlowMappings(templateId: string): Promise<TemplateFlowMapping[]> {
  const qs = templateId ? `?template_id=${encodeURIComponent(templateId)}` : '';
  return getAPI<TemplateFlowMapping[]>(`/api/templates/flow-mappings${qs}`);
}

export interface SaveTemplateFlowMappingItem {
  site_automation_id: string;
  flow_code: string;
  flow_name: string;
  is_enabled: boolean;
  category_path: unknown;
}

export async function saveTemplateFlowMappings(templateId: string, items: SaveTemplateFlowMappingItem[]): Promise<{ success: boolean }> {
  return postAPI<{ success: boolean }>(`/api/templates/flow-mappings/save`, {
    template_id: templateId,
    items,
  });
}


