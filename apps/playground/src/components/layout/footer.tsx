import * as styles from './footer.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-neutral-500">
        Built with Next.js · Headless UI Playground
      </div>
    </footer>
  );
}
