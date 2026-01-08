package models

import (
	"fmt"
	"log"
	"net/url"
	"time"
)

// ContentSchedule は「時刻指定更新」の設定を表す構造体
type ContentSchedule struct {
	ID        string    `json:"id"`
	CompanyID string    `json:"company_id"`
	ContentID string    `json:"content_id"`
	SortOrder int       `json:"sort_order"`
	Time      string    `json:"time"`
	TemplateID *string  `json:"template_id,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// GetContentSchedules は content_id に紐づくスケジュールを取得
func GetContentSchedules(contentID string, token string) ([]ContentSchedule, error) {
	endpoint := fmt.Sprintf(
		"content_schedules?content_id=eq.%s&order=sort_order.asc,created_at.asc",
		url.QueryEscape(contentID),
	)
	var rows []ContentSchedule
	if err := SupabaseGet(endpoint, &rows, token); err != nil {
		return nil, err
	}
	return rows, nil
}

// ReplaceContentSchedules は content_id に紐づくスケジュールを全置換する（delete -> insert）
func ReplaceContentSchedules(companyID string, contentID string, schedules []ContentSchedule, token string) ([]ContentSchedule, error) {
	// 既存を削除
	delEndpoint := fmt.Sprintf("content_schedules?content_id=eq.%s", url.QueryEscape(contentID))
	if err := SupabaseDelete(delEndpoint, token); err != nil {
		return nil, err
	}

	now := time.Now().UTC().Format(time.RFC3339)
	var created []ContentSchedule
	for _, s := range schedules {
		body := map[string]any{
			"company_id":  companyID,
			"content_id":  contentID,
			"sort_order":  s.SortOrder,
			"time":        s.Time,
			"template_id": s.TemplateID,
			"created_at":  now,
			"updated_at":  now,
		}
		var result []ContentSchedule
		if err := SupabasePost("content_schedules", body, &result, token); err != nil {
			log.Printf("ReplaceContentSchedules insert failed: content_id=%s sort_order=%d time=%q template_id=%v err=%v", contentID, s.SortOrder, s.Time, s.TemplateID, err)
			return nil, err
		}
		if len(result) > 0 {
			created = append(created, result[0])
		}
	}
	return created, nil
}


