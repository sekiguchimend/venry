package handlers

import (
	"encoding/json"
	"net/http"

	"nissho-dispatch-backend/internal/middleware"
	"nissho-dispatch-backend/internal/models"
)

// GetSites は全サイトを取得
func GetSites(w http.ResponseWriter, r *http.Request) {
	sites, err := models.GetAllSites()
	if err != nil {
		http.Error(w, "Failed to get sites", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sites)
}

// GetCompanyCredentials は会社のサイト認証情報を取得
func GetCompanyCredentials(w http.ResponseWriter, r *http.Request) {
	// コンテキストからユーザーIDを取得
	authUserID, ok := middleware.GetUserIDFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// ユーザー情報を取得
	user, err := models.GetUserByAuthID(authUserID)
	if err != nil {
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	if user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// 会社のサイト認証情報を取得
	credentials, err := models.GetCompanySiteCredentials(user.CompanyID)
	if err != nil {
		http.Error(w, "Failed to get credentials", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(credentials)
}

