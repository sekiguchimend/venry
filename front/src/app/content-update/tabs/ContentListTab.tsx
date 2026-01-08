'use client';

import React, { useState, useEffect } from 'react';
import ContentRow from '../components/ContentRow';
import { getFlowItemsByPagePaginated, getFlowItemsByPage } from '../utils/flowUtils';
import { getContentGroupItems } from '../actions/content-groups';

interface ContentListTabProps {
  currentPage?: number;
  selectedGroupId?: string | null;
}

const ContentListTab: React.FC<ContentListTabProps> = ({ currentPage = 1, selectedGroupId = null }) => {
  const [groupKeys, setGroupKeys] = useState<Set<string> | null>(null);
  const [loading, setLoading] = useState(false);

  // グループが選択されたときにフィルター用のコンテンツ名を取得
  useEffect(() => {
    if (selectedGroupId) {
      // 以前のグループの状態が残って誤判定しないように先にクリア
      setGroupKeys(null);
      setLoading(true);
      getContentGroupItems(selectedGroupId)
        .then((result) => {
          if (result.success && result.items) {
            // site(automation_id) + content_name の組み合わせで安定して照合する
            const next = new Set<string>();
            for (const item of result.items) {
              const name = item.content_name?.trim();
              const automationId = item.automation_id?.trim();
              if (!name) continue;
              if (automationId) {
                next.add(`${automationId}::${name}`);
              } else {
                // 互換: automation_id が取れない場合は名前のみ
                next.add(`::${name}`);
              }
            }
            setGroupKeys(next);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch group items:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setGroupKeys(null);
    }
  }, [selectedGroupId]);

  // JSON設定からcontent-listページのフローを取得
  // グループフィルターが有効な場合は全アイテムを取得、それ以外はページネーション対応
  let flowItems = groupKeys
    ? getFlowItemsByPage('content-list') // グループフィルター時は全件取得
    : getFlowItemsByPagePaginated('content-list', currentPage);

  // グループフィルターが有効な場合は、該当するコンテンツのみ表示
  if (groupKeys) {
    flowItems = flowItems.filter(item => {
      if (!item.flowName) return false;
      const flowName = item.flowName.trim();
      const key = `${item.siteId}::${flowName}`;
      if (groupKeys.has(key)) return true;
      // 互換: automation_id が取れない場合（::name）
      return groupKeys.has(`::${flowName}`);
    });
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
        読み込み中...
      </div>
    );
  }

  if (selectedGroupId && flowItems.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
        このグループにはコンテンツがありません
      </div>
    );
  }

  return (
    <>
      {flowItems.map((item) => (
        <ContentRow key={item.id} item={item} />
      ))}
    </>
  );
};

export default ContentListTab;
