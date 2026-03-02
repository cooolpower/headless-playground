'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import * as styles from './header.css';
import { ThemeToggle } from './theme-toggle';
import { Icon, Text } from '@cooolpower/headless-ui';
import { DOCS_REGISTRY, COMPONENTS_REGISTRY } from './sidebar';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLogo}>
          <Link href="/" className={styles.headerLogoLink}>
            <div className={styles.logoLight}>
              <Image
                src="/logo-light.svg"
                alt="Headless UI Logo"
                className={styles.headerLogoImage}
                width={45}
                height={30}
                priority
              />
            </div>
            <div className={styles.logoDark}>
              <Image
                src="/logo-dark.svg"
                alt="Headless UI Logo"
                className={styles.headerLogoImage}
                width={45}
                height={30}
                priority
              />
            </div>
          </Link>
        </div>
        <nav className={styles.headerNav}>
          <Link href="/docs/introduction" className={styles.navLink}>
            Docs
          </Link>
          <Link href="/components/alert" className={styles.navLink}>
            Components
          </Link>
          <a
            href="https://github.com/cooolpower/headless-playground"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div className={styles.menuButton}>
            <ThemeToggle />
          </div>
          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Icon icon={isMenuOpen ? X : Menu} size="medium" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={styles.mobileNav} data-open={isMenuOpen}>
        <Link href="/docs/introduction" className={styles.mobileNavLink}>
          Docs
        </Link>
        <Link href="/components/alert" className={styles.mobileNavLink}>
          Components
        </Link>

        <div
          style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
            }}
          >
            Documentation
          </Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            {Object.values(DOCS_REGISTRY)
              .flat()
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/docs/${item.slug}`}
                  className={styles.navLink}
                  style={{ fontSize: '16px', padding: '6px 0' }}
                >
                  {item.label}
                </Link>
              ))}
          </div>

          <Text
            strong
            style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '24px',
            }}
          >
            Components
          </Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            {Object.values(COMPONENTS_REGISTRY)
              .flat()
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/components/${item.slug}`}
                  className={styles.navLink}
                  style={{ fontSize: '16px', padding: '6px 0' }}
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </header>
  );
}
