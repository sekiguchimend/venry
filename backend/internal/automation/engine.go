package automation

import (
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/launcher"
	"github.com/go-rod/rod/lib/proto"
)

const (
	defaultTimeout = 30 * time.Second
)

// Engine ブラウザ自動化エンジン
type Engine struct {
	browser *rod.Browser
	mu      sync.Mutex
}

// NewEngine 新しいエンジンを作成
func NewEngine() (*Engine, error) {
	// ブラウザを起動
	path, _ := launcher.LookPath()
	u := launcher.New().Bin(path).Headless(true).MustLaunch()

	browser := rod.New().ControlURL(u).MustConnect()

	return &Engine{
		browser: browser,
	}, nil
}

// Close エンジンを終了
func (e *Engine) Close() error {
	if e.browser != nil {
		return e.browser.Close()
	}
	return nil
}

// ExecuteSite 単一サイトでログインを実行
func (e *Engine) ExecuteSite(config SiteConfig, creds Credentials) ExecutionResult {
	startTime := time.Now()

	// タイムアウト設定
	timeout := defaultTimeout
	if config.Timeout > 0 {
		timeout = time.Duration(config.Timeout) * time.Second
	}

	// 新しいページを作成
	page := e.browser.MustPage()
	defer page.MustClose()

	// タイムアウト設定
	page = page.Timeout(timeout)

	result := ExecutionResult{
		SiteID:     config.ID,
		SiteName:   config.Name,
		ExecutedAt: time.Now(),
	}

	defer func() {
		result.Duration = time.Since(startTime).Milliseconds()
	}()

	// エラーハンドリング
	defer func() {
		if r := recover(); r != nil {
			result.Success = false
			result.Message = fmt.Sprintf("パニック発生: %v", r)
			// スクリーンショットを取得
			if screenshot, err := page.Screenshot(true, nil); err == nil {
				result.Screenshot = screenshot
			}
		}
	}()

	// ログインページに移動
	err := page.Navigate(config.LoginURL)
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("ページ移動失敗: %v", err)
		return result
	}

	// ページの読み込み完了を待機
	err = page.WaitLoad()
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("ページ読み込み失敗: %v", err)
		return result
	}

	// SPAの場合は追加の待機
	if config.CustomLogin {
		time.Sleep(2 * time.Second)
	}

	// ログイン前アクション実行
	for _, action := range config.PreLoginActions {
		if err := e.executeAction(page, action); err != nil {
			result.Success = false
			result.Message = fmt.Sprintf("ログイン前アクション失敗: %v", err)
			return result
		}
	}

	// ユーザー名入力
	usernameEl, err := page.Element(config.Selectors.UsernameInput)
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("ユーザー名フィールドが見つかりません: %v", err)
		return result
	}
	err = usernameEl.Input(creds.Username)
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("ユーザー名入力失敗: %v", err)
		return result
	}

	// パスワード入力
	passwordEl, err := page.Element(config.Selectors.PasswordInput)
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("パスワードフィールドが見つかりません: %v", err)
		return result
	}
	err = passwordEl.Input(creds.Password)
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("パスワード入力失敗: %v", err)
		return result
	}

	// ログインボタンクリック
	if config.CustomLogin {
		// JavaScriptボタンの場合は少し待機
		time.Sleep(500 * time.Millisecond)
	}

	submitEl, err := page.Element(config.Selectors.SubmitButton)
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("ログインボタンが見つかりません: %v", err)
		return result
	}
	err = submitEl.Click(proto.InputMouseButtonLeft, 1)
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("ログインボタンクリック失敗: %v", err)
		return result
	}

	// ナビゲーション完了を待機
	err = page.WaitLoad()
	if err != nil {
		// タイムアウトは無視（SPAでは発生することがある）
	}

	// ログイン成功の確認（複数のセレクターを試行）
	successSelectors := strings.Split(config.Selectors.SuccessIndicator, ",")
	loginSuccess := false

	for _, selector := range successSelectors {
		selector = strings.TrimSpace(selector)
		if selector == "" {
			continue
		}

		// 短いタイムアウトで要素を探す
		page.Timeout(10 * time.Second)
		el, err := page.Element(selector)
		if err == nil && el != nil {
			loginSuccess = true
			break
		}
	}

	// URLの変化でもログイン成功を判定
	if !loginSuccess {
		currentURL := page.MustInfo().URL
		if currentURL != config.LoginURL && !strings.Contains(currentURL, "login") {
			loginSuccess = true
		}
	}

	if !loginSuccess {
		result.Success = false
		result.Message = "ログイン成功の確認ができませんでした"
		// スクリーンショットを取得
		if screenshot, err := page.Screenshot(true, nil); err == nil {
			result.Screenshot = screenshot
		}
		return result
	}

	// ログイン後アクション実行
	for _, action := range config.PostLoginActions {
		if err := e.executeAction(page, action); err != nil {
			result.Success = false
			result.Message = fmt.Sprintf("ログイン後アクション失敗: %v", err)
			return result
		}
	}

	result.Success = true
	result.Message = "ログイン成功"
	return result
}

// executeAction アクションを実行
func (e *Engine) executeAction(page *rod.Page, action Action) error {
	timeout := defaultTimeout
	if action.Timeout > 0 {
		timeout = time.Duration(action.Timeout) * time.Second
	}

	page = page.Timeout(timeout)

	switch action.Type {
	case "click":
		if action.Selector != "" {
			el, err := page.Element(action.Selector)
			if err != nil {
				return err
			}
			return el.Click(proto.InputMouseButtonLeft, 1)
		}

	case "fill":
		if action.Selector != "" && action.Value != "" {
			el, err := page.Element(action.Selector)
			if err != nil {
				return err
			}
			return el.Input(action.Value)
		}

	case "navigate":
		if action.Value != "" {
			return page.Navigate(action.Value)
		}

	case "wait":
		if action.Selector != "" {
			_, err := page.Element(action.Selector)
			return err
		} else if action.Timeout > 0 {
			time.Sleep(time.Duration(action.Timeout) * time.Second)
		}

	case "screenshot":
		// スクリーンショットは結果として返す（ここでは何もしない）
	}

	return nil
}

// ExecuteMultipleSites 複数サイトで並列実行
func (e *Engine) ExecuteMultipleSites(configs []SiteConfig, credentialsMap map[string]Credentials) []ExecutionResult {
	var wg sync.WaitGroup
	results := make([]ExecutionResult, len(configs))

	for i, config := range configs {
		wg.Add(1)
		go func(idx int, cfg SiteConfig) {
			defer wg.Done()

			creds, ok := credentialsMap[cfg.ID]
			if !ok {
				results[idx] = ExecutionResult{
					SiteID:     cfg.ID,
					SiteName:   cfg.Name,
					Success:    false,
					Message:    "認証情報が見つかりません",
					ExecutedAt: time.Now(),
					Duration:   0,
				}
				return
			}

			results[idx] = e.ExecuteSite(cfg, creds)
		}(i, config)
	}

	wg.Wait()
	return results
}

// ExecuteByFrontendIDs フロントエンドIDを使って実行
func (e *Engine) ExecuteByFrontendIDs(frontendIDs []int, credentialsMap map[int]Credentials) []ExecutionResult {
	// フロントエンドIDをサイトIDに変換
	var siteIDs []string
	siteCredentials := make(map[string]Credentials)

	for _, fid := range frontendIDs {
		siteID := GetSiteIDByFrontendID(fid)
		if siteID != "" {
			siteIDs = append(siteIDs, siteID)
			if creds, ok := credentialsMap[fid]; ok {
				siteCredentials[siteID] = creds
			}
		}
	}

	configs := GetSiteConfigsByIDs(siteIDs)
	return e.ExecuteMultipleSites(configs, siteCredentials)
}
