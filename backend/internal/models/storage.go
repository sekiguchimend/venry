package models

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime"
	"net/http"
	"strings"
)

type storageUploadResponse struct {
	Key string `json:"Key"`
}

// UploadToStorage はSupabase Storageにファイルをアップロードし、公開URLを返す
// bucket はpublic bucket想定（publicでない場合は公開URLではアクセスできません）
func UploadToStorage(bucket string, objectPath string, content []byte, contentType string, userToken string) (publicURL string, key string, err error) {
	if supabaseURL == "" || supabaseKey == "" {
		return "", "", fmt.Errorf("supabase not configured")
	}
	if bucket == "" || objectPath == "" {
		return "", "", fmt.Errorf("bucket and objectPath are required")
	}

	// content-typeを補正
	if contentType == "" {
		contentType = mime.TypeByExtension(strings.ToLower(strings.TrimSpace("." + strings.TrimPrefix(objectPath[strings.LastIndex(objectPath, ".")+1:], "."))))
	}
	if contentType == "" {
		contentType = "application/octet-stream"
	}

	url := fmt.Sprintf("%s/storage/v1/object/%s/%s", supabaseURL, bucket, objectPath)
	req, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(content))
	if err != nil {
		return "", "", err
	}

	req.Header.Set("apikey", supabaseKey)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", userToken))
	req.Header.Set("Content-Type", contentType)
	req.Header.Set("x-upsert", "true")

	resp, err := httpClient.Do(req)
	if err != nil {
		return "", "", err
	}
	defer resp.Body.Close()

	bodyBytes, _ := io.ReadAll(resp.Body)
	if resp.StatusCode >= 400 {
		return "", "", fmt.Errorf("storage upload error (status %d): %s", resp.StatusCode, string(bodyBytes))
	}

	var parsed storageUploadResponse
	_ = json.Unmarshal(bodyBytes, &parsed)
	if parsed.Key == "" {
		parsed.Key = fmt.Sprintf("%s/%s", bucket, objectPath)
	}

	publicURL = fmt.Sprintf("%s/storage/v1/object/public/%s/%s", supabaseURL, bucket, objectPath)
	return publicURL, parsed.Key, nil
}


