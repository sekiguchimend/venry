package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sync"
)

var (
	supabaseURL  string
	supabaseKey  string
	authInitOnce sync.Once
)

func getAuthConfig() (string, string) {
	authInitOnce.Do(func() {
		supabaseURL = os.Getenv("SUPABASE_URL")
		supabaseKey = os.Getenv("SUPABASE_ANON_KEY")
	})
	return supabaseURL, supabaseKey
}

// SignUpRequest はサインアップリクエスト
type SignUpRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginRequest はログインリクエスト
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// AuthResponse は認証レスポンス
type AuthResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	ExpiresIn    int    `json:"expires_in"`
	TokenType    string `json:"token_type"`
	User         *User  `json:"user,omitempty"`
}

// User はSupabase Authのユーザー
type User struct {
	ID    string `json:"id"`
	Email string `json:"email"`
}

// ErrorResponse はエラーレスポンス
type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}

// SignUp はサインアップ処理
func SignUp(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SignUpRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" {
		sendError(w, "Email and password are required", http.StatusBadRequest)
		return
	}

	// Supabase Auth APIを呼び出し
	body := map[string]string{
		"email":    req.Email,
		"password": req.Password,
	}

	resp, err := callSupabaseAuth("POST", "/auth/v1/signup", body)
	if err != nil {
		sendError(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)

	if resp.StatusCode >= 400 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.StatusCode)
		w.Write(respBody)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	w.Write(respBody)
}

// Login はログイン処理
func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// リクエストボディを読み取り
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("[LOGIN] Body読み取り失敗")
		sendError(w, "Failed to read body", http.StatusBadRequest)
		return
	}

	var req LoginRequest
	if err := json.Unmarshal(bodyBytes, &req); err != nil {
		log.Printf("[LOGIN] JSONパース失敗")
		sendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" {
		sendError(w, "Email and password are required", http.StatusBadRequest)
		return
	}

	// Supabase設定確認
	url, key := getAuthConfig()
	if url == "" || key == "" {
		log.Printf("[LOGIN] Supabase設定が空")
		sendError(w, "Supabase not configured", http.StatusInternalServerError)
		return
	}

	// Supabase Auth APIを呼び出し（パスワードログイン）
	supabaseBody := map[string]string{
		"email":    req.Email,
		"password": req.Password,
	}

	resp, err := callSupabaseAuth("POST", "/auth/v1/token?grant_type=password", supabaseBody)
	if err != nil {
		log.Printf("[LOGIN] Supabase呼び出し失敗")
		sendError(w, "Authentication failed", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("[LOGIN] Supabaseレスポンス読み取り失敗")
		sendError(w, "Failed to read supabase response", http.StatusInternalServerError)
		return
	}

	if resp.StatusCode >= 400 {
		log.Printf("[LOGIN] 認証失敗: status=%d", resp.StatusCode)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(resp.StatusCode)
		w.Write(respBody)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	w.Write(respBody)
}

// Logout はログアウト処理
func Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Authorizationヘッダーからトークンを取得
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		sendError(w, "Authorization header required", http.StatusUnauthorized)
		return
	}

	// Supabase Auth APIを呼び出し
	url, key := getAuthConfig()
	req, err := http.NewRequest("POST", url+"/auth/v1/logout", nil)
	if err != nil {
		sendError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	req.Header.Set("apikey", key)
	req.Header.Set("Authorization", authHeader)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		sendError(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

// RefreshToken はトークンリフレッシュ処理
func RefreshToken(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		RefreshToken string `json:"refresh_token"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.RefreshToken == "" {
		sendError(w, "Refresh token is required", http.StatusBadRequest)
		return
	}

	body := map[string]string{
		"refresh_token": req.RefreshToken,
	}

	resp, err := callSupabaseAuth("POST", "/auth/v1/token?grant_type=refresh_token", body)
	if err != nil {
		sendError(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	w.Write(respBody)
}

// callSupabaseAuth はSupabase Auth APIを呼び出すヘルパー
func callSupabaseAuth(method, endpoint string, body interface{}) (*http.Response, error) {
	url, key := getAuthConfig()

	jsonBody, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(method, url+endpoint, bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, err
	}

	req.Header.Set("apikey", key)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	return client.Do(req)
}

func sendError(w http.ResponseWriter, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(ErrorResponse{
		Error:   fmt.Sprintf("%d", statusCode),
		Message: message,
	})
}
