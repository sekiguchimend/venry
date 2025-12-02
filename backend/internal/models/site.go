package models

import "time"

// Site はサイト情報を表す構造体
type Site struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	URL         string    `json:"url"`
	SiteType    string    `json:"site_type"`
	IsActive    bool      `json:"is_active"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// CompanySiteCredential は会社のサイト認証情報を表す構造体
type CompanySiteCredential struct {
	ID         int       `json:"id"`
	CompanyID  int       `json:"company_id"`
	SiteID     int       `json:"site_id"`
	LoginID    string    `json:"login_id"`
	Password   string    `json:"-"` // パスワードはJSONに含めない
	IsActive   bool      `json:"is_active"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

// GetAllSites は全サイトを取得
func GetAllSites() ([]Site, error) {
	query := `
		SELECT id, name, url, site_type, is_active, description, created_at, updated_at
		FROM sites
		WHERE is_active = true
		ORDER BY name
	`
	rows, err := DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var sites []Site
	for rows.Next() {
		var site Site
		err := rows.Scan(
			&site.ID,
			&site.Name,
			&site.URL,
			&site.SiteType,
			&site.IsActive,
			&site.Description,
			&site.CreatedAt,
			&site.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		sites = append(sites, site)
	}

	return sites, nil
}

// GetCompanySiteCredentials は会社のサイト認証情報を取得
func GetCompanySiteCredentials(companyID int) ([]CompanySiteCredential, error) {
	query := `
		SELECT id, company_id, site_id, login_id, is_active, created_at, updated_at
		FROM company_site_credentials
		WHERE company_id = $1 AND is_active = true
		ORDER BY site_id
	`
	rows, err := DB.Query(query, companyID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var credentials []CompanySiteCredential
	for rows.Next() {
		var cred CompanySiteCredential
		err := rows.Scan(
			&cred.ID,
			&cred.CompanyID,
			&cred.SiteID,
			&cred.LoginID,
			&cred.IsActive,
			&cred.CreatedAt,
			&cred.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		credentials = append(credentials, cred)
	}

	return credentials, nil
}

