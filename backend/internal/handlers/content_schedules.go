package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"regexp"
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

var hhmmRe = regexp.MustCompile(`([01]\d|2[0-3]):[0-5]\d`)

func normalizeHHMM(s string) (string, bool) {
	s = strings.TrimSpace(s)
	if s == "" {
		return "", false
	}
	m := hhmmRe.FindString(s)
	if m == "" {
		return "", false
	}
	return m, true
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
		log.Printf("GetContentSchedules error: content_id=%s err=%v", contentID, err)
		http.Error(w, fmt.Sprintf("Failed to get content schedules: %v", err), http.StatusInternalServerError)
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
		t, ok := normalizeHHMM(it.Time)
		if !ok {
			http.Error(w, fmt.Sprintf("Invalid time format at items[%d].time: %q (expected HH:MM)", idx, it.Time), http.StatusBadRequest)
			return
		}
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
		// Supabase側が400などを返した場合、500に潰さずに見えるようにする
		msg := fmt.Sprintf("Failed to save content schedules: %v", err)
		log.Printf("SaveContentSchedules error: content_id=%s company_id=%s err=%v", req.ContentID, user.CompanyID, err)
		if strings.Contains(err.Error(), "status 400") {
			http.Error(w, msg, http.StatusBadRequest)
			return
		}
		http.Error(w, msg, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(saved)
}


