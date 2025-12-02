package handlers

import (
	"encoding/json"
	"net/http"

	"nissho-dispatch-backend/internal/middleware"
	"nissho-dispatch-backend/internal/models"
)

// UserResponse はユーザー情報レスポンス
type UserResponse struct {
	User    *models.User    `json:"user"`
	Company *models.Company `json:"company,omitempty"`
}

// GetCurrentUser は現在のログインユーザー情報を取得
func GetCurrentUser(w http.ResponseWriter, r *http.Request) {
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

	// 最終ログイン時刻を更新
	if err := models.UpdateLastLogin(user.ID); err != nil {
		// ログ更新エラーは無視
	}

	// 会社情報を取得
	company, err := models.GetCompanyByID(user.CompanyID)
	if err != nil {
		http.Error(w, "Failed to get company", http.StatusInternalServerError)
		return
	}

	response := UserResponse{
		User:    user,
		Company: company,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// UpdateUserProfile はユーザープロフィールを更新
func UpdateUserProfile(w http.ResponseWriter, r *http.Request) {
	// コンテキストからユーザーIDを取得
	authUserID, ok := middleware.GetUserIDFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// リクエストボディをパース
	var updateData struct {
		Name string `json:"name"`
	}
	if err := json.NewDecoder(r.Body).Decode(&updateData); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
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

	// 名前を更新
	query := `UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2`
	_, err = models.DB.Exec(query, updateData.Name, user.ID)
	if err != nil {
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	// 更新されたユーザー情報を取得
	user.Name = updateData.Name

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

