package models

import (
	"fmt"
	"net/url"
	"time"
)

// UpdateHistory は更新履歴を表す構造体
type UpdateHistory struct {
	ID           string     `json:"id"`
	CompanyID    string     `json:"company_id"`
	UpdateType   string     `json:"update_type"`
	TargetID     *string    `json:"target_id,omitempty"`
	Title        *string    `json:"title,omitempty"`
	GirlID       *string    `json:"girl_id,omitempty"`
	GirlName     *string    `json:"girl_name,omitempty"`
	Label        *string    `json:"label,omitempty"`
	Status       string     `json:"status"`
	ErrorMessage *string    `json:"error_message,omitempty"`
	CreatedAt    time.Time  `json:"created_at"`
}

// CreateUpdateHistory は更新履歴を作成
func CreateUpdateHistory(history UpdateHistory, token string) (*UpdateHistory, error) {
	now := time.Now().UTC().Format(time.RFC3339)

	body := map[string]interface{}{
		"company_id":    history.CompanyID,
		"update_type":   history.UpdateType,
		"target_id":     history.TargetID,
		"title":         history.Title,
		"girl_id":       history.GirlID,
		"girl_name":     history.GirlName,
		"label":         history.Label,
		"status":        history.Status,
		"error_message": history.ErrorMessage,
		"created_at":    now,
	}

	var result []UpdateHistory
	if err := SupabasePost("update_history", body, &result, token); err != nil {
		return nil, err
	}

	if len(result) > 0 {
		return &result[0], nil
	}
	return nil, fmt.Errorf("failed to create update history")
}

// GetUpdateHistoryByDate は指定日の更新履歴を取得
func GetUpdateHistoryByDate(companyID string, date string, token string) ([]UpdateHistory, error) {
	// date は "2026-01-08" 形式
	startTime := fmt.Sprintf("%sT00:00:00Z", date)
	endTime := fmt.Sprintf("%sT23:59:59Z", date)

	endpoint := fmt.Sprintf(
		"update_history?company_id=eq.%s&created_at=gte.%s&created_at=lte.%s&order=created_at.desc",
		url.QueryEscape(companyID),
		url.QueryEscape(startTime),
		url.QueryEscape(endTime),
	)

	var histories []UpdateHistory
	if err := SupabaseGet(endpoint, &histories, token); err != nil {
		return nil, err
	}

	return histories, nil
}

// GetUpdateHistoryByDateAndType は指定日・タイプの更新履歴を取得
func GetUpdateHistoryByDateAndType(companyID string, date string, updateType string, token string) ([]UpdateHistory, error) {
	startTime := fmt.Sprintf("%sT00:00:00Z", date)
	endTime := fmt.Sprintf("%sT23:59:59Z", date)

	endpoint := fmt.Sprintf(
		"update_history?company_id=eq.%s&created_at=gte.%s&created_at=lte.%s&update_type=eq.%s&order=created_at.desc",
		url.QueryEscape(companyID),
		url.QueryEscape(startTime),
		url.QueryEscape(endTime),
		url.QueryEscape(updateType),
	)

	var histories []UpdateHistory
	if err := SupabaseGet(endpoint, &histories, token); err != nil {
		return nil, err
	}

	return histories, nil
}

// GetUpdateHistoryByDateAndStatus は指定日・ステータスの更新履歴を取得
func GetUpdateHistoryByDateAndStatus(companyID string, date string, status string, token string) ([]UpdateHistory, error) {
	startTime := fmt.Sprintf("%sT00:00:00Z", date)
	endTime := fmt.Sprintf("%sT23:59:59Z", date)

	endpoint := fmt.Sprintf(
		"update_history?company_id=eq.%s&created_at=gte.%s&created_at=lte.%s&status=eq.%s&order=created_at.desc",
		url.QueryEscape(companyID),
		url.QueryEscape(startTime),
		url.QueryEscape(endTime),
		url.QueryEscape(status),
	)

	var histories []UpdateHistory
	if err := SupabaseGet(endpoint, &histories, token); err != nil {
		return nil, err
	}

	return histories, nil
}

