import Link from 'next/link';
import Image from 'next/image';
import * as styles from './header.css';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLogo}>
          <Link href="/" className={styles.headerLogoLink}>
            <Image
              src="/logo.png"
              alt="James's Component"
              className={styles.headerLogoImage}
              width={75}
              height={50}
            />
            {/* James's Component */}
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
            href="https://github.com"
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
