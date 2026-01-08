package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"nissho-dispatch-backend/internal/models"
)

// GetUpdateHistory は更新履歴を取得
func GetUpdateHistory(w http.ResponseWriter, r *http.Request) {
	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	// URLパラメータから日付を取得（デフォルトは今日）
	dateStr := r.URL.Query().Get("date")
	if dateStr == "" {
		dateStr = time.Now().Format("2006-01-02")
	}

	// フィルタパラメータを取得
	updateType := r.URL.Query().Get("update_type")
	status := r.URL.Query().Get("status")

	var histories []models.UpdateHistory
	var err error

	// フィルタに応じて取得
	if updateType != "" {
		histories, err = models.GetUpdateHistoryByDateAndType(user.CompanyID, dateStr, updateType, token)
	} else if status != "" {
		histories, err = models.GetUpdateHistoryByDateAndStatus(user.CompanyID, dateStr, status, token)
	} else {
		histories, err = models.GetUpdateHistoryByDate(user.CompanyID, dateStr, token)
	}

	if err != nil {
		http.Error(w, "Failed to get update history", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(histories)
}

