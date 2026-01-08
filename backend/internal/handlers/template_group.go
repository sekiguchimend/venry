package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"nissho-dispatch-backend/internal/middleware"
	"nissho-dispatch-backend/internal/models"
)

// GetTemplateGroups は企業のテンプレートグループ一覧を取得
func GetTemplateGroups(w http.ResponseWriter, r *http.Request) {
	// コンテキストからトークンとユーザーIDを取得
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

	// ユーザー情報を取得してcompany_idを取得
	user, err := models.GetUserByAuthID(authUserID, token)
	if err != nil || user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// テンプレートグループ一覧を取得
	groups, err := models.GetTemplateGroups(user.CompanyID, token)
	if err != nil {
		http.Error(w, "Failed to get template groups", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(groups)
}

// CreateTemplateGroup は新しいテンプレートグループを作成
func CreateTemplateGroup(w http.ResponseWriter, r *http.Request) {
	// コンテキストからトークンとユーザーIDを取得
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

	// リクエストボディをパース
	var req models.CreateTemplateGroupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}

	// ユーザー情報を取得してcompany_idを取得
	user, err := models.GetUserByAuthID(authUserID, token)
	if err != nil || user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// グループを作成
	group, err := models.CreateTemplateGroup(user.CompanyID, req.Name, req.Description, token)
	if err != nil {
		fmt.Printf("Error creating template group: %v\n", err)
		http.Error(w, "Failed to create template group", http.StatusInternalServerError)
		return
	}

	// テンプレートをグループに追加
	for i, templateID := range req.TemplateIDs {
		if err := models.AddTemplateToGroup(group.ID, templateID, i, token); err != nil {
			fmt.Printf("Error adding template to group: %v\n", err)
			// エラーが発生してもグループは作成されているので、グループIDは返す
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(group)
}

// GetTemplateGroupItems はグループに属するテンプレート一覧を取得（詳細情報付き）
func GetTemplateGroupItems(w http.ResponseWriter, r *http.Request) {
	// コンテキストからトークンを取得
	token, ok := middleware.GetTokenFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// URLパラメータからgroup_idを取得
	groupID := r.URL.Query().Get("group_id")
	if groupID == "" {
		http.Error(w, "group_id is required", http.StatusBadRequest)
		return
	}

	// グループアイテムを詳細情報付きで取得
	items, err := models.GetTemplateGroupItemsWithDetails(groupID, token)
	if err != nil {
		fmt.Printf("Error getting template group items: %v\n", err)
		http.Error(w, "Failed to get template group items", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

// UpdateTemplateGroup はテンプレートグループを更新
func UpdateTemplateGroup(w http.ResponseWriter, r *http.Request) {
	// コンテキストからトークンを取得
	token, ok := middleware.GetTokenFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// URLパラメータからgroup_idを取得
	groupID := r.URL.Query().Get("group_id")
	if groupID == "" {
		http.Error(w, "group_id is required", http.StatusBadRequest)
		return
	}

	// リクエストボディをパース
	var req models.CreateTemplateGroupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}

	// グループ名を更新
	group, err := models.UpdateTemplateGroup(groupID, req.Name, req.Description, token)
	if err != nil {
		fmt.Printf("Error updating template group: %v\n", err)
		http.Error(w, "Failed to update template group", http.StatusInternalServerError)
		return
	}

	// 既存のアイテムを削除
	if err := models.DeleteTemplateGroupItems(groupID, token); err != nil {
		fmt.Printf("Error deleting template group items: %v\n", err)
		// エラーが発生しても続行
	}

	// 新しいテンプレートをグループに追加
	for i, templateID := range req.TemplateIDs {
		if err := models.AddTemplateToGroup(groupID, templateID, i, token); err != nil {
			fmt.Printf("Error adding template to group: %v\n", err)
			// エラーが発生しても続行
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(group)
}

// DeleteTemplateGroup はテンプレートグループを削除
func DeleteTemplateGroup(w http.ResponseWriter, r *http.Request) {
	// コンテキストからトークンを取得
	token, ok := middleware.GetTokenFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// URLパラメータからgroup_idを取得
	groupID := r.URL.Query().Get("group_id")
	if groupID == "" {
		http.Error(w, "group_id is required", http.StatusBadRequest)
		return
	}

	// グループを削除
	if err := models.DeleteTemplateGroup(groupID, token); err != nil {
		http.Error(w, "Failed to delete template group", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
