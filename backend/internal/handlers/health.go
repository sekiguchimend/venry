package handlers

import (
	"encoding/json"
	"net/http"

	"nissho-dispatch-backend/internal/models"
)

// HealthResponse はヘルスチェックレスポンス
type HealthResponse struct {
	Status   string `json:"status"`
	Database string `json:"database"`
}

// HealthCheck はヘルスチェックハンドラー
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	response := HealthResponse{
		Status:   "ok",
		Database: "disconnected",
	}

	// データベース接続確認
	if models.DB != nil {
		if err := models.DB.Ping(); err == nil {
			response.Database = "connected"
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

