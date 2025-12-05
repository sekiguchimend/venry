package handlers

import (
	"encoding/json"
	"net/http"

	"nissho-dispatch-backend/internal/middleware"
	"nissho-dispatch-backend/internal/models"
)

// getUserFromRequest はリクエストからユーザー情報とトークンを取得する共通ヘルパー
func getUserFromRequest(w http.ResponseWriter, r *http.Request) (*models.User, string, bool) {
	authUserID, ok := middleware.GetUserIDFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return nil, "", false
	}
	token, _ := middleware.GetTokenFromContext(r.Context())

	user, err := models.GetUserByAuthID(authUserID, token)
	if err != nil {
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return nil, "", false
	}
	if user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return nil, "", false
	}

	return user, token, true
}

// GetSites は全サイトを取得
func GetSites(w http.ResponseWriter, r *http.Request) {
	token, _ := middleware.GetTokenFromContext(r.Context())

	sites, err := models.GetAllSites(token)
	if err != nil {
		http.Error(w, "Failed to get sites", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sites)
}

// GetCompanyCredentials は会社のサイト認証情報を取得
func GetCompanyCredentials(w http.ResponseWriter, r *http.Request) {
	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	credentials, err := models.GetCompanySiteCredentials(user.CompanyID, token)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(credentials)
}

// SaveCredential は認証情報を保存
func SaveCredential(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	// リクエストボディをパース
	var req models.SaveCredentialRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// バリデーション
	if req.SiteID == "" || req.LoginID == "" || req.Password == "" {
		http.Error(w, "site_id, login_id, and password are required", http.StatusBadRequest)
		return
	}

	// サイトの存在確認
	site, err := models.GetSiteByID(req.SiteID, token)
	if err != nil {
		http.Error(w, "Failed to get site", http.StatusInternalServerError)
		return
	}
	if site == nil {
		http.Error(w, "Site not found", http.StatusNotFound)
		return
	}

	// 認証情報を保存
	if err := models.SaveCredential(user.CompanyID, req.SiteID, req.LoginID, req.Password, req.FlowCodes, token); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "認証情報を保存しました",
		"site_id": req.SiteID,
	})
}

// DeleteCredential は認証情報を削除（登録解除）
func DeleteCredential(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	siteID := r.URL.Query().Get("site_id")
	if siteID == "" {
		http.Error(w, "site_id is required", http.StatusBadRequest)
		return
	}

	if err := models.DeleteCredential(user.CompanyID, siteID, token); err != nil {
		http.Error(w, "Failed to delete credential", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "登録を解除しました",
		"site_id": siteID,
	})
}
