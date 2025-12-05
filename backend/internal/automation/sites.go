package automation

// サイトID定数
const (
	SiteHimeChannel   = "hime-channel"
	SiteKFKyoto       = "kf-kyoto"
	SiteQPri          = "q-pri"
	SiteKyotoHoteheru = "kyoto-hoteheru"
	SiteGirlsHeaven   = "girls-heaven"
	SiteCityHeaven    = "city-heaven"
	SiteJobHeaven     = "job-heaven"
	SiteDeriheruTown  = "deriheru-town"
	SiteVanilla       = "vanilla"
	SitePyuajo        = "pyuajo"
	SitePyuaraba      = "pyuaraba"
	SitePyuarabaStaff = "pyuaraba-staff"
	SiteManzoku       = "manzoku"
	SiteEkichika      = "ekichika"
	SiteKuchikomi     = "kuchikomi"
	SiteFuzokuJapan   = "fuzoku-japan"
	SiteDeriheruJapan = "deriheru-japan"
	SiteFucolle       = "fucolle"
	SiteDekasegi      = "dekasegi"
	SiteThirtyFuzoku  = "thirty-fuzoku"
	SiteUresen        = "uresen"
	SiteNightpi       = "nightpi"
	SiteMrVenrey      = "mr-venrey"
)

// SiteConfigs 全サイト設定
var SiteConfigs = []SiteConfig{
	{
		ID:       SiteHimeChannel,
		Name:     "HIME CHANNEL",
		LoginURL: "https://biz.hime-channel.com/login",
		Selectors: Selectors{
			UsernameInput:    `input.ant-input.ant-input-lg[type="text"]`,
			PasswordInput:    `input[type="password"]`,
			SubmitButton:     `button.ant-btn-primary`,
			SuccessIndicator: `.ant-layout-sider`,
		},
	},
	{
		ID:       SiteKFKyoto,
		Name:     "KF京都風俗情報",
		LoginURL: "https://fufufu.tv/shopadmin/login",
		Selectors: Selectors{
			UsernameInput:    `#form_loginId`,
			PasswordInput:    `#form_password`,
			SubmitButton:     `#form_submits`,
			SuccessIndicator: `.menu, .dashboard`,
		},
	},
	{
		ID:       SiteQPri,
		Name:     "Qプリ",
		LoginURL: "https://q-pri.com/shop/login/",
		Selectors: Selectors{
			UsernameInput:    `#ShopLoginId`,
			PasswordInput:    `#ShopPassword`,
			SubmitButton:     `button[type="submit"]`,
			SuccessIndicator: `.mypage, .dashboard`,
		},
	},
	{
		ID:       SiteKyotoHoteheru,
		Name:     "オフィシャル(京都ホテヘル倶楽部様)",
		LoginURL: "https://kyoto.derikura.com/manage/",
		Selectors: Selectors{
			UsernameInput:    `#username`,
			PasswordInput:    `#password`,
			SubmitButton:     `button[type="submit"]`,
			SuccessIndicator: `.menu, .nav`,
		},
	},
	{
		ID:       SiteGirlsHeaven,
		Name:     "ガールズヘブン",
		LoginURL: "https://manager.girlsheaven-job.net/",
		Selectors: Selectors{
			UsernameInput:    `#loginId`,
			PasswordInput:    `#loginPass`,
			SubmitButton:     `#login_btn`,
			SuccessIndicator: `.menu, .nav, #menu`,
		},
		CustomLogin: true,
	},
	{
		ID:       SiteCityHeaven,
		Name:     "シティヘブンネット",
		LoginURL: "https://newmanager.cityheaven.net/C1Login.php",
		Selectors: Selectors{
			UsernameInput:    `#id`,
			PasswordInput:    `#pass`,
			SubmitButton:     `input[name="login"]`,
			SuccessIndicator: `.menu, #menu`,
		},
	},
	{
		ID:       SiteJobHeaven,
		Name:     "ジョブヘブン【メンズヘブン】",
		LoginURL: "https://manager.mensheaven.jp/",
		Selectors: Selectors{
			UsernameInput:    `#loginId`,
			PasswordInput:    `#loginPass`,
			SubmitButton:     `#login_btn`,
			SuccessIndicator: `.menu, .nav, #menu`,
		},
		CustomLogin: true,
	},
	{
		ID:       SiteDeriheruTown,
		Name:     "デリヘルタウン",
		LoginURL: "https://admin.dto.jp/a/auth/input?key=281b4f3053fa81c7160a027cb87b66bc",
		Selectors: Selectors{
			UsernameInput:    `#login_id`,
			PasswordInput:    `input[name="password"]`,
			SubmitButton:     `#login_button`,
			SuccessIndicator: `.menu, .mypage`,
		},
	},
	{
		ID:       SiteVanilla,
		Name:     "バニラ",
		LoginURL: "https://qzin.jp/entry/",
		Selectors: Selectors{
			UsernameInput:    `#form_username`,
			PasswordInput:    `#form_password`,
			SubmitButton:     `#button`,
			SuccessIndicator: `.menu, .dashboard`,
		},
	},
	{
		ID:       SitePyuajo,
		Name:     "ぴゅあじょ",
		LoginURL: "https://work.purelovers.com/shop/login/",
		Selectors: Selectors{
			UsernameInput:    `input[name="id"]`,
			PasswordInput:    `input[name="password"]`,
			SubmitButton:     `button[name="submit_button"]`,
			SuccessIndicator: `.menu, .nav`,
		},
	},
	{
		ID:       SitePyuaraba,
		Name:     "ぴゅあらば",
		LoginURL: "https://shop-admin.purelovers.com/shop/login/index/",
		Selectors: Selectors{
			UsernameInput:    `input[name="id"]`,
			PasswordInput:    `input[name="password"]`,
			SubmitButton:     `input[type="image"][name="submit_button"]`,
			SuccessIndicator: `.menu, .nav`,
		},
	},
	{
		ID:       SitePyuarabaStaff,
		Name:     "ぴゅあらばスタッフ",
		LoginURL: "https://cigoto.jp/shop/login/",
		Selectors: Selectors{
			UsernameInput:    `input[name="id"]`,
			PasswordInput:    `input[name="password"]`,
			SubmitButton:     `button[name="submit_button"]`,
			SuccessIndicator: `.menu, .nav`,
		},
	},
	{
		ID:       SiteManzoku,
		Name:     "マンゾクネット",
		LoginURL: "https://www.manzoku.or.jp/admin3/index.php",
		Selectors: Selectors{
			UsernameInput:    `input[name="login_id"]`,
			PasswordInput:    `input[name="login_pass"]`,
			SubmitButton:     `input.loginBtn[type="submit"]`,
			SuccessIndicator: `.menu, #menu`,
		},
	},
	{
		ID:       SiteEkichika,
		Name:     "駅ちか人気！風俗ランキング",
		LoginURL: "https://ranking-deli.jp/admin/login",
		Selectors: Selectors{
			UsernameInput:    `#form_email`,
			PasswordInput:    `#form_password`,
			SubmitButton:     `#form_submit`,
			SuccessIndicator: `.dashboard, .menu`,
		},
	},
	{
		ID:       SiteKuchikomi,
		Name:     "口コミ風俗情報局",
		LoginURL: "https://fujoho.jp/index.php?p=login",
		Selectors: Selectors{
			UsernameInput:    `#email`,
			PasswordInput:    `#password`,
			SubmitButton:     `input[name="login"][type="submit"]`,
			SuccessIndicator: `.mypage, .menu`,
		},
	},
	{
		ID:       SiteFuzokuJapan,
		Name:     "風俗じゃぱん！",
		LoginURL: "https://fuzoku.jp/entry/login/",
		Selectors: Selectors{
			UsernameInput:    `#form_username`,
			PasswordInput:    `#form_password`,
			SubmitButton:     `#button`,
			SuccessIndicator: `.menu, .dashboard`,
		},
	},
	{
		ID:       SiteDeriheruJapan,
		Name:     "デリヘルじゃぱん！",
		LoginURL: "https://deli-fuzoku.jp/entry/",
		Selectors: Selectors{
			UsernameInput:    `#form_username`,
			PasswordInput:    `#form_password`,
			SubmitButton:     `#button`,
			SuccessIndicator: `.menu, .dashboard`,
		},
	},
	{
		ID:       SiteFucolle,
		Name:     "フーコレ",
		LoginURL: "https://manager.fucolle.com/",
		Selectors: Selectors{
			UsernameInput:    `input[name="id"]`,
			PasswordInput:    `input[name="pass"]`,
			SubmitButton:     `input[name="submit"].bt`,
			SuccessIndicator: `.menu, .dashboard`,
		},
	},
	{
		ID:       SiteDekasegi,
		Name:     "出稼ぎちゃん",
		LoginURL: "https://www.dekasegichan.com/member/index.html",
		Selectors: Selectors{
			UsernameInput:    `input[name="shop_acount"]`,
			PasswordInput:    `input[name="shop_pw"]`,
			SubmitButton:     `#shoplogin`,
			SuccessIndicator: `.menu, .dashboard`,
		},
		CustomLogin: true,
	},
	{
		ID:       SiteThirtyFuzoku,
		Name:     "30からの風俗アルバイト【関西版】",
		LoginURL: "https://www.30baito.net/admin/login/",
		Selectors: Selectors{
			UsernameInput:    `input[name="mail"]`,
			PasswordInput:    `input[name="password"]`,
			SubmitButton:     `button[type="submit"]`,
			SuccessIndicator: `.menu, .dashboard`,
		},
	},
	{
		ID:       SiteUresen,
		Name:     "うれせん【関西・中四国版】",
		LoginURL: "https://shop.ure-sen.com/login",
		Selectors: Selectors{
			UsernameInput:    `#ShopLoginId`,
			PasswordInput:    `#ShopPassword`,
			SubmitButton:     `button[type="submit"]`,
			SuccessIndicator: `.menu, .dashboard`,
		},
	},
	{
		ID:       SiteNightpi,
		Name:     "ナイトピ",
		LoginURL: "http://naitopi.com/main/cpanel.cgi",
		Selectors: Selectors{
			UsernameInput:    `input[name="scd"]`,
			PasswordInput:    `input[name="spw"]`,
			SubmitButton:     `input[type="submit"]`,
			SuccessIndicator: `.menu, form`,
		},
	},
	{
		ID:       SiteMrVenrey,
		Name:     "Mr.Venrey【他アカウント】",
		LoginURL: "https://mrvenrey.jp/#/admin",
		Selectors: Selectors{
			UsernameInput:    `input[name="user"]`,
			PasswordInput:    `input[name="pass"]`,
			SubmitButton:     `button`,
			SuccessIndicator: `.dashboard, .menu`,
		},
		CustomLogin: true,
		Timeout:     45,
	},
}

// フロントエンドIDからサイトIDへのマッピング
var FrontendToSiteID = map[int]string{
	1:  SiteHimeChannel,
	2:  SiteKFKyoto,
	3:  SiteQPri,
	4:  SiteKyotoHoteheru,
	5:  SiteGirlsHeaven,
	6:  SiteCityHeaven,
	7:  SiteJobHeaven,
	8:  SiteDeriheruTown,
	9:  SiteVanilla,
	10: SitePyuajo,
	11: SitePyuaraba,
	12: SitePyuarabaStaff,
	13: SiteManzoku,
	14: SiteEkichika,
	15: SiteKuchikomi,
	16: SiteFuzokuJapan,
	17: SiteDeriheruJapan,
	18: SiteFucolle,
	19: SiteDekasegi,
	20: SiteThirtyFuzoku,
	21: SiteUresen,
	22: SiteNightpi,
	23: SiteMrVenrey,
}

// GetSiteConfigByID IDからサイト設定を取得
func GetSiteConfigByID(id string) *SiteConfig {
	for i := range SiteConfigs {
		if SiteConfigs[i].ID == id {
			return &SiteConfigs[i]
		}
	}
	return nil
}

// GetSiteConfigsByIDs 複数のIDからサイト設定を取得
func GetSiteConfigsByIDs(ids []string) []SiteConfig {
	idSet := make(map[string]bool)
	for _, id := range ids {
		idSet[id] = true
	}

	var configs []SiteConfig
	for _, config := range SiteConfigs {
		if idSet[config.ID] {
			configs = append(configs, config)
		}
	}
	return configs
}

// GetAllSiteConfigs 全サイト設定を取得
func GetAllSiteConfigs() []SiteConfig {
	return SiteConfigs
}

// GetSiteIDByFrontendID フロントエンドIDからサイトIDを取得
func GetSiteIDByFrontendID(frontendID int) string {
	return FrontendToSiteID[frontendID]
}
