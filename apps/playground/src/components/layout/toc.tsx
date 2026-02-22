'use client';

import React, { useEffect, useState, useRef } from 'react';
import * as styles from './toc.css';
import { TocItem } from '@/utils/toc';
import clsx from 'clsx';

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const isClickScrolling = useRef(false);
  const clickScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const headingElements: Record<string, IntersectionObserverEntry> = {};

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        headingElements[entry.target.id] = entry;
      });

      // 스크롤 이동 중에는 옵저버 업데이트 무시
      if (isClickScrolling.current) return;

      const visibleHeadings = Object.values(headingElements).filter(
        (entry) => entry.isIntersecting,
      );

      if (visibleHeadings.length > 0) {
        const topHeading = visibleHeadings.reduce((prev, curr) => {
          return prev.boundingClientRect.top < curr.boundingClientRect.top
            ? prev
            : curr;
        });
        setActiveId(topHeading.target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-80px 0px -40% 0px',
      threshold: 0,
    });

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        // 기존 상태 초기화 보장
        headingElements[item.id] = {
          target: element,
          isIntersecting: false,
          boundingClientRect: element.getBoundingClientRect(),
        } as unknown as IntersectionObserverEntry;
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (clickScrollTimeout.current) clearTimeout(clickScrollTimeout.current);
    };
  }, [items]);

  if (items.length === 0) return null;

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    isClickScrolling.current = true;
    setActiveId(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
    window.history.pushState(null, '', `#${id}`);

    if (clickScrollTimeout.current) clearTimeout(clickScrollTimeout.current);
    clickScrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800); // 부드러운 스크롤 애니메이션 소요 시간에 맞춰 800ms 무시
  };

  return (
    <aside className={styles.tocWrapper}>
      <h4 className={styles.tocTitle}>On this page</h4>
      <ul className={styles.tocList}>
        {items.map((item) => (
          <li
            key={item.id}
            className={clsx(
              styles.tocItem,
              item.level === 3 && styles.subItem,
              item.level === 4 && styles.subSubItem,
            )}
          >
            <a
              href={`#${item.id}`}
              className={clsx(
                styles.tocLink,
                activeId === item.id && styles.activeLink,
              )}
              onClick={(e) => handleLinkClick(e, item.id)}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
