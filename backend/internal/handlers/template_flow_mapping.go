package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"nissho-dispatch-backend/internal/models"
)

// GetTemplateFlowMappings はテンプレのフロー紐付け設定を取得
func GetTemplateFlowMappings(w http.ResponseWriter, r *http.Request) {
	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	templateID := strings.TrimSpace(r.URL.Query().Get("template_id"))
	if templateID == "" {
		// 新規作成中は空配列を返す
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]models.TemplateFlowMapping{})
		return
	}

	// テンプレが自社のものかチェック
	ts, err := models.GetTemplates(user.CompanyID, templateID, "", "", "", token)
	if err != nil || len(ts) == 0 {
		http.Error(w, "template not found", http.StatusNotFound)
		return
	}

	list, err := models.GetTemplateFlowMappings(templateID, token)
	if err != nil {
		http.Error(w, "Failed to get template flow mappings", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

// SaveTemplateFlowMappings はテンプレ×フロー紐付け設定を保存（丸ごと置換）
func SaveTemplateFlowMappings(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	var req struct {
		TemplateID string `json:"template_id"`
		Items      []struct {
			SiteAutomationID string `json:"site_automation_id"`
			FlowCode         string `json:"flow_code"`
			FlowName         string `json:"flow_name"`
			IsEnabled        bool   `json:"is_enabled"`
			CategoryPath     any    `json:"category_path"`
		} `json:"items"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	req.TemplateID = strings.TrimSpace(req.TemplateID)
	if req.TemplateID == "" {
		http.Error(w, "template_id is required", http.StatusBadRequest)
		return
	}

	// テンプレが自社のものかチェック
	ts, err := models.GetTemplates(user.CompanyID, req.TemplateID, "", "", "", token)
	if err != nil || len(ts) == 0 {
		http.Error(w, "template not found", http.StatusNotFound)
		return
	}

	items := make([]map[string]any, 0, len(req.Items))
	for _, it := range req.Items {
		sa := strings.TrimSpace(it.SiteAutomationID)
		fc := strings.TrimSpace(it.FlowCode)
		if sa == "" || fc == "" {
			continue
		}
		var flowNamePtr *string
		fn := strings.TrimSpace(it.FlowName)
		if fn != "" {
			flowNamePtr = &fn
		}
		items = append(items, map[string]any{
			"template_id":        req.TemplateID,
			"site_automation_id": sa,
			"flow_code":          fc,
			"flow_name":          flowNamePtr,
			"is_enabled":         it.IsEnabled,
			"category_path":      it.CategoryPath,
		})
	}

	if err := models.ReplaceTemplateFlowMappings(req.TemplateID, items, token); err != nil {
		http.Error(w, "Failed to save template flow mappings", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{"success": true})
}


