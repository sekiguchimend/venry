import { getAPI } from '@/lib/api/server';
import IdPassClient from './components/IdPassClient';
import type { CredentialData } from './actions/credentials';

// バックエンドAPIから取得するサイト情報の型
interface ApiSite {
  id: string;
  name: string;
  site_url: string;
  site_type: string;
  automation_id: string;
  is_active: boolean;
  description: string;
  created_at: string;
  updated_at: string;
}

export default async function IdPassPage() {
  let credentials: CredentialData[] = [];
  let sites: ApiSite[] = [];

  try {
    credentials = await getAPI<CredentialData[]>('/api/credentials');
  } catch (error) {
    console.error('Failed to fetch credentials:', error);
  }

  try {
    sites = await getAPI<ApiSite[]>('/api/sites');
  } catch (error) {
    console.error('Failed to fetch sites:', error);
  }

  return <IdPassClient initialCredentials={credentials} initialSites={sites} />;
}
