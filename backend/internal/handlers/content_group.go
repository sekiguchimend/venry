package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"nissho-dispatch-backend/internal/middleware"
	"nissho-dispatch-backend/internal/models"
)

// GetContentGroups は企業のコンテンツグループ一覧を取得
func GetContentGroups(w http.ResponseWriter, r *http.Request) {
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

	// コンテンツグループ一覧を取得
	groups, err := models.GetContentGroups(user.CompanyID, token)
	if err != nil {
		http.Error(w, "Failed to get content groups", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(groups)
}

// CreateContentGroup は新しいコンテンツグループを作成
func CreateContentGroup(w http.ResponseWriter, r *http.Request) {
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
	var req models.CreateContentGroupRequest
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
	group, err := models.CreateContentGroup(user.CompanyID, req.Name, req.Description, token)
	if err != nil {
		fmt.Printf("Error creating content group: %v\n", err)
		http.Error(w, "Failed to create content group", http.StatusInternalServerError)
		return
	}

	// コンテンツをグループに追加
	for i, contentID := range req.ContentIDs {
		if err := models.AddContentToGroup(group.ID, contentID, i, token); err != nil {
			fmt.Printf("Error adding content to group: %v\n", err)
			// エラーが発生してもグループは作成されているので、グループIDは返す
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(group)
}

// GetContentGroupItems はグループに属するコンテンツ一覧を取得（詳細情報付き）
func GetContentGroupItems(w http.ResponseWriter, r *http.Request) {
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
	items, err := models.GetContentGroupItemsWithDetails(groupID, token)
	if err != nil {
		fmt.Printf("Error getting content group items: %v\n", err)
		http.Error(w, "Failed to get content group items", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

// UpdateContentGroup はコンテンツグループを更新
func UpdateContentGroup(w http.ResponseWriter, r *http.Request) {
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
	var req models.CreateContentGroupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}

	// グループ名を更新
	group, err := models.UpdateContentGroup(groupID, req.Name, req.Description, token)
	if err != nil {
		fmt.Printf("Error updating content group: %v\n", err)
		http.Error(w, "Failed to update content group", http.StatusInternalServerError)
		return
	}

	// 既存のアイテムを削除
	if err := models.DeleteContentGroupItems(groupID, token); err != nil {
		fmt.Printf("Error deleting content group items: %v\n", err)
		// エラーが発生しても続行
	}

	// 新しいコンテンツをグループに追加
	for i, contentID := range req.ContentIDs {
		if err := models.AddContentToGroup(groupID, contentID, i, token); err != nil {
			fmt.Printf("Error adding content to group: %v\n", err)
			// エラーが発生しても続行
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(group)
}

// DeleteContentGroup はコンテンツグループを削除
func DeleteContentGroup(w http.ResponseWriter, r *http.Request) {
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
	if err := models.DeleteContentGroup(groupID, token); err != nil {
		http.Error(w, "Failed to delete content group", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

