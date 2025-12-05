package automation

import "time"

// SiteConfig サイトの設定
type SiteConfig struct {
	ID               string    `json:"id"`
	Name             string    `json:"name"`
	LoginURL         string    `json:"login_url"`
	Selectors        Selectors `json:"selectors"`
	CustomLogin      bool      `json:"custom_login,omitempty"`       // SPA等の特殊ログイン
	Timeout          int       `json:"timeout,omitempty"`            // タイムアウト（秒）
	PreLoginActions  []Action  `json:"pre_login_actions,omitempty"`  // ログイン前アクション
	PostLoginActions []Action  `json:"post_login_actions,omitempty"` // ログイン後アクション
}

// Selectors ログインフォームのセレクター
type Selectors struct {
	UsernameInput    string `json:"username_input"`
	PasswordInput    string `json:"password_input"`
	SubmitButton     string `json:"submit_button"`
	SuccessIndicator string `json:"success_indicator"` // カンマ区切りで複数指定可
}

// Action 実行するアクション
type Action struct {
	Type     string `json:"type"`               // click, fill, navigate, wait, scrape, screenshot
	Selector string `json:"selector,omitempty"` // 対象セレクター
	Value    string `json:"value,omitempty"`    // 入力値やURL
	Timeout  int    `json:"timeout,omitempty"`  // タイムアウト（秒）
}

// Credentials ログイン認証情報
type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// ExecutionResult 実行結果
type ExecutionResult struct {
	SiteID     string    `json:"site_id"`
	SiteName   string    `json:"site_name"`
	Success    bool      `json:"success"`
	Message    string    `json:"message"`
	Data       any       `json:"data,omitempty"`
	Screenshot []byte    `json:"screenshot,omitempty"`
	ExecutedAt time.Time `json:"executed_at"`
	Duration   int64     `json:"duration_ms"`
}

// ExecuteRequest 実行リクエスト
type ExecuteRequest struct {
	SiteIDs     []string               `json:"site_ids"`
	Credentials map[string]Credentials `json:"credentials"` // site_id -> credentials
}

// ExecuteResponse 実行レスポンス
type ExecuteResponse struct {
	Results       []ExecutionResult `json:"results"`
	TotalDuration int64             `json:"total_duration_ms"`
}
