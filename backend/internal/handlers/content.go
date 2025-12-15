package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"nissho-dispatch-backend/internal/middleware"
	"nissho-dispatch-backend/internal/models"
)

// ContentPostRequest は投稿内容のリクエスト
type ContentPostRequest struct {
	PostNumber  int    `json:"post_number"`
	Title       string `json:"title"`
	NormalTime  string `json:"normal_time"`
	NormalPrice string `json:"normal_price"`
	CouponTime  string `json:"coupon_time"`
	CouponPrice string `json:"coupon_price"`
	Conditions  string `json:"conditions"`
}

// SaveContentPostsRequest は複数の投稿内容を保存するリクエスト
type SaveContentPostsRequest struct {
	ContentID string                `json:"content_id"`
	Posts     []ContentPostRequest  `json:"posts"`
}

// GetContentPosts はコンテンツの投稿内容一覧を取得
func GetContentPosts(w http.ResponseWriter, r *http.Request) {
	// コンテキストからトークンを取得
	token, ok := middleware.GetTokenFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// URLパラメータからcontent_idを取得
	contentID := r.URL.Query().Get("content_id")
	if contentID == "" {
		http.Error(w, "content_id is required", http.StatusBadRequest)
		return
	}

	// 投稿内容を取得
	posts, err := models.GetContentPosts(contentID, token)
	if err != nil {
		http.Error(w, "Failed to get content posts", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

// SaveContentPosts はコンテンツの投稿内容を保存
func SaveContentPosts(w http.ResponseWriter, r *http.Request) {
	// コンテキストからトークンを取得
	token, ok := middleware.GetTokenFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// リクエストボディをパース
	var req SaveContentPostsRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.ContentID == "" {
		http.Error(w, "content_id is required", http.StatusBadRequest)
		return
	}

	// 各投稿内容を保存
	var savedPosts []models.ContentPost
	for _, postReq := range req.Posts {
		post := models.ContentPost{
			ContentID:   req.ContentID,
			PostNumber:  postReq.PostNumber,
			Title:       postReq.Title,
			NormalTime:  postReq.NormalTime,
			NormalPrice: postReq.NormalPrice,
			CouponTime:  postReq.CouponTime,
			CouponPrice: postReq.CouponPrice,
			Conditions:  postReq.Conditions,
		}

		savedPost, err := models.UpsertContentPost(post, token)
		if err != nil {
			http.Error(w, "Failed to save content post", http.StatusInternalServerError)
			return
		}

		savedPosts = append(savedPosts, *savedPost)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(savedPosts)
}

// DeleteContentPost は投稿内容を削除
func DeleteContentPost(w http.ResponseWriter, r *http.Request) {
	// コンテキストからトークンを取得
	token, ok := middleware.GetTokenFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// URLパラメータからcontent_idとpost_numberを取得
	contentID := r.URL.Query().Get("content_id")
	postNumberStr := r.URL.Query().Get("post_number")
	if contentID == "" || postNumberStr == "" {
		http.Error(w, "content_id and post_number are required", http.StatusBadRequest)
		return
	}

	var postNumber int
	if _, err := fmt.Sscanf(postNumberStr, "%d", &postNumber); err != nil {
		http.Error(w, "Invalid post_number", http.StatusBadRequest)
		return
	}

	// 投稿内容を削除
	if err := models.DeleteContentPost(contentID, postNumber, token); err != nil {
		http.Error(w, "Failed to delete content post", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// GetContentID はsiteIdとflowCodeからコンテンツIDを取得（存在しない場合は作成）
func GetContentID(w http.ResponseWriter, r *http.Request) {
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

	// URLパラメータからsiteIdとflowCodeを取得
	siteID := r.URL.Query().Get("siteId")
	flowCode := r.URL.Query().Get("flowCode")
	flowName := r.URL.Query().Get("flowName")
	if siteID == "" || (flowCode == "" && flowName == "") {
		// 空のレスポンスを返す
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{"id": "", "name": ""})
		return
	}

	// flowNameがあればそれを使い、なければflowCodeを使う
	searchName := flowName
	if searchName == "" {
		searchName = flowCode
	}

	// コンテンツIDを取得
	content, err := models.GetContentBySiteAndFlow(siteID, searchName, token)
	if err != nil {
		// エラーの場合はログを出力してから作成を試みる
		fmt.Printf("Error getting content: %v\n", err)
		content = nil
	}

	// コンテンツが見つからない場合は作成
	if content == nil {
		// ユーザー情報を取得してcompany_idを取得
		user, err := models.GetUserByAuthID(authUserID, token)
		if err != nil || user == nil {
			fmt.Printf("Error getting user: %v\n", err)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{"id": "", "name": "", "error": "user_not_found"})
			return
		}

		// サイトIDを取得（automation_idから）
		siteUUID, err := models.GetSiteUUIDByAutomationID(siteID, token)
		if err != nil || siteUUID == "" {
			fmt.Printf("Error getting site UUID: %v\n", err)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{"id": "", "name": "", "error": "site_not_found"})
			return
		}

		// コンテンツを作成
		content, err = models.CreateContent(siteUUID, searchName, user.CompanyID, token)
		if err != nil {
			fmt.Printf("Error creating content: %v\n", err)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{"id": "", "name": "", "error": "create_failed"})
			return
		}
	}

	if content == nil {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{"id": "", "name": ""})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(content)
}

