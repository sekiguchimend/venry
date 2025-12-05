package models

import (
	"fmt"
	"net/url"
	"time"
)

// User はユーザー情報を表す構造体
type User struct {
	ID          string     `json:"id"`
	CompanyID   string     `json:"company_id"`
	AuthUserID  string     `json:"auth_user_id"`
	Email       string     `json:"email"`
	Name        string     `json:"name"`
	Role        string     `json:"role"`
	IsActive    bool       `json:"is_active"`
	LastLoginAt *time.Time `json:"last_login_at,omitempty"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

// Company は会社情報を表す構造体
type Company struct {
	ID             string    `json:"id"`
	CompanyGroupID string    `json:"company_group_id"`
	Name           string    `json:"name"`
	PhoneNumber    string    `json:"phone_number"`
	Email          string    `json:"email"`
	PostalCode     string    `json:"postal_code"`
	Address        string    `json:"address"`
	IsActive       bool      `json:"is_active"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// GetUserByAuthID はAuth IDからユーザーを取得
func GetUserByAuthID(authID string, token string) (*User, error) {
	endpoint := fmt.Sprintf("users?auth_user_id=eq.%s&limit=1", url.QueryEscape(authID))

	var users []User
	if err := SupabaseGet(endpoint, &users, token); err != nil {
		return nil, err
	}

	if len(users) == 0 {
		return nil, nil
	}

	return &users[0], nil
}

// GetCompanyByID は会社IDから会社情報を取得
func GetCompanyByID(companyID string, token string) (*Company, error) {
	endpoint := fmt.Sprintf("companies?id=eq.%s&limit=1", companyID)

	var companies []Company
	if err := SupabaseGet(endpoint, &companies, token); err != nil {
		return nil, err
	}

	if len(companies) == 0 {
		return nil, nil
	}

	return &companies[0], nil
}

// UpdateLastLogin は最終ログイン時刻を更新
func UpdateLastLogin(userID string, token string) error {
	endpoint := fmt.Sprintf("users?id=eq.%s", userID)
	body := map[string]interface{}{
		"last_login_at": time.Now().UTC().Format(time.RFC3339),
	}

	return SupabasePatch(endpoint, body, nil, token)
}

// UpdateUserName はユーザー名を更新
func UpdateUserName(userID string, name string, token string) error {
	endpoint := fmt.Sprintf("users?id=eq.%s", userID)
	body := map[string]interface{}{
		"name":       name,
		"updated_at": time.Now().UTC().Format(time.RFC3339),
	}

	return SupabasePatch(endpoint, body, nil, token)
}
