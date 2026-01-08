package models

import (
	"fmt"
	"net/url"
	"time"
)

// TemplateGroup はテンプレートグループを表す構造体
type TemplateGroup struct {
	ID          string    `json:"id"`
	CompanyID   string    `json:"company_id"`
	Name        string    `json:"name"`
	Description string    `json:"description,omitempty"`
	SortOrder   int       `json:"sort_order"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// TemplateGroupItem はグループに属するテンプレートアイテムを表す構造体
type TemplateGroupItem struct {
	ID              string    `json:"id"`
	TemplateGroupID string    `json:"template_group_id"`
	TemplateID      string    `json:"template_id"`
	SortOrder       int       `json:"sort_order"`
	CreatedAt       time.Time `json:"created_at"`
}

// TemplateGroupItemWithDetails はテンプレート詳細情報付きのグループアイテム
type TemplateGroupItemWithDetails struct {
	ID              string    `json:"id"`
	TemplateGroupID string    `json:"template_group_id"`
	TemplateID      string    `json:"template_id"`
	TemplateName    string    `json:"template_name"`
	Label           string    `json:"label"`
	SortOrder       int       `json:"sort_order"`
	CreatedAt       time.Time `json:"created_at"`
}

// CreateTemplateGroupRequest はグループ作成リクエストを表す構造体
type CreateTemplateGroupRequest struct {
	Name        string   `json:"name"`
	Description string   `json:"description,omitempty"`
	TemplateIDs []string `json:"template_ids"`
}

// GetTemplateGroups は企業のテンプレートグループ一覧を取得
func GetTemplateGroups(companyID string, token string) ([]TemplateGroup, error) {
	endpoint := fmt.Sprintf("template_groups?company_id=eq.%s&order=sort_order.asc,created_at.desc", url.QueryEscape(companyID))

	var groups []TemplateGroup
	if err := SupabaseGet(endpoint, &groups, token); err != nil {
		return nil, err
	}

	return groups, nil
}

// CreateTemplateGroup は新しいテンプレートグループを作成
func CreateTemplateGroup(companyID string, name string, description string, token string) (*TemplateGroup, error) {
	body := map[string]interface{}{
		"company_id":  companyID,
		"name":        name,
		"description": description,
		"sort_order":  0,
	}

	var result []TemplateGroup
	if err := SupabasePost("template_groups", body, &result, token); err != nil {
		return nil, err
	}

	if len(result) > 0 {
		return &result[0], nil
	}

	return nil, fmt.Errorf("failed to create template group")
}

// AddTemplateToGroup はグループにテンプレートを追加
func AddTemplateToGroup(groupID string, templateID string, sortOrder int, token string) error {
	body := map[string]interface{}{
		"template_group_id": groupID,
		"template_id":       templateID,
		"sort_order":        sortOrder,
	}

	var result []TemplateGroupItem
	if err := SupabasePost("template_group_items", body, &result, token); err != nil {
		return err
	}

	return nil
}

// GetTemplateGroupItems はグループに属するテンプレート一覧を取得
func GetTemplateGroupItems(groupID string, token string) ([]TemplateGroupItem, error) {
	endpoint := fmt.Sprintf("template_group_items?template_group_id=eq.%s&order=sort_order.asc", url.QueryEscape(groupID))

	var items []TemplateGroupItem
	if err := SupabaseGet(endpoint, &items, token); err != nil {
		return nil, err
	}

	return items, nil
}

// TemplateGroupItemWithTemplates はPostgRESTのembedded resourcesレスポンス用
type TemplateGroupItemWithTemplates struct {
	ID              string    `json:"id"`
	TemplateGroupID string    `json:"template_group_id"`
	TemplateID      string    `json:"template_id"`
	SortOrder       int       `json:"sort_order"`
	CreatedAt       time.Time `json:"created_at"`
	Templates       *struct {
		ID    string `json:"id"`
		Name  string `json:"name"`
		Label string `json:"label"`
	} `json:"templates"`
}

// GetTemplateGroupItemsWithDetails はテンプレート詳細付きでグループアイテムを取得
func GetTemplateGroupItemsWithDetails(groupID string, token string) ([]TemplateGroupItemWithDetails, error) {
	// PostgRESTのembedded resourcesを使って一度にすべてのデータを取得
	endpoint := fmt.Sprintf("template_group_items?template_group_id=eq.%s&select=id,template_group_id,template_id,sort_order,created_at,templates(id,name,label)&order=sort_order.asc", url.QueryEscape(groupID))

	var items []TemplateGroupItemWithTemplates
	if err := SupabaseGet(endpoint, &items, token); err != nil {
		fmt.Printf("Error getting template group items with details: %v\n", err)
		return nil, err
	}

	fmt.Printf("Found %d template group items from embedded query\n", len(items))

	// TemplateGroupItemWithDetailsに変換
	var detailItems []TemplateGroupItemWithDetails
	for _, item := range items {
		if item.Templates == nil {
			fmt.Printf("Skipping item %s: no templates\n", item.ID)
			continue
		}

		detailItems = append(detailItems, TemplateGroupItemWithDetails{
			ID:              item.ID,
			TemplateGroupID: item.TemplateGroupID,
			TemplateID:      item.TemplateID,
			TemplateName:    item.Templates.Name,
			Label:           item.Templates.Label,
			SortOrder:       item.SortOrder,
			CreatedAt:       item.CreatedAt,
		})
	}

	fmt.Printf("Returning %d template detail items\n", len(detailItems))

	return detailItems, nil
}

// UpdateTemplateGroup はテンプレートグループを更新
func UpdateTemplateGroup(groupID string, name string, description string, token string) (*TemplateGroup, error) {
	endpoint := fmt.Sprintf("template_groups?id=eq.%s", url.QueryEscape(groupID))
	body := map[string]interface{}{
		"name":        name,
		"description": description,
	}

	var result []TemplateGroup
	if err := SupabasePatch(endpoint, body, &result, token); err != nil {
		return nil, err
	}

	if len(result) > 0 {
		return &result[0], nil
	}

	return nil, fmt.Errorf("failed to update template group")
}

// DeleteTemplateGroupItems はグループのすべてのアイテムを削除
func DeleteTemplateGroupItems(groupID string, token string) error {
	endpoint := fmt.Sprintf("template_group_items?template_group_id=eq.%s", url.QueryEscape(groupID))
	return SupabaseDelete(endpoint, token)
}

// DeleteTemplateGroup はテンプレートグループを削除
func DeleteTemplateGroup(groupID string, token string) error {
	endpoint := fmt.Sprintf("template_groups?id=eq.%s", url.QueryEscape(groupID))
	return SupabaseDelete(endpoint, token)
}
