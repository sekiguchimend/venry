'use client';

import React, { useMemo, useState } from 'react';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { FormRow } from '../ui/FormRow';
import { Section } from '../ui/Section';
import { Select, TextInput, Textarea } from '../ui/Inputs';
import { CheckboxGrid, type CheckboxItem } from '../ui/CheckboxGrid';
import { SubTabs } from '../ui/SubTabs';
import { useCheckboxSet } from '../hooks/useCheckboxSet';

function makeItems(labels: string[]): CheckboxItem[] {
  return labels.map((label) => ({ id: label, label }));
}

export default function SiteTab() {
  // 複数サイト共通（サブタブ）
  const [commonTab, setCommonTab] = useState<'official' | 'fuzokuJapan'>('official');
  const [commonPersonality, setCommonPersonality] = useState('');
  const [commonPreviousJob, setCommonPreviousJob] = useState('');

  // デリヘルタウン
  const [dhtBasicPlay, setDhtBasicPlay] = useState('');
  const [dhtOptionPlay, setDhtOptionPlay] = useState('');

  // ぴゅあらば
  const [pyJobFilter, setPyJobFilter] = useState('未設定');
  const [pySmokeUpdate, setPySmokeUpdate] = useState('更新する');
  const [pyAlcohol, setPyAlcohol] = useState('基本項目の「お酒」を反映');
  const [pyNewIcon, setPyNewIcon] = useState('未選択');
  const [pyNewIconY, setPyNewIconY] = useState('未選択');
  const [pyNewIconM, setPyNewIconM] = useState('未選択');
  const [pyNewIconD, setPyNewIconD] = useState('未選択');
  
  // サブタグ
  const [subTags, setSubTags] = useState<string[]>([]);

  // シティヘブンネット
  const [heavenRoute, setHeavenRoute] = useState('変更しない(新規登録時は未選択)');
  const [heavenPhotoRotation, setHeavenPhotoRotation] = useState('未選択');

  const heavenSalePoints = useMemo(
    () =>
      makeItems([
        'スレンダー', 'ぽっちゃり', 'パイパン', 'アニメ声', '明るい', '恥ずかしがり屋', 'ルックス抜群', 'ア〇ル',
        '話し好き', 'レズビアン', 'ぷよっ子', '素人', 'ギャル系', '黒髪', '癒し系', '人懐っこい', 'スタイル抜群', 'マニア',
        '聞き上手', '小柄', '巨乳', 'モデル系', 'ニューハーフ', '甘えん坊', 'エロい', 'サービス抜群', '潮吹き', '母乳',
        '長身', '美乳', '現役学生', '乳首ピンク', '天然', '空気を読む', '感度抜群', 'ドM', 'パイズリ',
        '普通', '美脚', 'ツンデレ', 'オタク', '責め好き', 'ドS・女王様', '聖水',
        'グラマー', '美尻', 'ハーフ', '喫煙しない', 'おっとり', 'しっかり者', '受身好き',
        '変態', '黄金',
      ]),
    [],
  );
  const heavenSalePointsSet = useCheckboxSet(
    heavenSalePoints.map((i) => i.id),
    12,
  );

  // 駅ちか人気！風俗ランキング
  const [ekichikaJobFilter, setEkichikaJobFilter] = useState('未設定');
  const [ekichikaGenre1, setEkichikaGenre1] = useState('未選択');
  const [ekichikaGenre2, setEkichikaGenre2] = useState('未選択');
  const [ekichikaGenre3, setEkichikaGenre3] = useState('未選択');
  const [ekichikaPossibleOptionText, setEkichikaPossibleOptionText] = useState('');
  const [ekichikaNewTrial, setEkichikaNewTrial] = useState('未選択可');
  const [ekichikaPriority1, setEkichikaPriority1] = useState('未選択');
  const [ekichikaPriority2, setEkichikaPriority2] = useState('未選択');
  const [ekichikaPriority3, setEkichikaPriority3] = useState('未選択');
  const [ekichikaShopMessageTitle, setEkichikaShopMessageTitle] = useState('');

  const ekichikaJobs = useMemo(
    () =>
      makeItems([
        'no1', 'no2', 'no3', 'プレミア', '店長オススメ', '素人',
        '未経験', '禁煙', '要予約', '顔出し', 'アイドル系', 'お姉さん系',
        'お嬢様', '可愛い系', 'ロリ系', 'ギャル系', 'キレカワ', '美少女系',
        '綺麗系', 'ハーフ', 'グラマー', 'スレンダー', 'ぽっちゃり', 'ミニマム',
        '美肌', '美脚', '色白', 'スタイル抜群', 'モデル系', '高身長',
        '低身長', 'タトゥー・刺青', 'OL系', '女子大生', 'キャバ系', 'セクシー系',
        '癒し系', '清楚', '萌え系', 'おっとり', '天然', 'テクニシャン',
        'サービス抜群', '愛嬌抜群',
      ]),
    [],
  );
  const ekichikaJobsSet = useCheckboxSet(ekichikaJobs.map((i) => i.id));

  // デリヘル、ホテヘル、ヘルス、風俗エステ
  const ekichikaDeliverHealth = useMemo(
    () =>
      makeItems([
        'av女優', 'パイパン', '妊婦プレイ', '敏感', '攻め好き', '受身好き',
        '痴女', '濃厚サービス', '潮吹き', 'ドM(ドエム)', 'ドS(ドエス)', '母乳プレイ',
        'パイズリ', 'AF可', 'イラマチオ可', '3P可', 'ごっくん', 'アジアン',
        'ブロンド・金髪', 'ニューハーフ', '熟女系', '巨乳', '爆乳', '貧乳',
        '美乳', '巨尻', '美尻', '人妻系', 'イヤイヤ好き',
      ]),
    [],
  );
  const ekichikaDeliverHealthSet = useCheckboxSet(ekichikaDeliverHealth.map((i) => i.id), 19);

  // ソープ、ピンサロ
  const ekichikaSoapPinsaro = useMemo(
    () =>
      makeItems([
        'アジアン', 'ブロンド・金髪', 'ニューハーフ', '熟女系', '人妻系', '巨乳',
        '爆乳', '貧乳', '美乳', '巨尻', '美尻', 'イヤイヤ好き',
      ]),
    [],
  );
  const ekichikaSoapPinsaroSet = useCheckboxSet(ekichikaSoapPinsaro.map((i) => i.id));

  // メンズエステ
  const ekichikaMensEsthe = useMemo(
    () =>
      makeItems([
        'エステ経験者', 'エステ未経験', '資格あり', 'インテリ', 'ツンデレ', '話し上手',
        '聞き上手', 'リピート高確率', '好感度抜群', '礼儀正しい', '好奇心旺盛', '真面目',
        'マッサージが得意', '極液施術可', 'バリエーション豊富', '出張サービス可能', '丁寧な施術',
      ]),
    [],
  );
  const ekichikaMensEstheSet = useCheckboxSet(ekichikaMensEsthe.map((i) => i.id));

  // 可能基本プレイ/可能オプション（スクショにある大きなグリッド）
  const playOptions = useMemo(
    () =>
      makeItems([
        'ディープキス', '全身リップ', 'パイズリ', '手コキ', '足コキ', '尻コキ',
        '素股', 'フェラ', '生フェラ', '玉舐め', 'イラマチオ', '顔射',
        '口内発射', 'ゴックン', 'お掃除フェラ', '時間内発射無制限', '乳首舐め', '足舐め',
        'アナル舐め', '前立腺マッサージ', '睾丸マッサージ', '回春マッサージ', '亀頭責め', '強制射精',
        '男の潮吹き', 'くすぐり', '母乳・授乳', 'ローションプレイ', '赤ちゃん・幼児プレイ', '痴漢',
        '即尺', '3P', 'マットプレイ', 'パンティー', 'パンスト', '擬似レイプ',
        'セクハラ', '撮影', 'オナニー鑑賞', 'クンニ', '69', '医療プレイ',
        'ピンクローター', 'バイブ', '電マ', '鼻フック', '顔面騎乗', 'コスプレ',
        '潮吹き', '拘束・目隠し', '放尿', '隠語・言葉責め', 'AF', '指入れ',
        '剃毛', '聖水', 'スカトロ・浣腸', 'ソフトSM', 'フィスト',
        'ゲロ・嘔吐',
      ]),
    [],
  );
  const playOptionsSet = useCheckboxSet(playOptions.map((i) => i.id));

  // 風俗じゃぱん！
  const [fjJobFilter, setFjJobFilter] = useState('未設定');
  const [fjXUrl, setFjXUrl] = useState('');
  const [fjNominationFee1, setFjNominationFee1] = useState('');
  const [fjNominationFee1Reflect, setFjNominationFee1Reflect] = useState('未選択');
  const [fjNominationFee2, setFjNominationFee2] = useState('');
  const [fjNominationFee2Reflect, setFjNominationFee2Reflect] = useState('未選択');
  const [fjHeight, setFjHeight] = useState('タグを表示');
  const [fjBustSize, setFjBustSize] = useState('タグを表示');
  const [fjSmAttr, setFjSmAttr] = useState('タグを表示');
  const [fjGirlTag1, setFjGirlTag1] = useState('未選択');
  const [fjGirlTag2, setFjGirlTag2] = useState('未選択');
  const [fjSmCheck, setFjSmCheck] = useState('未選択');
  const [fjTrialSetting, setFjTrialSetting] = useState('未選択');

  const fjLooks = useMemo(() => makeItems(['美乳', '乳輪大きい', '乳首ピンク', '美尻', '巨尻', 'スレンダー', 'セクシー', 'グラマー', 'ぽっちゃり', 'メガぽっちゃり', '美肌', '色白', '色黒', 'パイパン', '黒髪', '美脚']), []);
  const fjPersonality = useMemo(() => makeItems(['明るい', '甘えん坊', 'ツンデレ', '恥ずかしがり屋', '人懐っこい', '愛嬌抜群', 'しっかり者', '話し好き', '聞き上手', '天然', 'オタク', 'おっとり', 'イヤイヤ好き']), []);
  const fjTypeTags = useMemo(() => makeItems(['ロリ系', 'ギャル系', '人妻系', 'キレイ系', 'カワイイ系', 'モデル系', '美少女系', '癒し系', 'キャバ系', '清楚', 'アイドル系', 'OL系', 'お姉さん系', '萌え系', 'お嬢様']), []);
  const fjPlayTags = useMemo(() => makeItems(['黄金', '聖水', 'マット', 'アナル', 'パイズリ', '潮吹き']), []);
  const fjKodaTags = useMemo(() => makeItems(['AV女優', '母乳', 'ニューハーフ', '敏感', '感度抜群', '女子大生', 'スタイル抜群', 'ハーフ', 'タトゥー', '素人', '変態', '痴女', 'アニメ声', '未経験', '顔出し', '禁煙', 'テクニシャン']), []);

  const fjLooksSet = useCheckboxSet(fjLooks.map((i) => i.id), 5);
  const fjPersonalitySet = useCheckboxSet(fjPersonality.map((i) => i.id), 2);
  const fjTypeSet = useCheckboxSet(fjTypeTags.map((i) => i.id), 1);
  const fjPlaySet = useCheckboxSet(fjPlayTags.map((i) => i.id));
  const fjKodaSet = useCheckboxSet(fjKodaTags.map((i) => i.id), 2);

  return (
    <div className="space-y-6">
      <Section badge={{ variant: 'recommended', label: '推奨' }} title="複数サイト共通">
        <SubTabs
          tabs={[
            { id: 'official', label: 'オフィシャル(京都ホテヘル倶楽部様)' },
            { id: 'fuzokuJapan', label: '風俗じゃぱん！' },
          ]}
          active={commonTab}
          onChange={setCommonTab}
        />

        <div className="border-t border-gray-100 pt-2">
          <FormRow label="性格">
            <TextInput value={commonPersonality} onChange={setCommonPersonality} showCount />
          </FormRow>
          <FormRow label="前職">
            <TextInput value={commonPreviousJob} onChange={setCommonPreviousJob} showCount />
          </FormRow>
        </div>
      </Section>

      <Section badge={{ variant: 'recommended', label: '推奨' }} title="デリヘルタウン">
        <div className="max-w-[980px] mx-auto space-y-8">
          <FormRow label="基本プレイ" hint="(1行15文字以内、40行まで)">
            <Textarea value={dhtBasicPlay} onChange={setDhtBasicPlay} />
          </FormRow>
          <FormRow label="オプションプレイ" hint="(1行15文字以内、40行まで)">
            <Textarea value={dhtOptionPlay} onChange={setDhtOptionPlay} />
          </FormRow>
        </div>
      </Section>

      <Section
        badge={{ variant: 'required', label: '必須' }}
        title="ぴゅあらば"
        right={
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">業種絞り込み:</span>
            <Select value={pyJobFilter} onChange={setPyJobFilter} options={['未設定']} />
          </div>
        }
      >
        <div className="max-w-[820px] mx-auto space-y-4">
          <FormRow label="喫煙項目の更新有無">
            <Select value={pySmokeUpdate} onChange={setPySmokeUpdate} options={['更新する', '更新しない']} />
          </FormRow>
          <FormRow label="お酒">
            <Select value={pyAlcohol} onChange={setPyAlcohol} options={['基本項目の「お酒」を反映', '反映しない']} />
          </FormRow>
          <FormRow label="新人アイコン(編集不可)">
            <Select value={pyNewIcon} onChange={setPyNewIcon} options={['未選択']} />
          </FormRow>
          <FormRow label="新人アイコン表示開始日付(年)">
            <Select value={pyNewIconY} onChange={setPyNewIconY} options={['未選択']} />
          </FormRow>
          <FormRow label="新人アイコン表示開始日付(月)">
            <Select value={pyNewIconM} onChange={setPyNewIconM} options={['未選択']} />
          </FormRow>
          <FormRow label="新人アイコン表示開始日付(日)">
            <Select value={pyNewIconD} onChange={setPyNewIconD} options={['未選択']} />
          </FormRow>
        </div>

        {/* 可能基本プレイ/可能オプション */}
        <div className="mt-10 max-w-[1200px] mx-auto">
          <FormRow label="可能基本プレイ/可能オプション">
            <CheckboxGrid
              items={playOptions}
              selectedIds={playOptionsSet.selected}
              onToggle={playOptionsSet.toggle}
              onSelectAll={playOptionsSet.selectAll}
              onClear={playOptionsSet.clear}
              columnsClassName="grid-cols-7"
            />
          </FormRow>
        </div>

        {/* サブタグ */}
        <div className="mt-10 max-w-[820px] mx-auto">
          <div className="flex items-start gap-4">
            <div className="text-sm font-medium text-gray-800 min-w-[80px]">サブタグ</div>
            <div className="flex-1 space-y-4">
              <p className="text-sm text-gray-600">
                サイト側で付与されていない自動タグは無視されます。ドラッグで並び替えができます
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const newTag = `タグ${subTags.length + 1}`;
                    setSubTags([...subTags, newTag]);
                  }}
                  className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
                >
                  <Plus size={14} />
                  サブタグ追加
                </button>
                <button
                  type="button"
                  onClick={() => setSubTags([])}
                  className="text-sm text-blue-500 hover:underline"
                >
                  すべて削除
                </button>
              </div>
              {subTags.length > 0 && (
                <div className="space-y-2">
                  {subTags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded hover:border-blue-300 transition-colors"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('tagIndex', index.toString());
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const draggedIndex = parseInt(e.dataTransfer.getData('tagIndex'), 10);
                        if (draggedIndex === index) return;
                        const newTags = [...subTags];
                        const [removed] = newTags.splice(draggedIndex, 1);
                        newTags.splice(index, 0, removed);
                        setSubTags(newTags);
                      }}
                    >
                      <div className="text-gray-300 cursor-grab">
                        <GripVertical size={16} />
                      </div>
                      <div className="flex-1 text-sm text-gray-800">{tag}</div>
                      <button
                        type="button"
                        onClick={() => {
                          setSubTags(subTags.filter((_, i) => i !== index));
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section badge={{ variant: 'required', label: '必須' }} title="シティヘブンネット">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[520px] space-y-4">
            <FormRow label="入店経路">
              <Select value={heavenRoute} onChange={setHeavenRoute} options={['変更しない(新規登録時は未選択)', '未選択']} />
            </FormRow>
            <FormRow label="写真ローテーション">
              <Select value={heavenPhotoRotation} onChange={setHeavenPhotoRotation} options={['未選択']} />
            </FormRow>
          </div>

          <div className="mt-10">
            <FormRow label="セールスポイント" hint="(12個まで)">
              <CheckboxGrid
                items={heavenSalePoints}
                selectedIds={heavenSalePointsSet.selected}
                onToggle={heavenSalePointsSet.toggle}
                onSelectAll={heavenSalePointsSet.selectAll}
                onClear={heavenSalePointsSet.clear}
                columnsClassName="grid-cols-6"
                maxSelected={12}
              />
            </FormRow>
          </div>
        </div>
      </Section>

      <Section
        badge={{ variant: 'required', label: '必須' }}
        title="駅ちか人気！風俗ランキング"
        right={
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700">業種絞り込み：</div>
            <Select value={ekichikaJobFilter} onChange={setEkichikaJobFilter} options={['未設定']} />
          </div>
        }
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[520px] space-y-4">
            <FormRow label="ジャンル1(大)">
              <Select value={ekichikaGenre1} onChange={setEkichikaGenre1} options={['未選択']} />
            </FormRow>
            <FormRow label="ジャンル2(大)">
              <Select value={ekichikaGenre2} onChange={setEkichikaGenre2} options={['未選択']} />
            </FormRow>
            <FormRow label="ジャンル3(大)">
              <Select value={ekichikaGenre3} onChange={setEkichikaGenre3} options={['未選択']} />
            </FormRow>
          </div>

          {/* すべての業種 */}
          <div className="mt-10">
            <div className="text-base font-semibold text-gray-800 text-center mb-6">すべての業種</div>
            <CheckboxGrid
              items={ekichikaJobs}
              selectedIds={ekichikaJobsSet.selected}
              onToggle={ekichikaJobsSet.toggle}
              onSelectAll={ekichikaJobsSet.selectAll}
              onClear={ekichikaJobsSet.clear}
              columnsClassName="grid-cols-7"
            />
          </div>

          {/* デリヘル、ホテヘル、ヘルス、風俗エステ */}
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-base font-semibold text-gray-800">デリヘル、ホテヘル、ヘルス、風俗エステ</div>
              <span className="text-sm text-gray-600">ジャンル(ジャンル1~3(大)とあわせて19個まで)</span>
            </div>
            <CheckboxGrid
              items={ekichikaDeliverHealth}
              selectedIds={ekichikaDeliverHealthSet.selected}
              onToggle={ekichikaDeliverHealthSet.toggle}
              onSelectAll={ekichikaDeliverHealthSet.selectAll}
              onClear={ekichikaDeliverHealthSet.clear}
              columnsClassName="grid-cols-7"
              maxSelected={19}
            />
          </div>

          {/* ソープ、ピンサロ */}
          <div className="mt-10">
            <div className="text-base font-semibold text-gray-800 mb-6">ソープ、ピンサロ</div>
            <CheckboxGrid
              items={ekichikaSoapPinsaro}
              selectedIds={ekichikaSoapPinsaroSet.selected}
              onToggle={ekichikaSoapPinsaroSet.toggle}
              onSelectAll={ekichikaSoapPinsaroSet.selectAll}
              onClear={ekichikaSoapPinsaroSet.clear}
              columnsClassName="grid-cols-6"
            />
          </div>

          {/* メンズエステ */}
          <div className="mt-10">
            <div className="text-base font-semibold text-gray-800 mb-6">メンズエステ</div>
            <CheckboxGrid
              items={ekichikaMensEsthe}
              selectedIds={ekichikaMensEstheSet.selected}
              onToggle={ekichikaMensEstheSet.toggle}
              onSelectAll={ekichikaMensEstheSet.selectAll}
              onClear={ekichikaMensEstheSet.clear}
              columnsClassName="grid-cols-6"
            />
          </div>

          {/* 可能オプション（駅ちか人気！風俗ランキング） */}
          <div className="mt-10">
            <FormRow label="可能オプション">
              <Textarea
                value={ekichikaPossibleOptionText}
                onChange={setEkichikaPossibleOptionText}
                maxLength={145}
                heightClassName="h-64"
              />
            </FormRow>

            <div className="max-w-[980px] mt-6 space-y-4">
              <FormRow label="新人・体験入店">
                <Select value={ekichikaNewTrial} onChange={setEkichikaNewTrial} options={['未選択可']} />
              </FormRow>
              <FormRow label="優先タグ1">
                <Select value={ekichikaPriority1} onChange={setEkichikaPriority1} options={['未選択']} />
              </FormRow>
              <FormRow label="優先タグ2">
                <Select value={ekichikaPriority2} onChange={setEkichikaPriority2} options={['未選択']} />
              </FormRow>
              <FormRow label="優先タグ3">
                <Select value={ekichikaPriority3} onChange={setEkichikaPriority3} options={['未選択']} />
              </FormRow>
              <FormRow label="お店からのメッセージ(メッセージタイトル)">
                <TextInput
                  value={ekichikaShopMessageTitle}
                  onChange={setEkichikaShopMessageTitle}
                  maxLength={80}
                  showCount
                />
              </FormRow>
            </div>
          </div>

        </div>
      </Section>


      <Section
        badge={{ variant: 'required', label: '必須' }}
        title="風俗じゃぱん！"
        right={
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">業種絞り込み:</span>
            <Select value={fjJobFilter} onChange={setFjJobFilter} options={['未設定']} />
          </div>
        }
      >
        <div className="max-w-[1200px] mx-auto space-y-10">
          <div className="max-w-[980px]">
            <FormRow label="X(Twitter)URL">
              <TextInput
                value={fjXUrl}
                onChange={setFjXUrl}
                placeholder="例：https://x.com/XXXXXX（XXXXXXはアカウント名）"
                showCount
              />
            </FormRow>
          </div>

          <div className="max-w-[980px] space-y-6">
            <FormRow label="本指名料">
              <div className="flex items-center gap-6">
                <TextInput value={fjNominationFee1} onChange={setFjNominationFee1} showCount />
                <div className="text-sm text-gray-700">コース・料金設定で登録した金額を反映する(風俗じゃぱん！のみ)</div>
                <Select value={fjNominationFee1Reflect} onChange={setFjNominationFee1Reflect} options={['未選択']} />
              </div>
            </FormRow>
            <FormRow label="指名料">
              <div className="flex items-center gap-6">
                <TextInput value={fjNominationFee2} onChange={setFjNominationFee2} showCount />
                <div className="text-sm text-gray-700">コース・料金設定で登録した金額を反映する(風俗じゃぱん！のみ)</div>
                <Select value={fjNominationFee2Reflect} onChange={setFjNominationFee2Reflect} options={['未選択']} />
              </div>
            </FormRow>
          </div>

          <div className="max-w-[520px] space-y-4">
            <FormRow label="身長">
              <Select value={fjHeight} onChange={setFjHeight} options={['タグを表示']} />
            </FormRow>
            <FormRow label="乳(サイズ)">
              <Select value={fjBustSize} onChange={setFjBustSize} options={['タグを表示']} />
            </FormRow>
            <FormRow label="SM属性">
              <Select value={fjSmAttr} onChange={setFjSmAttr} options={['タグを表示']} />
            </FormRow>
            <FormRow label="女の子タグ1">
              <Select value={fjGirlTag1} onChange={setFjGirlTag1} options={['未選択']} />
            </FormRow>
            <FormRow label="女の子タグ2">
              <Select value={fjGirlTag2} onChange={setFjGirlTag2} options={['未選択']} />
            </FormRow>
          </div>

          <div>
            <div className="text-base font-semibold text-gray-800 mb-4 text-center">ルックス(5個まで)</div>
            <CheckboxGrid
              items={fjLooks}
              selectedIds={fjLooksSet.selected}
              onToggle={fjLooksSet.toggle}
              onSelectAll={fjLooksSet.selectAll}
              onClear={fjLooksSet.clear}
              columnsClassName="grid-cols-7"
              maxSelected={5}
            />
          </div>

          <div>
            <div className="text-base font-semibold text-gray-800 mb-4 text-center">性格(2個まで)</div>
            <CheckboxGrid
              items={fjPersonality}
              selectedIds={fjPersonalitySet.selected}
              onToggle={fjPersonalitySet.toggle}
              onSelectAll={fjPersonalitySet.selectAll}
              onClear={fjPersonalitySet.clear}
              columnsClassName="grid-cols-6"
              maxSelected={2}
            />
          </div>

          <div>
            <div className="text-sm text-gray-700 mb-4">女の子タグ(その他)</div>
            <div className="space-y-10">
              <div>
                <div className="text-base font-semibold text-gray-800 mb-4">タイプ(1個まで)</div>
                <CheckboxGrid
                  items={fjTypeTags}
                  selectedIds={fjTypeSet.selected}
                  onToggle={fjTypeSet.toggle}
                  onSelectAll={fjTypeSet.selectAll}
                  onClear={fjTypeSet.clear}
                  columnsClassName="grid-cols-7"
                  maxSelected={1}
                />
              </div>

              <div>
                <div className="text-base font-semibold text-gray-800 mb-4">プレイ</div>
                <CheckboxGrid
                  items={fjPlayTags}
                  selectedIds={fjPlaySet.selected}
                  onToggle={fjPlaySet.toggle}
                  onSelectAll={fjPlaySet.selectAll}
                  onClear={fjPlaySet.clear}
                  columnsClassName="grid-cols-6"
                />
              </div>

              <div>
                <div className="text-base font-semibold text-gray-800 mb-4">こだわり・特徴・個性(2個まで)</div>
                <CheckboxGrid
                  items={fjKodaTags}
                  selectedIds={fjKodaSet.selected}
                  onToggle={fjKodaSet.toggle}
                  onSelectAll={fjKodaSet.selectAll}
                  onClear={fjKodaSet.clear}
                  columnsClassName="grid-cols-7"
                  maxSelected={2}
                />
              </div>

              <div className="max-w-[520px] space-y-4">
                <FormRow label="S・M度チェック">
                  <Select value={fjSmCheck} onChange={setFjSmCheck} options={['未選択']} />
                </FormRow>
                <FormRow label="体験入店設定">
                  <Select value={fjTrialSetting} onChange={setFjTrialSetting} options={['未選択']} />
                </FormRow>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}


