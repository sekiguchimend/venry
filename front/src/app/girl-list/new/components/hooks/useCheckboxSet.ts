'use client';

import { useCallback, useMemo, useState } from 'react';

export function useCheckboxSet(allIds: string[], maxSelected?: number) {
  const allSet = useMemo(() => new Set(allIds), [allIds]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = useCallback(
    (id: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
          return next;
        }
        if (maxSelected != null && next.size >= maxSelected) return next;
        if (!allSet.has(id)) return next;
        next.add(id);
        return next;
      });
    },
    [allSet, maxSelected],
  );

  const clear = useCallback(() => setSelected(new Set()), []);

  const selectAll = useCallback(() => {
    setSelected((prev) => {
      if (maxSelected == null) return new Set(allIds);
      const limited = allIds.slice(0, maxSelected);
      // 既に選択中なら、そのまま（UIを安定させる）
      if (prev.size > 0) return new Set(prev);
      return new Set(limited);
    });
  }, [allIds, maxSelected]);

  return { selected, toggle, clear, selectAll };
}


