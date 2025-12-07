package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"sync"

	"nissho-dispatch-backend/internal/automation"
	"nissho-dispatch-backend/internal/middleware"
	"nissho-dispatch-backend/internal/models"
)

// ExecuteLoginRequest ログイン実行リクエスト
type ExecuteLoginRequest struct {
	SiteIDs []string `json:"site_ids"`
}

// ExecuteLoginResponse ログイン実行レスポンス
type ExecuteLoginResponse struct {
	Success bool                              `json:"success"`
	Results []automation.FlowExecutionResult `json:"results"`
	Message string                            `json:"message,omitempty"`
}

// ExecuteLogin 複数サイトのログインを実行
func ExecuteLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	// リクエストボディをパース
	var req ExecuteLoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if len(req.SiteIDs) == 0 {
		http.Error(w, "site_ids is required", http.StatusBadRequest)
		return
	}

	// ログインフロー設定ファイルのパスを取得
	configPath := filepath.Join("internal", "automation", "config", "login_flows.json")

	// FlowExecutorを作成
	executor, err := automation.NewFlowExecutor(configPath)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ExecuteLoginResponse{
			Success: false,
			Message: fmt.Sprintf("Failed to create flow executor: %v", err),
		})
		return
	}

	// ブラウザを起動
	if err := executor.StartBrowser(true); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ExecuteLoginResponse{
			Success: false,
			Message: fmt.Sprintf("Failed to start browser: %v", err),
		})
		return
	}
	defer executor.StopBrowser()

	// 会社の認証情報を取得
	credentials, err := models.GetCompanySiteCredentials(user.CompanyID, token)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ExecuteLoginResponse{
			Success: false,
			Message: fmt.Sprintf("Failed to get credentials: %v", err),
		})
		return
	}

	// 認証情報をマップに変換
	credMap := make(map[string]*models.CompanySiteCredential)
	for i := range credentials {
		credMap[credentials[i].SiteID] = &credentials[i]
	}

	// 各サイトでログインを実行
	results := make([]automation.FlowExecutionResult, 0, len(req.SiteIDs))

	for _, siteID := range req.SiteIDs {
		// 認証情報を確認
		cred, ok := credMap[siteID]
		if !ok {
			results = append(results, automation.FlowExecutionResult{
				FlowCode: "login",
				Success:  false,
				Error:    fmt.Sprintf("認証情報が見つかりません: %s", siteID),
			})
			continue
		}

		// ExecutionContextを作成
		ctx := &automation.ExecutionContext{
			LoginID:  cred.LoginID,
			Password: cred.LoginPassword,
		}

		// ログインフローを実行
		result := executor.ExecuteFlow(siteID, "login", ctx)
		results = append(results, *result)
	}

	// 成功したかどうかを判定
	allSuccess := true
	for _, result := range results {
		if !result.Success {
			allSuccess = false
			break
		}
	}

	// レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ExecuteLoginResponse{
		Success: allSuccess,
		Results: results,
		Message: fmt.Sprintf("ログイン実行完了: %d/%d 成功", countSuccessResults(results), len(results)),
	})
}

// ExecuteSingleLogin 単一サイトのログインを実行
func ExecuteSingleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	// URLパラメータからサイトIDを取得
	siteID := r.URL.Query().Get("site_id")
	if siteID == "" {
		http.Error(w, "site_id is required", http.StatusBadRequest)
		return
	}

	// ログインフロー設定ファイルのパスを取得
	configPath := filepath.Join("internal", "automation", "config", "login_flows.json")

	// FlowExecutorを作成
	executor, err := automation.NewFlowExecutor(configPath)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   fmt.Sprintf("Failed to create flow executor: %v", err),
		})
		return
	}

	// ブラウザを起動
	if err := executor.StartBrowser(true); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   fmt.Sprintf("Failed to start browser: %v", err),
		})
		return
	}
	defer executor.StopBrowser()

	// 認証情報を取得
	cred, err := models.GetCredentialByCompanyAndSite(user.CompanyID, siteID, token)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   fmt.Sprintf("Failed to get credential: %v", err),
		})
		return
	}

	if cred == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   "認証情報が見つかりません",
		})
		return
	}

	// ExecutionContextを作成
	ctx := &automation.ExecutionContext{
		LoginID:  cred.LoginID,
		Password: cred.LoginPassword,
	}

	// ログインフローを実行
	result := executor.ExecuteFlow(siteID, "login", ctx)

	// レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":  result.Success,
		"result":   result,
		"message":  getResultMessage(result),
		"site_id":  siteID,
		"duration": result.Duration,
	})
}

// countSuccessResults 成功した結果の数をカウント
func countSuccessResults(results []automation.FlowExecutionResult) int {
	count := 0
	for _, result := range results {
		if result.Success {
			count++
		}
	}
	return count
}

// getResultMessage 結果からメッセージを取得
func getResultMessage(result *automation.FlowExecutionResult) string {
	if result.Success {
		return fmt.Sprintf("ログイン成功 (%s)", result.FlowName)
	}
	return fmt.Sprintf("ログイン失敗: %s", result.Error)
}

// ExecuteRegisteredFlows 登録済みの全サイトのフローを実行（ヘッドレスなし）
func ExecuteRegisteredFlows(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	// 会社の登録済み認証情報を取得
	credentials, err := models.GetCompanySiteCredentials(user.CompanyID, token)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   fmt.Sprintf("Failed to get credentials: %v", err),
		})
		return
	}

	// 登録済みのサイトのみフィルタ
	type siteCredential struct {
		AutomationID string
		SiteName     string
		LoginID      string
		Password     string
	}

	var siteCreds []siteCredential
	for i := range credentials {
		if credentials[i].IsRegistered && credentials[i].AutomationID != "" {
			siteCreds = append(siteCreds, siteCredential{
				AutomationID: credentials[i].AutomationID,
				SiteName:     credentials[i].SiteName,
				LoginID:      credentials[i].LoginID,
				Password:     credentials[i].LoginPassword,
			})
		}
	}

	if len(siteCreds) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": true,
			"message": "実行するサイトがありません",
			"total":   0,
		})
		return
	}

	// 即座にレスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": fmt.Sprintf("フロー実行を開始しました（%d件のサイト）", len(siteCreds)),
		"total":   len(siteCreds),
	})

	// 非同期でフロー実行
	go func(siteCreds []siteCredential) {
		// ログインフロー設定ファイルのパスを取得
		configPath := filepath.Join("internal", "automation", "config", "login_flows.json")

		// 各サイトでログインフローを並列実行（各サイトごとに独立したブラウザ）
		results := make([]automation.FlowExecutionResult, len(siteCreds))
		var wg sync.WaitGroup

		for i, cred := range siteCreds {
			wg.Add(1)
			go func(index int, c siteCredential) {
				defer wg.Done()

				// 各goroutineで独立したFlowExecutorとブラウザを作成
				executor, err := automation.NewFlowExecutor(configPath)
				if err != nil {
					fmt.Printf("❌ %s: FlowExecutor作成失敗 - %v\n", c.SiteName, err)
					results[index] = automation.FlowExecutionResult{
						Success:  false,
						FlowCode: "login",
						Error:    fmt.Sprintf("Failed to create executor: %v", err),
					}
					return
				}

				// 独立したブラウザを起動（ヘッドレス=false で見える）
				if err := executor.StartBrowser(false); err != nil {
					fmt.Printf("❌ %s: ブラウザ起動失敗 - %v\n", c.SiteName, err)
					results[index] = automation.FlowExecutionResult{
						Success:  false,
						FlowCode: "login",
						Error:    fmt.Sprintf("Failed to start browser: %v", err),
					}
					return
				}
				defer executor.StopBrowser()

				// ExecutionContextを作成
				ctx := &automation.ExecutionContext{
					LoginID:  c.LoginID,
					Password: c.Password,
				}

				// ログインフローを実行（AutomationIDを使用）
				fmt.Printf("🔄 フロー実行開始: %s (automation_id: %s)\n", c.SiteName, c.AutomationID)
				result := executor.ExecuteFlow(c.AutomationID, "login", ctx)
				results[index] = *result
			}(i, cred)
		}

		wg.Wait()

		// 結果をログ出力
		successCount := countSuccessResults(results)
		fmt.Printf("フロー実行完了: %d/%d 成功\n", successCount, len(results))
		for _, result := range results {
			if result.Success {
				fmt.Printf("✅ %s: 成功 (%s)\n", result.FlowCode, result.FlowName)
			} else {
				fmt.Printf("❌ %s: 失敗 - %s\n", result.FlowCode, result.Error)
			}
		}
	}(siteCreds)
}

// TestLoginCredential ログイン認証情報のテスト
func TestLoginCredential(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// 認証を確認
	authUserID, ok := middleware.GetUserIDFromContext(r.Context())
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	token, _ := middleware.GetTokenFromContext(r.Context())

	user, err := models.GetUserByAuthID(authUserID, token)
	if err != nil || user == nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	// リクエストボディをパース
	var req struct {
		SiteID   string `json:"site_id"`
		LoginID  string `json:"login_id"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.SiteID == "" || req.LoginID == "" || req.Password == "" {
		http.Error(w, "site_id, login_id, and password are required", http.StatusBadRequest)
		return
	}

	// ログインフロー設定ファイルのパスを取得
	configPath := filepath.Join("internal", "automation", "config", "login_flows.json")

	// FlowExecutorを作成
	executor, err := automation.NewFlowExecutor(configPath)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   fmt.Sprintf("Failed to create flow executor: %v", err),
		})
		return
	}

	// ブラウザを起動（ヘッドレスモード）
	if err := executor.StartBrowser(true); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   fmt.Sprintf("Failed to start browser: %v", err),
		})
		return
	}
	defer executor.StopBrowser()

	// ExecutionContextを作成
	ctx := &automation.ExecutionContext{
		LoginID:  req.LoginID,
		Password: req.Password,
	}

	// ログインフローを実行
	result := executor.ExecuteFlow(req.SiteID, "login", ctx)

	// レスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":   result.Success,
		"message":   getResultMessage(result),
		"site_id":   req.SiteID,
		"duration":  result.Duration,
		"steps_run": result.StepsRun,
		"error":     result.Error,
	})
}
