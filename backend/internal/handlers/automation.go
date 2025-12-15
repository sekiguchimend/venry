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

	// ブラウザを起動（ヘッドレス=false で見える）
	if err := executor.StartBrowser(false); err != nil {
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

	// ブラウザを起動（ヘッドレス=false で見える）
	if err := executor.StartBrowser(false); err != nil {
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

// ExecuteSingleFlow 単一サイトの特定フローを実行
func ExecuteSingleFlow(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	// リクエストボディをパース
	var req struct {
		SiteID   string `json:"site_id"`
		FlowCode string `json:"flow_code"`
		FlowName string `json:"flow_name"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.SiteID == "" || req.FlowCode == "" {
		http.Error(w, "site_id and flow_code are required", http.StatusBadRequest)
		return
	}

	// automation_idからsite UUIDを取得
	siteUUID, err := models.GetSiteUUIDByAutomationID(req.SiteID, token)
	fmt.Printf("🔍 GetSiteUUIDByAutomationID: automation_id=%s -> uuid=%s, err=%v\n", req.SiteID, siteUUID, err)
	if err != nil || siteUUID == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   fmt.Sprintf("サイトが見つかりません: %s", req.SiteID),
		})
		return
	}

	// 認証情報を取得（site UUIDで検索）
	fmt.Printf("🔍 GetCredentialByCompanyAndSite: company_id=%s, site_uuid=%s\n", user.CompanyID, siteUUID)
	cred, err := models.GetCredentialByCompanyAndSite(user.CompanyID, siteUUID, token)
	fmt.Printf("🔍 GetCredentialByCompanyAndSite result: cred=%v, err=%v\n", cred, err)
	if err != nil || cred == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   fmt.Sprintf("認証情報が見つかりません。site_uuid=%s, company_id=%s", siteUUID, user.CompanyID),
		})
		return
	}

	// コンテンツデータを取得（フロー実行に必要な入力値）
	var contentData map[string]string
	if req.FlowCode != "login" && req.FlowName != "" {
		// フロー名でコンテンツを検索
		fmt.Printf("🔍 GetContentBySiteAndFlow: siteID=%s, flowName=%s\n", req.SiteID, req.FlowName)
		content, err := models.GetContentBySiteAndFlow(req.SiteID, req.FlowName, token)
		if err != nil {
			fmt.Printf("⚠️ GetContentBySiteAndFlow error: %v\n", err)
		} else if content == nil {
			fmt.Printf("⚠️ Content not found for site=%s, flowName=%s\n", req.SiteID, req.FlowName)
		} else {
			fmt.Printf("✅ Content found: id=%s, name=%s\n", content.ID, content.Name)
			// コンテンツの投稿内容を取得
			posts, err := models.GetContentPosts(content.ID, token)
			if err != nil {
				fmt.Printf("⚠️ GetContentPosts error: %v\n", err)
			} else if len(posts) == 0 {
				fmt.Printf("⚠️ No posts found for content_id=%s\n", content.ID)
			} else {
				post := posts[0]
				contentData = map[string]string{
					"title":        post.Title,
					"normal_time":  post.NormalTime,
					"normal_price": post.NormalPrice,
					"coupon_time":  post.CouponTime,
					"coupon_price": post.CouponPrice,
					"conditions":   post.Conditions,
				}
				fmt.Printf("📝 コンテンツデータ取得: %+v\n", contentData)
			}
		}
	}

	// 即座にレスポンスを返す
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": fmt.Sprintf("フロー実行を開始しました: %s / %s", req.SiteID, req.FlowCode),
	})

	// 非同期でフロー実行
	go func(siteID, flowCode, loginID, password string, data map[string]string) {
		configPath := filepath.Join("internal", "automation", "config", "login_flows.json")

		executor, err := automation.NewFlowExecutor(configPath)
		if err != nil {
			fmt.Printf("❌ FlowExecutor作成失敗: %v\n", err)
			return
		}

		// ブラウザを起動（ヘッドレス=false で見える）
		if err := executor.StartBrowser(false); err != nil {
			fmt.Printf("❌ ブラウザ起動失敗: %v\n", err)
			return
		}
		defer executor.StopBrowser()

		// ExecutionContextを作成（コンテンツデータをCustomに設定）
		ctx := &automation.ExecutionContext{
			LoginID:  loginID,
			Password: password,
			Custom:   data,
		}

		// まずログインフローを実行
		fmt.Printf("🔄 ログインフロー実行開始: %s\n", siteID)
		loginResult := executor.ExecuteFlow(siteID, "login", ctx)
		if !loginResult.Success {
			fmt.Printf("❌ ログイン失敗: %s - %s\n", siteID, loginResult.Error)
			return
		}
		fmt.Printf("✅ ログイン成功: %s\n", siteID)

		// 指定されたフローを実行
		if flowCode != "login" {
			fmt.Printf("🔄 フロー実行開始: %s / %s\n", siteID, flowCode)
			result := executor.ExecuteFlow(siteID, flowCode, ctx)
			if result.Success {
				fmt.Printf("✅ フロー成功: %s / %s\n", siteID, flowCode)
			} else {
				fmt.Printf("❌ フロー失敗: %s / %s - %s\n", siteID, flowCode, result.Error)
			}
		}
	}(req.SiteID, req.FlowCode, cred.LoginID, cred.LoginPassword, contentData)
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

	// ブラウザを起動（ヘッドレス=false で見える）
	if err := executor.StartBrowser(false); err != nil {
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
