package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"nissho-dispatch-backend/internal/models"
)

func UploadTemplateImage(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	user, token, ok := getUserFromRequest(w, r)
	if !ok {
		return
	}

	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "Invalid multipart form", http.StatusBadRequest)
		return
	}

	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "file is required", http.StatusBadRequest)
		return
	}
	defer file.Close()

	content, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Failed to read file", http.StatusInternalServerError)
		return
	}

	// bucket名（未設定ならtemplate-images）
	bucket := os.Getenv("SUPABASE_TEMPLATE_IMAGE_BUCKET")
	if strings.TrimSpace(bucket) == "" {
		bucket = "template-images"
	}

	ext := strings.ToLower(filepath.Ext(header.Filename))
	if ext == "" {
		// content-typeから推測（最低限）
		ct := header.Header.Get("Content-Type")
		if strings.Contains(ct, "jpeg") {
			ext = ".jpg"
		} else if strings.Contains(ct, "png") {
			ext = ".png"
		} else if strings.Contains(ct, "webp") {
			ext = ".webp"
		}
	}
	if ext == "" {
		ext = ".bin"
	}

	// 乱数でファイル名生成
	rb := make([]byte, 8)
	_, _ = rand.Read(rb)
	randHex := hex.EncodeToString(rb)
	name := "template-" + time.Now().UTC().Format("20060102T150405") + "-" + randHex + ext

	objectPath := "company/" + user.CompanyID + "/templates/" + name
	contentType := header.Header.Get("Content-Type")

	publicURL, key, err := models.UploadToStorage(bucket, objectPath, content, contentType, token)
	if err != nil {
		// 失敗理由（bucket未作成 / RLS拒否 / サイズ制限など）を返す
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"public_url": publicURL,
		"key":        key,
		"bucket":     bucket,
		"path":       objectPath,
	})
}


