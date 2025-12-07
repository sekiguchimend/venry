package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"nissho-dispatch-backend/internal/handlers"
	"nissho-dispatch-backend/internal/middleware"
	"nissho-dispatch-backend/internal/models"

	"github.com/joho/godotenv"
)

func main() {
	// 環境変数を読み込み
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	// データベース接続を初期化
	if err := models.InitDB(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer models.CloseDB()

	// CORS設定
	corsMiddleware := middleware.CORSMiddleware()

	// ルーター設定
	mux := http.NewServeMux()

	// ヘルスチェック（認証不要）
	mux.HandleFunc("/health", handlers.HealthCheck)

	// 認証エンドポイント（認証不要）
	mux.HandleFunc("/api/auth/signup", handlers.SignUp)
	mux.HandleFunc("/api/auth/login", handlers.Login)
	mux.HandleFunc("/api/auth/logout", handlers.Logout)
	mux.HandleFunc("/api/auth/refresh", handlers.RefreshToken)

	// 認証が必要なエンドポイント
	mux.Handle("/api/user/me", middleware.AuthMiddleware(http.HandlerFunc(handlers.GetCurrentUser)))
	mux.Handle("/api/user/profile", middleware.AuthMiddleware(http.HandlerFunc(handlers.UpdateUserProfile)))
	mux.Handle("/api/sites", middleware.AuthMiddleware(http.HandlerFunc(handlers.GetSites)))
	mux.Handle("/api/credentials", middleware.AuthMiddleware(http.HandlerFunc(handlers.GetCompanyCredentials)))
	mux.Handle("/api/credentials/save", middleware.AuthMiddleware(http.HandlerFunc(handlers.SaveCredential)))
	mux.Handle("/api/credentials/delete", middleware.AuthMiddleware(http.HandlerFunc(handlers.DeleteCredential)))

	// 自動化エンドポイント
	mux.Handle("/api/automation/login", middleware.AuthMiddleware(http.HandlerFunc(handlers.ExecuteLogin)))
	mux.Handle("/api/automation/login/single", middleware.AuthMiddleware(http.HandlerFunc(handlers.ExecuteSingleLogin)))
	mux.Handle("/api/automation/login/test", middleware.AuthMiddleware(http.HandlerFunc(handlers.TestLoginCredential)))
	mux.Handle("/api/automation/execute-flows", middleware.AuthMiddleware(http.HandlerFunc(handlers.ExecuteRegisteredFlows)))

	// ミドルウェアチェーン
	handler := middleware.LoggerMiddleware(corsMiddleware.Handler(mux))

	// サーバー起動
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	addr := fmt.Sprintf(":%s", port)
	log.Printf("Server starting on http://localhost%s", addr)
	log.Fatal(http.ListenAndServe(addr, handler))
}
