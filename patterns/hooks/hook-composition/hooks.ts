import { useMemo, useState } from 'react';

export function useSearch(items: string[]) {
  const [keyword, setKeyword] = useState('');
  const results = useMemo(() => items.filter((item) => item.toLowerCase().includes(keyword.toLowerCase())), [items, keyword]);
  return { keyword, setKeyword, results };
}
