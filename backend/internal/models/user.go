package models

import (
	"database/sql"
	"time"
)

// User はユーザー情報を表す構造体
type User struct {
	ID          int       `json:"id"`
	CompanyID   int       `json:"company_id"`
	Email       string    `json:"email"`
	Name        string    `json:"name"`
	Role        string    `json:"role"`
	IsActive    bool      `json:"is_active"`
	LastLoginAt *time.Time `json:"last_login_at,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Company は会社情報を表す構造体
type Company struct {
	ID              int       `json:"id"`
	CompanyGroupID  int       `json:"company_group_id"`
	Name            string    `json:"name"`
	PhoneNumber     string    `json:"phone_number"`
	Email           string    `json:"email"`
	PostalCode      string    `json:"postal_code"`
	Address         string    `json:"address"`
	IsActive        bool      `json:"is_active"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

// GetUserByAuthID はAuth IDからユーザーを取得
func GetUserByAuthID(authID string) (*User, error) {
	user := &User{}
	query := `
		SELECT id, company_id, email, name, role, is_active, last_login_at, created_at, updated_at
		FROM users
		WHERE auth_user_id = $1
	`
	err := DB.QueryRow(query, authID).Scan(
		&user.ID,
		&user.CompanyID,
		&user.Email,
		&user.Name,
		&user.Role,
		&user.IsActive,
		&user.LastLoginAt,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return user, nil
}

// GetCompanyByID は会社IDから会社情報を取得
func GetCompanyByID(companyID int) (*Company, error) {
	company := &Company{}
	query := `
		SELECT id, company_group_id, name, phone_number, email, postal_code, address, is_active, created_at, updated_at
		FROM companies
		WHERE id = $1
	`
	err := DB.QueryRow(query, companyID).Scan(
		&company.ID,
		&company.CompanyGroupID,
		&company.Name,
		&company.PhoneNumber,
		&company.Email,
		&company.PostalCode,
		&company.Address,
		&company.IsActive,
		&company.CreatedAt,
		&company.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return company, nil
}

// UpdateLastLogin は最終ログイン時刻を更新
func UpdateLastLogin(userID int) error {
	query := `UPDATE users SET last_login_at = NOW() WHERE id = $1`
	_, err := DB.Exec(query, userID)
	return err
}

