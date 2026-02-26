import Link from 'next/link';
import Image from 'next/image';
import * as styles from './header.css';
import { ThemeToggle } from './theme-toggle';
import { Title, Text } from '@cooolpower/headless-ui';

export function Header() {
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
            {/* <div className={styles.headerLogoText}>
              <Title level={4}>HUGOBEAR</Title>
              <p
                style={{
                  fontSize: '11px',
                  lineHeight: '1.5',
                  fontWeight: 400,
                  letterSpacing: '1.1px',
                  transform: 'translateY(-3px)',
                }}
              >
                Composable UI Kit
              </p>
            </div> */}
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
      </div>
    </header>
  );
}
