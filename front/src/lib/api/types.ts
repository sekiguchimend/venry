// API レスポンス型定義

export interface User {
  id: number;
  company_id: number;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: number;
  company_group_id: number;
  name: string;
  phone_number: string;
  email: string;
  postal_code: string;
  address: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  user: User;
  company?: Company;
}

export interface Site {
  id: number;
  name: string;
  url: string;
  site_type: string;
  is_active: boolean;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CompanySiteCredential {
  id: number;
  company_id: number;
  site_id: number;
  login_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HealthResponse {
  status: string;
  database: string;
}

