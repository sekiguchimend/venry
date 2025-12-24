package models

import (
	"fmt"
	"net/url"
	"time"
)

// TemplateFlowMapping はテンプレとフロー（site_automation_id + flow_code）の紐付け設定
type TemplateFlowMapping struct {
	ID              string    `json:"id"`
	TemplateID      string    `json:"template_id"`
	SiteAutomationID string   `json:"site_automation_id"`
	FlowCode        string    `json:"flow_code"`
	FlowName        *string   `json:"flow_name,omitempty"`
	IsEnabled       bool      `json:"is_enabled"`
	CategoryPath    any       `json:"category_path"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

func GetTemplateFlowMappings(templateID string, token string) ([]TemplateFlowMapping, error) {
	endpoint := fmt.Sprintf("template_flow_mappings?template_id=eq.%s", url.QueryEscape(templateID))
	var list []TemplateFlowMapping
	if err := SupabaseGet(endpoint, &list, token); err != nil {
		return nil, err
	}
	return list, nil
}

func ReplaceTemplateFlowMappings(templateID string, items []map[string]any, token string) error {
	deleteEndpoint := fmt.Sprintf("template_flow_mappings?template_id=eq.%s", url.QueryEscape(templateID))
	_ = SupabaseDelete(deleteEndpoint, token)

	for _, it := range items {
		if err := SupabasePost("template_flow_mappings", it, nil, token); err != nil {
			return err
		}
	}
	return nil
}


