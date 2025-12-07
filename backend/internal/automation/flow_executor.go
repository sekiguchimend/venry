package automation

import (
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/launcher"
	"github.com/go-rod/rod/lib/proto"
)

// ============================================
// フロー設定の型定義
// ============================================

// FlowStep represents a single automation step
type FlowStep struct {
	Action   string `json:"action"`
	Selector string `json:"selector,omitempty"`
	URL      string `json:"url,omitempty"`
	Value    string `json:"value,omitempty"`
	File     string `json:"file,omitempty"`
	Timeout  int    `json:"timeout,omitempty"`
	Ms       int    `json:"ms,omitempty"`
	Path     string `json:"path,omitempty"`
}

// FlowDefinition represents a flow with its steps
type FlowDefinition struct {
	Name         string     `json:"name"`
	IsBulkUpdate bool       `json:"isBulkUpdate,omitempty"`
	Steps        []FlowStep `json:"steps"`
}

// FlowSiteConfig represents a site configuration for flows
type FlowSiteConfig struct {
	Name     string                    `json:"name"`
	LoginURL string                    `json:"loginUrl"`
	Flows    map[string]FlowDefinition `json:"flows"`
}

// FlowConfig represents the entire flow configuration file
type FlowConfig struct {
	Sites map[string]FlowSiteConfig `json:"sites"`
}

// FlowExecutor executes flows based on JSON configuration
type FlowExecutor struct {
	config   *FlowConfig
	browser  *rod.Browser
	launcher *launcher.Launcher
}

// ExecutionContext holds variables for step execution
type ExecutionContext struct {
	LoginID   string
	Password  string
	Title     string
	Content   string
	PhotoPath string
	GirlName  string
	StartTime string
	EndTime   string
	LoginURL  string
	Custom    map[string]string
}

// FlowExecutionResult represents the result of a flow execution
type FlowExecutionResult struct {
	Success   bool
	FlowCode  string
	FlowName  string
	Error     string
	Duration  time.Duration
	StepsRun  int
	Timestamp time.Time
}

// ============================================
// FlowExecutor メソッド
// ============================================

// NewFlowExecutor creates a new FlowExecutor
func NewFlowExecutor(configPath string) (*FlowExecutor, error) {
	data, err := os.ReadFile(configPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read config file: %w", err)
	}

	var config FlowConfig
	if err := json.Unmarshal(data, &config); err != nil {
		return nil, fmt.Errorf("failed to parse config file: %w", err)
	}

	return &FlowExecutor{
		config: &config,
	}, nil
}

// NewFlowExecutorFromBytes creates a FlowExecutor from JSON bytes
func NewFlowExecutorFromBytes(data []byte) (*FlowExecutor, error) {
	var config FlowConfig
	if err := json.Unmarshal(data, &config); err != nil {
		return nil, fmt.Errorf("failed to parse config: %w", err)
	}

	return &FlowExecutor{
		config: &config,
	}, nil
}

// StartBrowser starts the browser
func (e *FlowExecutor) StartBrowser(headless bool) error {
	e.launcher = launcher.New().
		Headless(headless).
		Leakless(false) // Disable leakless mode to avoid Windows Defender blocking
	url := e.launcher.MustLaunch()
	e.browser = rod.New().ControlURL(url).MustConnect()
	return nil
}

// StopBrowser stops the browser
func (e *FlowExecutor) StopBrowser() {
	if e.browser != nil {
		e.browser.MustClose()
	}
	if e.launcher != nil {
		e.launcher.Cleanup()
	}
}

// GetSiteConfig returns the configuration for a site
func (e *FlowExecutor) GetSiteConfig(siteID string) (*FlowSiteConfig, error) {
	site, ok := e.config.Sites[siteID]
	if !ok {
		return nil, fmt.Errorf("site not found: %s", siteID)
	}
	return &site, nil
}

// GetFlowDefinition returns the flow definition
func (e *FlowExecutor) GetFlowDefinition(siteID, flowCode string) (*FlowDefinition, error) {
	site, err := e.GetSiteConfig(siteID)
	if err != nil {
		return nil, err
	}

	flow, ok := site.Flows[flowCode]
	if !ok {
		return nil, fmt.Errorf("flow not found: %s/%s", siteID, flowCode)
	}
	return &flow, nil
}

// ExecuteFlow executes a flow
func (e *FlowExecutor) ExecuteFlow(siteID, flowCode string, ctx *ExecutionContext) *FlowExecutionResult {
	startTime := time.Now()
	result := &FlowExecutionResult{
		FlowCode:  flowCode,
		Timestamp: startTime,
	}

	// Get site and flow config
	site, err := e.GetSiteConfig(siteID)
	if err != nil {
		result.Error = err.Error()
		result.Duration = time.Since(startTime)
		return result
	}

	flow, err := e.GetFlowDefinition(siteID, flowCode)
	if err != nil {
		result.Error = err.Error()
		result.Duration = time.Since(startTime)
		return result
	}

	result.FlowName = flow.Name

	// Set loginURL in context
	if ctx.LoginURL == "" {
		ctx.LoginURL = site.LoginURL
	}

	// Create new page
	page := e.browser.MustPage()
	defer page.MustClose()

	// Execute steps
	for i, step := range flow.Steps {
		if err := e.executeStep(page, step, ctx); err != nil {
			result.Error = fmt.Sprintf("step %d (%s) failed: %v", i+1, step.Action, err)
			result.StepsRun = i
			result.Duration = time.Since(startTime)
			return result
		}
		result.StepsRun = i + 1
	}

	result.Success = true
	result.Duration = time.Since(startTime)
	return result
}

// executeStep executes a single step
func (e *FlowExecutor) executeStep(page *rod.Page, step FlowStep, ctx *ExecutionContext) error {
	// Replace variables in step values
	selector := e.replaceVariables(step.Selector, ctx)
	url := e.replaceVariables(step.URL, ctx)
	value := e.replaceVariables(step.Value, ctx)
	file := e.replaceVariables(step.File, ctx)

	timeout := time.Duration(step.Timeout) * time.Millisecond
	if timeout == 0 {
		timeout = 10 * time.Second // default timeout
	}

	switch step.Action {
	case "navigate":
		return page.Navigate(url)

	case "click":
		el, err := page.Timeout(timeout).Element(selector)
		if err != nil {
			return fmt.Errorf("element not found: %s", selector)
		}
		return el.Click(proto.InputMouseButtonLeft, 1)

	case "input":
		el, err := page.Timeout(timeout).Element(selector)
		if err != nil {
			return fmt.Errorf("element not found: %s", selector)
		}
		return el.Input(value)

	case "clear":
		el, err := page.Timeout(timeout).Element(selector)
		if err != nil {
			return fmt.Errorf("element not found: %s", selector)
		}
		if err := el.SelectAllText(); err != nil {
			return err
		}
		return el.Input("")

	case "upload":
		el, err := page.Timeout(timeout).Element(selector)
		if err != nil {
			return fmt.Errorf("element not found: %s", selector)
		}
		return el.SetFiles([]string{file})

	case "wait":
		_, err := page.Timeout(timeout).Element(selector)
		return err

	case "waitTime":
		time.Sleep(time.Duration(step.Ms) * time.Millisecond)
		return nil

	case "select":
		el, err := page.Timeout(timeout).Element(selector)
		if err != nil {
			return fmt.Errorf("element not found: %s", selector)
		}
		return el.Select([]string{value}, true, rod.SelectorTypeText)

	case "screenshot":
		path := e.replaceVariables(step.Path, ctx)
		data, err := page.Screenshot(true, nil)
		if err != nil {
			return err
		}
		return os.WriteFile(path, data, 0644)

	case "scroll":
		el, err := page.Timeout(timeout).Element(selector)
		if err != nil {
			return fmt.Errorf("element not found: %s", selector)
		}
		return el.ScrollIntoView()

	case "hover":
		el, err := page.Timeout(timeout).Element(selector)
		if err != nil {
			return fmt.Errorf("element not found: %s", selector)
		}
		return el.Hover()

	default:
		return fmt.Errorf("unknown action: %s", step.Action)
	}
}

// replaceVariables replaces {{variable}} placeholders with actual values
func (e *FlowExecutor) replaceVariables(s string, ctx *ExecutionContext) string {
	if s == "" {
		return s
	}

	replacements := map[string]string{
		"{{login_id}}":   ctx.LoginID,
		"{{password}}":   ctx.Password,
		"{{title}}":      ctx.Title,
		"{{content}}":    ctx.Content,
		"{{photo_path}}": ctx.PhotoPath,
		"{{girl_name}}":  ctx.GirlName,
		"{{start_time}}": ctx.StartTime,
		"{{end_time}}":   ctx.EndTime,
		"{{loginUrl}}":   ctx.LoginURL,
	}

	result := s
	for key, value := range replacements {
		result = strings.ReplaceAll(result, key, value)
	}

	// Replace custom variables
	if ctx.Custom != nil {
		for key, value := range ctx.Custom {
			result = strings.ReplaceAll(result, "{{"+key+"}}", value)
		}
	}

	// Replace timestamp
	re := regexp.MustCompile(`\{\{timestamp\}\}`)
	result = re.ReplaceAllString(result, time.Now().Format("20060102_150405"))

	return result
}

// ============================================
// ヘルパー関数
// ============================================

// ListSites returns all available site IDs
func (e *FlowExecutor) ListSites() []string {
	sites := make([]string, 0, len(e.config.Sites))
	for siteID := range e.config.Sites {
		sites = append(sites, siteID)
	}
	return sites
}

// ListFlows returns all flow codes for a site
func (e *FlowExecutor) ListFlows(siteID string) ([]string, error) {
	site, err := e.GetSiteConfig(siteID)
	if err != nil {
		return nil, err
	}

	flows := make([]string, 0, len(site.Flows))
	for flowCode := range site.Flows {
		flows = append(flows, flowCode)
	}
	return flows, nil
}

// ExecuteMultipleFlows executes multiple flows sequentially
func (e *FlowExecutor) ExecuteMultipleFlows(siteID string, flowCodes []string, ctx *ExecutionContext) []*FlowExecutionResult {
	results := make([]*FlowExecutionResult, 0, len(flowCodes))
	for _, flowCode := range flowCodes {
		result := e.ExecuteFlow(siteID, flowCode, ctx)
		results = append(results, result)
		if !result.Success {
			// Continue or break based on requirements
			// Currently continues even on failure
		}
	}
	return results
}
