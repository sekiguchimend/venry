package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"nissho-dispatch-backend/internal/middleware"
	"nissho-dispatch-backend/internal/models"
)

type ContentScheduleItemRequest struct {
	Time       string `json:"time"`
	TemplateID string `json:"template_id"`
}

type SaveContentSchedulesRequest struct {
	ContentID string                     `json:"content_id"`
	Items     []ContentScheduleItemRequest `json:"items"`
}

// GetContentSchedules はコンテンツの時刻指定更新スケジュールを取得
func GetContentSchedules(w http.ResponseWriter, r *http.Request) {
	token, ok := middleware.GetTokenFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	contentID := strings.TrimSpace(r.URL.Query().Get("content_id"))
	if contentID == "" {
		http.Error(w, "content_id is required", http.StatusBadRequest)
		return
	}

	rows, err := models.GetContentSchedules(contentID, token)
	if err != nil {
		http.Error(w, "Failed to get content schedules", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rows)
}

// SaveContentSchedules はコンテンツの時刻指定更新スケジュールを保存（全置換）
func SaveContentSchedules(w http.ResponseWriter, r *http.Request) {
	token, ok := middleware.GetTokenFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	authUserID, ok := middleware.GetUserIDFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req SaveContentSchedulesRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	req.ContentID = strings.TrimSpace(req.ContentID)
	if req.ContentID == "" {
		http.Error(w, "content_id is required", http.StatusBadRequest)
		return
	}

	user, err := models.GetUserByAuthID(authUserID, token)
	if err != nil || user == nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// 受け取った items を sort_order 付きの rows に変換
	rows := make([]models.ContentSchedule, 0, len(req.Items))
	for idx, it := range req.Items {
		t := strings.TrimSpace(it.Time)
		var tpl *string
		if strings.TrimSpace(it.TemplateID) != "" {
			v := strings.TrimSpace(it.TemplateID)
			tpl = &v
		}
		rows = append(rows, models.ContentSchedule{
			CompanyID:  user.CompanyID,
			ContentID:  req.ContentID,
			SortOrder:  idx,
			Time:       t,
			TemplateID: tpl,
		})
	}

	saved, err := models.ReplaceContentSchedules(user.CompanyID, req.ContentID, rows, token)
	if err != nil {
		http.Error(w, "Failed to save content schedules", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(saved)
}


