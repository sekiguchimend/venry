package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/rs/cors"
)

// CORSMiddleware はCORSを設定するミドルウェア
func CORSMiddleware() *cors.Cors {
	allowedOrigins := []string{"http://localhost:3000"}
	
	// 環境変数から許可するオリジンを取得
	if origins := os.Getenv("ALLOWED_ORIGINS"); origins != "" {
		allowedOrigins = strings.Split(origins, ",")
	}

	return cors.New(cors.Options{
		AllowedOrigins: allowedOrigins,
		AllowedMethods: []string{
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
			http.MethodOptions,
		},
		AllowedHeaders: []string{
			"Accept",
			"Authorization",
			"Content-Type",
			"X-CSRF-Token",
		},
		ExposedHeaders: []string{
			"Link",
		},
		AllowCredentials: true,
		MaxAge:           300,
	})
}

