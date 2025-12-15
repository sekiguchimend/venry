package models

import (
	"fmt"
	"net/url"
	"strings"
	"time"
)

// ContentPost は投稿内容を表す構造体
type ContentPost struct {
	ID          string     `json:"id"`
	ContentID   string     `json:"content_id"`
	PostNumber  int        `json:"post_number"`
	Title       string     `json:"title"`
	NormalTime  string     `json:"normal_time"`
	NormalPrice string     `json:"normal_price"`
	CouponTime  string     `json:"coupon_time"`
	CouponPrice string     `json:"coupon_price"`
	Conditions  string     `json:"conditions"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

// GetContentPosts はコンテンツIDから投稿内容一覧を取得
func GetContentPosts(contentID string, token string) ([]ContentPost, error) {
	endpoint := fmt.Sprintf("content_posts?content_id=eq.%s&order=post_number.asc", url.QueryEscape(contentID))

	var posts []ContentPost
	if err := SupabaseGet(endpoint, &posts, token); err != nil {
		return nil, err
	}

	return posts, nil
}

// UpsertContentPost は投稿内容を保存または更新
func UpsertContentPost(post ContentPost, token string) (*ContentPost, error) {
	body := map[string]interface{}{
		"content_id":   post.ContentID,
		"post_number":  post.PostNumber,
		"title":        post.Title,
		"normal_time":  post.NormalTime,
		"normal_price": post.NormalPrice,
		"coupon_time":  post.CouponTime,
		"coupon_price": post.CouponPrice,
		"conditions":   post.Conditions,
		"updated_at":   time.Now().UTC().Format(time.RFC3339),
	}

	// 既存レコードをチェック
	endpoint := fmt.Sprintf("content_posts?content_id=eq.%s&post_number=eq.%d", url.QueryEscape(post.ContentID), post.PostNumber)
	var existing []ContentPost
	if err := SupabaseGet(endpoint, &existing, token); err == nil && len(existing) > 0 {
		// 既存レコードがある場合は更新
		var result []ContentPost
		if err := SupabasePatch(endpoint, body, &result, token); err != nil {
			return nil, err
		}
		if len(result) > 0 {
			return &result[0], nil
		}
		return nil, fmt.Errorf("failed to update content post")
	}

	// 新規作成
	var result []ContentPost
	if err := SupabasePost("content_posts", body, &result, token); err != nil {
		return nil, err
	}

	if len(result) > 0 {
		return &result[0], nil
	}

	return nil, fmt.Errorf("failed to create content post")
}

// DeleteContentPost は投稿内容を削除
func DeleteContentPost(contentID string, postNumber int, token string) error {
	endpoint := fmt.Sprintf("content_posts?content_id=eq.%s&post_number=eq.%d", url.QueryEscape(contentID), postNumber)
	return SupabaseDelete(endpoint, token)
}

// DeleteAllContentPosts はコンテンツの全投稿内容を削除
func DeleteAllContentPosts(contentID string, token string) error {
	endpoint := fmt.Sprintf("content_posts?content_id=eq.%s", url.QueryEscape(contentID))
	return SupabaseDelete(endpoint, token)
}

// Content はコンテンツ情報を表す構造体
type Content struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// GetContentBySiteAndFlow はautomation_idとnameからコンテンツIDを取得（存在しない場合は作成）
func GetContentBySiteAndFlow(siteID string, flowName string, token string) (*Content, error) {
	// まず、automation_idでサイトを検索（アンダースコアとハイフンの両方を試す）
	type Site struct {
		ID string `json:"id"`
	}
	var sites []Site

	// まず元の値で検索
	siteEndpoint := fmt.Sprintf("sites?automation_id=eq.%s&limit=1", url.QueryEscape(siteID))
	if err := SupabaseGet(siteEndpoint, &sites, token); err != nil || len(sites) == 0 {
		// 見つからない場合は、アンダースコアをハイフンに変換して検索
		automationID := strings.ReplaceAll(siteID, "_", "-")

		siteEndpoint = fmt.Sprintf("sites?automation_id=eq.%s&limit=1", url.QueryEscape(automationID))
		if err := SupabaseGet(siteEndpoint, &sites, token); err != nil {
			return nil, err
		}
	}

	if len(sites) == 0 {
		return nil, nil
	}

	siteUUID := sites[0].ID

	// site_idとnameでコンテンツを検索（flowNameがnameに含まれるか、完全一致）
	// PostgRESTのilikeでは%をワイルドカードとして使用
	// 日本語を含むflowNameは url.PathEscape でエスケープする（空白は%20に変換される）
	escapedFlowName := url.PathEscape(flowName)

	// 最新のコンテンツを取得（updated_atでソートして、最近更新されたものを優先）
	// PostgRESTでは%がワイルドカード、URLエンコードで%25になる
	contentEndpoint := fmt.Sprintf("contents?site_id=eq.%s&name=ilike.%s%s%s&order=updated_at.desc,created_at.desc&limit=1", url.QueryEscape(siteUUID), "%25", escapedFlowName, "%25")

	var contents []Content
	if err := SupabaseGet(contentEndpoint, &contents, token); err != nil {
		return nil, err
	}

	if len(contents) == 0 {
		// コンテンツが見つからない場合はnilを返す（呼び出し側で作成する）
		return nil, nil
	}

	return &contents[0], nil
}

// GetSiteUUIDByAutomationID はautomation_idからサイトのUUIDを取得
func GetSiteUUIDByAutomationID(automationID string, token string) (string, error) {
	// まず元の値で検索
	siteEndpoint := fmt.Sprintf("sites?automation_id=eq.%s&limit=1", url.QueryEscape(automationID))
	type Site struct {
		ID string `json:"id"`
	}
	var sites []Site
	if err := SupabaseGet(siteEndpoint, &sites, token); err != nil {
		return "", err
	}

	if len(sites) > 0 {
		return sites[0].ID, nil
	}

	// 見つからない場合は、アンダースコアをハイフンに変換して検索
	convertedID := automationID
	convertedIDBytes := []byte(convertedID)
	for i := range convertedIDBytes {
		if convertedIDBytes[i] == '_' {
			convertedIDBytes[i] = '-'
		}
	}
	convertedID = string(convertedIDBytes)

	siteEndpoint = fmt.Sprintf("sites?automation_id=eq.%s&limit=1", url.QueryEscape(convertedID))
	if err := SupabaseGet(siteEndpoint, &sites, token); err != nil {
		return "", err
	}

	if len(sites) > 0 {
		return sites[0].ID, nil
	}

	return "", fmt.Errorf("site not found")
}

// CreateContent は新しいコンテンツを作成
func CreateContent(siteID string, name string, companyID string, token string) (*Content, error) {
	// コンテンツを作成
	body := map[string]interface{}{
		"company_id":   companyID,
		"site_id":      siteID,
		"name":         name,
		"content_type": "news",
	}

	var result []Content
	if err := SupabasePost("contents", body, &result, token); err != nil {
		return nil, err
	}

	if len(result) > 0 {
		return &result[0], nil
	}

	return nil, fmt.Errorf("failed to create content")
}

