package handlers

import (
	"encoding/json"
	"net/http"
)

// HealthResponse はヘルスチェックレスポンス
type HealthResponse struct {
	Status string `json:"status"`
}

// HealthCheck はヘルスチェックハンドラー
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	response := HealthResponse{
		Status: "ok",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
