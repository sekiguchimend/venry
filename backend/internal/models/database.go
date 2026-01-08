package models

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

var (
	supabaseURL string
	supabaseKey string
	httpClient  *http.Client
)

// InitDB はSupabase REST APIクライアントを初期化
func InitDB() error {
	supabaseURL = os.Getenv("SUPABASE_URL")
	if supabaseURL == "" {
		return fmt.Errorf("SUPABASE_URL environment variable not set")
	}

	supabaseKey = os.Getenv("SUPABASE_ANON_KEY")
	if supabaseKey == "" {
		return fmt.Errorf("SUPABASE_ANON_KEY environment variable not set")
	}

	httpClient = &http.Client{}
	return nil
}

// CloseDB はクリーンアップ
func CloseDB() error {
	return nil
}

// SupabaseRequest はSupabase REST APIにリクエストを送信（ユーザートークン必須）
func SupabaseRequest(method, endpoint string, body interface{}, result interface{}, userToken string) error {
	var reqBody io.Reader
	if body != nil {
		jsonData, err := json.Marshal(body)
		if err != nil {
			return fmt.Errorf("failed to marshal request body: %w", err)
		}
		reqBody = bytes.NewBuffer(jsonData)
	}

	url := fmt.Sprintf("%s/rest/v1/%s", supabaseURL, endpoint)
	req, err := http.NewRequest(method, url, reqBody)
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("apikey", supabaseKey)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", userToken))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Prefer", "return=representation")

	resp, err := httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("failed to read response: %w", err)
	}

	if resp.StatusCode >= 400 {
		return fmt.Errorf("API error (status %d): %s", resp.StatusCode, string(respBody))
	}

	if result != nil && len(respBody) > 0 {
		if err := json.Unmarshal(respBody, result); err != nil {
			return fmt.Errorf("failed to unmarshal response: %w", err)
		}
	}

	return nil
}

// SupabaseGet はGETリクエストを送信
func SupabaseGet(endpoint string, result interface{}, userToken string) error {
	return SupabaseRequest(http.MethodGet, endpoint, nil, result, userToken)
}

// SupabasePost はPOSTリクエストを送信
func SupabasePost(endpoint string, body interface{}, result interface{}, userToken string) error {
	return SupabaseRequest(http.MethodPost, endpoint, body, result, userToken)
}

// SupabasePatch はPATCHリクエストを送信
func SupabasePatch(endpoint string, body interface{}, result interface{}, userToken string) error {
	return SupabaseRequest(http.MethodPatch, endpoint, body, result, userToken)
}

// SupabaseDelete はDELETEリクエストを送信
func SupabaseDelete(endpoint string, userToken string) error {
	return SupabaseRequest(http.MethodDelete, endpoint, nil, nil, userToken)
}