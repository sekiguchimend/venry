package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"nissho-dispatch-backend/internal/models"
)

// GetTemplateFolders はテンプレートフォルダ（カテゴリ）一覧を取得
func GetTemplateFolders(w http.ResponseWriter, r *http.Request) {
	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	folderType := r.URL.Query().Get("folder_type")
	folders, err := models.GetTemplateFolders(user.CompanyID, folderType, token)
	if err != nil {
		http.Error(w, "Failed to get template folders", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(folders)
}

// GetTemplates はテンプレート一覧を取得
func GetTemplates(w http.ResponseWriter, r *http.Request) {
	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	templateID := r.URL.Query().Get("id")
	folderID := r.URL.Query().Get("folder_id")
	folderType := r.URL.Query().Get("folder_type")
	query := r.URL.Query().Get("q")

	templates, err := models.GetTemplates(user.CompanyID, templateID, folderID, folderType, query, token)
	if err != nil {
		http.Error(w, "Failed to get templates", http.StatusInternalServerError)
		return
	}

	// folder_type で絞り込み（folder_idが未指定でも動くようにサーバ側でフィルタ）
	if folderType != "" {
		folders, err := models.GetTemplateFolders(user.CompanyID, folderType, token)
		if err == nil {
			allowed := map[string]bool{}
			for _, f := range folders {
				allowed[f.ID] = true
			}
			filtered := make([]models.Template, 0, len(templates))
			for _, t := range templates {
				if t.FolderID != nil && allowed[*t.FolderID] {
					filtered = append(filtered, t)
				}
			}
			templates = filtered
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(templates)
}

// SaveTemplate はテンプレートを保存（新規作成 or 更新）
func SaveTemplate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	var req struct {
		ID                  string  `json:"id"`
		FolderID            *string `json:"folder_id"`
		FolderType          string  `json:"folder_type"`
		Name                string  `json:"name"`
		Content             *string `json:"content"`
		ImageURL            *string `json:"image_url"`
		GirlID              *string `json:"girl_id"`
		Label               *string `json:"label"`
		Memo                *string `json:"memo"`
		IsUsageDisabled     bool    `json:"is_usage_disabled"`
		RequiresConfirmation bool   `json:"requires_confirmation"`
		SortOrder           int     `json:"sort_order"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	req.Name = strings.TrimSpace(req.Name)
	if req.Name == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}

	// folder_id は必須にしない（ラベル＝カテゴリ運用の場合は label + folder_type から自動解決する）
	folderType := strings.TrimSpace(req.FolderType)
	if folderType == "" {
		folderType = "normal"
	}

	if req.FolderID == nil || strings.TrimSpace(*req.FolderID) == "" {
		// folder_idが無い場合はラベルをカテゴリ（フォルダ名）として扱う
		if req.Label == nil || strings.TrimSpace(*req.Label) == "" {
			http.Error(w, "label is required when folder_id is not provided", http.StatusBadRequest)
			return
		}
		folderName := strings.TrimSpace(*req.Label)
		f, err := models.GetTemplateFolderByNameAndType(user.CompanyID, folderName, folderType, token)
		if err != nil {
			http.Error(w, "Failed to resolve template folder", http.StatusInternalServerError)
			return
		}
		if f == nil {
			f, err = models.CreateTemplateFolder(user.CompanyID, folderName, folderType, token)
			if err != nil {
				http.Error(w, "Failed to create template folder", http.StatusInternalServerError)
				return
			}
		}
		req.FolderID = &f.ID
	}

	t := models.Template{
		ID:                  req.ID,
		CompanyID:            user.CompanyID,
		FolderID:             req.FolderID,
		Name:                req.Name,
		Content:             req.Content,
		ImageURL:            req.ImageURL,
		GirlID:              req.GirlID,
		Label:               req.Label,
		Memo:                req.Memo,
		IsUsageDisabled:     req.IsUsageDisabled,
		RequiresConfirmation: req.RequiresConfirmation,
		SortOrder:           req.SortOrder,
	}

	saved, err := models.UpsertTemplate(t, token)
	if err != nil {
		http.Error(w, "Failed to save template", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(saved)
}


