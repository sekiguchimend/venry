'use client';

import React, { useState } from 'react';
import {
  FileText,
  MessageSquare,
  Home,
  HelpCircle,
  Image as ImageIcon,
  Calendar,
  Search,
  HelpCircle as QuestionIcon,
  ChevronRight,
  ChevronLeft,
  Copy
} from 'lucide-react';

interface SiteOption {
  id: string;
  name: string;
  checked: boolean;
  badge?: string;
}

const GirlNewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'comment' | 'site' | 'qa' | 'image'>('basic');
  const [isPublic, setIsPublic] = useState(false);
  const [isNewcomer, setIsNewcomer] = useState(false);
  const [linkBirthday, setLinkBirthday] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    katakana: '',
    hiragana: '',
    romaji: '',
    joinDate: '',
    age: '',
    birthday: '',
    bust: '',
    cup: 'A',
    waist: '',
    hip: '',
    height: '',
    weight: '',
    bloodType: '未選択',
    style: 'スタンダード',
    type: 'かわいい系',
    catchCopy10: '',
    catchCopy20: '',
    sensitiveZone: '',
    hobby: '',
    specialty: '',
    charmPoint: '',
    favoriteType: '',
    firstExperience: '',
    birthplace: '',
    zodiac: '',
    alcohol: '飲まない',
    tobacco: '吸わない',
    faceOut: '設定しない',
    mobileEmail: '',
    pcEmail: '',
  });

  // Site options
  const [siteOptions, setSiteOptions] = useState<SiteOption[]>([
    { id: '1', name: 'KFJ京都風俗情報', checked: true },
    { id: '2', name: 'シティヘブンネット', checked: true },
    { id: '3', name: 'デリヘルタウン', checked: true },
    { id: '4', name: 'ぴゅあらば', checked: true },
    { id: '5', name: 'マンゾクネット', checked: true, badge: '対応' },
    { id: '6', name: '駅ちか人気！風俗ランキング', checked: false },
    { id: '7', name: '口コミ風俗情報局(プランによる)', checked: true },
    { id: '8', name: '風俗じゃぱん！', checked: true },
  ]);

  const [siteSearch, setSiteSearch] = useState('');

  // Comment tabs state
  const [shopCommentTab, setShopCommentTab] = useState('基本');
  const [girlCommentTab, setGirlCommentTab] = useState('基本');
  const [commentTab, setCommentTab] = useState('基本');

  // Comment content state
  const [shopComment, setShopComment] = useState('');
  const [girlComment, setGirlComment] = useState('');
  const [comment, setComment] = useState('');

  const commentTabs = ['基本', '50文字', '100文字', '150文字', '200文字', '300文字', '500文字', '1000文字', 'HTMLタグ'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSiteToggle = (id: string) => {
    setSiteOptions(prev => prev.map(site =>
      site.id === id ? { ...site, checked: !site.checked } : site
    ));
  };

  const handleAllSitesToggle = (checked: boolean) => {
    setSiteOptions(prev => prev.map(site => ({ ...site, checked })));
  };

  const selectedCount = siteOptions.filter(s => s.checked).length;

  const tabs = [
    { id: 'basic', label: '基本情報', icon: FileText },
    { id: 'comment', label: 'コメント', icon: MessageSquare },
    { id: 'site', label: '各サイト項目', icon: Home },
    { id: 'qa', label: 'Q&A項目', icon: HelpCircle },
    { id: 'image', label: '画像', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Warning Banner */}
      <div className="bg-orange-50 border-b border-orange-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-orange-500">▲</span>
          <span className="text-orange-600 text-sm">更新する際に必要な項目を埋めてください</span>
          <span className="text-orange-500 text-sm font-medium">必須項目未入力 9件</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-6 py-2 bg-gray-300 text-gray-500 rounded text-sm cursor-not-allowed"
            disabled
          >
            保存
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center"
          >
            {sidebarOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          {/* Tabs */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-gray-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white border border-t-0 border-gray-200 p-6">
            {activeTab === 'basic' && (
              <div className="flex gap-8">
                {/* Left Column */}
                <div className="flex-1 space-y-6">
                  {/* Public Status */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">公開状態</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                    <span className="text-sm text-gray-500">非公開</span>
                  </div>

                  {/* Profile Section */}
                  <div className="flex gap-6">
                    {/* Photo Area */}
                    <div className="flex-shrink-0">
                      <div className="w-28 h-36 bg-gray-100 border border-gray-200 rounded flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon size={28} className="mb-2" />
                        <span className="text-xs">未登録</span>
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="space-y-3">
                      {/* Female Name */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 w-36 flex-shrink-0">
                          <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded flex-shrink-0">必須</span>
                          <span className="text-sm text-gray-700 flex-shrink-0">女性名</span>
                          <span className="text-gray-400 cursor-pointer text-xs flex-shrink-0">🔗</span>
                        </div>
                        <div className="relative w-60">
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 bg-yellow-50"
                            maxLength={15}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                            {formData.name.length}/15
                          </span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                          <QuestionIcon size={16} />
                        </button>
                      </div>

                      {/* Katakana */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 w-36 flex-shrink-0">
                          <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded flex-shrink-0">必須</span>
                          <span className="text-sm text-red-500 flex-shrink-0">カタカナ</span>
                        </div>
                        <div className="relative w-60">
                          <input
                            type="text"
                            value={formData.katakana}
                            onChange={(e) => handleInputChange('katakana', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 bg-yellow-50"
                            maxLength={50}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                            {formData.katakana.length}/50
                          </span>
                        </div>
                      </div>

                      {/* Hiragana */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 w-36 flex-shrink-0">
                          <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded flex-shrink-0">必須</span>
                          <span className="text-sm text-red-500 flex-shrink-0">ひらがな</span>
                        </div>
                        <div className="relative w-60">
                          <input
                            type="text"
                            value={formData.hiragana}
                            onChange={(e) => handleInputChange('hiragana', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 bg-yellow-50"
                            maxLength={50}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                            {formData.hiragana.length}/50
                          </span>
                        </div>
                      </div>

                      {/* Romaji */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 w-36 flex-shrink-0">
                          <span className="text-sm text-gray-700 ml-10 flex-shrink-0">ローマ字</span>
                          <QuestionIcon size={14} className="text-blue-500 flex-shrink-0" />
                        </div>
                        <div className="relative w-60">
                          <input
                            type="text"
                            value={formData.romaji}
                            onChange={(e) => handleInputChange('romaji', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                            {formData.romaji.length}/∞
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Join Date & Newcomer */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded">必須</span>
                      <span className="text-sm text-red-500">入店日</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="例：2018-1-1"
                        value={formData.joinDate}
                        onChange={(e) => handleInputChange('joinDate', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-36 bg-yellow-50"
                      />
                      <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isNewcomer}
                        onChange={(e) => setIsNewcomer(e.target.checked)}
                        className="w-4 h-4 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">新人に設定する</span>
                    </label>
                  </div>

                  {/* Age & Birthday */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded">必須</span>
                        <span className="text-sm text-red-500">年齢</span>
                      </div>
                      <input
                        type="text"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-16 bg-yellow-50"
                      />
                      <span className="text-sm text-gray-600">歳</span>
                      <label className="flex items-center gap-2 cursor-pointer ml-2">
                        <input
                          type="checkbox"
                          checked={linkBirthday}
                          onChange={(e) => setLinkBirthday(e.target.checked)}
                          className="w-4 h-4 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-500">生年月日と連動させる</span>
                      </label>
                      <QuestionIcon size={14} className="text-blue-500" />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-500 text-xs rounded">推奨</span>
                        <span className="text-sm text-gray-700">生年月日</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="例：2018-1-1"
                          value={formData.birthday}
                          onChange={(e) => handleInputChange('birthday', e.target.value)}
                          className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-36"
                        />
                        <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Body Size */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">3サイズなど</span>
                    </div>
                    {/* Row 1: Labels for Bust, Cup, Waist, Hip */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-20">
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-[10px] rounded">必須</span>
                        <span className="text-xs text-red-500">バスト</span>
                      </div>
                      <div className="flex items-center gap-1 w-20">
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-[10px] rounded">必須</span>
                        <span className="text-xs text-gray-700">カップ</span>
                      </div>
                      <div className="flex items-center gap-1 w-22">
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-[10px] rounded">必須</span>
                        <span className="text-xs text-red-500">ウェスト</span>
                      </div>
                      <div className="flex items-center gap-1 w-20">
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-[10px] rounded">必須</span>
                        <span className="text-xs text-red-500">ヒップ</span>
                      </div>
                    </div>
                    {/* Row 2: Inputs for Bust, Cup, Waist, Hip */}
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={formData.bust}
                        onChange={(e) => handleInputChange('bust', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20 bg-yellow-50"
                        placeholder="0"
                      />
                      <select
                        value={formData.cup}
                        onChange={(e) => handleInputChange('cup', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20 bg-yellow-50"
                      >
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map(cup => (
                          <option key={cup} value={cup}>{cup}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData.waist}
                        onChange={(e) => handleInputChange('waist', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20 bg-yellow-50"
                        placeholder="0"
                      />
                      <input
                        type="text"
                        value={formData.hip}
                        onChange={(e) => handleInputChange('hip', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20 bg-yellow-50"
                        placeholder="0"
                      />
                    </div>
                    {/* Row 3: Labels for Height, Weight */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 w-20">
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-[10px] rounded">必須</span>
                        <span className="text-xs text-red-500">身長</span>
                      </div>
                      <div className="flex items-center gap-1 w-20">
                        <span className="text-xs text-gray-700">体重</span>
                      </div>
                    </div>
                    {/* Row 4: Inputs for Height, Weight */}
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20 bg-yellow-50"
                        placeholder="0"
                      />
                      <input
                        type="text"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 w-20"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Blood Type */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 w-28 flex-shrink-0">
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-500 text-xs rounded">推奨</span>
                      <span className="text-sm text-gray-700">血液型</span>
                    </div>
                    <select
                      value={formData.bloodType}
                      onChange={(e) => handleInputChange('bloodType', e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="未選択">未選択</option>
                      <option value="A">A型</option>
                      <option value="B">B型</option>
                      <option value="O">O型</option>
                      <option value="AB">AB型</option>
                    </select>
                    <QuestionIcon size={14} className="text-blue-500" />
                  </div>

                  {/* Style & Type */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-28">スタイル</span>
                      <select
                        value={formData.style}
                        onChange={(e) => handleInputChange('style', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="スタンダード">スタンダード</option>
                        <option value="スレンダー">スレンダー</option>
                        <option value="グラマー">グラマー</option>
                        <option value="ぽっちゃり">ぽっちゃり</option>
                      </select>
                      <a href="#" className="text-sm text-blue-500 hover:underline">サイトごとに設定する</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-28">タイプ</span>
                      <select
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="かわいい系">かわいい系</option>
                        <option value="綺麗系">綺麗系</option>
                        <option value="ギャル系">ギャル系</option>
                        <option value="お姉さん系">お姉さん系</option>
                      </select>
                      <a href="#" className="text-sm text-blue-500 hover:underline">サイトごとに設定する</a>
                    </div>
                  </div>
                </div>

                {/* Right Column - Additional fields */}
                <div className="flex-1 space-y-4 border-l border-gray-100 pl-6">
                  {/* Catch Copy / Short Comment */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col flex-shrink-0 w-32 pt-8">
                      <span className="text-sm text-gray-700">キャッチコピー・</span>
                      <span className="text-sm text-gray-700">ショートコメント</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      {/* 10文字まで */}
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-500 text-xs rounded">推奨</span>
                        <span className="text-xs text-gray-500">10文字まで</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.catchCopy10}
                          onChange={(e) => handleInputChange('catchCopy10', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                          maxLength={10}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          {formData.catchCopy10.length}/10
                        </span>
                      </div>
                      {/* 20文字まで */}
                      <div className="flex items-center gap-2 mt-3">
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-500 text-xs rounded">推奨</span>
                        <span className="text-xs text-gray-500">20文字まで</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.catchCopy20}
                          onChange={(e) => handleInputChange('catchCopy20', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                          maxLength={20}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          {formData.catchCopy20.length}/20
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Other Fields */}
                  <div className="space-y-3 pt-4">
                    {/* Sensitive Zone */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 flex-shrink-0">性感帯</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={formData.sensitiveZone}
                          onChange={(e) => handleInputChange('sensitiveZone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          0/∞
                        </span>
                      </div>
                    </div>

                    {/* Hobby */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 flex-shrink-0">趣味</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={formData.hobby}
                          onChange={(e) => handleInputChange('hobby', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          0/∞
                        </span>
                      </div>
                    </div>

                    {/* Specialty */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 flex-shrink-0">得意プレイ</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={formData.specialty}
                          onChange={(e) => handleInputChange('specialty', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          0/∞
                        </span>
                      </div>
                    </div>

                    {/* Charm Point */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 flex-shrink-0">チャームポイント</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={formData.charmPoint}
                          onChange={(e) => handleInputChange('charmPoint', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          0/∞
                        </span>
                      </div>
                    </div>

                    {/* Favorite Type */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 flex-shrink-0">好きなタイプ</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={formData.favoriteType}
                          onChange={(e) => handleInputChange('favoriteType', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          0/∞
                        </span>
                      </div>
                    </div>

                    {/* First Experience */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 flex-shrink-0">初体験</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={formData.firstExperience}
                          onChange={(e) => handleInputChange('firstExperience', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          0/∞
                        </span>
                      </div>
                    </div>

                    {/* Birthplace */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 flex-shrink-0">出身地</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={formData.birthplace}
                          onChange={(e) => handleInputChange('birthplace', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          0/∞
                        </span>
                      </div>
                    </div>

                    {/* Zodiac */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-24 flex-shrink-0">
                        <span className="px-1.5 py-0.5 bg-orange-100 text-orange-500 text-[10px] rounded">推奨</span>
                        <span className="text-sm text-gray-700">星座</span>
                      </div>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={formData.zodiac}
                          onChange={(e) => handleInputChange('zodiac', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                          maxLength={7}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          {formData.zodiac.length}/7
                        </span>
                      </div>
                    </div>

                    {/* Alcohol */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 flex-shrink-0">お酒</span>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="alcohol"
                            checked={formData.alcohol === '飲む'}
                            onChange={() => handleInputChange('alcohol', '飲む')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">飲む</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="alcohol"
                            checked={formData.alcohol === '飲まない'}
                            onChange={() => handleInputChange('alcohol', '飲まない')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">飲まない</span>
                        </label>
                      </div>
                    </div>

                    {/* Tobacco */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 flex-shrink-0">タバコ</span>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="tobacco"
                            checked={formData.tobacco === '吸う'}
                            onChange={() => handleInputChange('tobacco', '吸う')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">吸う</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="tobacco"
                            checked={formData.tobacco === '吸わない'}
                            onChange={() => handleInputChange('tobacco', '吸わない')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">吸わない</span>
                        </label>
                      </div>
                    </div>

                    {/* Face Out */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-24 flex-shrink-0">顔出し</span>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="faceOut"
                            checked={formData.faceOut === '設定する'}
                            onChange={() => handleInputChange('faceOut', '設定する')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">設定する</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="faceOut"
                            checked={formData.faceOut === '設定しない'}
                            onChange={() => handleInputChange('faceOut', '設定しない')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">設定しない</span>
                        </label>
                      </div>
                    </div>

                    {/* Mobile Email */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="px-1.5 py-0.5 bg-orange-100 text-orange-500 text-[10px] rounded">推奨</span>
                        <span className="text-sm text-gray-700">携帯メールアドレス</span>
                      </div>
                      <div className="w-96 relative">
                        <input
                          type="text"
                          value={formData.mobileEmail}
                          onChange={(e) => handleInputChange('mobileEmail', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                          maxLength={255}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          {formData.mobileEmail.length}/255
                        </span>
                      </div>
                    </div>

                    {/* PC Email */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700 w-40 flex-shrink-0">PCメールアドレス</span>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={formData.pcEmail}
                          onChange={(e) => handleInputChange('pcEmail', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          0/∞
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'comment' && (
              <div className="space-y-8 py-4">
                {/* お店コメント */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-1.5 py-0.5 bg-orange-100 text-orange-500 text-[10px] rounded">推奨</span>
                    <span className="text-sm text-gray-700">お店コメント</span>
                    <QuestionIcon size={14} className="text-blue-500" />
                  </div>
                  {/* Tabs */}
                  <div className="bg-white flex border-b border-gray-200">
                    {commentTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setShopCommentTab(tab)}
                        className={`px-4 py-2 text-sm transition-colors ${
                          shopCommentTab === tab
                            ? 'bg-gray-100 text-gray-700 border-t-2 border-l border-r border-t-blue-500 border-l-gray-200 border-r-gray-200 border-b-0 -mb-px'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {/* Content Area */}
                  <div className="border border-gray-200 border-t-0 bg-gray-100 p-4">
                    {/* Description and Copy Link */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">文字数別の入力がない場合はこの内容が反映されます。</span>
                      <button className="flex items-center gap-1 text-sm text-blue-500 hover:underline">
                        <Copy size={14} />
                        この文章をすべてのタブにコピー
                      </button>
                    </div>
                    {/* Textarea */}
                    <div className="relative">
                      <textarea
                        value={shopComment}
                        onChange={(e) => setShopComment(e.target.value)}
                        className="w-full h-48 px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 resize-none bg-white"
                        maxLength={10000}
                      />
                      <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                        {shopComment.length}/10000
                      </span>
                    </div>
                  </div>
                </div>

                {/* 女の子コメント */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-1.5 py-0.5 bg-orange-100 text-orange-500 text-[10px] rounded">推奨</span>
                    <span className="text-sm text-gray-700">女の子コメント</span>
                    <QuestionIcon size={14} className="text-blue-500" />
                  </div>
                  {/* Tabs */}
                  <div className="bg-white flex border-b border-gray-200">
                    {commentTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setGirlCommentTab(tab)}
                        className={`px-4 py-2 text-sm transition-colors ${
                          girlCommentTab === tab
                            ? 'bg-gray-100 text-gray-700 border-t-2 border-l border-r border-t-blue-500 border-l-gray-200 border-r-gray-200 border-b-0 -mb-px'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {/* Content Area */}
                  <div className="border border-gray-200 border-t-0 bg-gray-100 p-4">
                    {/* Description and Copy Link */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">文字数別の入力がない場合はこの内容が反映されます。</span>
                      <button className="flex items-center gap-1 text-sm text-blue-500 hover:underline">
                        <Copy size={14} />
                        この文章をすべてのタブにコピー
                      </button>
                    </div>
                    {/* Textarea */}
                    <div className="relative">
                      <textarea
                        value={girlComment}
                        onChange={(e) => setGirlComment(e.target.value)}
                        className="w-full h-48 px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 resize-none bg-white"
                        maxLength={10000}
                      />
                      <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                        {girlComment.length}/10000
                      </span>
                    </div>
                  </div>
                </div>

                {/* コメント */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-1.5 py-0.5 bg-orange-100 text-orange-500 text-[10px] rounded">推奨</span>
                    <span className="text-sm text-gray-700">コメント</span>
                    <QuestionIcon size={14} className="text-blue-500" />
                  </div>
                  {/* Tabs */}
                  <div className="bg-white flex border-b border-gray-200">
                    {commentTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setCommentTab(tab)}
                        className={`px-4 py-2 text-sm transition-colors ${
                          commentTab === tab
                            ? 'bg-gray-100 text-gray-700 border-t-2 border-l border-r border-t-blue-500 border-l-gray-200 border-r-gray-200 border-b-0 -mb-px'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {/* Content Area */}
                  <div className="border border-gray-200 border-t-0 bg-gray-100 p-4">
                    {/* Description and Copy Link */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">文字数別の入力がない場合はこの内容が反映されます。</span>
                      <button className="flex items-center gap-1 text-sm text-blue-500 hover:underline">
                        <Copy size={14} />
                        この文章をすべてのタブにコピー
                      </button>
                    </div>
                    {/* Textarea */}
                    <div className="relative">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full h-48 px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 resize-none bg-white"
                        maxLength={10000}
                      />
                      <span className="absolute right-3 bottom-3 text-xs text-gray-400">
                        {comment.length}/10000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'site' && (
              <div className="text-center text-gray-500 py-12">
                各サイト項目タブの内容
              </div>
            )}

            {activeTab === 'qa' && (
              <div className="text-center text-gray-500 py-12">
                Q&A項目タブの内容
              </div>
            )}

            {activeTab === 'image' && (
              <div className="text-center text-gray-500 py-12">
                画像タブの内容
              </div>
            )}
          </div>

          {/* Save Button at bottom */}
          <div className="flex justify-center py-6">
            <button className="px-8 py-2 bg-gray-300 text-gray-500 rounded text-sm cursor-not-allowed">
              保存
            </button>
          </div>
        </div>

        {/* Right Sidebar - Site Checker */}
        {sidebarOpen && (
        <div className="w-72 bg-white border-l border-gray-200 p-4 min-h-screen flex-shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">⋮≡ 必須項目チェッカー</span>
            <QuestionIcon size={14} className="text-blue-500" />
          </div>

          {/* Site Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="サイト名・URLで検索"
              value={siteSearch}
              onChange={(e) => setSiteSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Selected Count */}
          <div className="text-sm text-gray-600 mb-4">
            選択中 {selectedCount} / {siteOptions.length}件中
          </div>

          {/* Site List */}
          <div className="space-y-3">
            {/* Select All */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCount === siteOptions.length}
                onChange={(e) => handleAllSitesToggle(e.target.checked)}
                className="w-4 h-4 border-gray-300 rounded text-blue-600"
              />
              <span className="text-sm text-gray-700">サイト名</span>
            </label>

            {/* Site Options */}
            {siteOptions.map((site) => (
              <label key={site.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={site.checked}
                  onChange={() => handleSiteToggle(site.id)}
                  className="w-4 h-4 border-gray-300 rounded text-blue-600"
                />
                <span className="text-sm text-gray-700">{site.name}</span>
                {site.badge && (
                  <span className="text-xs text-orange-500 border border-orange-500 px-1.5 py-0.5 rounded">
                    {site.badge}
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default GirlNewPage;
