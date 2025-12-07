package models

import (
	"fmt"
	"time"
)

// Site はサイト情報を表す構造体
type Site struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	SiteURL      string    `json:"site_url"`
	SiteType     string    `json:"site_type"`
	AutomationID string    `json:"automation_id"`
	IsActive     bool      `json:"is_active"`
	Description  string    `json:"description"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// CompanySiteCredential は会社のサイト認証情報を表す構造体
type CompanySiteCredential struct {
	ID            string     `json:"id"`
	CompanyID     string     `json:"company_id"`
	SiteID        string     `json:"site_id"`
	SiteName      string     `json:"site_name,omitempty"`
	AutomationID  string     `json:"automation_id,omitempty"`
	LoginID       string     `json:"login_id"`
	LoginPassword string     `json:"login_password,omitempty"`
	IsRegistered  bool       `json:"is_registered"`
	Status        string     `json:"status"`
	FlowCodes     []string   `json:"flow_codes,omitempty"`
	LastSyncedAt  *time.Time `json:"last_synced_at,omitempty"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
}

// SaveCredentialRequest は認証情報保存リクエスト
type SaveCredentialRequest struct {
	SiteID    string   `json:"site_id"`
	LoginID   string   `json:"login_id"`
	Password  string   `json:"password"`
	FlowCodes []string `json:"flow_codes"`
}

// CompanySiteFlow はサイトフロー設定を表す構造体
type CompanySiteFlow struct {
	ID           string    `json:"id"`
	CredentialID string    `json:"credential_id"`
	FlowCode     string    `json:"flow_code"`
	IsEnabled    bool      `json:"is_enabled"`
	CreatedAt    time.Time `json:"created_at"`
}

// GetAllSites は全サイトを取得
func GetAllSites(token string) ([]Site, error) {
	endpoint := "sites?is_active=eq.true&order=id"

	var sites []Site
	if err := SupabaseGet(endpoint, &sites, token); err != nil {
		return nil, err
	}

	return sites, nil
}

// GetSiteByID はIDからサイトを取得
func GetSiteByID(siteID string, token string) (*Site, error) {
	endpoint := fmt.Sprintf("sites?id=eq.%s&limit=1", siteID)

	var sites []Site
	if err := SupabaseGet(endpoint, &sites, token); err != nil {
		return nil, err
	}

	if len(sites) == 0 {
		return nil, nil
	}

	return &sites[0], nil
}

// rawCredentialWithSite はSupabase APIレスポンス用の内部構造体
type rawCredentialWithSite struct {
	ID            string     `json:"id"`
	CompanyID     string     `json:"company_id"`
	SiteID        string     `json:"site_id"`
	LoginID       string     `json:"login_id"`
	LoginPassword string     `json:"login_password,omitempty"`
	IsRegistered  bool       `json:"is_registered"`
	Status        string     `json:"status"`
	LastSyncedAt  *time.Time `json:"last_synced_at"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
	Sites         *struct {
		Name         string `json:"name"`
		AutomationID string `json:"automation_id"`
	} `json:"sites"`
}

// convertRawCredentials はraw APIレスポンスをCompanySiteCredentialに変換
func convertRawCredentials(rawList []rawCredentialWithSite) []CompanySiteCredential {
	credentials := make([]CompanySiteCredential, len(rawList))
	for i, raw := range rawList {
		credentials[i] = CompanySiteCredential{
			ID:            raw.ID,
			CompanyID:     raw.CompanyID,
			SiteID:        raw.SiteID,
			LoginID:       raw.LoginID,
			LoginPassword: raw.LoginPassword,
			IsRegistered:  raw.IsRegistered,
			Status:        raw.Status,
			LastSyncedAt:  raw.LastSyncedAt,
			CreatedAt:     raw.CreatedAt,
			UpdatedAt:     raw.UpdatedAt,
		}
		if raw.Sites != nil {
			credentials[i].SiteName = raw.Sites.Name
			credentials[i].AutomationID = raw.Sites.AutomationID
		}
	}
	return credentials
}

// GetCompanySiteCredentials は会社のサイト認証情報を取得
func GetCompanySiteCredentials(companyID string, token string) ([]CompanySiteCredential, error) {
	endpoint := fmt.Sprintf("company_site_credentials?company_id=eq.%s&select=id,company_id,site_id,login_id,login_password,is_registered,status,created_at,updated_at,sites(name,automation_id)&order=site_id", companyID)

	var rawCredentials []rawCredentialWithSite
	if err := SupabaseGet(endpoint, &rawCredentials, token); err != nil {
		return nil, err
	}

	credentials := convertRawCredentials(rawCredentials)

	// 各credentialのflow_codesを取得
	for i := range credentials {
		flowCodes, err := GetFlowCodesByCredentialID(credentials[i].ID, token)
		if err == nil {
			credentials[i].FlowCodes = flowCodes
		}
	}

	return credentials, nil
}

// GetCredentialByCompanyAndSite は会社IDとサイトIDから認証情報を取得
func GetCredentialByCompanyAndSite(companyID, siteID string, token string) (*CompanySiteCredential, error) {
	endpoint := fmt.Sprintf("company_site_credentials?company_id=eq.%s&site_id=eq.%s&limit=1", companyID, siteID)

	var credentials []CompanySiteCredential
	if err := SupabaseGet(endpoint, &credentials, token); err != nil {
		return nil, err
	}

	if len(credentials) == 0 {
		return nil, nil
	}

	return &credentials[0], nil
}

// SaveCredential は認証情報を保存（UPSERT）
func SaveCredential(companyID, siteID string, loginID, password string, flowCodes []string, token string) error {
	// 既存の認証情報を確認
	existing, err := GetCredentialByCompanyAndSite(companyID, siteID, token)
	if err != nil {
		return err
	}

	var credentialID string

	if existing != nil {
		// 更新
		credentialID = existing.ID
		endpoint := fmt.Sprintf("company_site_credentials?company_id=eq.%s&site_id=eq.%s", companyID, siteID)
		body := map[string]interface{}{
			"login_id":       loginID,
			"login_password": password,
			"is_registered":  true,
			"status":         "active",
			"updated_at":     time.Now().UTC().Format(time.RFC3339),
		}
		if err := SupabasePatch(endpoint, body, nil, token); err != nil {
			return err
		}
	} else {
		// 新規作成
		endpoint := "company_site_credentials"
		body := map[string]interface{}{
			"company_id":     companyID,
			"site_id":        siteID,
			"login_id":       loginID,
			"login_password": password,
			"is_registered":  true,
			"status":         "active",
		}

		// 作成後のIDを取得するため、selectを指定
		var created []CompanySiteCredential
		if err := SupabasePost(endpoint, body, &created, token); err != nil {
			return err
		}
		if len(created) > 0 {
			credentialID = created[0].ID
		}
	}

	// flow_codesを保存
	if credentialID != "" && len(flowCodes) > 0 {
		if err := SaveFlowCodes(credentialID, flowCodes, token); err != nil {
			return err
		}
	}

	return nil
}

// SaveFlowCodes はフローコードを保存
func SaveFlowCodes(credentialID string, flowCodes []string, token string) error {
	// 既存のフローを削除
	deleteEndpoint := fmt.Sprintf("company_site_flows?credential_id=eq.%s", credentialID)
	if err := SupabaseDelete(deleteEndpoint, token); err != nil {
		// 削除エラーは無視（レコードがない場合もある）
	}

	// 新しいフローを挿入
	for _, code := range flowCodes {
		endpoint := "company_site_flows"
		body := map[string]interface{}{
			"credential_id": credentialID,
			"flow_code":     code,
			"is_enabled":    true,
		}
		if err := SupabasePost(endpoint, body, nil, token); err != nil {
			return err
		}
	}

	return nil
}

// GetFlowCodesByCredentialID はCredentialIDからフローコードを取得
func GetFlowCodesByCredentialID(credentialID string, token string) ([]string, error) {
	endpoint := fmt.Sprintf("company_site_flows?credential_id=eq.%s&is_enabled=eq.true", credentialID)

	var flows []CompanySiteFlow
	if err := SupabaseGet(endpoint, &flows, token); err != nil {
		return nil, err
	}

	codes := make([]string, len(flows))
	for i, flow := range flows {
		codes[i] = flow.FlowCode
	}

	return codes, nil
}

// DeleteCredential は認証情報を削除（論理削除）
func DeleteCredential(companyID, siteID string, token string) error {
	endpoint := fmt.Sprintf("company_site_credentials?company_id=eq.%s&site_id=eq.%s", companyID, siteID)
	body := map[string]interface{}{
		"is_registered": false,
		"status":        "inactive",
		"updated_at":    time.Now().UTC().Format(time.RFC3339),
	}

	return SupabasePatch(endpoint, body, nil, token)
}

// GetRegisteredCredentials は登録済みの認証情報を取得（Rod実行用）
func GetRegisteredCredentials(companyID string, token string) ([]CompanySiteCredential, error) {
	endpoint := fmt.Sprintf("company_site_credentials?company_id=eq.%s&is_registered=eq.true&select=id,company_id,site_id,login_id,login_password,is_registered,status,created_at,updated_at,sites(name,automation_id)&order=site_id", companyID)

	var rawCredentials []rawCredentialWithSite
	if err := SupabaseGet(endpoint, &rawCredentials, token); err != nil {
		return nil, err
	}

	return convertRawCredentials(rawCredentials), nil
}
