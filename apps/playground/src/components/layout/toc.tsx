'use client';

import { useEffect, useState } from 'react';
import * as styles from './toc.css';
import { TocItem } from '@/utils/toc';
import clsx from 'clsx';

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headingElements: Record<string, IntersectionObserverEntry> = {};

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        headingElements[entry.target.id] = entry;
      });

      // 화면에 보이는 요소들 중 가장 위에 있는 것을 찾음
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
      rootMargin: '-80px 0% -40% 0%',
      threshold: [0, 1],
    });

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className={styles.tocWrapper}>
      <h4 className={styles.tocTitle}>On this page</h4>
      <ul className={styles.tocList}>
        {items.map((item) => (
          <li
            key={item.id}
            className={clsx(styles.tocItem, item.level === 3 && styles.subItem)}
          >
            <a
              href={`#${item.id}`}
              className={clsx(
                styles.tocLink,
                activeId === item.id && styles.activeLink,
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
                setActiveId(item.id);
                window.history.pushState(null, '', `#${item.id}`);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
