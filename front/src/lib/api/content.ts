import { getAPI, postAPI } from './server';

export interface ContentPost {
  id: string;
  content_id: string;
  post_number: number;
  title: string;
  normal_time: string;
  normal_price: string;
  coupon_time: string;
  coupon_price: string;
  conditions: string;
  created_at: string;
  updated_at: string;
}

export interface ContentPostRequest {
  post_number: number;
  title: string;
  normal_time: string;
  normal_price: string;
  coupon_time: string;
  coupon_price: string;
  conditions: string;
}

export interface SaveContentPostsRequest {
  content_id: string;
  posts: ContentPostRequest[];
}

/**
 * コンテンツの投稿内容一覧を取得
 */
export async function getContentPosts(contentId: string): Promise<ContentPost[]> {
  return getAPI<ContentPost[]>(`/api/content/posts?content_id=${encodeURIComponent(contentId)}`);
}

/**
 * コンテンツの投稿内容を保存
 */
export async function saveContentPosts(data: SaveContentPostsRequest): Promise<ContentPost[]> {
  return postAPI<ContentPost[]>(`/api/content/posts/save`, data);
}

export interface Content {
  id: string;
  name: string;
}

/**
 * siteIdとflowCode/flowNameからコンテンツIDを取得（見つからない場合は空のContentを返す）
 */
export async function getContentIdBySiteAndFlow(siteId: string, flowCodeOrName: string, flowName?: string): Promise<Content> {
  try {
    let url = `/api/content/id?siteId=${encodeURIComponent(siteId)}`;
    if (flowName) {
      url += `&flowName=${encodeURIComponent(flowName)}`;
    }
    if (flowCodeOrName) {
      url += `&flowCode=${encodeURIComponent(flowCodeOrName)}`;
    }
    const result = await getAPI<Content>(url);
    return result || { id: '', name: '' };
  } catch (error) {
    console.error('Failed to get content ID:', error);
    return { id: '', name: '' };
  }
}

