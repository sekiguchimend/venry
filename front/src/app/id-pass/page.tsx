import { getAPI } from '@/lib/api/server';
import IdPassClient from './components/IdPassClient';
import type { CredentialData } from './actions/credentials';

export default async function IdPassPage() {
  let credentials: CredentialData[] = [];

  try {
    credentials = await getAPI<CredentialData[]>('/api/credentials');
  } catch (error) {
    console.error('Failed to fetch credentials:', error);
  }

  return <IdPassClient initialCredentials={credentials} />;
}
