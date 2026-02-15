import * as styles from './css-snippet.css';

export function CssSnippet({
  css,
  title = 'CSS',
}: {
  css: string;
  title?: string;
}) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <pre className={styles.pre}>
        <code>{css}</code>
      </pre>
    </div>
  );
}

