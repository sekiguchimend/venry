package models

import (
	"fmt"
	"net/url"
	"time"
)

// ContentGroup はコンテンツグループを表す構造体
type ContentGroup struct {
	ID          string    `json:"id"`
	CompanyID   string    `json:"company_id"`
	Name        string    `json:"name"`
	Description string    `json:"description,omitempty"`
	SortOrder   int       `json:"sort_order"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// ContentGroupItem はグループに属するコンテンツアイテムを表す構造体
type ContentGroupItem struct {
	ID             string    `json:"id"`
	ContentGroupID string    `json:"content_group_id"`
	ContentID      string    `json:"content_id"`
	SortOrder      int       `json:"sort_order"`
	CreatedAt      time.Time `json:"created_at"`
}

// ContentGroupItemWithDetails はコンテンツ詳細情報付きのグループアイテム
type ContentGroupItemWithDetails struct {
	ID             string    `json:"id"`
	ContentGroupID string    `json:"content_group_id"`
	ContentID      string    `json:"content_id"`
	ContentName    string    `json:"content_name"`
	SiteID         string    `json:"site_id"`
	SiteName       string    `json:"site_name"`
	AutomationID   string    `json:"automation_id"`
	SortOrder      int       `json:"sort_order"`
	CreatedAt      time.Time `json:"created_at"`
}

// CreateContentGroupRequest はグループ作成リクエストを表す構造体
type CreateContentGroupRequest struct {
	Name        string   `json:"name"`
	Description string   `json:"description,omitempty"`
	ContentIDs  []string `json:"content_ids"`
}

// GetContentGroups は企業のコンテンツグループ一覧を取得
func GetContentGroups(companyID string, token string) ([]ContentGroup, error) {
	endpoint := fmt.Sprintf("content_groups?company_id=eq.%s&order=sort_order.asc,created_at.desc", url.QueryEscape(companyID))

	var groups []ContentGroup
	if err := SupabaseGet(endpoint, &groups, token); err != nil {
		return nil, err
	}

	return groups, nil
}

// CreateContentGroup は新しいコンテンツグループを作成
func CreateContentGroup(companyID string, name string, description string, token string) (*ContentGroup, error) {
	body := map[string]interface{}{
		"company_id":  companyID,
		"name":        name,
		"description": description,
		"sort_order":  0,
	}

	var result []ContentGroup
	if err := SupabasePost("content_groups", body, &result, token); err != nil {
		return nil, err
	}

	if len(result) > 0 {
		return &result[0], nil
	}

	return nil, fmt.Errorf("failed to create content group")
}

// AddContentToGroup はグループにコンテンツを追加
func AddContentToGroup(groupID string, contentID string, sortOrder int, token string) error {
	body := map[string]interface{}{
		"content_group_id": groupID,
		"content_id":       contentID,
		"sort_order":       sortOrder,
	}

	var result []ContentGroupItem
	if err := SupabasePost("content_group_items", body, &result, token); err != nil {
		return err
	}

	return nil
}

// GetContentGroupItems はグループに属するコンテンツ一覧を取得
func GetContentGroupItems(groupID string, token string) ([]ContentGroupItem, error) {
	endpoint := fmt.Sprintf("content_group_items?content_group_id=eq.%s&order=sort_order.asc", url.QueryEscape(groupID))

	var items []ContentGroupItem
	if err := SupabaseGet(endpoint, &items, token); err != nil {
		return nil, err
	}

	return items, nil
}

// GetContentGroupItemsWithDetails はコンテンツ詳細付きでグループアイテムを取得
func GetContentGroupItemsWithDetails(groupID string, token string) ([]ContentGroupItemWithDetails, error) {
	// まずグループアイテムを取得
	items, err := GetContentGroupItems(groupID, token)
	if err != nil {
		return nil, err
	}

	if len(items) == 0 {
		return []ContentGroupItemWithDetails{}, nil
	}

	// content_id をまとめて取得
	contentIDs := make([]string, 0, len(items))
	seenContent := map[string]bool{}
	for _, it := range items {
		if it.ContentID == "" || seenContent[it.ContentID] {
			continue
		}
		seenContent[it.ContentID] = true
		contentIDs = append(contentIDs, it.ContentID)
	}

	// contents を一括取得
	type ContentRow struct {
		ID     string `json:"id"`
		Name   string `json:"name"`
		SiteID string `json:"site_id"`
	}
	var contents []ContentRow
	contentEndpoint := fmt.Sprintf("contents?id=in.(%s)&select=id,name,site_id", url.QueryEscape(joinCSV(contentIDs)))
	if err := SupabaseGet(contentEndpoint, &contents, token); err != nil {
		return nil, err
	}
	contentByID := map[string]ContentRow{}
	siteIDs := make([]string, 0, len(contents))
	seenSite := map[string]bool{}
	for _, c := range contents {
		contentByID[c.ID] = c
		if c.SiteID != "" && !seenSite[c.SiteID] {
			seenSite[c.SiteID] = true
			siteIDs = append(siteIDs, c.SiteID)
		}
	}

	// sites を一括取得
	type SiteRow struct {
		ID           string `json:"id"`
		Name         string `json:"name"`
		AutomationID string `json:"automation_id"`
	}
	var sites []SiteRow
	siteByID := map[string]SiteRow{}
	if len(siteIDs) > 0 {
		siteEndpoint := fmt.Sprintf("sites?id=in.(%s)&select=id,name,automation_id", url.QueryEscape(joinCSV(siteIDs)))
		if err := SupabaseGet(siteEndpoint, &sites, token); err != nil {
			return nil, err
		}
		for _, s := range sites {
			siteByID[s.ID] = s
		}
	}

	// 最終レスポンス組み立て（欠損があっても item 自体は返す）
	detailItems := make([]ContentGroupItemWithDetails, 0, len(items))
	for _, it := range items {
		c, ok := contentByID[it.ContentID]
		if !ok {
			detailItems = append(detailItems, ContentGroupItemWithDetails{
				ID:             it.ID,
				ContentGroupID: it.ContentGroupID,
				ContentID:      it.ContentID,
				ContentName:    "",
				SiteID:         "",
				SiteName:       "",
				AutomationID:   "",
				SortOrder:      it.SortOrder,
				CreatedAt:      it.CreatedAt,
			})
			continue
		}

		s := siteByID[c.SiteID]

		detailItems = append(detailItems, ContentGroupItemWithDetails{
			ID:             it.ID,
			ContentGroupID: it.ContentGroupID,
			ContentID:      it.ContentID,
			ContentName:    c.Name,
			SiteID:         c.SiteID,
			SiteName:       s.Name,
			AutomationID:   s.AutomationID,
			SortOrder:      it.SortOrder,
			CreatedAt:      it.CreatedAt,
		})
	}

	return detailItems, nil
}

func joinCSV(ids []string) string {
	// PostgRESTの in.(...) はカンマ区切り、値にカンマは含まれない想定（UUID）
	// 例: id=in.(uuid1,uuid2)
	if len(ids) == 0 {
		return ""
	}
	out := ids[0]
	for i := 1; i < len(ids); i++ {
		out += "," + ids[i]
	}
	return out
}

// UpdateContentGroup はコンテンツグループを更新
func UpdateContentGroup(groupID string, name string, description string, token string) (*ContentGroup, error) {
	endpoint := fmt.Sprintf("content_groups?id=eq.%s", url.QueryEscape(groupID))
	body := map[string]interface{}{
		"name":        name,
		"description": description,
	}

	var result []ContentGroup
	if err := SupabasePatch(endpoint, body, &result, token); err != nil {
		return nil, err
	}

	if len(result) > 0 {
		return &result[0], nil
	}

	return nil, fmt.Errorf("failed to update content group")
}

// DeleteContentGroupItems はグループのすべてのアイテムを削除
func DeleteContentGroupItems(groupID string, token string) error {
	endpoint := fmt.Sprintf("content_group_items?content_group_id=eq.%s", url.QueryEscape(groupID))
	return SupabaseDelete(endpoint, token)
}

// DeleteContentGroup はコンテンツグループを削除
func DeleteContentGroup(groupID string, token string) error {
	endpoint := fmt.Sprintf("content_groups?id=eq.%s", url.QueryEscape(groupID))
	return SupabaseDelete(endpoint, token)
}

