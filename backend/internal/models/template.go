package models

import (
	"fmt"
	"net/url"
	"strings"
	"time"
)

// TemplateFolder はテンプレートフォルダ（カテゴリ）を表す構造体
type TemplateFolder struct {
	ID         string    `json:"id"`
	CompanyID  string    `json:"company_id"`
	Name       string    `json:"name"`
	FolderType string    `json:"folder_type"`
	FlowType   *string   `json:"flow_type,omitempty"`
	IsCustom   bool      `json:"is_custom"`
	SortOrder  int       `json:"sort_order"`
	CreatedAt  time.Time `json:"created_at"`
}

// GetTemplateFolderByNameAndType は会社ID + フォルダ名 + 種別からフォルダを取得
func GetTemplateFolderByNameAndType(companyID string, name string, folderType string, token string) (*TemplateFolder, error) {
	endpoint := fmt.Sprintf(
		"template_folders?company_id=eq.%s&name=eq.%s&folder_type=eq.%s&limit=1",
		url.QueryEscape(companyID),
		url.QueryEscape(name),
		url.QueryEscape(folderType),
	)

	var folders []TemplateFolder
	if err := SupabaseGet(endpoint, &folders, token); err != nil {
		return nil, err
	}
	if len(folders) == 0 {
		return nil, nil
	}
	return &folders[0], nil
}

// CreateTemplateFolder はフォルダを新規作成
func CreateTemplateFolder(companyID string, name string, folderType string, token string) (*TemplateFolder, error) {
	body := map[string]interface{}{
		"company_id":   companyID,
		"name":         name,
		"folder_type":  folderType,
		"flow_type":    nil,
		"is_custom":    true,
		"sort_order":   0,
		"created_at":   time.Now().UTC().Format(time.RFC3339),
	}

	var result []TemplateFolder
	if err := SupabasePost("template_folders", body, &result, token); err != nil {
		return nil, err
	}
	if len(result) > 0 {
		return &result[0], nil
	}
	return nil, fmt.Errorf("failed to create template folder")
}

// UpdateTemplateFolderFlowType はフォルダのflow_typeを更新する（既存フォルダにtypeを付与する用途）
func UpdateTemplateFolderFlowType(companyID string, folderID string, flowType string, token string) error {
	if strings.TrimSpace(folderID) == "" || strings.TrimSpace(flowType) == "" {
		return nil
	}
	endpoint := fmt.Sprintf(
		"template_folders?id=eq.%s&company_id=eq.%s",
		url.QueryEscape(folderID),
		url.QueryEscape(companyID),
	)
	body := map[string]any{
		"flow_type": flowType,
	}
	return SupabasePatch(endpoint, body, nil, token)
}

// Template はテンプレートを表す構造体
type Template struct {
	ID                   string     `json:"id"`
	CompanyID             string     `json:"company_id"`
	FolderID              *string    `json:"folder_id,omitempty"`
	Name                  string     `json:"name"`
	Content               *string    `json:"content,omitempty"`
	ImageURL              *string    `json:"image_url,omitempty"`
	GirlID                *string    `json:"girl_id,omitempty"`
	Label                 *string    `json:"label,omitempty"`
	Memo                  *string    `json:"memo,omitempty"`
	IsUsageDisabled       bool       `json:"is_usage_disabled"`
	RequiresConfirmation  bool       `json:"requires_confirmation"`
	SortOrder             int        `json:"sort_order"`
	CreatedAt             time.Time  `json:"created_at"`
	UpdatedAt             time.Time  `json:"updated_at"`
}

// GetTemplateFolders は会社のテンプレートフォルダ一覧を取得
func GetTemplateFolders(companyID string, folderType string, token string) ([]TemplateFolder, error) {
	endpoint := fmt.Sprintf("template_folders?company_id=eq.%s&order=sort_order.asc,created_at.asc", url.QueryEscape(companyID))
	if folderType != "" {
		endpoint += fmt.Sprintf("&folder_type=eq.%s", url.QueryEscape(folderType))
	}

	var folders []TemplateFolder
	if err := SupabaseGet(endpoint, &folders, token); err != nil {
		return nil, err
	}
	return folders, nil
}

// GetTemplates は会社のテンプレート一覧を取得
func GetTemplates(companyID string, templateID string, folderID string, folderType string, query string, token string) ([]Template, error) {
	endpoint := fmt.Sprintf("templates?company_id=eq.%s&order=sort_order.asc,updated_at.desc,created_at.desc", url.QueryEscape(companyID))

	if templateID != "" {
		endpoint += fmt.Sprintf("&id=eq.%s", url.QueryEscape(templateID))
	}

	if folderID != "" {
		endpoint += fmt.Sprintf("&folder_id=eq.%s", url.QueryEscape(folderID))
	}

	// folder_typeが指定された場合、template_foldersを結合して絞り込みたいが
	// PostgRESTのfilterを簡単にするため、folder_idを先に絞れない場合は
	// 一旦templatesを取り、サーバ側（ハンドラ）でフォルダタイプフィルタする運用にする。
	_ = folderType

	if query != "" {
		// ilikeは%がワイルドカード。URLエンコードで%25になる。
		escaped := url.PathEscape(query)
		endpoint += fmt.Sprintf("&name=ilike.%s%s%s", "%25", escaped, "%25")
	}

	var templates []Template
	if err := SupabaseGet(endpoint, &templates, token); err != nil {
		return nil, err
	}
	return templates, nil
}

// UpsertTemplate はテンプレートを保存（新規作成 or 更新）
func UpsertTemplate(t Template, token string) (*Template, error) {
	now := time.Now().UTC().Format(time.RFC3339)

	body := map[string]interface{}{
		"folder_id":             t.FolderID,
		"name":                  t.Name,
		"content":               t.Content,
		"image_url":             t.ImageURL,
		"girl_id":               t.GirlID,
		"label":                 t.Label,
		"memo":                  t.Memo,
		"is_usage_disabled":     t.IsUsageDisabled,
		"requires_confirmation": t.RequiresConfirmation,
		"sort_order":            t.SortOrder,
		"updated_at":            now,
	}

	// id がある場合は既存確認して更新
	if t.ID != "" {
		checkEndpoint := fmt.Sprintf("templates?id=eq.%s&company_id=eq.%s&limit=1", url.QueryEscape(t.ID), url.QueryEscape(t.CompanyID))
		var existing []Template
		if err := SupabaseGet(checkEndpoint, &existing, token); err == nil && len(existing) > 0 {
			var result []Template
			if err := SupabasePatch(checkEndpoint, body, &result, token); err != nil {
				return nil, err
			}
			if len(result) > 0 {
				return &result[0], nil
			}
			return nil, fmt.Errorf("failed to update template")
		}
	}

	// 新規作成
	body["company_id"] = t.CompanyID
	var result []Template
	if err := SupabasePost("templates", body, &result, token); err != nil {
		return nil, err
	}
	if len(result) > 0 {
		return &result[0], nil
	}
	return nil, fmt.Errorf("failed to create template")
}


