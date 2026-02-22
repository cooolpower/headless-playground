'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { TocItem } from '@/utils/toc';

interface TocContextType {
  items: TocItem[];
  setItems: (items: TocItem[]) => void;
}

const TocContext = createContext<TocContextType>({
  items: [],
  setItems: () => {},
});

export function TocProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TocItem[]>([]);
  return (
    <TocContext.Provider value={{ items, setItems }}>
      {children}
    </TocContext.Provider>
  );
}

export function useToc() {
  return useContext(TocContext);
}

export function TocUpdater({ items }: { items: TocItem[] }) {
  const { setItems } = useToc();
  useEffect(() => {
    setItems(items);
    return () => setItems([]);
  }, [items, setItems]);
  return null;
}
